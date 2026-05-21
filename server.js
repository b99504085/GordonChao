const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, "public");
const QUESTION_FILE = path.join(__dirname, "data", "questions.json");

const rooms = new Map();
const questionDecks = loadQuestionDecks();

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
    if (!question.prompt || !Array.isArray(question.options) || question.options.length !== optionCount) {
      throw new Error(`Question ${name}[${index}] must have a prompt and ${optionCount} options.`);
    }
  });
}

function id(size = 12) {
  return crypto.randomBytes(size).toString("base64url");
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

function rolePlan(playerCount) {
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
  return {
    code: room.code,
    phase: room.phase,
    round: room.round,
    minPlayers: 3,
    maxPlayers: 6,
    players: room.players.map(publicPlayer),
    hostId: room.hostId,
    question: room.question,
    choices: room.choices,
    locks: Object.fromEntries(Object.entries(room.locks).map(([id, locked]) => [id, Boolean(locked)])),
    results: room.results,
    me: me
      ? {
          id: me.id,
          name: me.name,
          isHost: me.isHost,
          choice: room.choices[playerId] ?? null,
          locked: Boolean(room.locks[playerId]),
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
  const plan = rolePlan(room.players.length);
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
  room.choices = {};
  room.locks = {};
  room.results = null;
  assignRoles(room);
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
    let detail = "";

    if (role.type === "conformer") {
      success = uniqueMax !== null && choice === uniqueMax;
      detail = success ? "你的答案是唯一最多票。" : "你的答案沒有成為唯一最多票。";
    }
    if (role.type === "minority") {
      success = counts[choice] === 1;
      detail = success ? "只有你選了這個答案。" : "有人和你選了一樣的答案。";
    }
    if (role.type === "follower") {
      const targetChoice = room.choices[role.targetId];
      const target = room.players.find((candidate) => candidate.id === role.targetId);
      success = choice === targetChoice;
      detail = success ? `你跟 ${target?.name || "目標玩家"} 選了一樣。` : `你沒有跟 ${target?.name || "目標玩家"} 選一樣。`;
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
  room.results = { counts, uniqueMax, playerResults };
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
    deck: [],
    deckType: null,
  };
  rooms.set(code, room);
  return { room, player };
}

function leaveRoom(room, player) {
  room.players = room.players.filter((candidate) => candidate.id !== player.id);
  delete room.roles[player.id];
  delete room.choices[player.id];
  delete room.locks[player.id];

  if (!room.players.length) {
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
  }
}

async function routeApi(request, response) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (request.method === "GET" && url.pathname === "/api/state") {
      const room = getRoom(url.searchParams.get("room"));
      return sendJson(response, 200, serializeRoom(room, url.searchParams.get("playerId")));
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
