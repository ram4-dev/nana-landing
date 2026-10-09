import { strict as assert } from 'node:assert';
import { randomUUID } from 'node:crypto';
let scripts=[];
globalThis.document={
 head:{querySelector(selector){return scripts.find(script=>selector.includes(script.src))||null;},appendChild(script){scripts.push(script);}},
 createElement(){return {dataset:{}};}
};
async function boot(hostname,protocol='https:') {
 scripts=[];
 globalThis.window={location:{hostname,protocol,origin:protocol+'//'+hostname}};
 await import(new URL('../dist/scripts/analytics.mjs?test='+randomUUID(),import.meta.url));
 return scripts;
}
const production=await boot('nana.example');assert.equal(production.length,1);assert.equal(production[0].src,'/_vercel/insights/script.js');assert.equal(production[0].dataset.sdkn,'@vercel/analytics');assert.equal(production[0].dataset.sdkv,'2.0.1');assert.equal(production[0].defer,true);
const [name,beforeSend]=window.vaq[0];assert.equal(name,'beforeSend');
assert.equal(beforeSend({type:'pageview',url:'https://nana.example/?email=private@example.invalid#waitlist'}).url,'https://nana.example/');
const {inject}=await import('../dist/vendor/vercel-analytics-2.0.1.mjs');inject({mode:'production'});assert.equal(scripts.length,1);
for(const host of ['localhost','nana-landing.localhost','127.0.0.1','[::1]'])assert.equal((await boot(host)).length,0);
assert.equal((await boot('', 'file:')).length,0);
console.log('PASS built analytics entrypoint with real Vercel SDK: production injection, query/hash removal, no duplicate script and no local tracking. DOM simulated; no tracking events sent.');
