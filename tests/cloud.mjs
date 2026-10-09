import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
import { createWaitlistHandler } from '../server/waitlist.mjs';
import welcome from '../api/nani/welcome.mjs';
const env={VERCEL:'1',NANA_LANDING_SUPABASE_URL:'https://supabase.invalid',NANA_LANDING_SUPABASE_SERVICE_ROLE_KEY:'sb_secret_test'};
const rows=new Map(); let allowed=true, failing=false, calls=0;
const request=async(url,opts)=>{
 calls++; assert.equal(opts.headers.apikey,env.NANA_LANDING_SUPABASE_SERVICE_ROLE_KEY); assert(!opts.headers.Authorization); assert.equal(opts.redirect,'error'); assert(opts.signal);
 if(failing) return new Response('{"secret":"do not expose"}',{status:500});
 if(url.pathname.includes('/rpc/')) return Response.json(allowed);
 if(opts.method==='DELETE') {const hash=url.searchParams.get('token_hash').slice(3);for(const [email,row] of rows)if(row.token_hash===hash)rows.delete(email);return new Response(null,{status:204});}
 const row=JSON.parse(opts.body); assert.equal(row.email,row.email.trim().toLowerCase());assert(!row.token); assert.equal(row.token_hash.length,64);
 if(rows.has(row.email))return Response.json([]);
 rows.set(row.email,row);return Response.json([{token_hash:row.token_hash}],{status:201});
};
async function invoke(handler,method,body,extra={}) {
 const req={method,body,headers:{host:'nana.example','content-type':'application/json',origin:'https://nana.example','x-forwarded-for':'192.0.2.1',...extra}};
 return new Promise(resolve=>handler(req,{headers:{},setHeader(k,v){this.headers[k]=v;},writeHead(status,h){this.status=status;Object.assign(this.headers,h);},end(body){resolve({status:this.status,body:body?JSON.parse(body):null,headers:this.headers});}}));
}
const handler=createWaitlistHandler({env,request});
assert.equal((await invoke(createWaitlistHandler({env:{VERCEL:'1'},request}),'POST',{email:'test@example.invalid'})).status,503);assert.equal(calls,0);
assert.equal((await invoke(handler,'POST',{email:'bad'})).status,400);
assert.equal((await invoke(handler,'POST',null)).status,400);
assert.equal((await invoke(handler,'POST',{email:'a@example.invalid'},{origin:'https://evil.invalid'})).status,403);
assert.equal((await invoke(handler,'POST',{email:'a@example.invalid',website:'spam'})).status,200);assert.equal(calls,0);
const signup=await invoke(handler,'POST',{email:' Test@Example.invalid '});assert.equal(signup.status,201);assert.equal(signup.body.token.length,64);
assert.equal(rows.get('test@example.invalid').token_hash,createHash('sha256').update(signup.body.token).digest('hex'));
assert.equal((await invoke(createWaitlistHandler({env,request}),'POST',JSON.stringify({email:'test@example.invalid'}))).status,200);assert.equal(rows.size,1);
assert.equal((await invoke(handler,'DELETE',{token:signup.body.token})).status,200);assert.equal(rows.size,0);
allowed=false;assert.equal((await invoke(handler,'POST',{email:'rate@example.invalid'})).status,429);
allowed=true; failing=true; const fail=await invoke(handler,'POST',{email:'failure@example.invalid'});assert.equal(fail.status,503);assert(!JSON.stringify(fail).includes('do not expose'));
assert.equal((await invoke(handler,'GET',undefined)).status,405);
const voice=await invoke(welcome,'GET');assert.equal(voice.status,200);assert.equal(voice.body.provider,'elevenlabs');assert(voice.body.source.startsWith('/audio/nani-welcome.mp3'));
assert.equal((await invoke(welcome,'HEAD')).body,null);
console.log('PASS Vercel parsed/stream body contract, Supabase adapter, cold instance deduplication, removal, rate limits, missing credentials and safe failures. Provider transport mocked.');
