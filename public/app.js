const roleText = {
  conformer: {
    title: "合群者",
    body: "你的答案要成為唯一最多人選的答案。最高票平手不算成功。",
  },
  minority: {
    title: "少數派",
    body: "你的答案要只有你自己選。只要有人跟你一樣就失敗。",
  },
  follower: {
    title: "跟屁蟲",
    body: "你要和指定玩家選一樣。可以觀察對方，也可以試著影響對方。",
  },
};

const phaseText = {
  lobby: "等待玩家",
  choosing: "先秘密選一個答案",
  discussing: "可以討論與改選，準備好就鎖定",
  results: "結果揭曉",
};

const state = {
  roomCode: localStorage.getItem("trialBalloonRoom") || "",
  playerId: localStorage.getItem("trialBalloonPlayer") || "",
  room: null,
  polling: null,
};

const app = document.querySelector("#app");
const gameTemplateMarkup = document.querySelector("#gameTemplate").outerHTML;

function request(path, body) {
  return fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(async (response) => {
    const payload = await response.json();
    if (!response.ok || payload.error) {
      throw new Error(payload.error || "Something went wrong.");
    }
    return payload;
  });
}

function saveSession(room) {
  state.room = room;
  state.roomCode = room.code;
  state.playerId = room.me.id;
  localStorage.setItem("trialBalloonRoom", state.roomCode);
  localStorage.setItem("trialBalloonPlayer", state.playerId);
  localStorage.setItem("trialBalloonName", room.me.name);
}

function clearSavedRoom() {
  state.room = null;
  state.roomCode = "";
  state.playerId = "";
  localStorage.removeItem("trialBalloonRoom");
  localStorage.removeItem("trialBalloonPlayer");
}

function normalizeRoomInput(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 4);
}

function showError(error) {
  alert(error.message || String(error));
}

function renderEntry(message = "") {
  clearInterval(state.polling);
  state.polling = null;
  document.body.classList.remove("in-game");
  const savedName = localStorage.getItem("trialBalloonName") || "";
  app.innerHTML = `
    <section class="panel">
      <p class="eyebrow">Party prototype</p>
      <h1>Trial Balloon</h1>
      <p class="muted">用手機加入同一個房間。每回合你有一個秘密動機：拉大家同票、獨自少數，或跟上指定玩家。</p>

      <form id="entryForm" class="entry">
        <p class="muted" id="entryMessage" ${message ? "" : "hidden"}>${escapeHtml(message)}</p>
        <label>
          你的名字
          <input id="nameInput" maxlength="20" autocomplete="nickname" placeholder="例如：Gordon" required value="${escapeHtml(savedName)}" />
        </label>
        <label>
          房號
          <input id="roomInput" maxlength="4" autocomplete="off" placeholder="可自訂或加入，例如 1234" />
        </label>
        <div class="button-row">
          <button type="button" id="createButton">建立房間</button>
          <button type="submit" class="secondary">加入房間</button>
        </div>
      </form>
    </section>
    ${gameTemplateMarkup}
  `;
  bindEntryForm();
}

function bindEntryForm() {
  const entryForm = document.querySelector("#entryForm");
  const nameInput = document.querySelector("#nameInput");
  const roomInput = document.querySelector("#roomInput");
  const createButton = document.querySelector("#createButton");

  roomInput.value = normalizeRoomInput(roomInput.value);
  roomInput.addEventListener("input", () => {
    roomInput.value = normalizeRoomInput(roomInput.value);
  });

  createButton.addEventListener("click", () => {
    const requestedRoom = normalizeRoomInput(roomInput.value);
    request("/api/create", {
      name: nameInput.value.trim() || "Host",
      room: requestedRoom,
    })
      .then((payload) => {
        saveSession(payload.room);
        mountGame();
      })
      .catch(showError);
  });

  entryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    request("/api/join", {
      name: nameInput.value.trim() || "Player",
      room: normalizeRoomInput(roomInput.value),
    })
      .then((payload) => {
        saveSession(payload.room);
        mountGame();
      })
      .catch(showError);
  });
}

function mountGame() {
  document.body.classList.add("in-game");
  const template = document.querySelector("#gameTemplate");
  app.innerHTML = "";
  app.append(template.content.cloneNode(true));
  bindGameButtons();
  render();
  startPolling();
}

function bindGameButtons() {
  app.querySelector("[data-leave-button]")?.addEventListener("click", leaveRoom);

  app.querySelector("[data-start-button]")?.addEventListener("click", () => {
    request("/api/start", {
      room: state.roomCode,
      playerId: state.playerId,
    })
      .then((payload) => {
        state.room = payload.room;
        render();
      })
      .catch(showError);
  });

  app.querySelector("[data-next-button]")?.addEventListener("click", () => {
    request("/api/start", {
      room: state.roomCode,
      playerId: state.playerId,
    })
      .then((payload) => {
        state.room = payload.room;
        render();
      })
      .catch(showError);
  });

  app.querySelector("[data-lock-button]")?.addEventListener("click", () => {
    request("/api/lock", {
      room: state.roomCode,
      playerId: state.playerId,
    })
      .then((payload) => {
        state.room = payload.room;
        render();
      })
      .catch(showError);
  });
}

