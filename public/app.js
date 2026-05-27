const roleTypes = ["conformer", "minority", "follower"];
const roleArtImages = {
  conformer: "/assets/ui/role-conformer.png",
  minority: "/assets/ui/role-minority.png",
  follower: "/assets/ui/role-follower.png",
};

const copy = {
  zh: {
    htmlLang: "zh-Hant",
    title: "試探氣球",
    eyebrow: "派對遊戲",
    switchLanguage: "切換英文",
    intro:
      "看似普通的聊天，其實每個人都有秘密任務。你的一句話可能是暗示、誤導，也可能是關鍵線索。分享想法、觀察別人、猜測身份，直到揭曉那一刻，才發現這場聊天比想像中還不單純。",
    rulesTitle: "怎麼玩",
    ruleSteps: [
      { title: "加入同一房間", body: "主持人開始回合" },
      { title: "大家看到同一題", body: "各自有秘密任務" },
      { title: "選擇答案並討論", body: "說服、試探、亂聊都可以" },
      { title: "揭曉身份與投票", body: "完成任務可得 1 分" },
    ],
    rolesTitle: "三種秘密動機",
    nameLabel: "你的名字",
    namePlaceholder: "例如：小明",
    roomInputLabel: "房號",
    roomPlaceholder: "可自訂房號，例如 1234",
    createRoom: "建立房間",
    joinRoom: "加入房間",
    roomLabel: "房號",
    roundLabel: "回合",
    leaveRoom: "離開房間",
    lobbyTitle: "等朋友加入",
    lobbyBody: "3 到 6 人就能開始。把房號分享出去，人到齊後由主持人開始回合。",
    roleSetupTitle: "角色配置",
    winningScoreTitle: "勝利分數",
    winningScoreHelp: "先達到幾分就獲勝",
    customWinningScore: "自訂",
    winningScoreLabel: (score) => `${score} 分`,
    chatTitle: "大廳聊天",
    chatPlaceholder: "輸入訊息給房間裡的人",
    sendChat: "送出",
    noChatYet: "還沒有訊息，先打個招呼吧。",
    scoreBoardTitle: "目前分數",
    winnerTitle: "勝利者",
    rankingTitle: "總排名",
    winnerLine: (names, score) => `${names} 率先達到 ${score} 分，贏得本局！`,
    fixedRoleMode: "固定角色配置",
    randomRoleMode: "隨機角色配置",
    fixedRoleModeBody: "每局角色數量固定，主持人可自行調整角色配置。",
    randomRoleModeBody: "每回合的角色配置為隨機分布，因此不一定每個角色都會出現，也可能會有某些角色在該回合中沒有登場。",
    hostOnlySetting: "只有主持人可以切換與調整配置。",
    resetDefault: "回到預設設定",
    roleConfigHelp: "固定配置的總數會等於目前玩家數。",
    roleCountLine: (role, count) => `${role}：${count} 個`,
    startRound: "開始回合",
    needPlayers: "至少需要 3 人",
    lockAnswer: "鎖定答案",
    skipQuestion: "換一題",
    skipQuestionHint: "主持人可以換題，角色不會重抽。",
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
    hostTag: "主持人",
    point: "分",
    staleRoom: "這個房間已經不存在，所以幫你清掉舊紀錄了。",
    leftRoom: "你已離開房間。",
    success: "成功",
    fail: "失敗",
    votes: "票",
    lobbyRound: "大廳",
    defaultHostName: "主持人",
    defaultPlayerName: "玩家",
    choiceDivider: "・",
    choiceLabel: "選擇",
    resultTargetedLine: (name, count) => `${name} 以為自己很低調，但其實被 ${count} 個人盯上。`,
    roleText: {
      conformer: {
        title: "合群者",
        short: "把大家拉到同一邊",
        goal: "你的目標是讓最多人選擇相同答案！",
        body: "你的答案要成為唯一最多票。平手不算成功，所以你要把人拉過來，也要防止別的選項追上。",
        successStory: (name, count) => `${name} 是合群者，成功把 ${count} 個人拉到同一邊。`,
        failStory: (name, count) => `${name} 是合群者，但這次只拉到 ${count} 個人，沒有形成唯一最多票。`,
      },
      minority: {
        title: "少數派",
        short: "悄悄成為唯一例外",
        goal: "你的目標是成為唯一選擇不同答案的人！",
        body: "你的答案必須只有你一個人選。你可以輕輕把大家推去別的地方，但不要讓自己看起來太想落單。",
        successStory: (name) => `${name} 是少數派，成為全場唯一例外。`,
        failStory: (name, count) => `${name} 是少數派，但有 ${count} 個人選了同一邊，沒能成功落單。`,
      },
      follower: {
        title: "跟屁蟲",
        short: "盯緊指定玩家",
        goal: "你的目標是猜中指定玩家選擇的答案！",
        body: "你要和指定玩家選一樣。你可以觀察他、影響他，或假裝你只是剛好同意。",
        successStory: (name, target) => `${name} 是跟屁蟲，成功猜中 ${target} 的選擇。`,
        failStory: (name, target) => `${name} 是跟屁蟲，但這次沒有跟上 ${target} 的答案。`,
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
    title: "Trial Balloon",
    eyebrow: "Party game",
    switchLanguage: "Switch language",
    intro:
      "A game that looks like an ordinary conversation, but everyone secretly has their own mission. Some players want to blend in with the majority, some want to stand out from the crowd, and some are trying to predict what you’ll choose. Through all kinds of discussion topics, you’ll share honest opinions, chat nonsense, subtly steer the conversation, and make wild guesses together... And when the roles are finally revealed, you’ll realize that the conversation you just had was far less innocent than it seemed.",
    rulesTitle: "How to Play",
    ruleSteps: [
      { title: "Join the same room", body: "The host starts the round" },
      { title: "Everyone sees the same question", body: "Each player has a secret motive" },
      { title: "Pick an answer and discuss", body: "Persuade, test, or chat it up" },
      { title: "Reveal roles and votes", body: "Complete your motive to score 1 point" },
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
    winningScoreTitle: "Winning Score",
    winningScoreHelp: "First to this score wins",
    customWinningScore: "Custom",
    winningScoreLabel: (score) => `${score} pts`,
    chatTitle: "Lobby Chat",
    chatPlaceholder: "Message everyone in the room",
    sendChat: "Send",
    noChatYet: "No messages yet. Say hello.",
    scoreBoardTitle: "Current Scores",
    winnerTitle: "Winner",
    rankingTitle: "Final Ranking",
    winnerLine: (names, score) => `${names} reached ${score} points first and won the game!`,
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
    defaultHostName: "Host",
    defaultPlayerName: "Player",
    choiceDivider: " - ",
    choiceLabel: "Picked",
    resultTargetedLine: (name, count) => `${name} tried to stay low-key, but ${count} player${count === 1 ? "" : "s"} were watching them.`,
    roleText: {
      conformer: {
        title: "Crowd-Puller",
        short: "Pull the room together",
        goal: "Your goal is to get the most players to choose the same answer!",
        body: "Your answer must be the single most popular choice. Ties do not count, so pull people in and stop other options from catching up.",
        successStory: (name, count) => `${name} was the Crowd-Puller and successfully pulled ${count} players to the same side.`,
        failStory: (name, count) => `${name} was the Crowd-Puller, but only gathered ${count} players and missed the clear majority.`,
      },
      minority: {
        title: "Outlier",
        short: "Be the only exception",
        goal: "Your goal is to be the only one who picks a different answer!",
        body: "Your answer must be chosen by you alone. Nudge people away gently, but do not look too eager to stand apart.",
        successStory: (name) => `${name} was the Outlier and became the only exception in the room.`,
        failStory: (name, count) => `${name} was the Outlier, but ${count} players chose the same side.`,
      },
      follower: {
        title: "Shadow",
        short: "Track your target player",
        goal: "Your goal is to guess what your target player will choose!",
        body: "You must match your assigned player. Read them, influence them, or make it look like you simply agree.",
        successStory: (name, target) => `${name} was the Shadow and correctly guessed ${target}'s choice.`,
        failStory: (name, target) => `${name} was the Shadow, but lost track of ${target}'s answer.`,
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

function roleArt(type) {
  const role = t().roleText[type];
  return `<img class="role-art" src="${roleArtImages[type]}" alt="${escapeHtml(role.title)}" loading="lazy" />`;
}

function roleInfoCard(type, context = "guide") {
  const role = t().roleText[type];
  return `
    <article class="role-info-card role-info-card-${type} role-info-card-${context}">
      <h4>${role.title}</h4>
      <p class="role-short">${role.short}</p>
      ${roleArt(type)}
      <p class="role-goal">${role.goal}</p>
    </article>
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
        <h1>${t().title}</h1>
      </div>
    </div>
  `;
}

function rulesMarkup() {
  return `
    <section class="rules-card" aria-labelledby="rulesTitle">
      <h2 id="rulesTitle">${t().rulesTitle}</h2>
      <ol class="rule-grid">
        ${t()
          .ruleSteps.map(
            (step) => `
              <li>
                <strong>${escapeHtml(step.title)}</strong>
                <span>${escapeHtml(step.body)}</span>
              </li>
            `
          )
          .join("")}
      </ol>
      <h3>${t().rolesTitle}</h3>
      <div class="role-guide">
        ${roleTypes.map((type) => roleInfoCard(type)).join("")}
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
      <img class="hero-mascot" src="/assets/ui/hero-mascot.png" alt="" aria-hidden="true" />
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
      name: nameInput.value.trim() || t().defaultHostName,
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
      name: nameInput.value.trim() || t().defaultPlayerName,
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

  app.querySelector("[data-chat-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = app.querySelector("[data-chat-input]");
    const message = input.value.trim();
    if (!message) return;
    request("/api/chat", {
      room: state.roomCode,
      playerId: state.playerId,
      message,
    })
      .then((payload) => {
        input.value = "";
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
  renderChat(room);
  const startButton = app.querySelector("[data-start-button]");
  startButton.hidden = !room.me.isHost;
  startButton.disabled = room.players.length < 3;
  startButton.textContent = room.players.length < 3 ? t().needPlayers : t().startRound;
}

function renderChat(room) {
  const messages = app.querySelector("[data-chat-messages]");
  const input = app.querySelector("[data-chat-input]");
  if (!messages || !input) return;
  input.placeholder = t().chatPlaceholder;
  const chat = room.chatMessages || [];
  messages.innerHTML = chat.length
    ? chat
        .map(
          (message) => `
            <div class="chat-message ${message.playerId === room.me.id ? "mine" : ""}">
              <strong>${escapeHtml(message.playerName)}</strong>
              <span>${escapeHtml(message.text)}</span>
            </div>
          `,
        )
        .join("")
    : `<p class="muted">${t().noChatYet}</p>`;
  messages.scrollTop = messages.scrollHeight;
}

function renderRoleSettings(room) {
  const panel = app.querySelector("[data-role-settings]");
  if (!panel) return;
  panel.hidden = room.phase !== "lobby";
  if (panel.hidden) return;

  const options = app.querySelector("[data-role-mode-options]");
  renderWinningScoreSettings(room);
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

function renderWinningScoreSettings(room) {
  const panel = app.querySelector("[data-winning-score-settings]");
  if (!panel) return;
  if (document.activeElement?.matches("[data-winning-score-custom]")) return;
  const winningScore = room.winningScore || 4;
  panel.innerHTML = `
    <div class="setting-title">
      <strong>${t().winningScoreTitle}</strong>
      <span>${t().winningScoreHelp}</span>
    </div>
    <div class="score-options">
      ${[4, 8]
        .map(
          (score) => `
            <button type="button" class="secondary ${winningScore === score ? "selected" : ""}" data-winning-score="${score}" ${room.me.isHost ? "" : "disabled"}>
              ${t().winningScoreLabel(score)}
            </button>
          `,
        )
        .join("")}
      <label class="custom-score">
        <span>${t().customWinningScore}</span>
        <input type="number" min="1" max="99" value="${winningScore}" data-winning-score-custom ${room.me.isHost ? "" : "disabled"} />
      </label>
    </div>
  `;
  panel.querySelectorAll("[data-winning-score]").forEach((button) => {
    button.addEventListener("click", () => changeWinningScore(Number(button.dataset.winningScore)));
  });
  const customInput = panel.querySelector("[data-winning-score-custom]");
  customInput?.addEventListener("change", () => changeWinningScore(Number(customInput.value)));
}

function changeWinningScore(winningScore) {
  request("/api/winning-score", {
    room: state.roomCode,
    playerId: state.playerId,
    winningScore,
  })
    .then((payload) => {
      state.room = payload.room;
      render();
    })
    .catch(showError);
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
    ${roleInfoCard(role.type, "active")}
    <p class="sr-only">${roleCopy.body}</p>
    ${target ? `<div class="role-target">${target}</div>` : ""}
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

function resultStory(result, room) {
  const role = t().roleText[result.role];
  const choiceCount = room.results.counts[result.choice] || 0;
  const target = room.results.playerResults.find((candidate) => candidate.playerId === result.targetId);
  const targetName = target?.playerName || (state.language === "zh" ? "指定玩家" : "the target player");
  if (result.role === "conformer") {
    return result.success
      ? role.successStory(result.playerName, choiceCount)
      : role.failStory(result.playerName, choiceCount);
  }
  if (result.role === "minority") {
    return result.success
      ? role.successStory(result.playerName)
      : role.failStory(result.playerName, choiceCount);
  }
  return result.success
    ? role.successStory(result.playerName, targetName)
    : role.failStory(result.playerName, targetName);
}

function targetedCountFor(result, room) {
  return room.results.playerResults.filter((candidate) => candidate.role === "follower" && candidate.targetId === result.playerId).length;
}

function renderResults(room) {
  const results = app.querySelector("[data-results]");
  results.hidden = room.phase !== "results";
  if (results.hidden) return;
  renderWinnerBoard(room);

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
      const watchedBy = targetedCountFor(result, room);
      const watchedLine = watchedBy > 0 ? `<p class="result-watch">${escapeHtml(t().resultTargetedLine(result.playerName, watchedBy))}</p>` : "";
      return `
        <div class="result result-${result.role}">
          <div class="result-main">
            ${roleArt(result.role)}
            <div>
              <div class="result-kicker">${escapeHtml(role)} ${t().choiceDivider} ${escapeHtml(t().choiceLabel)} ${escapeHtml(option)}</div>
              <strong>${escapeHtml(resultStory(result, room))}</strong>
              ${watchedLine}
            </div>
          </div>
          <span class="${className}">${label}</span>
        </div>
      `;
    })
    .join("");

  renderFeedback(room);
  renderScoreBoard(room);

  const nextButton = app.querySelector("[data-next-button]");
  nextButton.hidden = !room.me.isHost;
  nextButton.textContent = t().nextRound;
}

function renderWinnerBoard(room) {
  const board = app.querySelector("[data-winner-board]");
  const winners = room.results?.winners || [];
  const rankings = room.results?.rankings || [];
  if (!board) return;
  board.hidden = !winners.length;
  if (!winners.length) {
    board.innerHTML = "";
    return;
  }
  const names = winners.map((winner) => winner.playerName).join(", ");
  board.innerHTML = `
    <h3>${t().winnerTitle}</h3>
    <p>${escapeHtml(t().winnerLine(names, room.winningScore || 4))}</p>
    <h4>${t().rankingTitle}</h4>
    <ol class="ranking-list">
      ${rankings
        .map(
          (player) => `
            <li>
              <span>${player.rank}. ${escapeHtml(player.playerName)}</span>
              <strong>${player.score} ${t().point}</strong>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
}

function renderScoreBoard(room) {
  const board = app.querySelector("[data-score-board]");
  if (!board) return;
  const rankings = room.results?.rankings || [...room.players].sort((a, b) => b.score - a.score);
  board.innerHTML = `
    <h3>${t().scoreBoardTitle}</h3>
    <div class="score-list">
      ${rankings
        .map(
          (player, index) => `
            <div class="score-row">
              <span>${index + 1}. ${escapeHtml(player.playerName || player.name)}</span>
              <strong>${player.score} ${t().point}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderFeedback(room) {
  let feedback = app.querySelector("[data-feedback]");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.dataset.feedback = "";
    (app.querySelector("[data-score-board]") || app.querySelector("[data-results-list]")).after(feedback);
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
