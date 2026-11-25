// TEMPORARY: read-only stats reader for the site's own Flag Counter ids. Remove after use.
const IDS = new Set(['tin','21fb','sOow','Qk0F','1LzK','MKTw','gv96','tZm3','YdV2','Con9','02cU','wGgT','XKf9','eQjL','Nn3s','F5jN','99kl','G8uD','XxRT','36mf','wp4f','0vU4','E8CO','Kvio','sLLZ','XaWQ','ctgD','XmPe','8uqW','iLSx']);
const PAGES = new Set(['countries','more','more30']);
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'')
  .replace(/<img[^>]*title="([^"]*)"[^>]*>/gi,' $1 ').replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi,' $1 ')
  .replace(/<\/(tr|p|div|h\d|li)>/gi,'\n').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,' ')
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n').trim();
export async function onRequest({ request }) {
  const u = new URL(request.url);
  const ids = (u.searchParams.get('ids') || 'tin').split(',').filter((i) => IDS.has(i));
  const page = PAGES.has(u.searchParams.get('p')) ? u.searchParams.get('p') : 'countries';
  const out = [];
  for (const id of ids) {
    try {
      const r = await fetch(`https://s01.flagcounter.com/${page}/${id}` + (/^\d{1,2}$/.test(u.searchParams.get('pg') || '') ? '/' + u.searchParams.get('pg') : ''), { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } });
      const t = strip(await r.text()); const from = +(u.searchParams.get('from') || 0); out.push(`##### ${id} (${r.status}) len=${t.length}\n` + (u.searchParams.get('flat') ? t.replace(/\s+/g, ' ') : t).slice(from, from + 6000));
    } catch (e) { out.push(`##### ${id} ERROR ${e}`); }
  }
  return new Response(out.join('\n\n'), { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });
}
