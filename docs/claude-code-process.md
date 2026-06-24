# Built with Claude Code — process & evidence

The trial explicitly evaluates **how effectively the work leverages AI-assisted development**, not
just the final product. This is a summary of how Nova Analytics was built with Claude Code.

## Plan-first, then execute

The work started with planning, not code:

1. **Spec** — goals, decisions, risks, and out-of-scope, written and reviewed before building.
2. **Phased implementation plan** — the build broken into phases (fork → auth swap → brand →
   whitelabel → landing → deploy → database → docs), each with concrete steps and "done when" gates.
3. **Execution** — phase by phase, committing in small, descriptive units, verifying each gate
   before moving on.

(The spec and plan live alongside the submission as `05 - Spec del build` and
`06 - Plan de implementación`.)

## Key engineering decisions (and why)

- **Clerk → Supabase auth swap.** The starter shipped Clerk. Rather than keep it, I migrated to
  Supabase Auth with the `@supabase/ssr` pattern (browser/server/middleware clients, a route-guarding
  proxy, and server actions). This used a single backend for auth + data and let me demonstrate RLS.
  See [AUTHENTICATION.md](./AUTHENTICATION.md).
- **bun → pnpm.** The repo used bun (not installed locally / on the target). I migrated to pnpm,
  tracked the lockfile, and whitelisted native build scripts (`sharp`, `@sentry/cli`) so installs
  exit 0 on CI/Vercel.
- **Trimmed scope (YAGNI).** Removed Clerk-organization-only pages (workspaces, team, billing,
  exclusive) that weren't relevant to a single-tenant analytics demo.
- **Design system, not vibes.** Front-end built against committed brand tokens
  (`PRODUCT.md` + `DESIGN.md`): a custom OKLCH `nova` theme (indigo→cyan on navy), dark-first.

## Verification discipline

- The full auth flow (guard → sign-in → dashboard → sign-out) was tested **in an incognito browser
  against the live public URL**, not just locally — the same thing a reviewer would do.
- A global brand grep gate ensured **zero** references to the original product in the visible UI.
- `pnpm build` runs in a pre-push git hook, so broken builds can't be pushed.

## How AI assistance was used well

- Decomposed the problem into a reviewable plan before writing code.
- Used the model to do the mechanical, error-prone work (auth-swap edits, brand sweep, DNS via API)
  while keeping a human-style verification loop (build, lint, live incognito test) on every step.
- Documented the system as it was built (this `docs/` folder), so the result is maintainable, not a
  black box.

## Evidence

- Structured docs: [ARCHITECTURE](./ARCHITECTURE.md), [AUTHENTICATION](./AUTHENTICATION.md),
  [DATABASE](./DATABASE.md), [PROJECT-STRUCTURE](./PROJECT-STRUCTURE.md).
- Screenshots of the live product (landing, sign-in, dashboard, custom domain) in the submission's
  `claude-code-logs/screenshots/`.
- Clean, descriptive commit history on `main`.
