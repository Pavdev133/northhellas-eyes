const IDS = 'psarades kastoria kastorialake nestorio florina xinonero kastania neraida fotina panteleimonas platamonas katerini litochoro nokat neoiporoi makrigialos naousa derveni noth kerkini liti afytos palaiochori ouranoupoli agiosathanasios alexfaros alexport soufli dikaia'.split(' ');
let done = null;
export async function onRequest() {
  if (!done) {
    const out = {};
    await Promise.all(IDS.map(async (cam) => {
      const body = new URLSearchParams({ lastoption: '', registeremail: '', recaptcharesponse: '', map: '0', max: '12', size: 's', columns: '4', viewers: '0', customlabel: '', bg: '111D3A', text: 'F2F5FB', border: '111D3A', labels: 'on', pageviews: '1', percent: '0', newsize: 'm', useremail: '', Skip: 'Skip' });
      const r = await fetch('https://s01.flagcounter.com/flagcounter.cgi', { method: 'POST', body, headers: { 'content-type': 'application/x-www-form-urlencoded', 'Referer': 'https://flagcounter.com/', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36' } });
      const m = (await r.text()).match(/count2\/(\w+)\/(\S*?)["'\[]/);
      out[cam] = m ? m[1] + ' ' + m[2] : 'FAIL ' + r.status;
    }));
    done = IDS.map(c => c + ' = ' + out[c]).join('\n');
  }
  return new Response(done, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
