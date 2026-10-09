# Deploy Nana Wallet to Vercel

## What is ready

The build creates `dist` from an explicit public file list. It includes the landing, application screenshots, Nani’s compiled Rive character, the pinned Rive runtime and both WASM files, and the generated ElevenLabs welcome. The build does not generate audio or call ElevenLabs.

The Vercel API functions handle `/api/waitlist` and `/api/nani/welcome`. In Vercel, the waitlist requires Supabase and never falls back to local files. New signups return a removal token; Supabase stores its SHA-256 hash. Duplicate emails return success without replacing that token. Rate limits are shared across function instances through Supabase; the IP address is stored as an HMAC, with old rate buckets removed during subsequent requests. Anonymous and authenticated API roles cannot read or modify these tables.

## Supabase

Target project: `aitxhgxmiwfazynmcchs`.

`supabase init` has created the local configuration. To authenticate and link:

```sh
DO_NOT_TRACK=1 supabase login --agent no --output-format text
DO_NOT_TRACK=1 supabase link --project-ref aitxhgxmiwfazynmcchs
```

The account login is distinct from the service-role key used by the landing. After linking, inspect the pending migrations before applying them:

```sh
DO_NOT_TRACK=1 supabase db push --dry-run
DO_NOT_TRACK=1 supabase db push
```

The only supplied migration is `supabase/migrations/202610090001_nana_landing_waitlist.sql`. It creates the namespaced waitlist and rate-limit tables and their RPC. It does not reset the database or change unrelated tables. If the existing project has a migration history, reconcile that history before pushing; do not use `db reset --linked`.

Provision local credentials without reading them:

```sh
vault-env to .env --names NANA_LANDING_SUPABASE_URL,NANA_LANDING_SUPABASE_SERVICE_ROLE_KEY
```

If using a direct PostgreSQL connection instead of the CLI, `npm run db:migrate` accepts the URL and `SUPABASE_PASSWORD_NANA_WALLET` through the environment. A session pooler may require `NANA_LANDING_SUPABASE_DB_HOST` and `NANA_LANDING_SUPABASE_DB_USER`.

## Vercel project

Use this directory as the project root. `vercel.json` supplies these settings:

- Framework: Other.
- Node.js: 24.x, set in `package.json`.
- Install command: `npm ci --ignore-scripts`.
- Build command: `npm run build`.
- Output directory: `dist`.

Configure these server-only environment variables for the chosen Preview and Production environments:

- `NANA_LANDING_SUPABASE_URL`
- `NANA_LANDING_SUPABASE_SERVICE_ROLE_KEY`

Do not prefix them with `VITE_` or `NEXT_PUBLIC_`. The deployment does not need the database password, a Supabase account token, or an ElevenLabs key. The welcome audio is already generated.

For a Git-based deployment, include `nani/build/nani.riv`, the audio files, the six brand/screenshot assets used by the page, all application source/configuration files, and `package-lock.json`. The compiled Rive file is explicitly exempted from `nani/.gitignore`; Vercel does not need the Rive authoring CLI.

## Checks and local development

```sh
npm ci --ignore-scripts
npm run check
npm test
npm run build
portless nana-landing npm run dev
npm run verify:deployment -- https://nana-landing.localhost
```

The deployment check makes real HTTP requests, checks public assets and private-file boundaries, creates a unique disposable `example.invalid` waitlist signup, verifies duplicate handling, and removes that signup. It also works with a deployed URL:

```sh
npm run verify:deployment -- https://YOUR-DEPLOYMENT.vercel.app
```

After project environment configuration and the Supabase migration, create a preview with `vercel`. Review Nani’s gaze, side poses, blinking, lips, audio playback after a click, and the thumbs-up pose on email focus. Then publish with `vercel --prod` when ready.

## Current verification

On 2026-10-09 the user completed Supabase setup and provisioned `.env` through `vault-env`. The linked project matches `aitxhgxmiwfazynmcchs`. Secure live REST checks passed for table availability, the rate-limit RPC, insertion, duplicate handling with the original token preserved, and deletion confirmed by a subsequent query. Only a disposable `example.invalid` email was used; the test signup and rate-limit record were removed. No secret values were read or printed.

`npm ci --ignore-scripts --offline`, `npm run check`, `npm test`, `npm run build` and `git diff --check` passed. The API tests use simulated HTTP/provider transport; the live Supabase check above uses real REST operations. The native Rive WASM/PCM harness previously passed. Local Node is 26.8.1 and emits an engine warning; Vercel is pinned to supported Node24.

Portless startup is still blocked by sandbox permissions when opening `~/.portless/proxy.log`. The real local HTTP E2E check cannot connect under this sandbox. Consequently browser-to-landing-to-Supabase E2E and a Vercel deployment are pending. The code and public build are ready, but no running local server or published URL is claimed.

## Deployment command

With Vercel authenticated and `.env` provisioned through `vault-env`, run `npm run deploy:vercel`. It links this directory, sends the two Supabase values to Vercel over stdin as sensitive variables for Preview and Production, deploys to Production, and checks the returned URL with the real HTTP verification script. It does not pass secret values as command arguments or print them. The deployment script requires a real project link and URL before reporting success.

The agent attempted production deployment on 2026-10-09. The CLI exited while loading teams, without a project link or deployment URL. A direct API check returned ENOTFOUND for api.vercel.com in the sandbox. No publication was confirmed.

## GitHub publication

The source repository is https://github.com/ram4-dev/nana-landing. It was created on 2026-10-09 and made public at the user’s request. Local staging, checks and credential-pattern inspection passed. Earlier sandbox failures are retained in the handoff as history.

The verification script now follows GET/HEAD redirects and uses the final landing origin for API requests. A login page produces an explicit Deployment Protection message. POST/DELETE redirects remain rejected.

## Web Analytics and tab icon

The landing includes `@vercel/analytics@2.0.1` through the generic `inject` API, served as a local browser ES module. This static HTML application does not use the Next.js component. The production build includes both the entrypoint and SDK. Localhost and file previews do not send analytics; query strings and hashes are removed before pageview transmission. No custom waitlist/email events are added.

Enable Web Analytics in the linked Vercel project dashboard under Analytics, then deploy the updated build. SDK integration is tested, but dashboard enablement and actual collected pageviews have not been confirmed from this session. The tab favicon uses the existing Nana logo PNG.
