// Moon phases, computed in the browser (no external service).
// Phase times: Meeus, Astronomical Algorithms ch. 49 (accurate to about a minute).
// Illumination now: low-precision Sun and Moon longitudes (good to a fraction of a percent).
(() => {
  const rad = Math.PI / 180;
  const sin = (d) => Math.sin(d * rad);
  const cos = (d) => Math.cos(d * rad);
  const norm = (d) => ((d % 360) + 360) % 360;
  const toJD = (date) => date.getTime() / 864e5 + 2440587.5;
  const fromJD = (jd) => new Date((jd - 2440587.5) * 864e5);
  const SYNODIC = 29.530588861;
  const DELTA_T = 69 / 86400; // TT − UT, seconds → days (≈ 69 s in the 2020s)

  // type: 0 new, 1 first quarter, 2 full, 3 last quarter; n: lunation number since Jan 2000
  function phaseJD(n, type) {
    const k = n + type / 4;
    const T = k / 1236.85;
    let jd = 2451550.09766 + SYNODIC * k + 0.00015437 * T * T - 0.00000015 * T ** 3 + 0.00000000073 * T ** 4;
    const E = 1 - 0.002516 * T - 0.0000074 * T * T;
    const M = 2.5534 + 29.1053567 * k - 0.0000014 * T * T - 0.00000011 * T ** 3;
    const Mp = 201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T ** 3 - 0.000000058 * T ** 4;
    const F = 160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T ** 3 + 0.000000011 * T ** 4;
    const O = 124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T ** 3;
    let c;
    if (type === 0 || type === 2) {
      const full = type === 2;
      c = (full ? -0.40614 : -0.4072) * sin(Mp) + (full ? 0.17302 : 0.17241) * E * sin(M)
        + (full ? 0.01614 : 0.01608) * sin(2 * Mp) + (full ? 0.01043 : 0.01039) * sin(2 * F)
        + (full ? 0.00734 : 0.00739) * E * sin(Mp - M) - (full ? 0.00515 : 0.00514) * E * sin(Mp + M)
        + (full ? 0.00209 : 0.00208) * E * E * sin(2 * M) - 0.00111 * sin(Mp - 2 * F) - 0.00057 * sin(Mp + 2 * F)
        + 0.00056 * E * sin(2 * Mp + M) - 0.00042 * sin(3 * Mp) + 0.00042 * E * sin(M + 2 * F)
        + 0.00038 * E * sin(M - 2 * F) - 0.00024 * E * sin(2 * Mp - M) - 0.00017 * sin(O)
        - 0.00007 * sin(Mp + 2 * M) + 0.00004 * sin(2 * Mp - 2 * F) + 0.00004 * sin(3 * M)
        + 0.00003 * sin(Mp + M - 2 * F) + 0.00003 * sin(2 * Mp + 2 * F) - 0.00003 * sin(Mp + M + 2 * F)
        + 0.00003 * sin(Mp - M + 2 * F) - 0.00002 * sin(Mp - M - 2 * F) - 0.00002 * sin(3 * Mp + M)
        + 0.00002 * sin(4 * Mp);
    } else {
      c = -0.62801 * sin(Mp) + 0.17172 * E * sin(M) - 0.01183 * E * sin(Mp + M) + 0.00862 * sin(2 * Mp)
        + 0.00804 * sin(2 * F) + 0.00454 * E * sin(Mp - M) + 0.00204 * E * E * sin(2 * M)
        - 0.0018 * sin(Mp - 2 * F) - 0.0007 * sin(Mp + 2 * F) - 0.0004 * sin(3 * Mp)
        - 0.00034 * E * sin(2 * Mp - M) + 0.00032 * E * sin(M + 2 * F) + 0.00032 * E * sin(M - 2 * F)
        - 0.00028 * E * E * sin(Mp + 2 * M) + 0.00027 * E * sin(2 * Mp + M) - 0.00017 * sin(O)
        - 0.00005 * sin(Mp - M - 2 * F) + 0.00004 * sin(2 * Mp + 2 * F) - 0.00004 * sin(Mp + M + 2 * F)
        + 0.00004 * sin(Mp - 2 * M) + 0.00003 * sin(Mp + M - 2 * F) + 0.00003 * sin(3 * M)
        + 0.00002 * sin(2 * Mp - 2 * F) + 0.00002 * sin(Mp - M + 2 * F) - 0.00002 * sin(3 * Mp + M);
      const W = 0.00306 - 0.00038 * E * cos(M) + 0.00026 * cos(Mp) - 0.00002 * cos(Mp - M)
        + 0.00002 * cos(Mp + M) + 0.00002 * cos(2 * F);
      c += type === 1 ? W : -W;
    }
    return jd + c - DELTA_T;
  }

  // Moon − Sun ecliptic longitude: 0 new, 90 first quarter, 180 full, 270 last quarter.
  function elongation(jd) {
    const d = jd - 2451545;
    const g = 357.528 + 0.9856003 * d;
    const sun = 280.46 + 0.9856474 * d + 1.915 * sin(g) + 0.02 * sin(2 * g);
    const Mp = 134.963 + 13.064993 * d;
    const D = 297.85 + 12.190749 * d;
    const F = 93.272 + 13.22935 * d;
    const moon = 218.316 + 13.176396 * d + 6.289 * sin(Mp) - 1.274 * sin(Mp - 2 * D) + 0.658 * sin(2 * D)
      + 0.214 * sin(2 * Mp) - 0.186 * sin(g) - 0.114 * sin(2 * F) - 0.059 * sin(2 * Mp - 2 * D)
      - 0.057 * sin(Mp - 2 * D + g) + 0.053 * sin(Mp + 2 * D) + 0.046 * sin(2 * D - g)
      + 0.041 * sin(Mp - g) - 0.035 * sin(D) - 0.031 * sin(Mp + g);
    return norm(moon - sun);
  }

  function moonNow(date = new Date()) {
    const jd = toJD(date);
    const elong = elongation(jd);
    const illum = (1 - cos(elong)) / 2;
    // Phase events around now, in time order
    const n0 = Math.floor((jd - 2451550.09766) / SYNODIC) - 1;
    const events = [];
    for (let n = n0; n < n0 + 4; n++) for (let t = 0; t < 4; t++) events.push({ type: t, jd: phaseJD(n, t) });
    events.sort((a, b) => a.jd - b.jd);
    const lastNew = events.filter((e) => e.type === 0 && e.jd <= jd).pop();
    const next = events.filter((e) => e.jd > jd).slice(0, 4).map((e) => ({ type: e.type, date: fromJD(e.jd) }));
    // Name: a main phase within half a day of its exact moment, else the in-between phase.
    const near = events.find((e) => Math.abs(e.jd - jd) < 0.5);
    let phase;
    if (near) phase = near.type * 2;
    else if (elong < 90) phase = 1;
    else if (elong < 180) phase = 3;
    else if (elong < 270) phase = 5;
    else phase = 7;
    return { elong, illum, phase, waxing: elong < 180, age: lastNew ? jd - lastNew.jd : null, next };
  }

  // SVG path of the lit part of a disc of radius r centred on (cx, cy), lit side on the right while waxing.
  function litPath(elong, cx, cy, r) {
    const waxing = elong < 180;
    const rx = Math.abs(cos(elong)) * r;
    const gibbous = elong > 90 && elong < 270;
    const outer = waxing ? 1 : 0;
    const inner = waxing ? (gibbous ? 1 : 0) : (gibbous ? 0 : 1);
    const f = (v) => v.toFixed(2);
    return `M${f(cx)} ${f(cy - r)}A${f(r)} ${f(r)} 0 0 ${outer} ${f(cx)} ${f(cy + r)}A${f(rx)} ${f(r)} 0 0 ${inner} ${f(cx)} ${f(cy - r)}Z`;
  }

  window.NHE_MOON = { moonNow, litPath, elongation, phaseJD };
})();
