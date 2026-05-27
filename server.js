const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, "public");
const QUESTION_FILE = path.join(__dirname, "data", "questions.json");
const SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "";
const SHEETS_WEBHOOK_SECRET = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET || "";

const rooms = new Map();
const questionDecks = loadQuestionDecks();
const analytics = {
  createdAt: new Date().toISOString(),
  roomsCreated: 0,
  totalRounds: 0,
  totalPlayerCount: 0,
  roomRoundCounts: [],
  rounds: [],
  feedback: [],
};

function loadQuestionDecks() {
  const raw = fs.readFileSync(QUESTION_FILE, "utf8");
  const decks = JSON.parse(raw);
  validateDeck(decks.twoOption, 2, "twoOption");
  validateDeck(decks.threeOption, 3, "threeOption");
  return decks;
}

function validateDeck(deck, optionCount, name) {
  if (!Array.isArray(deck) || deck.length === 0) {
    throw new Error(`Question deck "${name}" must contain at least one question.`);
  }
  deck.forEach((question, index) => {
    if (!hasLocalizedText(question.prompt) || !Array.isArray(question.options) || question.options.length !== optionCount) {
      throw new Error(`Question ${name}[${index}] must have bilingual prompt text and ${optionCount} options.`);
    }
    question.options.forEach((option, optionIndex) => {
      if (!hasLocalizedText(option)) {
        throw new Error(`Question ${name}[${index}].options[${optionIndex}] must have zh and en text.`);
      }
    });
  });
}

function hasLocalizedText(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      typeof value.zh === "string" &&
      value.zh.trim() &&
      typeof value.en === "string" &&
      value.en.trim(),
  );
}

function id(size = 12) {
  return crypto.randomBytes(size).toString("base64url");
}

function localizedText(value, locale = "zh") {
  if (value && typeof value === "object") return value[locale] || value.zh || value.en || "";
  return String(value || "");
}

function questionKey(question) {
  return localizedText(question?.prompt, "en") || localizedText(question?.prompt, "zh");
}

function sendSheetEvent(type, payload) {
  if (!SHEETS_WEBHOOK_URL) return;
  fetch(SHEETS_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: SHEETS_WEBHOOK_SECRET,
      type,
      payload,
      sentAt: new Date().toISOString(),
    }),
  }).catch((error) => {
    console.error(`Google Sheets webhook failed: ${error.message}`);
  });
}

function normalizeRoomCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 4);
}

function randomRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return rooms.has(code) ? randomRoomCode() : code;
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createDeck(playerCount) {
  const deck = playerCount === 3 ? questionDecks.twoOption : questionDecks.threeOption;
  return shuffle(deck);
}

function nextQuestion(room) {
  const playerCount = room.players.length;
  if (!room.deck.length || room.deckType !== playerCount) {
    room.deck = createDeck(playerCount);
    room.deckType = playerCount;
  }
  return room.deck.pop();
}

function randomRolePlan(playerCount) {
  if (playerCount === 3) {
    return shuffle(["conformer", "minority", Math.random() < 0.5 ? "follower" : "conformer"]);
  }
  if (playerCount === 4) {
    return shuffle(["conformer", "minority", "follower", Math.random() < 0.5 ? "conformer" : "minority"]);
  }
  if (playerCount === 5) {
    return shuffle(["conformer", "conformer", "minority", "minority", "follower"]);
  }
  return shuffle(["conformer", "conformer", "minority", "minority", "follower", "follower"]);
}

function defaultRoleConfigFor(playerCount) {
  if (playerCount === 3) return { conformer: 1, minority: 1, follower: 1 };
  if (playerCount === 4) return { conformer: 2, minority: 1, follower: 1 };
  if (playerCount === 5) return { conformer: 2, minority: 2, follower: 1 };
  return { conformer: 2, minority: 2, follower: 2 };
}

function fixedRolePlan(playerCount, config = defaultRoleConfigFor(playerCount)) {
  return shuffle(Object.entries(config).flatMap(([role, count]) => Array(Number(count)).fill(role)));
}

function fixedRoleConfigFor(room) {
  const playerCount = Math.min(Math.max(room.players.length, 3), 6);
  return room.fixedRoleConfigs?.[playerCount] || defaultRoleConfigFor(playerCount);
}

