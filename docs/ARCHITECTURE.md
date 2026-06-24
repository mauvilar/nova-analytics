# Architecture

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix primitives) |
| Auth | Supabase Auth via `@supabase/ssr` (email/password) |
| Database | Supabase Postgres (`auth.users` + `public.profiles`, RLS) |
| Charts / tables | Recharts + TanStack Table |
| Hosting | Vercel (HTTPS, auto-deploy from GitHub `main`) |
| Package manager | pnpm |

## Surfaces

```
/                         Public landing page (marketing). No auth gate.
/auth/sign-in            Email/password sign-in (redirects to dashboard if already logged in)
/auth/sign-up            Email/password sign-up
/dashboard/*             Protected app (overview, product, users, kanban, chat, forms, profile…)
/api/health             Public health-check endpoint (monitoring)
```

## Request lifecycle

Every request flows through the Next.js **proxy** (`src/proxy.ts`, Next 16's middleware file)
before hitting a route:

```
Browser ──> proxy.ts ──> updateSession()                     (src/lib/supabase/middleware.ts)
                          │  • refreshes the Supabase session cookie
                          │  • if no user and path is /dashboard/*  → redirect /auth/sign-in
                          │  • if user and path is /auth/*          → redirect /dashboard/overview
                          └─> route (Server Component / Route Handler)
```

- **Server Components** read the session with the SSR **server client** (`src/lib/supabase/server.ts`)
  which reads/writes the auth cookies via `next/headers`.
- **Client Components** use the **browser client** (`src/lib/supabase/client.ts`); the current
  user is exposed through the `useSupabaseUser()` hook (`src/hooks/use-user.ts`).
- **Sign-in / sign-up** post to **server actions** (`src/features/auth/actions.ts`), which call
  Supabase and then `redirect()` to the dashboard.

See [AUTHENTICATION.md](./AUTHENTICATION.md) for the full auth detail.

## Rendering & data

- All authenticated routes are **dynamic** (they read cookies), so they render on demand.
- The landing and legal pages are mostly static.
- Dashboard widgets use **demo/seed data** (faker-based mock API in `src/constants/`,
  fetched through TanStack Query) — there is no real ingestion pipeline (out of scope for the trial).
- User identity is real: `auth.users` + `public.profiles` (see [DATABASE.md](./DATABASE.md)).

## Deployment

- **Vercel** builds from GitHub `main` on every push (and via `vercel --prod`).
- Build-time/public env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are set
  in Vercel → Project → Settings → Environment Variables (Production).
- The `service_role` key is **not** deployed — it is only used locally by the seed script.
- HTTPS is automatic; the production alias is the public URL in the root README.
- `pnpm-workspace.yaml` whitelists native build scripts (`sharp`, `@sentry/cli`) so `pnpm install`
  exits 0 on CI/Vercel.
