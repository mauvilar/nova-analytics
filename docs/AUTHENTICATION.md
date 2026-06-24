# Authentication

Nova Analytics uses **Supabase Auth** (email/password) with cookie-based SSR sessions via
`@supabase/ssr`. This replaced the starter's original Clerk integration.

## The three Supabase clients

`@supabase/ssr` needs different clients depending on where code runs:

| File | Runs in | Purpose |
|---|---|---|
| `src/lib/supabase/client.ts` | Browser (Client Components) | `createBrowserClient` — reads cookies in the browser; used by `useSupabaseUser()` and client sign-out |
| `src/lib/supabase/server.ts` | Server (Server Components, server actions, route handlers) | `createServerClient` bound to `next/headers` cookies |
| `src/lib/supabase/middleware.ts` | Proxy/middleware (edge) | `updateSession()` — refreshes the session and applies route guards |

## Proxy / middleware — `src/proxy.ts`

In Next.js 16 the middleware file is `proxy.ts`. On every matched request it calls
`updateSession(request)`, which:

1. Creates a server client bound to the request/response cookies.
2. Calls `supabase.auth.getUser()` (this also refreshes an expiring session and writes the new
   cookies onto the response).
3. **Guards routes:**
   - no user + path starts with `/dashboard` → redirect to `/auth/sign-in`
   - user + path starts with `/auth` → redirect to `/dashboard/overview`

> Important: no code runs between creating the client and `getUser()` — that is the
> `@supabase/ssr` contract for reliable session refresh.

## Server actions — `src/features/auth/actions.ts`

The sign-in and sign-up forms (`src/features/auth/components/*-view.tsx`) are client components
using React 19's `useActionState`, posting to server actions:

- `signInAction` → `supabase.auth.signInWithPassword({ email, password })`; on success
  `revalidatePath('/', 'layout')` + `redirect('/dashboard/overview')`; on failure returns `{ error }`.
- `signUpAction` → `supabase.auth.signUp(...)`; same redirect on success.
- `signOutAction` → `supabase.auth.signOut()` + redirect to sign-in (also available; the sidebar/user
  menu sign out with the browser client + `router.refresh()` for snappier UX).

## Session & cookie flow

```
sign in (server action) ──> Supabase sets auth cookies on the response
   every later request ──> proxy.getUser() validates & refreshes those cookies
   Server Components   ──> read the user from the same cookies (server client)
   Client Components   ──> useSupabaseUser() (browser client + onAuthStateChange)
   sign out            ──> cookies cleared ──> proxy redirects /dashboard → /auth/sign-in
```

## Email confirmation (demo decision)

Email confirmation is **disabled** for the demo (`mailer_autoconfirm = true` on the project), so a
brand-new sign-up can enter immediately without an inbox. **In production** this would be re-enabled
and paired with a transactional email provider (Resend/Postmark). The seeded demo user is created
server-side with `email_confirm: true` (see below), so it works regardless of that setting.

## Seeded demo user — `scripts/seed-user.mjs`

`pnpm seed` creates `admin@novaanalytics.io` through the **Admin API** using the `service_role` key:

```js
supabase.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: 'Nova Admin' } })
```

Because it is created pre-confirmed and server-side, no email is ever sent — the address does not
need to be a real inbox. The matching `public.profiles` row is created by the database trigger /
backfill (see [DATABASE.md](./DATABASE.md)).

## Security notes

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is public by design (RLS protects the data).
- `SUPABASE_SERVICE_ROLE_KEY` is **server-only**: used solely by the local seed script, never shipped
  to the client and **not** added to Vercel.
- `.env*` is gitignored; production secrets live in Vercel's encrypted env store.
- Data access is constrained by Row-Level Security (see [DATABASE.md](./DATABASE.md)).

## Why the swap from Clerk

The forked starter shipped Clerk (with Organizations/Billing). We swapped to Supabase Auth to (a)
use a single backend for auth **and** data, (b) own the session/cookie flow with `@supabase/ssr`,
and (c) demonstrate RLS. Clerk-organization-only pages (workspaces, team, billing, exclusive) were
removed as out of scope.
