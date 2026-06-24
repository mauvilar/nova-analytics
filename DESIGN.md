# Design

## Theme
Dark-first, warm and characterful (American Retro / Heritage): a warm charcoal canvas with a red→cream "nova spark" brand accent and a deep navy anchor. Light mode ("paper") is supported. Built on shadcn/ui + Tailwind 4 design tokens. One theme, **`nova`**, is the default; it is the only theme exposed in the switcher (the forked template's other branded themes are removed from the UI). Full brand system in [`../assets/branding/`](../assets/branding/) (brand-guide.md + tokens/).

## Color Palette
Brand:
- **Primary — Heritage Red** `#D12128` (`oklch(0.554 0.208 26)`) — primary actions, brand, active nav, logo base.
- **Anchor — Ironwork Navy** `#01344F` (`oklch(0.309 0.069 239)`) — deep secondary surfaces, info.
- **Highlight — Vintage Cream** `#FAE3AC` (`oklch(0.922 0.075 88)`) — warm foreground on dark, focus glow, the second stop of the spark gradient.
- **Canvas — Carbon Charcoal** `#151210` (`oklch(0.185 0.006 60)`, warmed from `#1A1A1A`) — the dark base.

Functional (derived, harmonized — not in the source palette): **Pine Green** `#3B9B72` (positive / up), **Mustard Gold** `#D9A850` (warning), **Steel Blue** `#287AA3` (info), **Brick Crimson** `#BC082A`/`#D92D44` (destructive — deeper & cooler than brand red; always paired with an icon + label).

Surfaces: **dark (default)** — background warm near-black, cards a step lighter; foreground warm off-white `#F6EDDE`, muted-foreground warm gray. **light ("paper")** — warm off-white `#FBF8F2` with navy ink.

Charts (`--chart-1..5`): red → navy/steel → gold/cream → green → terracotta/orange, a warm Americana spread for multi-series data. Trend semantics: up = green, down = crimson — the bright brand red stays out of data meaning.

The "nova spark" gradient (red→cream) is used on the logo mark, surfaces, and decorative shapes — **never on text** (no `background-clip: text`). Red buttons use **white** text (5.30:1, AA); red is never used for body text on dark (3.39:1 — large/icons only). Contrast verified ≥ 4.5:1 for body in both modes — full table in [`../assets/branding/brand-guide.md`](../assets/branding/brand-guide.md).

## Typography
- **Display / headings:** Geist (geometric, modern).
- **Body / UI:** Inter (neutral, highly legible).
- Paired on a contrast axis (geometric display + neutral UI), not two near-identical sans-serifs.
- Display headings: `clamp()` max ≤ 6rem, letter-spacing ≥ -0.04em, `text-wrap: balance`.
- Body line length capped ~65–75ch; `text-wrap: pretty` on long prose.

## Components
shadcn/ui (Radix) primitives already in the repo: Button, Input, Label, Card, DropdownMenu, Sidebar, Tabs, Dialog/Sheet, Sonner toasts; TanStack Table for data grids; Recharts for charts; kbar command palette. Auth is custom email/password forms (Supabase). Patterns:
- **Dashboard:** sidebar app-shell + header inset; KPI + chart grid with *varied* tile sizes (not identical cards).
- **Auth:** centered card, single column, Nova logo.
- **Landing:** full-bleed hero + feature sections + product preview + final CTA.

## Layout
Content uses comfortable gutters and a max readable width. Spacing is varied for rhythm (not one uniform gap). Flex for 1-D, grid for 2-D; responsive grids via `repeat(auto-fit, minmax(...))`. Semantic z-index scale (dropdown → sticky → modal → toast → tooltip). Mobile-first; every breakpoint tested.

## Motion
Ease-out curves (quart/expo), no bounce/elastic. Motion is purposeful: staggered list entrances, subtle reveals that enhance already-visible content. Every animation has a `prefers-reduced-motion: reduce` fallback (crossfade or instant).