function startPolling() {
  clearInterval(state.polling);
  state.polling = setInterval(refreshState, 1000);
  refreshState();
}

function refreshState() {
  if (!state.roomCode || !state.playerId) return;
  fetch(`/api/state?room=${encodeURIComponent(state.roomCode)}&playerId=${encodeURIComponent(state.playerId)}`)
    .then((response) => response.json())
    .then((room) => {
      if (room.error || !room.me) throw new Error(room.error || "Saved session is no longer valid.");
      state.room = room;
      render();
    })
    .catch(() => {
      clearSavedRoom();
      renderEntry("上一個房間已經不存在，已清除舊記憶。");
    });
}

function render() {
  const room = state.room;
  if (!room || !app.querySelector("[data-room-code]")) return;

  app.querySelector("[data-room-code]").textContent = room.code;
  app.querySelector("[data-round]").textContent = room.round || "Lobby";

  renderPlayers(app.querySelector("[data-scoreboard]"), room.players);
  renderLobby(room);
  renderGame(room);
  renderResults(room);
}

function renderPlayers(container, players) {
  container.innerHTML = players
    .map(
      (player) => `
        <div class="player">
          <span>${escapeHtml(player.name)}${player.isHost ? " · Host" : ""}</span>
          <span class="score">${player.score} pt</span>
        </div>
      `,
    )
    .join("");
}

function renderLobby(room) {
  const lobby = app.querySelector("[data-lobby]");
  lobby.hidden = room.phase !== "lobby";
  if (lobby.hidden) return;
  renderPlayers(app.querySelector("[data-player-list]"), room.players);
  const startButton = app.querySelector("[data-start-button]");
  startButton.hidden = !room.me.isHost;
  startButton.disabled = room.players.length < 3;
  startButton.textContent = room.players.length < 3 ? "至少需要 3 人" : "開始回合";
}

function renderGame(room) {
  const game = app.querySelector("[data-game]");
  game.hidden = !["choosing", "discussing"].includes(room.phase);
  if (game.hidden) return;

  app.querySelector("[data-phase]").textContent = phaseText[room.phase];
  app.querySelector("[data-question]").textContent = room.question.prompt;
  renderRole(room);
  renderOptions(room);

  const lockedCount = Object.values(room.locks).filter(Boolean).length;
  app.querySelector("[data-lock-status]").textContent = `${lockedCount}/${room.players.length} 位玩家已鎖定`;

  const lockButton = app.querySelector("[data-lock-button]");
  lockButton.hidden = false;
  lockButton.disabled = room.me.locked || room.me.choice === null;
  lockButton.textContent = room.me.locked ? "已鎖定" : "鎖定答案";
}

function renderRole(room) {
  const role = room.me.role;
  const copy = roleText[role.type];
  const target = role.type === "follower" ? `<p>你的目標玩家：<strong>${escapeHtml(role.targetName)}</strong></p>` : "";
  app.querySelector("[data-role-card]").innerHTML = `
    <div class="role-title">${copy.title}</div>
    <p>${copy.body}</p>
    ${target}
  `;
}

function renderOptions(room) {
  const container = app.querySelector("[data-options]");
  container.innerHTML = "";
  room.question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    if (room.me.choice === index) button.classList.add("selected");
    if (room.me.locked) button.classList.add("locked");
    button.type = "button";
    button.disabled = room.me.locked;
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.addEventListener("click", () => choose(index));
    container.append(button);
  });
}

function choose(choice) {
  request("/api/choose", {
    room: state.roomCode,
    playerId: state.playerId,
    choice,
  })
    .then((payload) => {
      state.room = payload.room;
      render();
    })
    .catch(showError);
}

function leaveRoom() {
  const room = state.roomCode;
  const playerId = state.playerId;
  clearSavedRoom();
  request("/api/leave", { room, playerId })
    .catch(() => {})
    .finally(() => {
      renderEntry("你已離開房間。");
    });
}

function renderResults(room) {
  const results = app.querySelector("[data-results]");
  results.hidden = room.phase !== "results";
  if (results.hidden) return;

  const counts = app.querySelector("[data-counts]");
  counts.innerHTML = room.question.options
    .map((option, index) => {
      const count = room.results.counts[index] || 0;
      return `
        <div class="count-row">
          <span>${String.fromCharCode(65 + index)}. ${escapeHtml(option)}</span>
          <strong>${count} 票</strong>
        </div>
      `;
    })
    .join("");

  const resultList = app.querySelector("[data-results-list]");
  resultList.innerHTML = room.results.playerResults
    .map((result) => {
      const label = result.success ? "成功" : "失敗";
      const className = result.success ? "success" : "fail";
      const role = roleText[result.role].title;
      const option = room.question.options[result.choice];
      return `
        <div class="result">
          <div>
            <strong>${escapeHtml(result.playerName)}</strong>
            <div class="muted">${role} · ${escapeHtml(option)} · ${escapeHtml(result.detail)}</div>
          </div>
          <span class="${className}">${label}</span>
        </div>
      `;
    })
    .join("");

  const nextButton = app.querySelector("[data-next-button]");
  nextButton.hidden = !room.me.isHost;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

if (state.roomCode && state.playerId) {
  mountGame();
} else {
  renderEntry();
}
