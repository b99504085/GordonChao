const roleTypes = ["conformer", "minority", "follower"];

const copy = {
  zh: {
    htmlLang: "zh-Hant",
    eyebrow: "Party game",
    switchLanguage: "English",
    intro:
      "一場看似普通的聊天遊戲，但其實，每個人都有自己的秘密任務。有人想迎合大眾，有人想與眾不同，也有人正試圖猜中你的想法。透過各式各樣的討論話題，你們會誠實發表意見、亂聊、偷帶風向、互相瞎猜……直到揭曉身份的那一刻，才發現原來剛剛那場聊天比想像中還不單純。",
    rulesTitle: "怎麼玩",
    ruleSteps: [
      "每位玩家用手機加入同一個房間，Host 開始回合。",
      "每回合大家會看到同一道題目，但每個人會拿到自己的秘密動機。",
      "先偷偷選答案，等所有人都選完後，可以討論、說服、試探，也可以改答案。",
      "大家鎖定後揭曉投票與得分。達成自己秘密動機的人得 1 分。",
    ],
    rolesTitle: "三種秘密動機",
    nameLabel: "你的名字",
    namePlaceholder: "例如：Gordon",
    roomInputLabel: "房號",
    roomPlaceholder: "可自訂房號，例如 1234",
    createRoom: "建立房間",
    joinRoom: "加入房間",
    roomLabel: "Room",
    roundLabel: "Round",
    leaveRoom: "離開房間",
    lobbyTitle: "等朋友加入",
    lobbyBody: "3 到 6 人就能開始。把房號分享出去，人到齊後由 Host 開始回合。",
    roleSetupTitle: "角色配置",
    fixedRoleMode: "固定角色配置",
    randomRoleMode: "隨機角色配置",
    fixedRoleModeBody: "每局角色數量固定，Host 可自行調整角色配置。",
    randomRoleModeBody: "每回合的角色配置為隨機分布，因此不一定每個角色都會出現，也可能會有某些角色在該回合中沒有登場。",
    hostOnlySetting: "只有 Host 可以切換與調整配置。",
    resetDefault: "回到 default 設定",
    roleConfigHelp: "固定配置的總數會等於目前玩家數。",
    roleCountLine: (role, count) => `${role}：${count} 個`,
    startRound: "開始回合",
    needPlayers: "至少需要 3 人",
    lockAnswer: "鎖定答案",
    skipQuestion: "換一題",
    skipQuestionHint: "Host 可以換題，角色不會重抽。",
    locked: "已鎖定",
    lockStatus: (locked, total) => `${locked}/${total} 位玩家已鎖定`,
    resultsTitle: "本回合結果",
    feedbackTitle: "這題好玩嗎？",
    feedbackPlaceholder: "匿名留一句回饋，例：這題太容易猜、這題很好吵",
    feedbackUp: "好玩",
    feedbackDown: "普通",
    feedbackHint: "先選 👍 或 👎，可以選填一句匿名回饋，再按送出。",
    sendFeedback: "送出回饋",
    feedbackSent: "已收到，謝謝你的回饋。",
    nextRound: "下一回合",
    playersTitle: "玩家",
    hostTag: "Host",
    point: "pt",
    staleRoom: "這個房間已經不存在，所以幫你清掉舊紀錄了。",
    leftRoom: "你已離開房間。",
    success: "成功",
    fail: "失敗",
    votes: "票",
    lobbyRound: "Lobby",
    choiceDivider: "・",
    roleText: {
      conformer: {
        title: "合群者",
        short: "把大家拉到同一邊",
        body: "你的答案要成為唯一最多票。平手不算成功，所以你要把人拉過來，也要防止別的選項追上。",
      },
      minority: {
        title: "少數派",
        short: "悄悄成為唯一例外",
        body: "你的答案必須只有你一個人選。你可以輕輕把大家推去別的地方，但不要讓自己看起來太想落單。",
      },
      follower: {
        title: "跟屁蟲",
        short: "盯緊指定玩家",
        body: "你要和指定玩家選一樣。你可以觀察他、影響他，或假裝你只是剛好同意。",
      },
    },
    phaseText: {
      lobby: "等待玩家",
      choosing: "偷偷選一個答案",
      discussing: "可以討論、改答案，最後鎖定",
      results: "揭曉時間",
    },
    targetPlayer: "你的指定玩家：",
  },
  en: {
    htmlLang: "en",
    eyebrow: "Party game",
    switchLanguage: "中文",
    intro:
      "A game that looks like an ordinary conversation, but everyone secretly has their own mission. Some players want to blend in with the majority, some want to stand out from the crowd, and some are trying to predict what you’ll choose. Through all kinds of discussion topics, you’ll share honest opinions, chat nonsense, subtly steer the conversation, and make wild guesses together... And when the roles are finally revealed, you’ll realize that the conversation you just had was far less innocent than it seemed.",
    rulesTitle: "How to Play",
    ruleSteps: [
      "Everyone joins the same room on their phone, then the Host starts the round.",
      "Everyone sees the same question, but each player gets a private motive.",
      "Pick an answer in secret. Once everyone has chosen, discuss, persuade, test the room, and switch if you want.",
      "When everyone locks in, votes are revealed. Players who complete their private motive score 1 point.",
    ],
    rolesTitle: "Three Private Motives",
    nameLabel: "Your name",
    namePlaceholder: "e.g. Gordon",
    roomInputLabel: "Room code",
    roomPlaceholder: "Create or join, e.g. 1234",
    createRoom: "Create room",
    joinRoom: "Join room",
    roomLabel: "Room",
    roundLabel: "Round",
    leaveRoom: "Leave room",
    lobbyTitle: "Waiting for friends",
    lobbyBody: "Start with 3 to 6 players. Share the room code, then the Host can begin once everyone arrives.",
    roleSetupTitle: "Role Setup",
    fixedRoleMode: "Fixed role setup",
    randomRoleMode: "Random role setup",
    fixedRoleModeBody: "Role counts stay fixed each round, and the Host can customize the setup.",
    randomRoleModeBody: "Each round uses a random role distribution, so not every role is guaranteed to appear. Some roles may be absent in a given round.",
    hostOnlySetting: "Only the Host can change and adjust this setting.",
    resetDefault: "Reset to default",
    roleConfigHelp: "Fixed counts always add up to the current player count.",
    roleCountLine: (role, count) => `${role}: ${count}`,
    startRound: "Start round",
    needPlayers: "Need at least 3 players",
    lockAnswer: "Lock answer",
    skipQuestion: "Skip question",
    skipQuestionHint: "Host can skip the question without changing roles.",
    locked: "Locked",
    lockStatus: (locked, total) => `${locked}/${total} players locked`,
    resultsTitle: "Round results",
    feedbackTitle: "Was this question fun?",
    feedbackPlaceholder: "Leave one anonymous note, e.g. too easy to guess, great debate topic",
    feedbackUp: "Fun",
    feedbackDown: "Okay",
    feedbackHint: "Choose 👍 or 👎, optionally leave one anonymous note, then send.",
    sendFeedback: "Send feedback",
    feedbackSent: "Received. Thanks for the feedback.",
    nextRound: "Next round",
    playersTitle: "Players",
    hostTag: "Host",
    point: "pt",
    staleRoom: "That room no longer exists, so your saved room was cleared.",
    leftRoom: "You left the room.",
    success: "Success",
    fail: "Miss",
    votes: "votes",
    lobbyRound: "Lobby",
    choiceDivider: " - ",
    roleText: {
      conformer: {
        title: "Crowd-Puller",
        short: "Pull the room together",
        body: "Your answer must be the single most popular choice. Ties do not count, so pull people in and stop other options from catching up.",
      },
      minority: {
        title: "Outlier",
        short: "Be the only exception",
        body: "Your answer must be chosen by you alone. Nudge people away gently, but do not look too eager to stand apart.",
      },
      follower: {
        title: "Shadow",
        short: "Track your target player",
        body: "You must match your assigned player. Read them, influence them, or make it look like you simply agree.",
      },
    },
    phaseText: {
      lobby: "Waiting for players",
      choosing: "Secretly pick an answer",
      discussing: "Discuss, switch if you want, then lock in",
      results: "Reveal time",
    },
    targetPlayer: "Your target player: ",
  },
};

