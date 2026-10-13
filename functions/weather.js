// Live weather for the camera site, served from the site's own address so phones
// never hit cross-site limits.
//   ?st=code,code  – readings from the network's own Weathercloud stations (cached 5 min)
//   ?ll=lat,lng|…  – current conditions at each camera from Open-Meteo (cached 15 min)
const WC = 'https://app.weathercloud.net/device/values?code=';
const OM = 'https://api.open-meteo.com/v1/forecast';

const json = (body, maxAge) => new Response(JSON.stringify(body), {
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': `public, max-age=${maxAge}`,
    'access-control-allow-origin': '*'
  }
});

async function stations(codes) {
  const out = {};
  await Promise.all(codes.map(async (code) => {
    try {
      const r = await fetch(WC + code, {
        headers: { 'x-requested-with': 'XMLHttpRequest', referer: 'https://app.weathercloud.net/', 'user-agent': 'Mozilla/5.0' }
      });
      const v = r.ok ? await r.json() : null;
      if (!v || typeof v.temp !== 'number') return;
      out[code] = {
        at: v.epoch, temp: v.temp, hum: v.hum, bar: v.bar,
        wind: Math.round((v.wspdavg ?? v.wspd ?? 0) * 3.6),
        gust: Math.round((v.wspdhi ?? 0) * 3.6), wdir: v.wdiravg ?? v.wdir,
        rain: v.rain, rainrate: v.rainrate
      };
    } catch { /* station unreachable: leave it out */ }
  }));
  return out;
}

async function places(pairs) {
  const q = new URLSearchParams({
    latitude: pairs.map((p) => p[0]).join(','),
    longitude: pairs.map((p) => p[1]).join(','),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,is_day,wind_speed_10m,wind_direction_10m',
    timezone: 'Europe/Athens'
  });
  const r = await fetch(`${OM}?${q}`);
  if (!r.ok) return null;
  const data = await r.json();
  return (Array.isArray(data) ? data : [data]).map((d) => {
    const c = d.current || {};
    return {
      temp: c.temperature_2m, feels: c.apparent_temperature, hum: c.relative_humidity_2m,
      rain: c.precipitation, code: c.weather_code, day: c.is_day,
      wind: Math.round(c.wind_speed_10m ?? 0), wdir: c.wind_direction_10m
    };
  });
}

export async function onRequestGet({ request, waitUntil }) {
  const url = new URL(request.url);
  const cache = caches.default;
  const hit = await cache.match(request);
  if (hit) return hit;

  let res;
  const st = url.searchParams.get('st');
  const ll = url.searchParams.get('ll');
  if (st) {
    const codes = [...new Set(st.split(','))].filter((c) => /^\d{6,12}$/.test(c)).slice(0, 10);
    res = json({ st: await stations(codes) }, 300);
  } else if (ll) {
    const pairs = ll.split('|').map((p) => p.split(',').map(Number))
      .filter((p) => p.length === 2 && p.every(Number.isFinite) && Math.abs(p[0]) <= 90 && Math.abs(p[1]) <= 180)
      .slice(0, 60);
    const list = pairs.length ? await places(pairs) : null;
    if (!list) return json({ error: 'unavailable' }, 60);
    res = json({ ll: list }, 900);
  } else {
    return json({ error: 'ask for st or ll' }, 60);
  }
  waitUntil(cache.put(request, res.clone()));
  return res;
}
