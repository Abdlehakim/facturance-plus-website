# Facturance Plus — public website

The public marketing site served at **facturance.com**. It renders marketing,
legal and blog pages only: it never authenticates anyone, holds no session and
talks to no API. Login, signup and every authenticated screen belong to the
customer application on its own origin
(`client.plus.facturance.com`, `apps/customer`).

## Stack

Next.js 16 (App Router, React 19), Tailwind CSS v4, `lucide-react` for icons.
`next.config.ts` sets `output: "standalone"`, which is what the production
image runs.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
```

Copy `.env.example` to `.env.local` first. The only variable is
`NEXT_PUBLIC_CLIENT_APP_BASE_URL`, the origin every "Connexion" and
"Essayer gratuitement" link points at. It is read at build time and inlined
into the browser bundle, so changing it needs a rebuild, not a restart.

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Routes

- `src/app/(facturance)/` — the public pages and the chrome that wraps them:
  `/`, `/features`, `/pricing`, `/blog` (+ `/blog/[slug]`), `/resources`,
  `/contact`, `/support`, and the legal pages `/terms`, `/privacy`, `/legal`,
  `/data-requests`.
- `src/app/(auth)/login` and `src/app/(auth)/register` — compatibility
  redirects only. They render nothing and send visitors to the customer
  application, `/register` forwarding a `?plan=` selection.
- `src/app/sitemap.ts` and `src/app/robots.ts` — this site is the only one of
  the two that is indexed; the customer application is served `noindex`.

Cross-origin URLs are centralised in `src/lib/urls.ts`. Brand, contact and
publisher details are in `src/lib/public-site-config.ts`. Blog posts live in
`src/components/blog/articles/`.

## Production

Built and run as a container, not on Vercel:

- `Dockerfile` — multi-stage build producing the standalone server on
  `node:22-alpine`, listening on port 3000 in the container.
- `compose.production.yaml` (repository root) — the `website` service, mapped
  to `127.0.0.1:3104` on the host.
- `infrastructure/nginx/facturance.com.conf` — the public vhost in front of it.
- `.github/workflows/sync-production.yml` — deploys the submodule at an exact
  commit SHA.

Deployment for the whole suite is documented in the repository root README.
