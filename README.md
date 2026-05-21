# Trial Balloon

Trial Balloon is a local-first party game prototype for 3 to 6 players.

Players join the same room on their phones, receive a secret motive each round, pick an answer, discuss, lock, and score.

## Run Locally

```powershell
npm start
```

Open:

```text
http://localhost:3000
```

Phones on the same Wi-Fi can use the local network URL printed by the server, such as:

```text
http://192.168.x.x:3000
```

## Questions

Question decks live in:

```text
data/questions.json
```

Use `twoOption` for 3-player games and `threeOption` for 4-6-player games.

Each question needs this shape:

```json
{
  "prompt": "Question text",
  "options": ["A", "B", "C"]
}
```

The server validates the deck when it starts. If a question has the wrong number of options, startup will fail early.

## Deploy Notes

This version keeps rooms in server memory. That is good enough for playtests, but rooms disappear when the server restarts.

For simple online playtests, deploy as a Node web service with:

```text
Build command: npm install
Start command: npm start
```

Set the service port from the platform's `PORT` environment variable. The server already supports that.
