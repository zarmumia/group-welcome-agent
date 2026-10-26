// Renders a personalized welcome image.
// Usage:
//   node render.js                                   -> generic image  (assets/welcome.png)
//   node render.js --names "יואב" --greeting "ברוך הבא" --out ../assets/out.png
//   node render.js --names "דנה,יואב"               -> greeting defaults to "ברוכים הבאים"
const {chromium} = require('playwright');
const path = require('path');

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf('--' + k); return i > -1 ? args[i + 1] : d; };
const names = (get('names', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const greeting = get('greeting', 'ברוכים הבאים');
const out = path.resolve(__dirname, get('out', '../assets/welcome.png'));
const group = get('group', 'קלוד בלי קוד לעסקים צומחים');
const link = get('link', 'facebook.com/groups/claudeblikod');

const esc = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({viewport: {width: 1080, height: 1080}});
  await p.goto('file://' + __dirname + '/card.html');
  await p.evaluate(({names, greeting, group, link}) => {
    const h = document.getElementById('h');
    document.getElementById('k').innerText = group;
    if (names.length) {
      const list = names.length > 1 ? names.slice(0, -1).join(', ') + ' ו' + names[names.length - 1] : names[0];
      h.innerHTML = greeting + ',<br><em>' + list + '!</em>';
      const len = list.length;
      h.style.fontSize = len > 28 ? '60px' : len > 18 ? '70px' : '84px';
    } else {
      h.innerHTML = greeting + '<br><em>לקהילה!</em>';
    }
    const s = document.createElement('div');
    s.style.cssText = 'position:relative;color:#E6F2F1;font-size:44px;margin-top:34px;line-height:1.35';
    s.innerHTML = 'כאן שואלים, משתפים ולומדים<br>לעבוד עם AI, בלי לכתוב שורת קוד.';
    h.after(s);
    const t = document.createElement('div');
    t.style.cssText = 'position:relative;display:inline-block;margin-top:40px;background:#D9822B;color:#fff;font-size:38px;font-weight:700;padding:8px 26px;border-radius:12px;align-self:flex-start';
    t.innerText = 'ופתאום הכול עובד.';
    s.after(t);
    document.querySelector('.f b').innerText = link;
  }, {names: names.map(esc), greeting, group, link});
  await p.waitForTimeout(400);
  await p.screenshot({path: out});
  await b.close();
  console.log(out);
})();
