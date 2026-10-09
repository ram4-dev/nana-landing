import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const names=['NANA_LANDING_SUPABASE_URL','NANA_LANDING_SUPABASE_SERVICE_ROLE_KEY'];
for(const name of names) if(!process.env[name]) {console.error('Missing '+name+'. Provision .env with vault-env.');process.exit(1);}
const values=names.map(name=>process.env[name]);
function safe(value) {let result=value||'';for(const secret of values) result=result.split(secret).join('[redacted]');return result;}
const env={...process.env,NO_UPDATE_NOTIFIER:'1',VERCEL_TELEMETRY_DISABLED:'1',NODE_OPTIONS:[process.env.NODE_OPTIONS,'--no-experimental-webstorage'].filter(Boolean).join(' ')};
function run(command,args,input,timeout=180000) {
 const result=spawnSync(command,args,{cwd:root,env,input,encoding:'utf8',timeout});
 if(result.status!==0 || result.error) {
  const output=safe((result.stdout||'')+(result.stderr||''));if(output)console.error(output);
  console.error('Failed: '+command+' '+args.join(' '));process.exit(1);
 }
 return safe(result.stdout||'');
}
console.log('Linking this directory to Vercel…');
run('vercel',['link','--yes']);
const projectFile=resolve(root,'.vercel/project.json');
if(!existsSync(projectFile)) {console.error('Vercel did not create the local project link. Check login and API connectivity.');process.exit(1);}
const project=JSON.parse(readFileSync(projectFile,'utf8'));
if(!project.projectId || !project.orgId) {console.error('Vercel project link is incomplete.');process.exit(1);}
for(const target of ['production','preview'])for(const name of names) {
 console.log('Configuring '+name+' for '+target+'…');
 run('vercel',['env','add',name,target,'--force','--yes','--sensitive'],process.env[name]);
}
console.log('Deploying to production…');
const output=run('vercel',['deploy','--prod','--yes'],undefined,600000);
const clean=output.replace(/\x1b\[[0-9;]*m/g,'');
const urls=clean.match(/https:\/\/[^\s]+\.vercel\.app\/?(?=\s|$)/g);
if(!urls?.length) {console.error('No deployment URL returned. Check Vercel before retrying; publication is not confirmed.');process.exit(1);}
const url=urls.at(-1);
console.log('Published: '+url);
console.log('Checking live assets, audio API and disposable waitlist signup/removal…');
console.log(run(process.execPath,['scripts/verify-deployment.mjs',url],undefined,180000));
console.log('Production deployment verified: '+url);