function rolePlan(room) {
  return room.roleMode === "fixed" ? fixedRolePlan(room.players.length, fixedRoleConfigFor(room)) : randomRolePlan(room.players.length);
}

function validateFixedRoleConfig(config, playerCount) {
  const roles = ["conformer", "minority", "follower"];
  const normalized = {};
  for (const role of roles) {
    const count = Number(config?.[role]);
    if (!Number.isInteger(count) || count < 0 || count > playerCount) {
      throw new Error("Role counts must be whole numbers between 0 and the player count.");
    }
    normalized[role] = count;
  }
  const total = Object.values(normalized).reduce((sum, count) => sum + count, 0);
  if (total !== playerCount) {
    throw new Error("Fixed role counts must add up to the number of players in the room.");
  }
  return normalized;
}

function makePlayer(name, isHost = false) {
  return {
    id: id(),
    name: String(name || (isHost ? "Host" : "Player")).slice(0, 20),
    score: 0,
    isHost,
    connectedAt: Date.now(),
    roleCounts: { conformer: 0, minority: 0, follower: 0 },
  };
}

function publicPlayer(player) {
  return {
    id: player.id,
    name: player.name,
    score: player.score,
    isHost: player.isHost,
    connectedAt: player.connectedAt,
  };
}

function roleCount(player, type) {
  return player.roleCounts?.[type] || 0;
}

function rememberRole(player, type) {
  if (!player.roleCounts) {
    player.roleCounts = { conformer: 0, minority: 0, follower: 0 };
  }
  player.roleCounts[type] += 1;
}

function serializeRoom(room, playerId) {
  const me = room.players.find((player) => player.id === playerId);
  const role = me ? room.roles[playerId] : null;
  const target = role?.targetId ? room.players.find((player) => player.id === role.targetId) : null;
  const feedbackKey = `${room.round}:${playerId}`;
  return {
    code: room.code,
    phase: room.phase,
    round: room.round,
    minPlayers: 3,
    maxPlayers: 6,
    players: room.players.map(publicPlayer),
    hostId: room.hostId,
    roleMode: room.roleMode || "random",
    fixedRoleConfig: fixedRoleConfigFor(room),
    question: room.question,
    choices: room.choices,
    locks: Object.fromEntries(Object.entries(room.locks).map(([id, locked]) => [id, Boolean(locked)])),
    results: room.results,
    metrics: {
      roundsPlayed: room.metrics?.roundsPlayed || 0,
      maxPlayers: room.metrics?.maxPlayers || room.players.length,
    },
    me: me
      ? {
          id: me.id,
          name: me.name,
          isHost: me.isHost,
          choice: room.choices[playerId] ?? null,
          locked: Boolean(room.locks[playerId]),
          feedbackSubmitted: Boolean(room.feedback?.[feedbackKey]),
          role: role
            ? {
                type: role.type,
                targetId: role.targetId ?? null,
                targetName: target?.name ?? null,
              }
            : null,
        }
      : null,
  };
}

function assignRoles(room) {
  const plan = rolePlan(room);
  const available = shuffle(room.players);
  room.roles = {};
  plan.forEach((type) => {
    available.sort((a, b) => roleCount(a, type) - roleCount(b, type));
    const player = available.shift();
    const role = { type };
    if (type === "follower") {
      const targets = room.players.filter((candidate) => candidate.id !== player.id);
      role.targetId = targets[Math.floor(Math.random() * targets.length)].id;
    }
    room.roles[player.id] = role;
    rememberRole(player, type);
  });
}

function startRound(room) {
  if (room.players.length < 3 || room.players.length > 6) {
    throw new Error("Trial Balloon needs 3 to 6 players.");
  }
  room.round += 1;
  room.phase = "choosing";
  room.question = nextQuestion(room);
  room.roundStartedAt = Date.now();
  room.metrics.roundsStarted += 1;
  room.metrics.maxPlayers = Math.max(room.metrics.maxPlayers, room.players.length);
  room.choices = {};
  room.locks = {};
  room.results = null;
  assignRoles(room);
}

function skipQuestion(room) {
  if (!["choosing", "discussing"].includes(room.phase)) {
    throw new Error("Questions can only be skipped before results.");
  }
  room.phase = "choosing";
  room.question = nextQuestion(room);
  room.roundStartedAt = Date.now();
  room.choices = {};
  room.locks = {};
  room.results = null;
}

