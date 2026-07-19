# CLAUDE.md

## Project status

This is a complete static concept-preview template for semi-professional soccer clubs. It contains a premium public club site and a semi-interactive mobile-first admin preview. All content and mutations are sample-only and reset on refresh.

## Active prospect

`src/config/prospect.ts` currently points to `src/config/clubs/lions/` — **Lions Football Club** (Columbus, OH). Brand source assets (crest PNGs, official color palette) live outside the repo at `~/Downloads/Lions Football Club assets 2026/`; only the derived `public/prospect/crest.png` / `crest-white.png` and the hex values below are checked in. Palette: Sea Blue `#1B2958` (primary), Muted Red `#AD3234` (secondary — sparing "earned" use only), Ash White `#F0F0F0` (accent/light surface). `src/config/clubs/meridian/` remains in the repo, unreferenced, as the template's example/reference club per `docs/NEW_PROSPECT.md` — do not delete it.

## Commands

```bash
npm run dev
npm run lint
npx tsc --noEmit --pretty false
npm run build
npm run start
```

## Architecture

- Next.js App Router, React, strict TypeScript, Tailwind CSS v4, GSAP/ScrollTrigger, and Framer Motion.
- `src/app/(public)/` contains the fan-facing site; `src/app/admin/` contains the admin preview.
- `src/config/types.ts` is the club configuration contract.
- `src/config/prospect.ts` is the active-club swap point. Components must not import a club module directly.
- `src/lib/tiers.ts` owns all tier ordering and feature gates. Use `TierGate` or `useHasFeature`; do not scatter tier comparisons.
- `src/lib/store/MockDataProvider.tsx` is the shared in-memory store. Public and admin views read the same state.
- Club colors are injected as CSS custom properties by the root layout. Never hard-code prospect colors into components.
- All prospect-specific media lives under `public/prospect/`.
- `Branding.crestOnDark` (optional) supplies a mono/light crest variant for dark or primary-color surfaces; components should fall back to `Branding.crest` when it's unset rather than assuming every prospect ships both.

## Product boundaries

- No database, authentication, persistence, API routes, server actions, payments, tracking, or multi-tenant routing.
- Starter must never mount sponsor content, including navigation and footer content.
- The version selector controls the public website and admin portal as one preview. Starter admin exposes only Dashboard, Roster, and Schedule/Results; Pro navigation appears additively.
- Direct visits to gated public or admin routes render `FeatureUnavailableNote` instead of mounting unavailable feature content.
- Tier changes preserve the current in-memory sample data while navigating inside the app. A browser refresh resets sample data by design.
- Pro adds sponsors, stats, expanded profiles, seasons, store, and analytics.
- The visible concept-preview disclosure is mandatory across public and admin surfaces.
- Rose City FC remains an architecture and capability reference for the public site. The admin preview is the explicit exception: its dark operations shell, navigation density, dashboard cards, form surfaces, and responsive drawer intentionally track the Rose City admin closely while retaining the active prospect's crest, accent color, data, and Starter/Pro gates.

## Current admin UX decisions

- `src/components/admin/AdminShell.tsx` mirrors the proven Rose City operations pattern: a 280px dark desktop sidebar, line-icon navigation, red active states, club identity, preview-account footer, and a slide-out drawer on mobile. Dark admin navigation uses `Branding.crestOnDark` when supplied, while roster players and technical staff reuse the same full-color crest fallback as the public site when no portrait exists. The mandatory concept disclosure remains visible above the shell.
- The dashboard uses four Rose City-style KPI cards and compact operations cards. Pro shows statistics and season actions; Starter omits those actions and navigation destinations entirely. Pro Analytics follows Rose City’s player-performance model—position filters, roster rail, player KPIs, cohort comparison, radar profile, match trend, and discipline—while using Lions tokens, crest fallbacks, and explicit sample-data labeling.
- Roster combines Players and Technical Staff in one tabbed workspace with add, edit, and remove workflows. Schedule supports adding fixtures, editing upcoming or completed fixture details, recording scores, and revising published results. Seasons, Statistics, Sponsors, Shop, and Analytics retain the existing shared in-memory workflows and use the same dark card, form, drawer, table-row, and feedback language as the dashboard. Legacy `/admin/players` and `/admin/staff` routes redirect to `/admin/roster`.
- This remains a static preview: there is no login, database, persistence, or destructive production action behind the Rose City-inspired admin presentation.

## Current public UX decisions

