import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { createHash, createHmac, randomBytes } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const hash = value => createHash('sha256').update(value).digest('hex');
const unavailable = () => Object.assign(new Error('We couldn’t save your signup. Please try again later.'), { status: 503 });
export function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(data));
}
async function body(req) {
  let parsed;
  if (req.body !== undefined) {
    const encoded = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (Buffer.byteLength(encoded) > 4096) throw Object.assign(new Error('Request is too large.'), { status: 413 });
    try { parsed = JSON.parse(encoded); } catch { throw Object.assign(new Error('Invalid request.'), { status: 400 }); }
  } else {
    let data = '';
    for await (const chunk of req) { data += chunk; if (Buffer.byteLength(data) > 4096) throw Object.assign(new Error('Request is too large.'), { status: 413 }); }
    try { parsed = JSON.parse(data); } catch { throw Object.assign(new Error('Invalid request.'), { status: 400 }); }
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw Object.assign(new Error('Invalid request.'), { status: 400 });
  return parsed;
}
export function createWaitlistHandler({ env = process.env, request = fetch } = {}) {
  const file = resolve(env.WAITLIST_DATA_DIR || resolve(root, 'data'), 'waitlist.json');
  let queue = Promise.resolve();
  const limits = new Map();
  async function localRecords() {
    try { const data = JSON.parse(await readFile(file, 'utf8')); if (!Array.isArray(data)) throw new Error('Invalid storage'); return data; }
    catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  }
  async function save(data) {
    await mkdir(dirname(file), { recursive: true, mode: 0o700 });
    await writeFile(file + '.tmp', JSON.stringify(data), { mode: 0o600 });
    await rename(file + '.tmp', file);
  }
  async function cloud(path, options, url, key) {
    const headers = { apikey: key, 'Content-Type': 'application/json', ...options.headers };
    if (!key.startsWith('sb_secret_')) headers.Authorization = `Bearer ${key}`;
    const response = await request(new URL('/rest/v1/' + path, url), { ...options, headers, redirect: 'error', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw unavailable();
    return response.status === 204 ? null : await response.json();
  }
  return async function waitlist(req, res) {
    try {
      if (!['POST', 'DELETE'].includes(req.method)) { res.setHeader('Allow', 'POST, DELETE'); return json(res, 405, { error: 'Method not allowed.' }); }
      if (req.headers.origin) {
        let origin; try { origin = new URL(req.headers.origin); } catch { return json(res, 403, { error: 'Origin not allowed.' }); }
        if (!['http:', 'https:'].includes(origin.protocol) || origin.host !== req.headers.host) return json(res, 403, { error: 'Origin not allowed.' });
      }
      if (!req.headers['content-type']?.toLowerCase().startsWith('application/json')) return json(res, 415, { error: 'Unsupported format.' });
      const data = await body(req);
      if (req.method === 'POST' && data.website) return json(res, 200, { ok: true });
      const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
      if (req.method === 'POST' && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return json(res, 400, { error: 'Check your email address.' });
      if (req.method === 'DELETE' && (typeof data.token !== 'string' || !/^[a-f0-9]{64}$/.test(data.token))) return json(res, 400, { error: 'Invalid signup.' });
      const url = env.NANA_LANDING_SUPABASE_URL || env.SUPABASE_URL;
      const key = env.NANA_LANDING_SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
      // Vercel must never silently fall back to ephemeral filesystem storage.
      const useCloud = Boolean(env.VERCEL || url || key);
      const ip = env.VERCEL ? String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown' : req.socket?.remoteAddress || 'unknown';
      if (useCloud) {
        if (!url || !key) throw unavailable();
        try { if (new URL(url).protocol !== 'https:') throw new Error(); } catch { throw unavailable(); }
        const ipHash = createHmac('sha256', key).update(ip).digest('hex');
        const allowed = await cloud('rpc/nana_landing_check_rate', { method: 'POST', body: JSON.stringify({ p_ip_hash: ipHash }) }, url, key);
        if (allowed !== true) { res.setHeader('Retry-After', '60'); return json(res, 429, { error: 'Please wait a minute before trying again.' }); }
        if (req.method === 'DELETE') {
          await cloud('nana_landing_waitlist?token_hash=eq.' + hash(data.token), { method: 'DELETE' }, url, key);
          return json(res, 200, { ok: true });
        }
        const token = randomBytes(32).toString('hex');
        const rows = await cloud('nana_landing_waitlist?on_conflict=email&select=token_hash', {
          method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates,return=representation' },
          body: JSON.stringify({ email, signup_method: 'waitlist-form', token_hash: hash(token) })
        }, url, key);
        if (!Array.isArray(rows)) throw unavailable();
        if (rows.length === 0) return json(res, 200, { ok: true });
        if (rows.length !== 1 || rows[0].token_hash !== hash(token)) throw unavailable();
        return json(res, 201, { ok: true, token });
      }
      const now = Date.now();
      for (const [address, value] of limits) if (now - value.start > 60000) limits.delete(address);
      const limit = limits.get(ip) || { start: now, count: 0 }; limit.count++; limits.set(ip, limit);
      if (limit.count > 20) return json(res, 429, { error: 'Please wait a minute before trying again.' });
      const task = queue.then(async () => {
        const rows = await localRecords();
        if (req.method === 'DELETE') {
          const remaining = rows.filter(row => row.tokenHash !== hash(data.token));
          if (remaining.length !== rows.length) await save(remaining);
          return json(res, 200, { ok: true });
        }
        if (rows.some(row => row.email === email)) return json(res, 200, { ok: true });
        const token = randomBytes(32).toString('hex');
        rows.push({ email, signupMethod: 'waitlist-form', createdAt: new Date().toISOString(), tokenHash: hash(token) });
        await save(rows);
        return json(res, 201, { ok: true, token });
      });
      queue = task.catch(() => {});
      await task;
    } catch (error) { json(res, error.status || 503, { error: error.status ? error.message : 'We couldn’t complete the request. Please try again later.' }); }
  };
}