function scoreRound(room) {
  const counts = {};
  for (const choice of Object.values(room.choices)) {
    counts[choice] = (counts[choice] || 0) + 1;
  }

  const pickedCounts = Object.values(counts);
  const max = Math.max(...pickedCounts);
  const maxWinners = Object.values(counts).filter((count) => count === max).length;
  const uniqueMax = maxWinners === 1 ? Number(Object.keys(counts).find((choice) => counts[choice] === max)) : null;

  const playerResults = room.players.map((player) => {
    const role = room.roles[player.id];
    const choice = room.choices[player.id];
    let success = false;
    let detail = { zh: "", en: "" };

    if (role.type === "conformer") {
      success = uniqueMax !== null && choice === uniqueMax;
      detail = success
        ? { zh: "你的答案是唯一最多票。", en: "Your answer was the single most popular choice." }
        : { zh: "你的答案沒有成為唯一最多票。", en: "Your answer was not the single most popular choice." };
    }
    if (role.type === "minority") {
      success = counts[choice] === 1;
      detail = success
        ? { zh: "只有你選了這個答案。", en: "Only you chose this answer." }
        : { zh: "有人和你選了一樣的答案。", en: "Someone else chose the same answer." };
    }
    if (role.type === "follower") {
      const targetChoice = room.choices[role.targetId];
      const target = room.players.find((candidate) => candidate.id === role.targetId);
      const zhTarget = target?.name || "目標玩家";
      const enTarget = target?.name || "your target player";
      success = choice === targetChoice;
      detail = success
        ? { zh: `你跟 ${zhTarget} 選了一樣。`, en: `You matched ${enTarget}.` }
        : { zh: `你沒有跟 ${zhTarget} 選一樣。`, en: `You did not match ${enTarget}.` };
    }

    if (success) player.score += 1;

    return {
      playerId: player.id,
      playerName: player.name,
      choice,
      role: role.type,
      targetId: role.targetId ?? null,
      success,
      detail,
    };
  });

  room.phase = "results";
  const durationSeconds = Math.max(1, Math.round((Date.now() - room.roundStartedAt) / 1000));
  const roundRecord = {
    roomCode: room.code,
    round: room.round,
    questionKey: questionKey(room.question),
    question: room.question?.prompt || null,
    playerCount: room.players.length,
    roleMode: room.roleMode,
    durationSeconds,
    finishedAt: new Date().toISOString(),
  };
  analytics.totalRounds += 1;
  analytics.totalPlayerCount += room.players.length;
  analytics.rounds.push(roundRecord);
  room.metrics.roundsPlayed += 1;
  room.metrics.lastRoundDurationSeconds = durationSeconds;
  room.metrics.lastQuestionKey = roundRecord.questionKey;
  room.results = { counts, uniqueMax, playerResults };
  sendSheetEvent("round_completed", {
    ...roundRecord,
    choices: room.choices,
    counts,
    uniqueMax,
    results: playerResults.map((result) => ({
      playerName: result.playerName,
      choice: result.choice,
      role: result.role,
      success: result.success,
    })),
  });
}

function submitFeedback(room, player, body) {
  if (room.phase !== "results") throw new Error("Feedback opens after results.");
  const rating = body.rating === "down" ? "down" : body.rating === "up" ? "up" : null;
  if (!rating) throw new Error("Feedback rating must be up or down.");
  const feedbackKey = `${room.round}:${player.id}`;
  if (room.feedback[feedbackKey]) throw new Error("You already sent feedback for this round.");
  const comment = String(body.comment || "").trim().slice(0, 240);
  const record = {
    roomCode: room.code,
    round: room.round,
    playerCount: room.players.length,
    questionKey: questionKey(room.question),
    question: room.question?.prompt || null,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };
  room.feedback[feedbackKey] = true;
  analytics.feedback.push(record);
  sendSheetEvent("feedback_submitted", record);
  return record;
}

