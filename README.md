# Nova Analytics

> **Turn data into decisions.** A white-label data-analytics dashboard — built with Next.js, Supabase, and shadcn/ui, and shipped end-to-end with Claude Code.

**Live demo:** _added at submission_ · **Test login:** `admin@novaanalytics.io` (password in the submission notes)

---

## Overview

Nova Analytics is a public landing page plus an authenticated analytics dashboard (revenue, active users, retention, product events). It was forked from an open-source Next.js dashboard starter, fully rebranded as Nova Analytics, and migrated from Clerk to **Supabase Auth**.

## Tech stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS 4 + shadcn/ui (Radix)
- **Auth:** Supabase Auth (`@supabase/ssr`) — email/password
- **Data:** Supabase (Postgres)
- **Charts / tables:** Recharts + TanStack Table
- **Hosting:** Vercel (HTTPS)
- **Package manager:** pnpm

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in your Supabase values
pnpm seed                    # seeds the demo user (admin@novaanalytics.io)
pnpm dev                     # http://localhost:3000
```

## Environment variables

See `.env.example`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key (server-only; used by the seed script) |
| `SEED_ADMIN_PASSWORD` | Password for the seeded demo user |

Secrets live only in env vars (`.env*` is gitignored); production values are set in Vercel.

## Test credentials

- **Email:** `admin@novaanalytics.io`
- **Password:** _provided in the submission_

The demo user is created server-side via the Supabase Admin API with `email_confirm: true`, so it needs no real inbox. Email confirmation is disabled for the demo so any new sign-up works instantly; **in production I would enable confirmation with a transactional email provider** (e.g. Resend/Postmark).

## Architecture

- `src/lib/supabase/{client,server,middleware}.ts` — SSR-safe Supabase clients.
- `src/proxy.ts` — Next 16 proxy (middleware): refreshes the session and guards `/dashboard/*`.
- `src/features/auth/actions.ts` — server actions for sign-in / sign-up / sign-out.
- `src/app/page.tsx` — public landing; `src/app/dashboard/*` — protected app.

## Design system

Branded with the **impeccable** workflow: `PRODUCT.md` (strategy) + `DESIGN.md` (visual system) + a custom `nova` theme (indigo→cyan on deep navy, OKLCH tokens, dark-first) in `src/styles/themes/nova.css`.

## Built with Claude Code

Planned plan-first, then executed phase-by-phase with Claude Code. Process evidence (plan, key prompts, session logs) is in `claude-code-logs/` in the submission package.

## Notes & limitations

- Dashboard data is demo/seed data — no real ingestion pipeline (out of scope for the trial).
- Email confirmation disabled for the demo (see above).
- Forked from an open-source MIT starter; the original `LICENSE` is retained per its terms, and all original branding has been removed from the product UI.
- With more time: real data sources, e2e test coverage across the dashboard, and production email/confirmation.

## License

MIT — see [LICENSE](./LICENSE).
