import { mkdir, copyFile, rm, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const publicFiles = [
  'index.html', 'nana-avatar-1024-475KB.png', 'styles/landing.css', 'scripts/landing.js', 'scripts/analytics.mjs',
  'nana-logo-1024-268KB.png', 'nana-lilac-bubble-bottom-left-nogrid.png',
  '01-agent-home.jpg', '02-agent-command.jpg', '03-agent-confirmation.jpg', '04-agent-transaction-confirmed.jpg',
  'nani/gaze/gaze-center.png', 'nani/build/nani.riv', 'audio/nani-welcome.mp3', 'audio/nani-welcome.json'
];
export const runtimeFiles = { 'rive.js': 'rive-2.44.0.js', 'rive.wasm': 'rive-2.44.0.wasm', 'rive_fallback.wasm': 'rive-2.44.0-fallback.wasm' };
export const vendorFiles = { 'node_modules/@vercel/analytics/dist/index.mjs': 'vendor/vercel-analytics-2.0.1.mjs' };
export async function build() {
  const copies = publicFiles.map(name => [name, name]).concat(Object.entries(runtimeFiles).map(([source, target]) => ['node_modules/@rive-app/canvas/' + source, 'vendor/' + target])).concat(Object.entries(vendorFiles));
  for (const [source] of copies) if (!(await stat(resolve(root, source))).size) throw new Error('Empty asset: ' + source);
  await rm(resolve(root, 'dist'), { recursive: true, force: true });
  for (const [source, target] of copies) {
    const destination = resolve(root, 'dist', target);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(resolve(root, source), destination);
  }
  console.log(`Built ${copies.length} public files in dist. No voice generation or credentials required.`);
}
if (resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) await build();
