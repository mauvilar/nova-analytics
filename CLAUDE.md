# CLAUDE.md — Nova Analytics

Nova Analytics is a Next.js 16 + Supabase + shadcn/ui white-label analytics dashboard (forked, rebranded, and migrated from Clerk to Supabase).

## Stack & conventions

- Next.js 16 App Router · React 19 · TypeScript · Tailwind 4 · shadcn/ui (Radix).
- **Auth:** Supabase (`@supabase/ssr`). Clients in `src/lib/supabase/`. Session refresh + route guard in `src/proxy.ts` (Next 16's middleware file). Server actions in `src/features/auth/actions.ts`. Client user via `useSupabaseUser()` (`src/hooks/use-user.ts`).
- **Data fetching:** TanStack React Query (server prefetch + `useSuspenseQuery`, `useMutation` for writes); URL state via `nuqs`.
- **Icons:** import from `@/components/icons` only (never `@tabler/icons-react` directly).
- **Forms:** `useAppForm` + `useFormFields<T>()` from `@/components/ui/tanstack-form`.
- **Page headers:** use `PageContainer` props (`pageTitle`, `pageDescription`, `pageHeaderAction`).
- **Formatting (oxfmt):** single quotes, JSX single quotes, no trailing comma, 2-space indent.

## Theme / brand

- Single theme **`nova`** (default) in `src/styles/themes/nova.css` — American-retro red · navy · cream on warm charcoal, OKLCH tokens, dark-first. Brand source of truth in `../assets/branding/`.
- Strategy in `PRODUCT.md`, visual system in `DESIGN.md`. Front-end built/refined with the **impeccable** skill.
- Do not reintroduce the original starter's branding in the UI. The gradient goes on the logo/surfaces, never on text.

## Commands

- `pnpm dev` · `pnpm build` · `pnpm seed` (seed demo user) · `pnpm lint` (oxlint) · `pnpm format` (oxfmt).

## Definition of done

`pnpm build` passes; the auth flow (sign-up → sign-in → protected dashboard → sign-out) works in incognito on the live URL; no original-brand references in visible UI; secrets only in env vars.
