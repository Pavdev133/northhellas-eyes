// Builds the search-engine pages from cams.js:
//   kameres/<id>/index.html  one page per camera (what Google indexes for "κάμερα <place>")
//   kameres/index.html       list of all cameras by region
//   sitemap.xml
//   the camera link list in the index.html footer (between the SEO:CAMS markers)
// Run after editing cams.js:  node scripts/build-seo.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SITE = 'https://northellaseyes.gr';
const BRAND = 'Northellas.eyes';
const today = new Date().toISOString().slice(0, 10);

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'cams.js'), 'utf8'), ctx);
const CAMS = ctx.window.NHE_CAMS;

const REGIONS = {
  west: { el: 'Δυτική Μακεδονία', en: 'Western Macedonia' },
  central: { el: 'Κεντρική Μακεδονία', en: 'Central Macedonia' },
  east: { el: 'Ανατολική Μακεδονία & Θράκη', en: 'Eastern Macedonia & Thrace' }
};

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const windyImg = (id) => `https://images-webcams.windy.com/${String(id).slice(-2)}/${id}/current/full/${id}.jpg`;
const stillOf = (c) => c.snap || (c.windy ? windyImg(c.windy) : '');
const clip = (s, n) => {
  s = String(s).replace(/\s+/g, ' ').trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
};
const km = (a, b) => {
  const r = Math.PI / 180;
  const x = (b[1] - a[1]) * r * Math.cos(((a[0] + b[0]) / 2) * r);
  const y = (b[0] - a[0]) * r;
  return Math.sqrt(x * x + y * y) * 6371;
};
const fmt = (n) => Number(n).toLocaleString('el-GR');
const url = (c) => `/kameres/${c.id}/`;
const hasVideo = (c) => !!c.hls;

const head = ({ title, desc, canonical, image, jsonld }) => `<!doctype html>
<html lang="el">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#070d1a">
  <link rel="canonical" href="${canonical}">
  <meta property="og:site_name" content="${BRAND}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="el_GR">
  <meta property="og:image" content="${SITE}/img/share.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="/img/favicon-48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/img/favicon-96.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/img/icon-192.png">
  <link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
${image ? `  <link rel="preload" as="image" href="${esc(image)}">\n` : ''}  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Commissioner:wght@400;500;600;700&family=Noto+Serif+Display:ital,wght@0,500;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/kameres/cam.css?v=20261009c">
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>
  <header class="top"><div class="wrap">
    <a class="brand" href="/"><img src="/img/logo-128.webp" width="36" height="36" alt=""><span>Northellas<b>.eyes</b></span></a>
    <nav><a href="/#cams">Κάμερες</a><a href="/#map">Χάρτης</a><a href="/#gallery">Συλλογή</a></nav>
  </div></header>`;

const foot = `
  <footer class="foot"><div class="wrap">
    <p><a href="/">${BRAND}</a> · Live κάμερες Ελλάδα: δωρεάν ενημέρωση για τον καιρό στη Βόρεια Ελλάδα.</p>
    <p><a href="/kameres/">Όλες οι κάμερες</a> · Σε συνεργασία με <a href="https://www.meteolive.gr/" rel="noopener">meteolive.gr</a></p>
    <p class="small">Δεν επιτρέπεται η αποθήκευση ή/και αναπαραγωγή εικόνας από τις κάμερες του δικτύου μας σε άλλα μέσα χωρίς τη σύμφωνη γνώμη μας.</p>
    <p class="small">design by <a href="https://pavdev.gr/" rel="noopener">pavdev</a></p>
  </div></footer>`;

const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item }))
});

