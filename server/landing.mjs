import http from 'node:http';
import { generateWelcome } from '../scripts/generate-welcome.mjs';
import { readFile } from 'node:fs/promises';
import { createWaitlistHandler, json } from './waitlist.mjs';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.riv': 'application/octet-stream', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.wasm': 'application/wasm' };
const brandAssets = new Set(['/nana-logo-1024-268KB.png', '/nana-lilac-bubble-bottom-left-nogrid.png', '/01-agent-home.jpg', '/02-agent-command.jpg', '/03-agent-confirmation.jpg', '/04-agent-transaction-confirmed.jpg']);
const waitlist = createWaitlistHandler();
export const server = http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  try {
    const url = new URL(req.url, 'http://local');
    if (url.pathname === '/api/nani/welcome' && ['GET', 'HEAD'].includes(req.method)) {
      try {
        const metadata = JSON.parse(await readFile(resolve(root, 'audio/nani-welcome.json'), 'utf8'));
        await readFile(resolve(root, 'audio/nani-welcome.mp3'));
        return json(res, 200, { provider: 'elevenlabs', text: metadata.text, source: '/audio/nani-welcome.mp3?v=' + encodeURIComponent(metadata.generatedAt) });
      } catch (error) {
        if (error.code === 'ENOENT') return json(res, 503, { error: 'Welcome audio has not been generated yet.' });
        throw error;
      }
    }
    if (url.pathname === '/api/waitlist') return await waitlist(req, res);
    if (!['GET', 'HEAD'].includes(req.method)) return json(res, 405, { error: 'Method not allowed.' });
    const name = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const runtimeFile = { '/vendor/rive-2.44.0.js': 'rive.js', '/vendor/rive-2.44.0.wasm': 'rive.wasm', '/vendor/rive-2.44.0-fallback.wasm': 'rive_fallback.wasm' }[name];
    const publicFile = Boolean(runtimeFile) || brandAssets.has(name) || name === '/index.html' || name === '/styles/landing.css' || name === '/scripts/landing.js' || name === '/nani/build/nani.riv' || /^\/(audio|assets|nani\/gaze)\/[a-zA-Z0-9_./-]+\.(png|svg|mp3|woff2)$/.test(name);
    if (!publicFile || name.includes('..') || name.split('/').some(part => part.startsWith('.'))) return json(res, 404, { error: 'Not found.' });
    const data = await readFile(runtimeFile ? resolve(root, 'node_modules/@rive-app/canvas', runtimeFile) : resolve(root, '.' + name));
    res.writeHead(200, { 'Content-Type': mime[extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'Content-Length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch (error) { json(res, error.status || (error.code === 'ENOENT' ? 404 : 500), { error: error.status ? error.message : 'We couldn’t complete the request. Please try again.' }); }
});
if (resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  if ((process.env.ELEVEN_LABS_API_KEY || process.env.ELEVENLABS_API_KEY)) {
    try {
      try { await readFile(resolve(root, 'audio/nani-welcome.mp3')); await readFile(resolve(root, 'audio/nani-welcome.json')); }
      catch (error) {
        if (error.code !== 'ENOENT') throw error;
        console.log('Generating Nani’s English welcome with ElevenLabs…');
        await generateWelcome({ apiKey: (process.env.ELEVEN_LABS_API_KEY || process.env.ELEVENLABS_API_KEY), voiceId: process.env.ELEVENLABS_VOICE_ID });
        console.log('Nani’s welcome is ready.');
      }
    } catch { console.error('ElevenLabs welcome could not be generated. Run npm run voice:generate to retry.'); }
  } else {
    try {
      await readFile(resolve(root, 'audio/nani-welcome.mp3'));
      await readFile(resolve(root, 'audio/nani-welcome.json'));
      console.log('Nani’s generated welcome audio is ready.');
    } catch { console.log('Generate welcome audio with ELEVEN_LABS_API_KEY before playback.'); }
  }
  server.on('error', error => { console.error(`No se pudo iniciar el servidor: ${error.code || 'error'}.`); process.exitCode = 1; });
  const cloudStorage = Boolean(process.env.NANA_LANDING_SUPABASE_URL || process.env.SUPABASE_URL || process.env.NANA_LANDING_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VERCEL);
  server.listen(Number(process.env.PORT || 3000), process.env.HOST || '127.0.0.1', () => console.log(`Nana landing ready. Waitlist storage: ${cloudStorage ? 'Supabase' : 'local development file'}.`));
}