const state = {
  roomCode: localStorage.getItem("trialBalloonRoom") || "",
  playerId: localStorage.getItem("trialBalloonPlayer") || "",
  language: localStorage.getItem("trialBalloonLanguage") || "zh",
  room: null,
  polling: null,
  feedbackDraft: {
    key: "",
    rating: "",
    comment: "",
  },
};

const app = document.querySelector("#app");
const gameTemplate = document.querySelector("#gameTemplate");

function t() {
  return copy[state.language] || copy.zh;
}

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

function setLanguage(language) {
  state.language = language;
  localStorage.setItem("trialBalloonLanguage", language);
  document.documentElement.lang = t().htmlLang;
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

function roleAvatar(type, size = "medium") {
  return `
    <span class="role-avatar role-avatar-${type} role-avatar-${size}" aria-hidden="true">
      <span class="avatar-face">
        <span class="avatar-eye left"></span>
        <span class="avatar-eye right"></span>
        <span class="avatar-mouth"></span>
      </span>
      <span class="avatar-symbol"></span>
    </span>
  `;
}

function logoMarkup() {
  return `
    <div class="brand-lockup">
      <div class="logo-mark" aria-hidden="true">
        <span class="logo-balloon"></span>
        <span class="logo-string"></span>
      </div>
      <div>
        <p class="eyebrow">${t().eyebrow}</p>
        <h1>Trial Balloon</h1>
      </div>
    </div>
  `;
}

function rulesMarkup() {
  return `
    <section class="rules-card" aria-labelledby="rulesTitle">
      <h2 id="rulesTitle">${t().rulesTitle}</h2>
      <ol class="rule-list">
        ${t()
          .ruleSteps.map((step) => `<li>${escapeHtml(step)}</li>`)
          .join("")}
      </ol>
      <h3>${t().rolesTitle}</h3>
      <div class="role-guide">
        ${roleTypes
          .map((type) => {
            const role = t().roleText[type];
            return `
              <article class="role-guide-card">
                ${roleAvatar(type, "small")}
                <div>
                  <strong>${role.title}</strong>
                  <p>${role.short}</p>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderEntry(message = "") {
  clearInterval(state.polling);
  state.polling = null;
  document.body.classList.remove("in-game");
  document.documentElement.lang = t().htmlLang;
  const savedName = localStorage.getItem("trialBalloonName") || "";
  app.innerHTML = `
    <section class="panel hero-panel">
      <button type="button" class="language-toggle" id="languageToggle">${t().switchLanguage}</button>
      ${logoMarkup()}
      <p class="intro-copy">${t().intro}</p>
      ${rulesMarkup()}

      <form id="entryForm" class="entry">
        <p class="muted" id="entryMessage" ${message ? "" : "hidden"}>${escapeHtml(message)}</p>
        <label>
          ${t().nameLabel}
          <input id="nameInput" maxlength="20" autocomplete="nickname" placeholder="${t().namePlaceholder}" required value="${escapeHtml(savedName)}" />
        </label>
        <label>
          ${t().roomInputLabel}
          <input id="roomInput" maxlength="4" autocomplete="off" placeholder="${t().roomPlaceholder}" />
        </label>
        <div class="button-row">
          <button type="button" id="createButton">${t().createRoom}</button>
          <button type="submit" class="secondary">${t().joinRoom}</button>
        </div>
      </form>
    </section>
  `;
  bindEntryForm();
}

function bindEntryForm() {
  const entryForm = document.querySelector("#entryForm");
  const nameInput = document.querySelector("#nameInput");
  const roomInput = document.querySelector("#roomInput");
  const createButton = document.querySelector("#createButton");
  const languageToggle = document.querySelector("#languageToggle");

  languageToggle.addEventListener("click", () => {
    setLanguage(state.language === "zh" ? "en" : "zh");
    renderEntry();
  });

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
  document.documentElement.lang = t().htmlLang;
  app.innerHTML = "";
  app.append(gameTemplate.content.cloneNode(true));
  applyStaticGameCopy();
  bindGameButtons();
  render();
  startPolling();
}

function applyStaticGameCopy() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t()[element.dataset.i18n] || "";
  });
  const leaveButton = app.querySelector("[data-leave-button]");
  if (leaveButton) leaveButton.textContent = t().leaveRoom;
  const lockButton = app.querySelector("[data-lock-button]");
  if (lockButton) lockButton.textContent = t().lockAnswer;
  const skipButton = app.querySelector("[data-skip-question]");
  if (skipButton) skipButton.textContent = t().skipQuestion;
  const nextButton = app.querySelector("[data-next-button]");
  if (nextButton) nextButton.textContent = t().nextRound;
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

  app.querySelector("[data-skip-question]")?.addEventListener("click", () => {
    request("/api/skip-question", {
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
      renderEntry(t().staleRoom);
    });
}

function render() {
  const room = state.room;
  if (!room || !app.querySelector("[data-room-code]")) return;

  applyStaticGameCopy();
  app.querySelector("[data-room-code]").textContent = room.code;
  app.querySelector("[data-round]").textContent = room.round || t().lobbyRound;

  renderLobby(room);
  renderRoleSettings(room);
  renderGame(room);
  renderResults(room);
}

function renderPlayers(container, players) {
  container.innerHTML = players
    .map(
      (player) => `
        <div class="player">
          <span>${escapeHtml(player.name)}${player.isHost ? ` ${t().choiceDivider} ${t().hostTag}` : ""}</span>
          <span class="score">${player.score} ${t().point}</span>
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
  startButton.textContent = room.players.length < 3 ? t().needPlayers : t().startRound;
}

function renderRoleSettings(room) {
  const panel = app.querySelector("[data-role-settings]");
  if (!panel) return;
  panel.hidden = room.phase !== "lobby";
  if (panel.hidden) return;

  const options = app.querySelector("[data-role-mode-options]");
  options.innerHTML = ["fixed", "random"]
    .map((mode) => {
      const selected = room.roleMode === mode;
      const label = mode === "fixed" ? t().fixedRoleMode : t().randomRoleMode;
      const body = mode === "fixed" ? t().fixedRoleModeBody : t().randomRoleModeBody;
      return `
        <button
          type="button"
          class="mode-option ${selected ? "selected" : ""}"
          data-role-mode="${mode}"
          ${room.me.isHost ? "" : "disabled"}
        >
          <strong>${label}</strong>
          <span>${body}</span>
        </button>
      `;
    })
    .join("");

  options.querySelectorAll("[data-role-mode]").forEach((button) => {
    button.addEventListener("click", () => changeRoleMode(button.dataset.roleMode));
  });

  const config = room.fixedRoleConfig || { conformer: 0, minority: 0, follower: 0 };
  app.querySelector("[data-fixed-config]").innerHTML = roleTypes
    .map((type) => {
      const role = t().roleText[type];
      return `
        <div class="role-count">
          ${roleAvatar(type, "tiny")}
          <span>${escapeHtml(t().roleCountLine(role.title, config[type] || 0))}</span>
          <div class="role-stepper">
            <button type="button" class="secondary" data-role-delta="-1" data-role-type="${type}" ${room.me.isHost && room.roleMode === "fixed" ? "" : "disabled"}>-</button>
            <button type="button" class="secondary" data-role-delta="1" data-role-type="${type}" ${room.me.isHost && room.roleMode === "fixed" ? "" : "disabled"}>+</button>
          </div>
        </div>
      `;
    })
    .join("");

  app.querySelectorAll("[data-role-delta]").forEach((button) => {
    button.addEventListener("click", () => shiftFixedRole(button.dataset.roleType, Number(button.dataset.roleDelta)));
  });

  const resetButton = app.querySelector("[data-reset-config]");
  resetButton.hidden = !room.me.isHost || room.roleMode !== "fixed";
  resetButton.textContent = t().resetDefault;
  resetButton.onclick = resetFixedRoles;

  app.querySelector("[data-role-mode-note]").textContent = room.me.isHost ? t().roleConfigHelp : t().hostOnlySetting;
}

function changeRoleMode(mode) {
  request("/api/role-mode", {
    room: state.roomCode,
    playerId: state.playerId,
    mode,
  })
    .then((payload) => {
      state.room = payload.room;
      render();
    })
    .catch(showError);
}

function shiftFixedRole(type, delta) {
  const room = state.room;
  const config = { ...room.fixedRoleConfig };
  const otherRoles = roleTypes.filter((role) => role !== type);
  if (delta > 0) {
    const donor = otherRoles.sort((a, b) => config[b] - config[a]).find((role) => config[role] > 0);
    if (!donor) return;
    config[type] += 1;
    config[donor] -= 1;
  } else {
    if (config[type] <= 0) return;
    const receiver = otherRoles.sort((a, b) => config[a] - config[b])[0];
    config[type] -= 1;
    config[receiver] += 1;
  }
  saveFixedRoles(config);
}

function saveFixedRoles(config) {
  request("/api/fixed-roles", {
    room: state.roomCode,
    playerId: state.playerId,
    config,
  })
    .then((payload) => {
      state.room = payload.room;
      render();
    })
    .catch(showError);
}

function resetFixedRoles() {
  request("/api/fixed-roles", {
    room: state.roomCode,
    playerId: state.playerId,
    reset: true,
  })
    .then((payload) => {
      state.room = payload.room;
      render();
    })
    .catch(showError);
}

function renderGame(room) {
  const game = app.querySelector("[data-game]");
  game.hidden = !["choosing", "discussing"].includes(room.phase);
  if (game.hidden) return;

  app.querySelector("[data-phase]").textContent = t().phaseText[room.phase];
  app.querySelector("[data-question]").textContent = localized(room.question.prompt);
  renderRole(room);
  renderOptions(room);

  const lockedCount = Object.values(room.locks).filter(Boolean).length;
  app.querySelector("[data-lock-status]").textContent = t().lockStatus(lockedCount, room.players.length);

  const lockButton = app.querySelector("[data-lock-button]");
  lockButton.hidden = false;
  lockButton.disabled = room.me.locked || room.me.choice === null;
  lockButton.textContent = room.me.locked ? t().locked : t().lockAnswer;

  const skipButton = app.querySelector("[data-skip-question]");
  skipButton.hidden = !room.me.isHost;
  skipButton.textContent = t().skipQuestion;
  skipButton.title = t().skipQuestionHint;
}

function renderRole(room) {
  const role = room.me.role;
  const roleCopy = t().roleText[role.type];
  const target = role.type === "follower" ? `<p>${t().targetPlayer}<strong>${escapeHtml(role.targetName)}</strong></p>` : "";
  app.querySelector("[data-role-card]").innerHTML = `
    <div class="role-heading">
      ${roleAvatar(role.type)}
      <div>
        <div class="role-title">${roleCopy.title}</div>
        <p>${roleCopy.short}</p>
      </div>
    </div>
    <p>${roleCopy.body}</p>
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
    button.textContent = `${String.fromCharCode(65 + index)}. ${localized(option)}`;
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
      renderEntry(t().leftRoom);
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
          <span>${String.fromCharCode(65 + index)}. ${escapeHtml(localized(option))}</span>
          <strong>${count} ${t().votes}</strong>
        </div>
      `;
    })
    .join("");

  const resultList = app.querySelector("[data-results-list]");
  resultList.innerHTML = room.results.playerResults
    .map((result) => {
      const label = result.success ? t().success : t().fail;
      const className = result.success ? "success" : "fail";
      const role = t().roleText[result.role].title;
      const option = localized(room.question.options[result.choice]);
      const detail = localized(result.detail);
      return `
        <div class="result">
          <div>
            <strong>${escapeHtml(result.playerName)}</strong>
            <div class="muted result-detail">
              ${roleAvatar(result.role, "tiny")}
              <span>${role} ${t().choiceDivider} ${escapeHtml(option)} ${t().choiceDivider} ${escapeHtml(detail)}</span>
            </div>
          </div>
          <span class="${className}">${label}</span>
        </div>
      `;
    })
    .join("");

  renderFeedback(room);

  const nextButton = app.querySelector("[data-next-button]");
  nextButton.hidden = !room.me.isHost;
  nextButton.textContent = t().nextRound;
}

function renderFeedback(room) {
  let feedback = app.querySelector("[data-feedback]");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.dataset.feedback = "";
    app.querySelector("[data-results-list]").after(feedback);
  }

  const draftKey = `${room.code}:${room.round}`;
  if (state.feedbackDraft.key !== draftKey) {
    state.feedbackDraft = { key: draftKey, rating: "", comment: "" };
  }

  if (room.me.feedbackSubmitted) {
    state.feedbackDraft = { key: draftKey, rating: "", comment: "" };
    feedback.innerHTML = `<div class="feedback-card feedback-done">${t().feedbackSent}</div>`;
    return;
  }

  const existingForm = feedback.querySelector("[data-feedback-form]");
  if (existingForm && feedback.dataset.feedbackKey === draftKey) {
    return;
  }
  feedback.dataset.feedbackKey = draftKey;

  feedback.innerHTML = `
    <form class="feedback-card" data-feedback-form>
      <h3>${t().feedbackTitle}</h3>
      <p class="muted">${t().feedbackHint}</p>
      <div class="feedback-buttons">
        <button type="button" class="secondary ${state.feedbackDraft.rating === "up" ? "selected" : ""}" data-feedback-rating="up">👍 ${t().feedbackUp}</button>
        <button type="button" class="secondary ${state.feedbackDraft.rating === "down" ? "selected" : ""}" data-feedback-rating="down">👎 ${t().feedbackDown}</button>
      </div>
      <textarea data-feedback-comment maxlength="240" placeholder="${escapeHtml(t().feedbackPlaceholder)}">${escapeHtml(state.feedbackDraft.comment)}</textarea>
      <button type="submit" data-feedback-submit ${state.feedbackDraft.rating ? "" : "disabled"}>${t().sendFeedback}</button>
    </form>
  `;

  const form = feedback.querySelector("[data-feedback-form]");
  const submit = feedback.querySelector("[data-feedback-submit]");
  const commentInput = feedback.querySelector("[data-feedback-comment]");

  feedback.querySelectorAll("[data-feedback-rating]").forEach((button) => {
    button.addEventListener("click", () => {
      state.feedbackDraft.rating = button.dataset.feedbackRating;
      feedback.querySelectorAll("[data-feedback-rating]").forEach((candidate) => candidate.classList.remove("selected"));
      button.classList.add("selected");
      submit.disabled = false;
    });
  });

  commentInput.addEventListener("input", () => {
    state.feedbackDraft.comment = commentInput.value;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendFeedback(state.feedbackDraft.rating, state.feedbackDraft.comment);
  });
}

function sendFeedback(rating, comment) {
  request("/api/feedback", {
    room: state.roomCode,
    playerId: state.playerId,
    rating,
    comment,
  })
    .then((payload) => {
      state.room = payload.room;
      render();
    })
    .catch(showError);
}

function localized(value) {
  if (value && typeof value === "object") {
    return value[state.language] || value.zh || value.en || "";
  }
  return value || "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

setLanguage(state.language);

if (state.roomCode && state.playerId) {
  mountGame();
} else {
  renderEntry();
}