// ── One page per camera ─────────────────────────────────────────
function camPage(c) {
  const name = c.name.el;
  const region = REGIONS[c.region];
  const still = stillOf(c);
  const canonical = SITE + url(c);
  const title = `Κάμερα ${name} live · Καιρός τώρα | ${c.name.en} webcam`;
  const desc = clip(`Κάμερα καιρού ${name} (${c.area.el}) ζωντανά: δες τον καιρό τώρα. ${c.view.el}`, 158);
  const facts = [
    `<li><span>Περιοχή</span>${esc(c.area.el)}</li>`,
    `<li><span>Περιφέρεια</span>${esc(region.el)}</li>`,
    c.alt ? `<li><span>Υψόμετρο</span>${fmt(c.alt)} μ.</li>` : '',
    c.dir != null ? `<li><span>Κοιτάζει προς</span>${c.dir}°</li>` : '',
    `<li><span>Εικόνα</span>${hasVideo(c) ? 'Ζωντανό βίντεο' : 'Φωτογραφία που ανανεώνεται'}</li>`
  ].join('');
  const near = c.ll
    ? CAMS.filter((o) => o.id !== c.id && o.ll).map((o) => [o, km(c.ll, o.ll)]).sort((a, b) => a[1] - b[1]).slice(0, 4)
    : [];
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': canonical, url: canonical, name: title, description: desc, inLanguage: 'el',
        isPartOf: { '@id': SITE + '/#website' },
        about: {
          '@type': 'Place', name, description: c.view.el,
          address: { '@type': 'PostalAddress', addressLocality: c.area.el, addressRegion: region.el, addressCountry: 'GR' },
          ...(c.ll ? { geo: { '@type': 'GeoCoordinates', latitude: c.ll[0], longitude: c.ll[1], ...(c.alt ? { elevation: c.alt } : {}) } } : {})
        }
      },
      breadcrumb([[BRAND, SITE + '/'], ['Κάμερες', SITE + '/kameres/'], [name, canonical]])
    ]
  };
  const host = c.host && c.host.name && c.host.name !== 'meteolive.gr'
    ? `<p class="host">Η κάμερα φιλοξενείται από ${c.host.url ? `<a href="${esc(c.host.url)}" rel="noopener">${esc(c.host.name)}</a>` : esc(c.host.name)}.</p>`
    : '';
  return `${head({ title, desc, canonical, image: still, jsonld })}
  <main class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Αρχική</a> › <a href="/kameres/">Κάμερες</a> › <span>${esc(name)}</span></nav>
    <h1>${esc(name)} <em>ζωντανή κάμερα</em></h1>
    <p class="lead">${esc(c.area.el)} · ${esc(region.el)}</p>
    <a class="shot" href="/#cam/${c.id}">
      ${still ? `<img id="still" src="${esc(still)}"${c.snap && c.windy ? ` data-alt="${esc(windyImg(c.windy))}"` : ''} alt="Η τελευταία εικόνα από την κάμερα ${esc(name)}" width="1280" height="720" fetchpriority="high">` : ''}
      <span class="badge"><i></i>${hasVideo(c) ? 'LIVE' : 'ΤΩΡΑ'}</span>
      <span class="play">▶ ${hasVideo(c) ? 'Δες ζωντανά' : 'Άνοιξε την κάμερα'}</span>
    </a>
    <div class="actions">
      <a class="btn btn--primary" href="/#cam/${c.id}">▶ ${hasVideo(c) ? 'Δες την κάμερα ζωντανά' : 'Άνοιξε την κάμερα'}</a>
      <a class="btn" href="/#map">Δες τον χάρτη</a>
    </div>
    <ul class="facts">${facts}</ul>
    <section><h2>Τι βλέπουμε</h2><p>${esc(c.view.el)}</p></section>
    <section><h2>Λίγα λόγια για την περιοχή</h2><p>${esc(c.about.el)}</p>${host}</section>
    <section lang="en" class="en"><h2>${esc(c.name.en)} live webcam</h2><p>${esc(c.view.en)}</p><p>${esc(c.about.en)}</p></section>
    ${near.length ? `<section><h2>Κοντινές κάμερες</h2><ul class="near">${near.map(([o, d]) => `<li><a href="${url(o)}"><b>${esc(o.name.el)}</b><small>${esc(o.area.el)} · ${Math.round(d)} χλμ.</small></a></li>`).join('')}</ul></section>` : ''}
  </main>${foot}
  <script>
    // Keep the still image fresh while the page is open, like the main site does.
    (function () {
      var img = document.getElementById('still'); if (!img) return;
      var base = img.src;
      img.onerror = function () { if (img.dataset.alt && base !== img.dataset.alt) { base = img.dataset.alt; img.src = base; } };
      setInterval(function () { if (!document.hidden) img.src = base + (base.indexOf('?') < 0 ? '?' : '&') + 't=' + Date.now(); }, 60000);
    })();
  </script>
</body>
</html>
`;
}

// Questions people search for, answered with links to the matching cameras.
const byId = Object.fromEntries(CAMS.map((c) => [c.id, c]));
const FAQ = [
  ['Πού μπορώ να δω χιόνι τώρα;', 'Οι ορεινές κάμερες δείχνουν πρώτες το χιόνι:', ['agiosathanasios', 'psarades', 'nestorio', 'kastania', 'florina', 'xinonero', 'palaiochori']],
  ['Υπάρχει κάμερα στον Όλυμπο;', 'Ναι, ο Όλυμπος φαίνεται από τέσσερις κάμερες:', ['litochoro', 'fotina', 'panteleimonas', 'platamonas']],
  ['Υπάρχει live κάμερα στη Θεσσαλονίκη;', 'Ναι, στον Θερμαϊκό και γύρω από την πόλη:', ['noth', 'derveni', 'liti']],
  ['Υπάρχουν κάμερες σε θάλασσα και παραλίες;', 'Ναι, για να δεις τον καιρό και τη θάλασσα τώρα:', ['makrigialos', 'afytos', 'ouranoupoli', 'neoiporoi', 'nokat', 'alexfaros', 'alexport']]
].map(([q, a, ids]) => [q, a, ids.filter((id) => byId[id]).map((id) => byId[id])]);
FAQ.push(['Είναι δωρεάν οι κάμερες;', `Ναι. Και οι ${CAMS.length} κάμερες καιρού του Northellas.eyes είναι δωρεάν, χωρίς εγγραφή, 24 ώρες το 24ωρο.`, []]);
const faqHtml = `<section class="faq"><h2>Συχνές ερωτήσεις</h2>${FAQ.map(([q, a, cams]) => `<details><summary>${esc(q)}</summary><p>${esc(a)} ${cams.map((c) => `<a href="${url(c)}">${esc(c.name.el)}</a>`).join(', ')}${cams.length ? '.' : ''}</p></details>`).join('')}</section>`;
const faqLd = { '@type': 'FAQPage', mainEntity: FAQ.map(([q, a, cams]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: `${a} ${cams.map((c) => c.name.el).join(', ')}`.trim() } })) };