function analyticsSummary() {
  const questionStats = new Map();
  for (const round of analytics.rounds) {
    const stats = questionStats.get(round.questionKey) || {
      questionKey: round.questionKey,
      question: round.question,
      plays: 0,
      totalDurationSeconds: 0,
      up: 0,
      down: 0,
      comments: [],
    };
    stats.plays += 1;
    stats.totalDurationSeconds += round.durationSeconds;
    questionStats.set(round.questionKey, stats);
  }
  for (const item of analytics.feedback) {
    const stats = questionStats.get(item.questionKey) || {
      questionKey: item.questionKey,
      question: item.question,
      plays: 0,
      totalDurationSeconds: 0,
      up: 0,
      down: 0,
      comments: [],
    };
    stats[item.rating] += 1;
    if (item.comment) stats.comments.push(item.comment);
    questionStats.set(item.questionKey, stats);
  }
  return {
    createdAt: analytics.createdAt,
    roomsCreated: analytics.roomsCreated,
    totalRounds: analytics.totalRounds,
    averagePlayersPerRound: analytics.totalRounds ? Number((analytics.totalPlayerCount / analytics.totalRounds).toFixed(2)) : 0,
    roomsByRoundsPlayed: analytics.roomRoundCounts,
    activeRooms: Array.from(rooms.values()).map((room) => ({
      code: room.code,
      players: room.players.length,
      roundsStarted: room.metrics?.roundsStarted || 0,
      roundsPlayed: room.metrics?.roundsPlayed || 0,
    })),
    questions: Array.from(questionStats.values())
      .map((stats) => ({
        ...stats,
        averageDurationSeconds: stats.plays ? Number((stats.totalDurationSeconds / stats.plays).toFixed(1)) : 0,
      }))
      .sort((a, b) => b.plays - a.plays || b.averageDurationSeconds - a.averageDurationSeconds),
    feedbackCount: analytics.feedback.length,
  };
}

function getRoom(code) {
  const room = rooms.get(normalizeRoomCode(code));
  if (!room) throw new Error("Room not found.");
  return room;
}

async function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON."));
      }
    });
  });
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function sendStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    const types = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
    };
    response.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    response.end(data);
  });
}

function createRoom(body) {
  const requestedCode = normalizeRoomCode(body.room);
  if (requestedCode && requestedCode.length !== 4) {
    throw new Error("Room code must be exactly 4 letters or numbers.");
  }
  if (requestedCode && rooms.has(requestedCode)) {
    throw new Error("That room code is already in use.");
  }
  const code = requestedCode || randomRoomCode();
  const player = makePlayer(body.name, true);
  const room = {
    code,
    hostId: player.id,
    players: [player],
    phase: "lobby",
    round: 0,
    question: null,
    roles: {},
    choices: {},
    locks: {},
    results: null,
    roleMode: "fixed",
    fixedRoleConfigs: {},
    feedback: {},
    metrics: {
      roundsStarted: 0,
      roundsPlayed: 0,
      maxPlayers: 1,
      lastRoundDurationSeconds: null,
      lastQuestionKey: null,
    },
    deck: [],
    deckType: null,
  };
  rooms.set(code, room);
  analytics.roomsCreated += 1;
  sendSheetEvent("room_created", {
    roomCode: room.code,
    hostName: player.name,
    roleMode: room.roleMode,
    createdAt: new Date().toISOString(),
  });
  return { room, player };
}

function leaveRoom(room, player) {
  room.players = room.players.filter((candidate) => candidate.id !== player.id);
  delete room.roles[player.id];
  delete room.choices[player.id];
  delete room.locks[player.id];

  if (!room.players.length) {
    analytics.roomRoundCounts.push(room.metrics?.roundsPlayed || 0);
    sendSheetEvent("room_closed", {
      roomCode: room.code,
      roundsStarted: room.metrics?.roundsStarted || 0,
      roundsPlayed: room.metrics?.roundsPlayed || 0,
      maxPlayers: room.metrics?.maxPlayers || 0,
      closedAt: new Date().toISOString(),
    });
    rooms.delete(room.code);
    return;
  }

  if (room.hostId === player.id) {
    room.hostId = room.players[0].id;
    room.players.forEach((candidate, index) => {
      candidate.isHost = index === 0;
    });
  }

  if (room.phase !== "lobby") {
    room.phase = "lobby";
    room.question = null;
    room.roles = {};
    room.choices = {};
    room.locks = {};
    room.results = null;
    room.roundStartedAt = null;
  }
}

