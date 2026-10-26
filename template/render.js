// Renders a welcome card in Hebrew (RTL), Arabic (RTL) or English (LTR).
// Usage:
//   node render.js                                    -> Hebrew card   (assets/welcome.png)
//   node render.js --lang en  -> English card (assets/welcome-en.png)
//   node render.js --lang ar  -> Arabic card  (assets/welcome-ar.png)
//   node render.js --names "יואב" --greeting "ברוך הבא" --out out.png
//   node render.js --lang en --names "Dana,Yoav" --out out.png
const {chromium} = require('playwright');
const path = require('path');

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf('--' + k); return i > -1 ? args[i + 1] : d; };
const lang = get('lang', 'he');

const T = {
  he: {
    greeting: 'ברוכים הבאים', toCommunity: 'לקהילה!', and: ' ו',
    group: 'קלוד בלי קוד לעסקים צומחים',
    sub: 'כאן שואלים, משתפים ולומדים<br>לעבוד עם AI, בלי לכתוב שורת קוד.',
    slogan: 'ופתאום הכול עובד.', brand: 'זרמומיה',
  },
  en: {
    greeting: 'Welcome', toCommunity: 'to the community!', and: ' & ',
    group: 'Claude Without Code · for growing businesses',
    sub: 'Ask, share and learn to work with AI<br>without writing a single line of code.',
    slogan: 'And suddenly, everything works.', brand: 'Zarmumia',
  },
  ar: {
    greeting: 'أهلاً وسهلاً بكم', toCommunity: 'في مجتمعنا!', and: ' و',
    group: 'كلود بدون برمجة · للأعمال النامية',
    sub: 'هنا نسأل ونشارك ونتعلّم العمل<br>مع الذكاء الاصطناعي، بدون برمجة.',
    slogan: 'وفجأة، كل شيء يعمل.', brand: 'Zarmumia',
  },
}[lang];

const names = (get('names', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const greeting = get('greeting', T.greeting);
const out = path.resolve(__dirname, get('out', lang === 'he' ? '../assets/welcome.png' : `../assets/welcome-${lang}.png`));
const group = get('group', T.group);
const link = get('link', 'facebook.com/groups/claudeblikod');

const esc = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({viewport: {width: 1080, height: 1080}});
  await p.goto('file://' + __dirname + '/card.html');
  await p.evaluate(({names, greeting, group, link, T, lang}) => {
    if (lang === 'ar') {
      const st = document.createElement('style');
      st.textContent = [400, 700, 800].map(w => `@font-face{font-family:Cairo;font-weight:${w};src:url(cairo-${w}.woff2) format('woff2')}`).join('') +
        'body{font-family:Cairo,A,sans-serif}';
      document.head.appendChild(st);
    }
    if (lang === 'en') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      const g = document.querySelector('.g');
      if (g) { g.style.left = 'auto'; g.style.right = '90px'; }
    }
    const h = document.getElementById('h');
    document.getElementById('k').innerText = group;
    if (names.length) {
      const list = names.length > 1 ? names.slice(0, -1).join(', ') + T.and + names[names.length - 1] : names[0];
      h.innerHTML = greeting + ',<br><em>' + list + '!</em>';
      const len = list.length;
      h.style.fontSize = len > 28 ? '60px' : len > 18 ? '70px' : '84px';
    } else {
      h.innerHTML = greeting + '<br><em>' + T.toCommunity + '</em>';
    }
    const s = document.createElement('div');
    s.style.cssText = 'position:relative;color:#E6F2F1;font-size:44px;margin-top:34px;line-height:1.35';
    s.innerHTML = T.sub;
    h.after(s);
    const t = document.createElement('div');
    t.style.cssText = 'position:relative;display:inline-block;margin-top:40px;background:#D9822B;color:#fff;font-size:38px;font-weight:700;padding:8px 26px;border-radius:12px;align-self:flex-start';
    t.innerText = T.slogan;
    s.after(t);
    document.querySelector('.f b').innerText = link;
    const brand = document.querySelector('.f span');
    if (brand) brand.innerText = T.brand;
  }, {names: names.map(esc), greeting, group, link, T, lang});
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
  await p.screenshot({path: out});
  await b.close();
  console.log(out);
})();
