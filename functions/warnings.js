// Active weather warnings of the Hellenic National Meteorological Service (ΕΜΥ),
// read from its official Meteoalarm feed and served from the site's own address.
// Only the regions where the network has cameras are kept. Cached 10 minutes.
const FEED = 'https://feeds.meteoalarm.org/api/v1/warnings/feeds-greece';
// Meteoalarm (EMMA) region codes used by ΕΜΥ for northern Greece.
const AREAS = { GR004: 'thraki', GR005: 'eastmak', GR006: 'westmak', GR007: 'centralmak', GR001: 'thessalia' };

const json = (body, maxAge) => new Response(JSON.stringify(body), {
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': `public, max-age=${maxAge}`,
    'access-control-allow-origin': '*'
  }
});

const param = (info, name) => {
  const p = (info.parameter || []).find((x) => x.valueName === name);
  return p ? String(p.value) : '';
};

function parse(feed, now) {
  const best = new Map();
  for (const w of feed.warnings || []) {
    const a = w.alert || {};
    if (a.status && a.status !== 'Actual') continue;
    if (a.msgType === 'Cancel') continue;
    const infos = a.info || [];
    const el = infos.find((i) => /^el/i.test(i.language)) || infos[0];
    const en = infos.find((i) => /^en/i.test(i.language)) || el;
    if (!el) continue;
    const level = parseInt(param(el, 'awareness_level'), 10);
    const type = parseInt(param(el, 'awareness_type'), 10);
    if (!(level >= 2) || !type) continue;
    const expires = Date.parse(el.expires);
    if (!(expires > now)) continue;
    const codes = (el.area || []).flatMap((ar) => (ar.geocode || []).map((g) => g.value)).filter((c) => AREAS[c]);
    for (const code of codes) {
      const item = {
        area: code, level, type,
        onset: el.onset || el.effective, expires: el.expires, sent: a.sent,
        text: { el: (el.description || '').trim(), en: (en.description || '').trim() }
      };
      // The feed keeps earlier versions of a warning; keep the newest per region and kind.
      const key = `${code}|${type}|${item.onset}`;
      const old = best.get(key);
      if (!old || Date.parse(item.sent) > Date.parse(old.sent)) best.set(key, item);
    }
  }
  return [...best.values()].sort((x, y) => y.level - x.level || Date.parse(x.onset) - Date.parse(y.onset));
}

export async function onRequestGet({ request, waitUntil }) {
  const cache = caches.default;
  const hit = await cache.match(request);
  if (hit) return hit;
  let res;
  try {
    const r = await fetch(FEED, { headers: { accept: 'application/json', 'user-agent': 'northellaseyes.gr' } });
    if (!r.ok) return json({ error: 'unavailable' }, 120);
    res = json({ at: new Date().toISOString(), w: parse(await r.json(), Date.now()) }, 600);
  } catch {
    return json({ error: 'unavailable' }, 120);
  }
  waitUntil(cache.put(request, res.clone()));
  return res;
}