- `src/components/layout/SiteHeader.tsx` owns the shared public header. Interior pages use the solid-white treatment immediately, with the full-color crest, blue navigation text, a red active underline, and no bottom divider. The homepage is the deliberate exception only at `scrollY === 0`: the header is transparent, its navigation/actions are white, and the small navbar crest is hidden. As soon as the visitor scrolls, the header lifts to the top, becomes white, reveals the full-color crest, and fills the Admin Preview control blue. The navigation remains 72px tall on desktop and 64px on mobile, with a crest-only brand measuring 70px and 66px respectively and no separate club-name or location text. The mobile menu is an absolute full-viewport-height panel anchored below the header so the scrolled header's backdrop blur cannot collapse it; opening it locks background page scrolling.
- Public navigation contains Home, Roster, Schedule, and the tier-gated Store link. Club, Partners, and Stats are intentionally absent as standalone navigation tabs, and Staff is absent because players and staff share `/roster`.
- Decorative diagonal action arrows are intentionally absent across public and admin surfaces. Keep functional previous/next controls and ordinary directional text links, but do not restore the repeated `↗` glyph treatment on cards or CTAs.
- The footer uses a compact four-column desktop/two-column mobile layout. Club social destinations are data-driven through `prospect.contact.social`; the active Lions configuration links its official Instagram and YouTube channels.
- `src/components/public/RosterScreen.tsx` renders Goalkeepers, Defenders, Midfielders, Forwards, and Technical Staff in that order. The legacy `/staff` route redirects to `/roster#staff`.
- The roster opens directly with a compact right-aligned roster filter, crest-led match-poster cards, and a separate editorial Technical Staff section; it intentionally has no roster hero or introductory marketing copy. Filter changes use a Framer Motion exit/reveal sequence with synchronized card rows and a reduced-motion fallback. Players and staff without supplied portraits use `Branding.crest` (currently the Lions Football Club Master PNG) as their card and modal image.
- Starter and Pro share the same premium roster layout. Starter player and staff cards are deliberately non-interactive and expose no statistics or profiles. Pro cards add desktop hover statistics plus accessible Rose City-style profile modals; the existing `/roster/[playerId]` route remains available for direct Pro profile URLs.
- `/schedule` is titled “Team schedule” and uses a light, match-only calendar inspired by the Real Madrid information hierarchy: a functional month rail, an unboxed editorial status-tab row with a red active marker, a compact first-viewport layout, solid-color matchup cards, animated result changes, and per-fixture `/schedule/[fixtureId]` match areas reached from each card. The season control is deliberately borderless and remains Pro-only; Starter stays on the active season. The first upcoming card is explicitly labeled “Go to next match.” Opponents without crest assets use text monograms.
- `src/components/public/HomeScreen.tsx` intentionally omits the former homepage player rail and tagline. Its photo-led editorial hero uses the supplied captain portrait inside a clean rounded feature card, solid club colors, and direct schedule/roster actions; it deliberately omits the extra kicker, season marker, crest overlay, and club fact tiles. The headline is locked to two lines at every breakpoint: “Capital City.” followed by “Roar as One.” Its section order is Hero → Next Match → Matchday gallery → Pro kit feature → Club Story → Pro partner feature.
- The hero facts row has no outer horizontal rules. The Next Match section has no circular background treatment or outer metadata rules and uses a compact viewport-conscious layout with enlarged match metadata.
- `src/components/public/MatchdaySlideshow.tsx` owns the Matchday gallery. It advances every four seconds, pauses during pointer or keyboard interaction, supports arrows and direct slide controls, and disables autoplay for `prefers-reduced-motion`. Mobile uses a localized club-navy gradient behind the copy instead of a heavy full-image overlay.
- The Our identity section is intentionally minimal: large Columbus-led typography, a short story block, compact club metadata, and an unnumbered principles row. Do not restore the former colored year card or numbered pillar cards.
- The Pro-only kit section uses the transparent PNGs in `public/prospect/store/` as a three-card retail runway. Blue on light, red on navy, and white on red use equal-width, equal-height cards with a synchronized section reveal; mobile converts the collection into a horizontal snap rail.
- The Pro `/store` route is a campaign-led first-team shop inspired by elite European club merchandising patterns without copying their branding: solid-color editorial hero, three oversized 2026 jersey cards, compact store-service metadata, and a responsive product-detail modal. The hero intentionally omits the former Collection / Season / Available metadata strip. The active Lions catalog contains only the blue, red, and white jerseys; do not restore the former scarf, cap, or youth-kit placeholders.
- `src/components/layout/PublicMotion.tsx` is the single public GSAP/ScrollTrigger orchestration layer. Keep its desktop/mobile match-media behavior, route cleanup, and `prefers-reduced-motion` early exit intact.
- Elite is retired. `src/lib/tiers.ts` must remain a two-value `starter | pro` system. Do not restore the deleted Teams, Branding, Workflows, advanced-analytics, or public team-switcher surfaces unless product scope changes explicitly.

## Lions asset rules

- `public/prospect/crest.png` is the full-color crest; `public/prospect/crest-white.png` is the light navigation/footer variant.
- The source brand folder is `~/Downloads/Lions Football Club assets 2026/`, but runtime code must reference checked-in assets under `public/prospect/`.
- Current jersey source files are preserved beside the generated `*-jersey-transparent.png` files. Public product configuration must reference the transparent versions.
- Optional matchday photos live under `public/prospect/<gallery-folder>/` and are configured through `branding.galleryImages`. `MatchdaySlideshow` hides itself when that list is unset or empty. The current four-slide Lions gallery lives in `public/prospect/lions_fc_photos/` and deliberately excludes the separate homepage hero image; the original `~/Downloads/lions_fc_photos/` folder was preserved.
- Lions palette: Sea Blue `#1B2958`, Muted Red `#AD3234`, Ash White `#F0F0F0`. Red remains an earned accent rather than a dominant surface.

## Verification expectations

Before handoff, run `npx next typegen`, TypeScript, lint, production build, and browser checks at desktop and mobile widths. Test Starter/Pro switching, the homepage header transition, reduced motion, `/staff` redirection, and at least one admin mutation that updates a public view.
