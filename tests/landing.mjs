import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { Readable } from 'node:stream';
import { strict as assert } from 'node:assert';
import { mkdtemp, readFile } from 'node:fs/promises';
process.env.WAITLIST_DATA_DIR = await mkdtemp(resolve(tmpdir(), 'nana-waitlist-check-'));
const { server } = await import('../server/landing.mjs');
function request(method, url, data, headers = {}) {
  return new Promise(resolve => {
    const req = Readable.from(data === undefined ? [] : [JSON.stringify(data)]);
    Object.assign(req, { method, url, headers: { host: 'nana.localhost', 'content-type': 'application/json', ...headers }, socket: { remoteAddress: 'test' } });
    const res = { status: 200, headers: {}, setHeader(k,v){this.headers[k]=v;}, writeHead(status,h){this.status=status;Object.assign(this.headers,h);}, end(body){resolve({status:this.status, body:body?.toString(), headers:this.headers});} };
    server.emit('request', req, res);
  });
}
assert.equal((await request('GET','/')).status,200);
assert.equal((await request('GET','/.env')).status,404);
const thumbs=await request('GET','/nani/gaze/nani-thumbs-up.png'); assert.equal(thumbs.status,200); assert.equal(thumbs.headers['Content-Type'],'image/png');
const welcome = await request('GET','/api/nani/welcome');
assert([200,503].includes(welcome.status));
if(welcome.status===200) assert.equal(JSON.parse(welcome.body).provider,'elevenlabs');
for(const url of ['/01-agent-home.jpg','/02-agent-command.jpg','/03-agent-confirmation.jpg','/04-agent-transaction-confirmed.jpg']){const result=await request('GET',url);assert.equal(result.status,200);assert.equal(result.headers['Content-Type'],'image/jpeg');}
for(const url of ['/nana-logo-1024-268KB.png','/nana-lilac-bubble-bottom-left-nogrid.png']) assert.equal((await request('GET',url)).status,200);

for(const url of ['/.git/config','/data/waitlist.json','/server/landing.mjs','/HANDOFF.md']) assert.equal((await request('GET',url)).status,404);
assert.equal((await request('POST','/api/waitlist',null)).status,400);
assert.equal((await request('POST','/api/waitlist',{email:'invalid'})).status,400);
assert.equal((await request('POST','/api/waitlist',{email:'test@example.invalid'},{origin:'https://other.invalid'})).status,403);
const signup=await request('POST','/api/waitlist',{email:'test@example.invalid'});assert.equal(signup.status,201);
const token=JSON.parse(signup.body).token;assert.equal(token.length,64);
assert.equal((await request('POST','/api/waitlist',{email:'TEST@example.invalid'})).status,200);
const rows=JSON.parse(await readFile(process.env.WAITLIST_DATA_DIR+'/waitlist.json','utf8'));assert.equal(rows.length,1);assert.equal(rows[0].signupMethod,'waitlist-form');assert(!rows[0].token);assert.equal(rows[0].tokenHash.length,64);
assert.equal((await request('DELETE','/api/waitlist',{token})).status,200);
assert.equal(JSON.parse(await readFile(process.env.WAITLIST_DATA_DIR+'/waitlist.json','utf8')).length,0);
console.log('PASS static routes, privacy boundaries, email/origin validation, signup persistence, deduplication, token removal. HTTP request transport simulated; file persistence real.');
