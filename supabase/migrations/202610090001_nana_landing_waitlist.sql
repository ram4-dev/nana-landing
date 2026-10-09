begin;
create table if not exists public.nana_landing_waitlist (
  email text primary key check (length(email) <= 254 and email = lower(btrim(email)) and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
  token_hash text not null unique check (token_hash ~ '^[a-f0-9]{64}$'),
  signup_method text not null default 'waitlist-form' check (signup_method = 'waitlist-form'),
  created_at timestamptz not null default now()
);
create table if not exists public.nana_landing_rate_limits (
  ip_hash text not null check (ip_hash ~ '^[a-f0-9]{64}$'),
  bucket timestamptz not null,
  requests integer not null default 1,
  primary key (ip_hash, bucket)
);
create index if not exists nana_landing_rate_bucket on public.nana_landing_rate_limits(bucket);
alter table public.nana_landing_waitlist enable row level security;
alter table public.nana_landing_rate_limits enable row level security;
revoke all on table public.nana_landing_waitlist, public.nana_landing_rate_limits from public, anon, authenticated;
grant select, insert, delete on public.nana_landing_waitlist to service_role;
grant select, insert, update, delete on public.nana_landing_rate_limits to service_role;
create or replace function public.nana_landing_check_rate(p_ip_hash text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare
  used integer;
  current_bucket timestamptz := date_trunc('minute', clock_timestamp());
begin
  if p_ip_hash is null or p_ip_hash !~ '^[a-f0-9]{64}$' then return false; end if;
  delete from public.nana_landing_rate_limits where bucket < current_bucket - interval '2 minutes';
  insert into public.nana_landing_rate_limits(ip_hash, bucket, requests)
  values(p_ip_hash, current_bucket, 1)
  on conflict(ip_hash, bucket) do update set requests = public.nana_landing_rate_limits.requests + 1
  returning requests into used;
  return used <= 20;
end;
$$;
revoke all on function public.nana_landing_check_rate(text) from public, anon, authenticated;
grant execute on function public.nana_landing_check_rate(text) to service_role;
notify pgrst, 'reload schema';
commit;
