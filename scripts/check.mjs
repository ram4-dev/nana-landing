import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = dir + '/' + entry.name;
    if (entry.isDirectory()) result.push(...await files(path));
    else if (/\.(mjs|js)$/.test(path)) result.push(path);
  }
  return result;
}
for (const path of (await Promise.all(['server', 'api', 'scripts', 'tests'].map(files))).flat()) {
  const result = spawnSync(process.execPath, ['--check', path], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
const html = await readFile('index.html', 'utf8');
for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  const result = spawnSync(process.execPath, ['--check'], { input: match[1], stdio: ['pipe', 'inherit', 'inherit'] });
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log('PASS JavaScript syntax, including inline Rive controller.');
