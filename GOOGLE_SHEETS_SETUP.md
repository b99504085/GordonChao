# Trial Balloon Google Sheet Feedback Setup

## 1. Create the Sheet

Create a new Google Sheet. Name it something like `Trial Balloon Playtest Data`.

## 2. Add Apps Script

In the Sheet, open:

`Extensions` -> `Apps Script`

Paste the contents of `google-sheets-webhook.gs`.

Change this line to any private phrase:

```js
const SECRET = "change-this-secret";
```

Example:

```js
const SECRET = "trial-balloon-2026-private";
```

## 3. Deploy the Web App

In Apps Script:

1. Click `Deploy`
2. Click `New deployment`
3. Choose type: `Web app`
4. Execute as: `Me`
5. Who has access: `Anyone`
6. Click `Deploy`
7. Copy the Web app URL

The URL should end with `/exec`.

## 4. Add Render Environment Variables

In Render, open the Trial Balloon service:

`Environment` -> add:

```text
GOOGLE_SHEETS_WEBHOOK_URL = your Apps Script /exec URL
GOOGLE_SHEETS_WEBHOOK_SECRET = the same SECRET phrase from Apps Script
```

Save changes. Render will redeploy.

## 5. What Gets Saved

The Apps Script creates these tabs automatically:

- `rooms`: room created and room closed events
- `rounds`: completed rounds, player count, question, duration, vote counts, role results
- `feedback`: thumbs up/down and anonymous comments

Render can restart without losing these rows because they are saved in Google Sheet.
