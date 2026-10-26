# Group Welcome Agent 👋

**An AI agent that prepares a personal, branded welcome post for new members of a Facebook group, and leaves the final click to a human.**

סוכן AI שמכין פוסט "ברוכים הבאים" אישי למצטרפים חדשים לקבוצת פייסבוק, ומשאיר את הלחיצה האחרונה לאדם.

Built by [Zarmumia](https://zarmumia.co.il) for the community [קלוד בלי קוד לעסקים צומחים](https://www.facebook.com/groups/claudeblikod).

---

## Why

Facebook's built-in weekly welcome post works, but it's generic: fixed wording, no brand, no image.
And since Meta retired the Groups API, tools like Zapier or Make can no longer post to groups.

So instead of an API, this agent works the way a community manager would: in the browser.

## How it works

```
Every week, or every day (scheduled Claude task)
        │
        ▼
Opens the group's members page in Chrome (Claude in Chrome)
        │
        ▼
Finds who joined since the last run ── none? ──► "no new members" notification
        │
        ▼
Reads public business info, writes a personal line per member,
        │   and renders an image with their names
        │
        ▼
Stops before "Post" and sends a notification
        │
        ▼
The admin reviews and clicks "Post" (≈10 seconds)
```

## What it does that Facebook doesn't

| | Facebook's weekly welcome | This agent |
|---|---|---|
| Greeting | Fixed English template | Hebrew, with correct gender (ברוך הבא / ברוכה הבאה) |
| Image | None | A fixed branded welcome card (optionally with the new members' first names) |
| Personal touch | Name tags only | A line per member, based on their public business info |
| Next step | — | Points each member to an existing post that fits their field |
| Icebreaker | — | A rotating question each time, so welcomes never feel copy-pasted |
| Frequency | Weekly | Weekly for small groups, daily for large ones |

<p align="center"><img src="assets/welcome.png" width="360" alt="welcome image"></p>

## Human in the loop, on purpose

The agent never publishes by itself. Posting in a community is speaking in someone's name,
so the last click stays human. The agent does the boring part; the admin keeps the voice.

## What's in the repo

| Path | What it is |
|---|---|
| `prompt.md` | The instruction the scheduled task runs each week |
| `assets/welcome.png` | The fixed welcome image (1080×1080) |
| `template/` | HTML template + Playwright script to re-render the image in your own brand |

## Make it yours

1. Edit `template/card.html` (colors, logo, text) and run:
   ```bash
   npm i playwright && node template/render.js
   ```
2. Put your group URL and texts in `prompt.md`.
3. Create a weekly scheduled task in Claude with the prompt, on a computer with Claude in Chrome.

## Requirements

- Claude with scheduled tasks and Claude in Chrome
- The computer on, with Chrome open, at run time
- Admin access to the group

---

Font: [Assistant](https://fonts.google.com/specimen/Assistant) (SIL Open Font License).
Code: MIT.

**Zarmumia · ופתאום הכול עובד.**
