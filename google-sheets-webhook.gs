const SECRET = "change-this-secret";

function doPost(e) {
  const body = JSON.parse(e.postData.contents || "{}");
  if (SECRET && body.secret !== SECRET) {
    return json({ ok: false, error: "unauthorized" });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const type = body.type || "unknown";
  const payload = body.payload || {};
  const sentAt = body.sentAt || new Date().toISOString();

  if (type === "room_created") {
    appendRow(ss, "rooms", ["sentAt", "event", "roomCode", "hostName", "roleMode", "createdAt"], [
      sentAt,
      type,
      payload.roomCode,
      payload.hostName,
      payload.roleMode,
      payload.createdAt,
    ]);
  }

  if (type === "room_closed") {
    appendRow(ss, "rooms", ["sentAt", "event", "roomCode", "roundsStarted", "roundsPlayed", "maxPlayers", "closedAt"], [
      sentAt,
      type,
      payload.roomCode,
      payload.roundsStarted,
      payload.roundsPlayed,
      payload.maxPlayers,
      payload.closedAt,
    ]);
  }

  if (type === "round_completed") {
    appendRow(
      ss,
      "rounds",
      [
        "sentAt",
        "roomCode",
        "round",
        "questionZh",
        "questionEn",
        "playerCount",
        "roleMode",
        "durationSeconds",
        "finishedAt",
        "countsJson",
        "resultsJson",
      ],
      [
        sentAt,
        payload.roomCode,
        payload.round,
        payload.question && payload.question.zh,
        payload.question && payload.question.en,
        payload.playerCount,
        payload.roleMode,
        payload.durationSeconds,
        payload.finishedAt,
        JSON.stringify(payload.counts || {}),
        JSON.stringify(payload.results || []),
      ],
    );
  }

  if (type === "feedback_submitted") {
    appendRow(
      ss,
      "feedback",
      ["sentAt", "roomCode", "round", "questionZh", "questionEn", "playerCount", "rating", "comment", "createdAt"],
      [
        sentAt,
        payload.roomCode,
        payload.round,
        payload.question && payload.question.zh,
        payload.question && payload.question.en,
        payload.playerCount,
        payload.rating,
        payload.comment,
        payload.createdAt,
      ],
    );
  }

  return json({ ok: true });
}

function appendRow(ss, sheetName, headers, row) {
  const sheet = getOrCreateSheet(ss, sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
  sheet.appendRow(row);
}

function getOrCreateSheet(ss, sheetName) {
  return ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
