import { strict as assert } from 'node:assert';
import { randomUUID } from 'node:crypto';
let base = new URL(process.argv[2] || 'https://nana-landing.localhost');
const call = async(path, options={}) => {
 const response=await fetch(new URL(path,base), {...options, signal:AbortSignal.timeout(15000), redirect:!options.method || ['GET','HEAD'].includes(options.method) ? 'follow' : 'error'});
 return response;
};
const html=await call('/');assert.equal(html.status,200);
const content=await html.text();
if(!content.includes('Nana Wallet')) throw new Error('The URL does not serve the Nana landing. If Vercel Deployment Protection redirects to login, use the public production alias.');
// Canonical production redirects can change the host. API requests use that final origin.
base=new URL(html.url);

for(const path of ['/styles/landing.css','/scripts/landing.js','/vendor/rive-2.44.0.js','/vendor/rive-2.44.0.wasm','/vendor/rive-2.44.0-fallback.wasm','/nani/build/nani.riv','/audio/nani-welcome.mp3','/01-agent-home.jpg','/02-agent-command.jpg','/03-agent-confirmation.jpg','/04-agent-transaction-confirmed.jpg']) {
 const r=await call(path);assert.equal(r.status,200,path);assert((await r.arrayBuffer()).byteLength>0,path);
}
for(const path of ['/.env','/data/waitlist.json','/server/waitlist.mjs'])assert.equal((await call(path)).status,404,path);
const welcome=await call('/api/nani/welcome');assert.equal(welcome.status,200);assert.equal((await welcome.json()).provider,'elevenlabs');
const headers={'content-type':'application/json',origin:base.origin};
const email='deploy-check-'+randomUUID()+'@example.invalid';let token;
try {
 const signup=await call('/api/waitlist',{method:'POST',headers,body:JSON.stringify({email})});assert.equal(signup.status,201);token=(await signup.json()).token;assert.equal(token.length,64);
 const duplicate=await call('/api/waitlist',{method:'POST',headers,body:JSON.stringify({email})});assert.equal(duplicate.status,200);assert.equal((await duplicate.json()).ok,true);
} finally {
 if(token) {const removed=await call('/api/waitlist',{method:'DELETE',headers,body:JSON.stringify({token})});assert.equal(removed.status,200);assert.equal((await removed.json()).ok,true);}
}
console.log('PASS real HTTP deployment assets, privacy boundaries, voice API, waitlist signup, duplicate and removal. Disposable example.invalid signup removed.');
