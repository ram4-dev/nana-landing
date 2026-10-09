import { readFile } from 'node:fs/promises';
import { json } from '../../server/waitlist.mjs';
export default async function welcome(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) { res.setHeader('Allow', 'GET, HEAD'); return json(res, 405, { error: 'Method not allowed.' }); }
  try {
    const metadata = JSON.parse(await readFile(new URL('../../audio/nani-welcome.json', import.meta.url), 'utf8'));
    const response = { provider: metadata.provider, text: metadata.text, source: '/audio/nani-welcome.mp3?v=' + encodeURIComponent(metadata.generatedAt) };
    if (req.method === 'HEAD') { res.writeHead(200, { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' }); return res.end(); }
    return json(res, 200, response);
  } catch { return json(res, 503, { error: 'Welcome audio is unavailable.' }); }
}
