# Nova Analytics — Documentation

Structured documentation for the project. Start here.

| Doc | What it covers |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System overview, request lifecycle, rendering model, deployment |
| [AUTHENTICATION.md](./AUTHENTICATION.md) | Supabase Auth (SSR): clients, proxy/middleware, server actions, session & cookie flow |
| [DATABASE.md](./DATABASE.md) | `auth.users`, the `public.profiles` table, the auto-create trigger, and Row-Level Security |
| [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) | Annotated folder & file map of the repository |

**Related (repo root):**
- [`../README.md`](../README.md) — setup, stack, env vars, test credentials, live URL.
- [`../PRODUCT.md`](../PRODUCT.md) — product strategy, register, brand personality (impeccable).
- [`../DESIGN.md`](../DESIGN.md) — visual system, color palette, typography.
- [`../CLAUDE.md`](../CLAUDE.md) — conventions for AI-assisted development in this repo.

## One-paragraph summary

Nova Analytics is a Next.js 16 (App Router) white-label analytics dashboard. A public
landing page (`/`) funnels visitors to **Supabase email/password authentication**; a Next.js
proxy refreshes the session on every request and guards the `/dashboard/*` app. User identity
lives in Supabase's managed `auth.users`, mirrored into a `public.profiles` table (auto-created
by a trigger, protected by RLS). It is deployed on Vercel over HTTPS, auto-deploying from
GitHub `main`.
