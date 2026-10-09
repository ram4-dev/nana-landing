import { strict as assert } from 'node:assert';
import { readFile, readdir } from 'node:fs/promises';
import { build, publicFiles, runtimeFiles, vendorFiles } from '../scripts/build.mjs';
await build();
async function list(dir) {
  const result=[];
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    if(entry.isDirectory()) result.push(...(await list(dir+'/'+entry.name)).map(name=>entry.name+'/'+name));
    else result.push(entry.name);
  }
  return result;
}
assert.deepEqual((await list('dist')).sort(), [...publicFiles,...Object.values(runtimeFiles).map(name=>'vendor/'+name),...Object.values(vendorFiles)].sort());
const html=await readFile('dist/index.html','utf8');
assert(html.includes('RuntimeLoader.setWasmUrl'));
assert(!html.includes('unpkg.com'));
assert(html.includes('rel="icon" type="image/png" href="nana-avatar-1024-475KB.png?v=2"'));
assert(html.includes('type="module" src="scripts/analytics.mjs"'));
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const path=match[1].split('?')[0];
  if(path.startsWith('#') || path.startsWith('http') || path.startsWith('/api')) continue;
  assert((await readFile('dist/'+path)).length>0, path);
}
console.log('PASS production asset references, bundled runtime/WASM/audio/Rive and public file allowlist.');
