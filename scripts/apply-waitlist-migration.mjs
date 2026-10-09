import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
const url=process.env.NANA_LANDING_SUPABASE_URL;
const password=process.env.SUPABASE_PASSWORD_NANA_WALLET;
if(!url || !password) {console.error('Missing NANA_LANDING_SUPABASE_URL or SUPABASE_PASSWORD_NANA_WALLET.');process.exit(1);}
const ref=new URL(url).hostname.split('.')[0];
const host=process.env.NANA_LANDING_SUPABASE_DB_HOST || `db.${ref}.supabase.co`;
const user=process.env.NANA_LANDING_SUPABASE_DB_USER || 'postgres';
const port=process.env.NANA_LANDING_SUPABASE_DB_PORT || '5432';
const result=spawnSync('psql',['-h',host,'-p',port,'-U',user,'-d','postgres','-v','ON_ERROR_STOP=1','-f',resolve('supabase/migrations/202610090001_nana_landing_waitlist.sql')],{
 env:{...process.env,PGPASSWORD:password,PGSSLMODE:'require',PGCONNECT_TIMEOUT:'8'},encoding:'utf8',timeout:20000
});
if(result.status!==0) {console.error('Migration failed. Check database connectivity, pooler host/user, and the vault password. No credentials printed.');process.exit(1);}
console.log('Waitlist migration applied.');