async function routeApi(request, response) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (request.method === "GET" && url.pathname === "/api/state") {
      const room = getRoom(url.searchParams.get("room"));
      return sendJson(response, 200, serializeRoom(room, url.searchParams.get("playerId")));
    }

    if (request.method === "GET" && url.pathname === "/api/analytics") {
      return sendJson(response, 200, analyticsSummary());
    }

    if (request.method !== "POST") {
      return sendJson(response, 405, { error: "Method not allowed." });
    }

    const body = await readBody(request);

    if (url.pathname === "/api/create") {
      const { room, player } = createRoom(body);
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    if (url.pathname === "/api/join") {
      const room = getRoom(body.room);
      if (room.phase !== "lobby") throw new Error("This room has already started.");
      if (room.players.length >= 6) throw new Error("This room is full.");
      const player = makePlayer(body.name, false);
      room.players.push(player);
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    const room = getRoom(body.room);
    const player = room.players.find((candidate) => candidate.id === body.playerId);

    if (url.pathname === "/api/leave") {
      if (player) leaveRoom(room, player);
      return sendJson(response, 200, { left: true });
    }

    if (!player) throw new Error("Player not found in room.");

    if (url.pathname === "/api/start") {
      if (!player.isHost) throw new Error("Only the host can start rounds.");
      startRound(room);
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    if (url.pathname === "/api/skip-question") {
      if (!player.isHost) throw new Error("Only the host can skip questions.");
      skipQuestion(room);
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    if (url.pathname === "/api/role-mode") {
      if (!player.isHost) throw new Error("Only the host can change room settings.");
      if (room.phase !== "lobby") throw new Error("Role settings can only be changed in the lobby.");
      room.roleMode = body.mode === "fixed" ? "fixed" : "random";
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    if (url.pathname === "/api/fixed-roles") {
      if (!player.isHost) throw new Error("Only the host can change room settings.");
      if (room.phase !== "lobby") throw new Error("Role settings can only be changed in the lobby.");
      const playerCount = room.players.length;
      if (playerCount < 3 || playerCount > 6) throw new Error("Fixed role settings need 3 to 6 players.");
      room.fixedRoleConfigs ||= {};
      if (body.reset) {
        delete room.fixedRoleConfigs[playerCount];
      } else {
        room.fixedRoleConfigs[playerCount] = validateFixedRoleConfig(body.config, playerCount);
      }
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    if (url.pathname === "/api/choose") {
      if (!["choosing", "discussing"].includes(room.phase)) throw new Error("Choices are not open right now.");
      if (room.locks[player.id]) throw new Error("You already locked your answer.");
      const choice = Number(body.choice);
      if (!room.question.options[choice]) throw new Error("Invalid choice.");
      room.choices[player.id] = choice;
      if (room.players.every((candidate) => room.choices[candidate.id] !== undefined)) {
        room.phase = "discussing";
      }
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    if (url.pathname === "/api/lock") {
      if (!["choosing", "discussing"].includes(room.phase)) throw new Error("Locking is not open right now.");
      if (room.choices[player.id] === undefined) throw new Error("Choose an answer before locking.");
      room.locks[player.id] = true;
      if (room.players.every((candidate) => room.locks[candidate.id])) {
        scoreRound(room);
      }
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    if (url.pathname === "/api/feedback") {
      submitFeedback(room, player, body);
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    if (url.pathname === "/api/reset") {
      if (!player.isHost) throw new Error("Only the host can return to lobby.");
      room.phase = "lobby";
      room.question = null;
      room.roles = {};
      room.choices = {};
      room.locks = {};
      room.results = null;
      return sendJson(response, 200, { room: serializeRoom(room, player.id) });
    }

    return sendJson(response, 404, { error: "Not found." });
  } catch (error) {
    return sendJson(response, 400, { error: error.message });
  }
}

const server = http.createServer((request, response) => {
  if (request.url.startsWith("/api/")) {
    routeApi(request, response);
    return;
  }
  sendStatic(request, response);
});

server.listen(PORT, "0.0.0.0", () => {
  const addresses = Object.values(os.networkInterfaces())
    .flat()
    .filter((entry) => entry && entry.family === "IPv4" && !entry.internal)
    .map((entry) => `http://${entry.address}:${PORT}`);
  console.log(`Trial Balloon is running at http://localhost:${PORT}`);
  if (addresses.length) {
    console.log(`Phones on the same Wi-Fi can try: ${addresses.join(", ")}`);
  }
});
