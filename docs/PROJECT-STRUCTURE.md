# Project structure

Annotated map of the repository (only the meaningful paths).

```
nova-analytics/
├─ README.md                  Setup, stack, env vars, test credentials, live URL
├─ PRODUCT.md                 Product strategy / brand personality (impeccable)
├─ DESIGN.md                  Visual system: palette, typography, components (impeccable)
├─ CLAUDE.md                  Conventions for AI-assisted development in this repo
├─ docs/                      ← you are here
│  ├─ ARCHITECTURE.md
│  ├─ AUTHENTICATION.md
│  ├─ DATABASE.md
│  └─ PROJECT-STRUCTURE.md
│
├─ supabase/
│  └─ migrations/
│     └─ 0001_profiles_and_rls.sql   profiles table + trigger + RLS
│
├─ scripts/
│  └─ seed-user.mjs           Seeds admin@novaanalytics.io via the Supabase Admin API (`pnpm seed`)
│
├─ public/                    Static assets (logo.svg, …)
├─ src/app/icon.svg           Favicon (Nova spark, indigo→cyan)
│
├─ src/
│  ├─ proxy.ts                Next 16 middleware → Supabase session refresh + route guards
│  │
│  ├─ app/                    App Router routes
│  │  ├─ layout.tsx           Root layout: theme provider, fonts, metadata (dark-first)
│  │  ├─ page.tsx             PUBLIC LANDING (hero + dashboard preview, features, CTA)
│  │  ├─ about/ privacy-policy/ terms-of-service/   Public legal/marketing pages
│  │  ├─ auth/
│  │  │  ├─ sign-in/[[...sign-in]]/page.tsx
│  │  │  └─ sign-up/[[...sign-up]]/page.tsx
│  │  ├─ dashboard/           PROTECTED app (overview, product, users, kanban, chat, forms, profile…)
│  │  └─ api/
│  │     ├─ health/route.ts   Public health-check
│  │     ├─ products/  users/ Demo mock-data API routes
│  │
│  ├─ lib/
│  │  ├─ supabase/
│  │  │  ├─ client.ts         Browser client (createBrowserClient)
│  │  │  ├─ server.ts         Server client (createServerClient + cookies)
│  │  │  └─ middleware.ts     updateSession(): refresh + route guard
│  │  └─ utils.ts
│  │
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ actions.ts        Server actions: signIn / signUp / signOut
│  │  │  └─ components/       sign-in-view.tsx, sign-up-view.tsx (forms)
│  │  ├─ products/ profile/ notifications/   Dashboard feature modules
│  │
│  ├─ components/
│  │  ├─ ui/                  shadcn/ui primitives (button, input, card, …)
│  │  ├─ layout/              app-sidebar, header, user-nav, page-container
│  │  ├─ landing/             dashboard-preview (SVG hero visual)
│  │  ├─ themes/              theme + font config, theme switcher
│  │  └─ icons.tsx            Central icon map (import icons from here only)
│  │
│  ├─ hooks/
│  │  ├─ use-user.ts          useSupabaseUser() — current user for client components
│  │  └─ use-nav.ts           Navigation helpers (pass-through after the Clerk removal)
│  │
│  ├─ config/
│  │  └─ nav-config.ts        Sidebar / Cmd+K navigation items
│  │
│  ├─ constants/              Faker-based mock API (demo dashboard data)
│  ├─ types/                  Shared TypeScript types
│  └─ styles/
│     ├─ globals.css          Tailwind entry + landing keyframes
│     ├─ theme.css            Imports the theme presets
│     └─ themes/nova.css      The Nova brand theme (indigo→cyan on navy, OKLCH) — default
│
├─ pnpm-workspace.yaml        pnpm settings (allowBuilds: sharp, @sentry/cli)
├─ next.config.ts             Next config (image domains, Sentry wrapper)
└─ .env.example               Documented environment variables
```

## Where to look first

- **Auth logic** → `src/proxy.ts`, `src/lib/supabase/*`, `src/features/auth/*`, and [AUTHENTICATION.md](./AUTHENTICATION.md).
- **Database** → `supabase/migrations/0001_profiles_and_rls.sql` and [DATABASE.md](./DATABASE.md).
- **Brand / theme** → `src/styles/themes/nova.css`, `PRODUCT.md`, `DESIGN.md`.
- **Landing** → `src/app/page.tsx` + `src/components/landing/`.
