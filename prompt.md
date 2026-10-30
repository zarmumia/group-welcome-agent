# Welcome agent: the prompt

This is the instruction the scheduled Claude task runs (weekly for small groups, daily for large ones).
Replace the group URL and texts with your own.

---

Welcome post for the Facebook group "קלוד בלי קוד לעסקים צומחים".
Work in Chrome on the group admin's computer (Claude in Chrome).

1. **Find new members.** Open https://www.facebook.com/groups/claudeblikod/people/ and collect members
   who joined since the last run (skip admins). Check the latest welcome post so nobody is welcomed twice.
   No new members? Do nothing in the group and notify the admin: "אין מצטרפים חדשים".

2. **Names only. No profile visits.** Use only what the members list shows: each member's name.
   Do not open members' profiles and do not guess anything about them (job, business, gender, age).
   Members may be business owners, employees or just curious, so never assume.

3. **Language.** Write in the group's language (Hebrew, Arabic or English).
   Write each member's first name in the group's language (e.g. "Eleanor" → "אלינור").
   Address the group in the plural ("ברוכים הבאים", "أهلاً بكم").

4. **The image.** By default, attach the fixed welcome card in the group's language
   (`assets/welcome.png`, `assets/welcome-ar.png` or `assets/welcome-en.png`, no names on it).
   Optional: render a card with the new members' first names:
   ```bash
   npm i playwright
   node template/render.js --names "יואב" --greeting "ברוך הבא" --out welcome-today.png
   ```
   For several members: `--names "דנה,יואב,נועה"` (greeting defaults to "ברוכים הבאים").

5. **Write the post.** Use the group's "Write welcome post" composer (it tags new members);
   add any new member it missed with an @tag. Then this template:

   ```
   ברוכים הבאים לקלוד בלי קוד! 👋
   [tags]

   [first names in Hebrew, e.g. "אלינור, דני ויורם"], איזה כיף שבאתם! ❤️
   הקהילה הזו היא לכל מי שרוצה שה-AI יעבוד בשבילו, בעסק או בעבודה, בלי להפוך למתכנת.

   למי שרוצה להתחיל: [one existing post in the group worth reading, in one line] 👇

   מכירים מישהו שזה יעניין אותו? תזמינו, ככה זה יהיה שווה יותר לכולנו.

   ושאלה לפתיחה: [icebreaker]
   ```

   Icebreaker: look at the last welcome post and pick the **next** question in this list (wrap around):
     1. "מה הדבר האחד בעבודה שלכם שהכי הייתם רוצים שירוץ לבד?"
     2. "איזו משימה בעבודה אתם הכי שונאים לעשות?"
     3. "ניסיתם כבר AI בעבודה? מה עבד ומה ממש לא?"
     4. "כמה זמן ביום הולך לכם על וואטסאפ ומיילים?"
     5. "מה הכלי שאתם לא מוותרים עליו בעבודה?"
     6. "אם היה לכם עוזר אישי ליום אחד, מה הייתם נותנים לו לעשות?"
     7. "מה השאלה שהכי הייתם רוצים לשאול את קלוד?"
     8. "מה ההצלחה הקטנה האחרונה שלכם בעבודה?"

   Attach the image.

6. **Stop before publishing.** Do NOT click "Post". Leave the composer open and notify the admin
   (in Hebrew): who joined, and that the post is ready for her click.

Rules: never publish on the admin's behalf, never message members, never open members' profiles,
never change group settings, never store or repeat personal details.
