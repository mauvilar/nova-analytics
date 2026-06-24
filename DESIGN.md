# Design

## Theme
Dark-first, cool and technical: a deep navy canvas with an indigo→cyan "nova spark" brand accent. Light mode is supported (clean cool near-white, same brand hues). Built on shadcn/ui + Tailwind 4 design tokens. One theme, **`nova`**, is the default; it is the only theme exposed in the switcher (the forked template's other branded themes are removed from the UI).

## Color Palette
Brand:
- **Primary — Indigo** `#4F46E5` (~`oklch(0.51 0.23 277)`) — primary actions, links, logo base.
- **Accent — Cyan** `#22D3EE` (~`oklch(0.79 0.14 207)`) — highlights, the second stop of the nova gradient.
- **Positive — Emerald** `#10B981` (~`oklch(0.70 0.15 162)`) — success, upward trends.

Surfaces (dark, default):
- **Background — Navy** `#0B1020` (~`oklch(0.17 0.03 265)`); cards a touch lighter; borders low-chroma slate.
- **Foreground** cool near-white; **muted-foreground** slate.

Charts (`--chart-1..5`): indigo → cyan → emerald → violet → sky, a coherent cool spread for multi-series data.

The nova gradient (indigo→cyan) is used on the logo mark, surfaces, and decorative shapes — **never on text** (no `background-clip: text`). Contrast verified ≥ 4.5:1 for body in both modes.

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
