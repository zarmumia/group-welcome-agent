# Welcome agent: the prompt

This is the instruction the scheduled Claude task runs (weekly for small groups, daily for large ones).
Replace the group URL and texts with your own.

---

Welcome post for the Facebook group "קלוד בלי קוד לעסקים צומחים".
Work in Chrome on the group admin's computer (Claude in Chrome).

1. **Find new members.** Open https://www.facebook.com/groups/claudeblikod/people/ and collect members
   who joined since the last run (skip admins). Check the latest welcome post so nobody is welcomed twice.
   No new members? Do nothing in the group and notify the admin: "אין מצטרפים חדשים".

2. **Get to know each one (public info only).** Open each new member's public profile and note only
   work-related info that is publicly visible: business or profession. Never use personal details
   (family, health, location, photos, politics). If nothing is public, keep the greeting general.

3. **Hebrew grammar.** Infer gender from the first name only when it is clear
   ("ברוך הבא" / "ברוכה הבאה"). If unsure, or for several people, use "ברוכים הבאים".

4. **Render a personalized image.** Download the `template/` folder from this repo and run:
   ```bash
   npm i playwright
   node template/render.js --names "מאור" --greeting "ברוך הבא" --out welcome-today.png
   ```
   For several members: `--names "מיקי,מאור,רונית"` (greeting defaults to "ברוכים הבאים").

5. **Write the post.** Use the group's "Write welcome post" composer (it tags new members),
   or a regular post with @tags. Structure:
   - First line: the greeting.
   - One short, personal line per member, connected to their field, and when possible
     a pointer to an existing post in the group that fits them.
     Example: "מאור, ראיתי שיש לך מאפייה. שווה להציץ בפוסט על תזכורות ללקוחות קבועים 👇"
   - Last line: "אשמח שתספרו בכמה מילים: מה העסק שלכם, ומה הדבר האחד שהכי הייתם רוצים שירוץ לבד?"
   - Attach the personalized image.

6. **Stop before publishing.** Do NOT click "Post". Leave the composer open and notify the admin
   (in Hebrew): who joined, and that the post is ready for her click.

Rules: never publish on the admin's behalf, never message members, never change group settings,
never store or repeat personal (non-business) details.