// ── All cameras ─────────────────────────────────────────────────
function listPage() {
  const canonical = SITE + '/kameres/';
  const title = `${BRAND} | Κάμερες Ελλάδα live · ${CAMS.length} κάμερες καιρού στη Βόρεια Ελλάδα`;
  const desc = `Κάμερες Ελλάδα live: ${CAMS.length} ζωντανές κάμερες καιρού σε Μακεδονία και Θράκη: Πρέσπες, Καστοριά, Όλυμπος, Θεσσαλονίκη, Χαλκιδική, Αλεξανδρούπολη, Έβρος.`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage', '@id': canonical, url: canonical, name: title, description: desc, inLanguage: 'el',
        isPartOf: { '@id': SITE + '/#website' },
        mainEntity: { '@type': 'ItemList', itemListElement: CAMS.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name.el, url: SITE + url(c) })) }
      },
      breadcrumb([[BRAND, SITE + '/'], ['Κάμερες', canonical]]),
      faqLd
    ]
  };
  const groups = Object.keys(REGIONS).map((r) => {
    const cams = CAMS.filter((c) => c.region === r);
    return `<section><h2>${esc(REGIONS[r].el)} <small>${cams.length} κάμερες</small></h2><ul class="grid">${cams.map((c) => {
      const still = stillOf(c);
      return `<li><a href="${url(c)}">${still ? `<img src="${esc(still)}" alt="" loading="lazy" width="640" height="360">` : '<span class="ph"></span>'}<b>${esc(c.name.el)}</b><small>${esc(c.area.el)}${hasVideo(c) ? ' · <i>LIVE</i>' : ''}</small></a></li>`;
    }).join('')}</ul></section>`;
  }).join('\n    ');
  return `${head({ title, desc, canonical, jsonld })}
  <main class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Αρχική</a> › <span>Κάμερες</span></nav>
    <h1>Κάμερες Ελλάδα <em>ζωντανά, από τη Βόρεια Ελλάδα</em></h1>
    <p class="lead">${CAMS.length} live κάμερες καιρού στην Ελλάδα, από τις Πρέσπες ως τον Έβρο. Διάλεξε μια κάμερα για να δεις την εικόνα τώρα.</p>
    ${groups}
    ${faqHtml}
  </main>${foot}
</body>
</html>
`;
}

// ── Write everything ────────────────────────────────────────────
const write = (rel, s) => {
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, s);
};

for (const c of CAMS) write(`kameres/${c.id}/index.html`, camPage(c));
write('kameres/index.html', listPage());

const urls = [['/', '1.0', 'daily'], ['/kameres/', '0.9', 'daily'], ...CAMS.map((c) => [url(c), '0.8', 'daily'])];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, p, f]) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><changefreq>${f}</changefreq><priority>${p}</priority></url>`).join('\n')}
</urlset>
`);

// Footer camera links on the home page, so every camera page is one click from the start.
const indexFile = path.join(ROOT, 'index.html');
const html = fs.readFileSync(indexFile, 'utf8');
const block = Object.keys(REGIONS).map((r) => `        <div><h3 data-i18n="region.${r}">${esc(REGIONS[r].el)}</h3><ul>${CAMS.filter((c) => c.region === r).map((c) => `<li><a href="${url(c)}">${esc(c.name.el)}</a></li>`).join('')}</ul></div>`).join('\n');
const out = html.replace(/(<!-- SEO:CAMS -->)[\s\S]*?(<!-- \/SEO:CAMS -->)/, `$1\n${block}\n        $2`);
if (out === html && !html.includes('<!-- SEO:CAMS -->')) throw new Error('SEO:CAMS markers missing in index.html');
fs.writeFileSync(indexFile, out);

console.log(`Built ${CAMS.length} camera pages, kameres/index.html, sitemap.xml (${urls.length} urls)`);
