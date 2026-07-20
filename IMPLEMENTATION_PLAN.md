# Onzio Prospect Mockup — Implementation Plan

**Repo:** `/Users/christianalcala/Downloads/onzioMockups`
**Status:** Implemented and verified locally through July 19, 2026. The current Lions public/admin preview, Starter/Pro tier gating, shared in-memory interactions, retained Meridian reference config, and prospect-duplication documentation are complete. No Git remote is configured; GitHub template setup and Vercel deployment remain pending.

**Update, 2026-07-18:** The active prospect (`src/config/prospect.ts`) has since been swapped from `meridian` to `lions` (Lions Football Club, Columbus OH) as a real duplication of this template, and the shared design system (typography, spacing, motion) described throughout this plan was reworked into a cleaner, brand-driven visual language. Everything below describes the original Meridian build as implemented — see `CLAUDE.md`'s "Active prospect" section for current state; `meridian/` remains in the repo as the unreferenced reference example this plan describes.

**Current tier update, 2026-07-19:** Elite has been retired. The live implementation and active product documentation now support only Starter and Pro. Any Elite references below are retained solely as historical context for the original Meridian build and are not current requirements.

**Current implementation:** A static, personalized concept-preview website (public club site + semi-interactive admin preview) with a `[ Starter ] [ Pro ]` version selector, designed so a new prospect can be onboarded by swapping one config module and one image folder. Deployment to Vercel is the remaining release step.

**Current verification:** TypeScript, ESLint, and the production build pass across the current 20-route Starter/Pro implementation. The retired multi-team, advanced-analytics, branding, and workflow previews are no longer offered.

## Current Lions implementation delta — July 19, 2026

This section is the current implementation record. The Meridian specification below remains useful historical context, but it does not override these decisions or the agent handoff in `CLAUDE.md`.

### Brand and assets

- The active prospect is Lions Football Club in Columbus, Ohio, with Sea Blue `#1B2958`, Muted Red `#AD3234`, and Ash White `#F0F0F0` supplied through the prospect configuration.
- The checked-in full-color and white crest variants live at `public/prospect/crest.png` and `public/prospect/crest-white.png`.
- Five supplied Lions matchday photos were copied into `public/prospect/lions_fc_photos/` while preserving the original `~/Downloads/lions_fc_photos/` source folder. Four are configured through `branding.galleryImages`; the fifth remains available through `branding.heroImage` but is not rendered in the current crest-led homepage hero.
- The 2026 blue, red, and white jersey images were replaced with the supplied club designs, processed into transparent PNGs, and configured in a Pro-only European-club retail runway: blue on light, red on navy, and white on red use the same card width, height, and reveal baseline.
- The mobile public navigation remains viewport-height both before and after the homepage header enters its scrolled blur state; the panel is anchored beneath the fixed header and locks background scrolling while open.
- Repeated diagonal `↗` action glyphs were removed across public and admin surfaces; functional slideshow navigation and ordinary directional text links remain.

### Public navigation and homepage

- Interior pages use the solid-white public header immediately, with the full-color crest, blue navigation text, a red active underline, and no bottom divider. The homepage alone uses a transparent header with white controls and no small crest at `scrollY === 0`; any downward scroll transitions it to the same white header and reveals the full-color crest.
- The header brand is crest-only: the separate Lions FC and Columbus, OH lockup text was removed. The slim navigation is 72px tall on desktop and 64px on mobile, with the crest rendered at 70px and 66px respectively when visible.
- Public navigation contains Home, Roster, Schedule, and the Pro-gated Store destination. Club, Staff, Partners, and Stats are intentionally absent as standalone navigation tabs.
- The current Pro Store is a three-jersey first-team collection with a campaign hero, equal product cards, and a responsive detail modal. The Lions scarf, cap, and youth-kit placeholder products have been removed from the active prospect configuration.
- The landing page now uses a Real Madrid-inspired editorial direction: “Capital City.” / “Roar as One.” remains the primary two-line message while an oversized full-color Lions crest is optically centered opposite it on a continuous navy-to-red gradient, with each phrase locked to one line across breakpoints.
- The hero retains direct Next Match and Meet the Squad actions while intentionally keeping the photograph clean: the former first-team kicker, season marker, crest/division overlay, and Est./League/Home fact tiles are omitted.
- The Next Match circle treatment and outer metadata rules were removed. The section is shorter on screen, while Date, Kickoff, Venue, and their values are larger.
- A four-photo Lions matchday slideshow now follows Next Match. It advances every four seconds, pauses for pointer or keyboard interaction, includes arrows and direct slide controls, and suppresses autoplay under `prefers-reduced-motion`. Mobile concentrates a club-navy overlay around the copy rather than darkening the full photograph. Its source paths are prospect-configured through `branding.galleryImages`, remain separate from the unused `branding.heroImage` asset, and the section omits itself for prospects without gallery media.
- The “Built here. Ready anywhere.” homepage player rail was removed entirely.
- The kit section was redesigned toward the editorial quality of the Rose City reference without copying its layout or brand.
- The final Our identity section is deliberately minimal: a large Columbus-led heading, one concise story block, Founded/Home metadata, an Our story link, and an unnumbered three-principle row. The former colored year card and numbered pillar cards were removed.

### Roster and motion

- `/roster` is the single public people destination. It presents players by position and Technical Staff below them; `/staff` redirects to `/roster#staff` for compatibility.
- The current Lions roster presentation is intentionally more immersive than the original Meridian grid while opening directly into the squad: a compact right-aligned roster filter with synchronized Framer Motion card rows, club-crest match-poster cards, and a separate editorial staff layout, with no roster hero or introductory marketing copy. The transition respects reduced-motion preferences. Missing player/staff portraits fall back to the configured Lions master crest instead of initials.
- Starter and Pro retain identical visual quality while preserving the product boundary: Starter cards are static; Pro cards expose hover statistics and accessible player/staff profile modals modeled on the interaction pattern proven in the Rose City reference.
- The schedule is now a match-only calendar modeled on the Real Madrid page's information architecture rather than its branding: month navigation, an unboxed editorial status-tab row with a red active marker, a compact first-viewport layout, solid-color matchup cards, opponent monograms, animated result changes, and dedicated `/schedule/[fixtureId]` match areas. The borderless season selector remains a Pro capability. The first upcoming card is marked with a direct “Go to next match” action.
- GSAP and ScrollTrigger drive homepage entrance, restrained parallax, section reveals, card staggers, and footer motion on desktop and mobile.
- Motion is centralized in `src/components/layout/PublicMotion.tsx`, cleans up between routes and breakpoints, and exits early for `prefers-reduced-motion`.

### Product scope

- Starter and Pro are the only supported versions. Unknown `?tier=` values normalize to Pro.
- Elite and its multi-team switcher, advanced analytics, Teams, Branding, and Workflows admin surfaces were removed rather than merely hidden.
- Custom work beyond Pro is scoped separately and is not marketed as another subscription tier.
- The admin preview now intentionally follows the Rose City admin presentation almost one-for-one at the system level: dark 280px operations sidebar, line icons, red active states, four-card dashboard metrics, action cards, dark CRUD surfaces, and a mobile slide-out navigation drawer. Lions branding, sample data, disclosure, and Starter/Pro capability boundaries remain unchanged.

---

## 0. Ground rules for the coding agent

- **This is a sales mockup, not a product.** All data is hard-coded sample data. Nothing persists across a page refresh. See §9 Non-Goals — do not build anything listed there.
- **Strictly additive tiers.** Pro ⊇ Starter. Starter must *actively suppress* sponsor content everywhere, including the footer — not merely "not add" it.
- **The club's identity leads.** The site must read as the fictional club's website, not an Onzio marketing page. The tier selector is visually secondary.
- **Honesty disclosure.** A persistent, visible "Interactive concept preview — sample content only" notice must exist on both public and admin surfaces.
- **Do not copy Rose City FC's visual styling.** It is a capability reference only.
- Update `CLAUDE.md` with real dev/build commands once scaffolding exists (it explicitly asks for this).

---

## 1. Project scaffolding

### 1.1 Setup commands

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint --no-turbopack
npm install framer-motion
```

- Next.js App Router, TypeScript strict mode, Tailwind CSS (v4, as shipped by current create-next-app), `src/` directory, `@/*` alias — matching the developer's existing conventions.
- No other runtime dependencies are needed. **Do not add** a database client, auth library, form library, state library (Zustand/Redux), or charting library (charts are hand-built SVG/divs — see §5.6).
- Add `metadata.robots = { index: false, follow: false }` in the root layout — prospect mockups must not be indexed by search engines.

### 1.2 Folder structure

```
/Users/christianalcala/Downloads/onzioMockups
├── public/
│   └── prospect/                  # ALL club-specific imagery lives here (swapped per prospect)
│       ├── crest.svg
│       ├── hero.jpg
│       ├── players/               # p01.jpg … (or omit; UI falls back to initials avatar)
│       ├── staff/
│       ├── sponsors/              # s01.svg …
│       └── store/                 # prod01.jpg …
├── src/
│   ├── config/
│   │   ├── types.ts               # ProspectConfig + all sub-types (§1.3)
│   │   ├── prospect.ts            # THE swap point: re-exports the active club config
│   │   └── clubs/
│   │       └── meridian/          # fictional placeholder club (§6)
│   │           ├── index.ts       # assembles + exports the ProspectConfig object
│   │           ├── roster.ts
│   │           ├── staff.ts
│   │           ├── fixtures.ts
│   │           ├── sponsors.ts
│   │           ├── store.ts
│   │           └── analytics.ts
│   ├── lib/
│   │   ├── tiers.ts               # Tier type, feature map, hasFeature(), TIER_LIMITS (§2)
│   │   ├── store/
│   │   │   ├── MockDataProvider.tsx  # in-memory mock data store (§5.5)
│   │   │   ├── reducer.ts
│   │   │   └── hooks.ts           # usePlayers(), useFixtures(), useSponsors(), …
│   │   └── utils.ts               # cn(), formatDate(), formatCurrency(), record helpers
│   ├── components/
│   │   ├── tier/
│   │   │   ├── TierProvider.tsx
│   │   │   ├── TierGate.tsx
│   │   │   └── VersionSelector.tsx
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── DisclosureBanner.tsx
│   │   │   └── TeamSwitcher.tsx   # Elite only
│   │   ├── public/                # public-site components (§4)
│   │   └── admin/                 # admin-preview components (§5)
│   └── app/
│       ├── layout.tsx             # root: fonts, CSS vars from config, Providers, noindex
│       ├── providers.tsx          # "use client": TierProvider > MockDataProvider > MotionConfig
│       ├── globals.css
│       ├── (public)/              # route group: public club site (§4)
│       │   ├── layout.tsx         # SiteHeader + SiteFooter + DisclosureBanner
│       │   ├── page.tsx
│       │   ├── roster/page.tsx
│       │   ├── roster/[playerId]/page.tsx
│       │   ├── schedule/page.tsx
│       │   ├── staff/page.tsx
│       │   ├── club/page.tsx      # about + contact
│       │   ├── sponsors/page.tsx  # Pro+
│       │   ├── stats/page.tsx     # Pro+
│       │   └── store/page.tsx     # Pro+
│       └── admin/                 # admin preview (§5)
│           ├── layout.tsx         # AdminShell (mobile-first)
│           ├── page.tsx           # dashboard
│           ├── players/page.tsx
│           ├── staff/page.tsx
│           ├── schedule/page.tsx  # fixtures + results entry
│           ├── seasons/page.tsx   # Pro+
│           ├── stats/page.tsx     # Pro+
│           ├── sponsors/page.tsx  # Pro+
│           ├── store/page.tsx     # Pro+
│           ├── analytics/page.tsx # Pro+ (Elite adds sections)
│           ├── teams/page.tsx     # Elite
│           ├── branding/page.tsx  # Elite
│           └── workflows/page.tsx # Elite
├── docs/
│   └── NEW_PROSPECT.md            # duplication checklist (§8)
├── CLAUDE.md                      # update with real commands after scaffold
└── plan.md
```

Notes:
- Because all data flows through client-side React context (tier state + mock data store), every `page.tsx` should be a thin file that renders a `"use client"` screen component from `src/components/`. Keep the root layout a server component (metadata, fonts) and mount providers via `src/app/providers.tsx`.
- Club brand colors are injected as CSS custom properties in the root layout (inline `style` on `<body>` or a `<style>` tag): `--club-primary`, `--club-secondary`, `--club-accent`, from `prospect.branding`. Register them in `globals.css` via Tailwind v4 `@theme inline` as `--color-club-primary` etc., so components use `bg-club-primary`, `text-club-secondary`, `border-club-accent` classes. **Never hard-code the club's hex values in components** — that is what makes prospect swaps zero-redesign.

### 1.3 The `ProspectConfig` type (`src/config/types.ts`)

This is the contract for everything club-specific. All sample content lives inside it (see §6).

```typescript
// src/config/types.ts

export interface ProspectConfig {
  club: ClubIdentity;
  branding: Branding;
  contact: ContactInfo;
  seasons: Season[];          // >=1; Pro season-management UI reads this
  currentSeasonId: string;
  teams: Team[];              // >=1. Exactly one for non-academy clubs.
  defaultTeamId: string;      // the "first team" — the only team below Elite
  roster: Player[];
  staff: StaffMember[];
  fixtures: Fixture[];        // played (with result) + upcoming, all teams/seasons
  about: AboutContent;
  sponsors: Sponsor[];        // rendered Pro+ only
  store: StoreConfig;         // rendered Pro+ only
  analytics: AnalyticsSample; // fake numbers, rendered Pro+ (Elite extras) only
}

export interface ClubIdentity {
  name: string;               // "Meridian United FC"
  shortName: string;          // "Meridian United"
  initials: string;           // "MUFC"
  tagline?: string;           // hero subline, e.g. "Est. 2014 · Pacific Premier League"
  foundedYear?: number;
  league: string;             // "Pacific Premier League" (fictional but plausible)
  division?: string;          // "Northwest Division"
  city: string;
  state: string;              // 2-letter
  venue?: string;             // "Alder Field"
}

export interface Branding {
  primaryColor: string;       // hex, e.g. "#0F2A43"
  secondaryColor: string;     // hex
  accentColor?: string;       // hex; defaults to secondaryColor
  crest: string;              // "/prospect/crest.svg"
  heroImage: string;          // "/prospect/hero.jpg"
  heroImageAlt: string;
  galleryImages?: string[];   // optional about-page imagery
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  social?: Partial<Record<
    "instagram" | "facebook" | "twitter" | "youtube" | "tiktok", string>>;
}

export interface Season {
  id: string;                 // "s2026"
  label: string;              // "2026 Season"
  status: "active" | "completed" | "upcoming";
}

export interface Team {
  id: string;                 // "first" | "u23" | "academy"
  name: string;               // "First Team" | "U23" | "Academy"
  shortLabel: string;         // for tab UI
}

export type Position = "GK" | "DF" | "MF" | "FW";

export interface Player {
  id: string;                 // "p01"
  teamId: string;
  firstName: string;
  lastName: string;
  number: number;
  position: Position;
  photo?: string;             // "/prospect/players/p01.jpg"; UI falls back to initials avatar
  hometown?: string;
  height?: string;            // display string, "6'1\""
  yearJoined?: number;
  bio?: string;               // Pro+ expanded profile
  stats?: PlayerSeasonStats;  // Pro+ only rendered
}

export interface PlayerSeasonStats {
  appearances: number;
  starts: number;
  minutes: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  cleanSheets?: number;       // GK only
  saves?: number;             // GK only
}

export interface StaffMember {
  id: string;
  teamId?: string;            // undefined = club-wide (e.g. GM)
  name: string;
  role: string;               // "Head Coach", "Assistant Coach", "Athletic Trainer"
  photo?: string;
  bio?: string;
}

export interface Fixture {
  id: string;                 // "f01"
  teamId: string;
  seasonId: string;
  opponent: string;           // "Cascade Rovers SC"
  date: string;               // ISO 8601 "2026-08-15T19:00:00-07:00"
  venue: string;
  homeAway: "home" | "away";
  competition?: string;       // "League" | "Cup" | "Friendly"
  status: "upcoming" | "played";
  result?: MatchResult;       // required when status === "played"
}

export interface MatchResult {
  clubScore: number;
  opponentScore: number;
  scorers?: string[];         // display strings: "M. Okafor 23'"
  attendance?: number;        // Elite analytics flavor
  note?: string;
}

export interface AboutContent {
  story: string;              // 2–3 paragraphs, markdown-free plain text with \n\n breaks
  mission?: string;
  highlights?: string[];      // "2025 PPL Northwest Division Champions"
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;               // "/prospect/sponsors/s01.svg"
  level: "title" | "gold" | "partner";
  url?: string;               // rendered as dead "#" links — never live outbound in mockup
  blurb?: string;
}

export interface StoreConfig {
  mode: "internal" | "external";  // which commerce story to demo
  externalProviderLabel?: string; // "Powered by the club's Shopify store" style caption
  products: Product[];
}

export interface Product {
  id: string;
  name: string;               // "2026 Home Jersey"
  price: number;              // USD
  image: string;
  category: "jersey" | "training" | "accessory" | "youth";
  sizes?: string[];
}

export interface AnalyticsSample {
  // Pro (staff-facing analytics)
  weeklyPageViews: { weekLabel: string; views: number }[];  // ~8 weeks
  topPages: { path: string; label: string; views: number }[];
  deviceSplit: { mobile: number; desktop: number; tablet: number }; // percentages
  rosterProfileViews: { playerId: string; views: number }[];
  // Elite (advanced analytics extras)
  sponsorImpressions?: { sponsorId: string; impressions: number }[];
  attendanceTrend?: { fixtureId: string; attendance: number }[];
  storeInterest?: { productId: string; views: number }[];
}
```

### 1.4 The swap point (`src/config/prospect.ts`)

The entire file is three lines. Onboarding a new prospect means changing one import (plus adding a new `clubs/<slug>/` folder and swapping `public/prospect/` images — see §8).

```typescript
// src/config/prospect.ts
import { meridian } from "@/config/clubs/meridian";
export const prospect = meridian;
```

Every component imports `prospect` from here (directly for static identity/branding, or via the mock data store for mutable domains — §5.5). No component may import from `@/config/clubs/*` directly.

---

## 2. Tier-gating architecture

### 2.1 Core module: `src/lib/tiers.ts`

One centralized feature map — **no scattered `tier === "pro"` conditionals in components.**

```typescript
// src/lib/tiers.ts
export type Tier = "starter" | "pro" | "elite";

export const TIERS: Tier[] = ["starter", "pro", "elite"];

export const TIER_LABELS: Record<Tier, string> = {
  starter: "Starter",
  pro: "Pro",
  elite: "Elite",
};

const TIER_RANK: Record<Tier, number> = { starter: 0, pro: 1, elite: 2 };

export type FeatureKey =
  // Pro+
  | "sponsors"            // public sponsor page/sections AND admin sponsor mgmt
  | "stats"               // public stats page, stat lines on cards
  | "expandedProfiles"    // player detail pages with bio/stats
  | "store"               // public store AND admin store mgmt
  | "seasons"             // admin season management
  | "analytics"           // staff-facing analytics screen
  | "contentControls"     // extra imagery/content controls in admin
  // Elite
  | "advancedAnalytics"   // extra analytics sections
  | "academy"             // multi-team nav + admin team controls
  | "customWorkflows"     // custom ops panels (matchday, travel, tryouts examples)
  | "brandingControls";   // admin branding/layout customization screen

const FEATURE_MIN_TIER: Record<FeatureKey, Tier> = {
  sponsors: "pro",
  stats: "pro",
  expandedProfiles: "pro",
  store: "pro",
  seasons: "pro",
  analytics: "pro",
  contentControls: "pro",
  advancedAnalytics: "elite",
  academy: "elite",
  customWorkflows: "elite",
  brandingControls: "elite",
};

export function hasFeature(tier: Tier, feature: FeatureKey): boolean {
  return TIER_RANK[tier] >= TIER_RANK[FEATURE_MIN_TIER[feature]];
}

// Cosmetic, per stakeholder decision #2 — displayed in admin UI, never enforced.
export const TIER_LIMITS: Record<Tier, {
  playerProfiles: string;  // display strings, not numbers, so "Unlimited" fits
  photoUploads: string;
  note: string;
}> = {
  starter: { playerProfiles: "Up to 22", photoUploads: "Up to 40",
             note: "Included with initial onboarding" },
  pro:     { playerProfiles: "Up to 30", photoUploads: "Up to 120",
             note: "Included with initial onboarding" },
  elite:   { playerProfiles: "Unlimited", photoUploads: "Unlimited",
             note: "Custom onboarding for multi-team clubs" },
};
```

### 2.2 Tier state: `TierProvider` + `useTier`

`src/components/tier/TierProvider.tsx` (`"use client"`):

- Holds `tier` in `useState<Tier>`.
- **Initial value:** read `?tier=` from the URL on mount (`useSearchParams` inside a Suspense boundary, or `window.location.search` in a mount effect); fall back to `"pro"` (Pro is positioned as the primary plan, so the first impression should be the full standard platform). This lets Christian send prospect links like `https://meridian-mockup.vercel.app/?tier=starter`.
- On change, update state and replace the URL query param (`router.replace`, `scroll: false`) so the current view is shareable. Do **not** use localStorage — a stale stored tier would confuse repeat demo visits; URL is the single source of truth after load.
- Exposes `useTier(): { tier, setTier }` and `useHasFeature(feature: FeatureKey): boolean` (wraps `hasFeature(tier, feature)`).

### 2.3 `TierGate` component

`src/components/tier/TierGate.tsx`:

```tsx
<TierGate feature="sponsors">
  <SponsorStrip />
</TierGate>
```

- Renders `children` only when `useHasFeature(feature)` is true; otherwise renders `fallback` prop (default `null`).
- **This is the only sanctioned way to mount tier-gated content.** Convention enforced across the codebase: sponsor, stats, store, analytics, academy, and branding components are *never* mounted outside a `TierGate`.

### 2.4 Starter sponsor suppression (active, not passive)

- `SiteFooter.tsx` composes its sponsor row exclusively as `<TierGate feature="sponsors"><FooterSponsorRow/></TierGate>`. On Starter the footer renders club identity, nav links, contact, and the concept disclosure only — with layout designed to look complete without the sponsor row (no empty gap).
- No sponsor imagery, "partners" nav item, sponsor placeholder blocks, or "your sponsor here" teasers may render on Starter anywhere: header nav, home page, footer, admin nav all route through the gate.
- The public nav (`SiteHeader`) builds its link list from a single `NAV_ITEMS` array in the header component, where each item optionally declares `feature: FeatureKey`; items are filtered through `useHasFeature`. Same pattern for `AdminNav`. Nav gating therefore lives in data, not JSX conditionals.

### 2.5 Direct navigation to a gated route

If someone manually visits `/sponsors` while on Starter, the page renders a quiet, club-branded `FeatureUnavailableNote` component ("Sponsor showcase is part of the Pro version of this concept" + a small inline control to switch the preview to Pro). Understated card, club colors, one sentence — explicitly **not** a pricing table, no dollar amounts.

### 2.6 Version selector UI

`src/components/tier/VersionSelector.tsx`:

- A compact, floating pill anchored bottom-right (bottom-center on mobile, above the admin bottom nav), rendered in the root providers layer so it appears on both public and admin surfaces.
- Content: tiny label "Concept version" + three segmented buttons `Starter / Pro / Elite`. Neutral dark surface (not club colors, so it reads as a preview control, not site chrome). No prices, no feature bullets, no checkmarks — the anti-pricing-table requirement.
- Switching tiers animates affected sections in/out with a short Framer Motion fade (`AnimatePresence`), respecting reduced motion (§7.4).
- Collapsible to a small icon-only chip so it never dominates the club experience.
- **Implemented behavior:** the selector starts as a compact `Concept: <Tier>` chip and controls both public and admin surfaces. Switching to Starter immediately reduces admin navigation to Dashboard, Roster, and Schedule/Results. Roster combines Players and Technical Staff with add/edit/remove workflows. Pro adds Seasons, Statistics, Sponsors, Store, and Analytics. Elite adds Teams, Branding, and Workflows.
- The shared in-memory store remains mounted during client-side navigation and tier changes, so sample edits remain visible across public/admin surfaces until refresh.

---

## 3. Providers composition (root)

`src/app/providers.tsx` (`"use client"`), mounted in `src/app/layout.tsx`:

```
<MotionConfig reducedMotion="user">
  <TierProvider>
    <MockDataProvider initialData={prospect}>
      <ActiveTeamProvider>        {/* Elite academy team selection, §4.9 */}
        {children}
        <VersionSelector />
      </ActiveTeamProvider>
    </MockDataProvider>
  </TierProvider>
</MotionConfig>
```

---

## 4. Public site — pages and components

All public routes live in the `(public)` route group with a shared layout (`SiteHeader`, page content, `SiteFooter`, `DisclosureBanner`).

**`DisclosureBanner`** (`src/components/layout/DisclosureBanner.tsx`): a slim, persistent bar (top of viewport, above the header, subdued neutral styling): "Interactive concept preview — sample content only." Always visible on every public and admin route, all tiers. Not dismissible (honesty requirement outweighs polish).

### 4.1 `/` — Home (`HomeScreen`)

Components (in `src/components/public/`):
- `Hero.tsx` — full-bleed `branding.heroImage` with club-color gradient overlay, crest, club name, tagline, league/city line. Framer Motion entrance (fade + slight rise).
- `NextMatchCard.tsx` — soonest `status: "upcoming"` fixture for the active team: opponent, date/time, venue, home/away.
- `LatestResultCard.tsx` — most recent `status: "played"` fixture with scoreline and outcome styling (W/L/D).
- `RosterPreview.tsx` — 4–6 `PlayerCard`s + "View full roster" link. Pro+: cards show a goals/apps stat line via `TierGate feature="stats"`.
- `SchedulePreview.tsx` — next 3 fixtures, compact rows.
- `AboutTeaser.tsx` — first paragraph of `about.story` + highlights chips.
- `<TierGate feature="sponsors">` → `SponsorStrip.tsx` — single restrained row of sponsor logos ("Proudly supported by").
- `<TierGate feature="store">` → `StoreTeaser.tsx` — 3 featured products + link to `/store`.

### 4.2 `/roster` (`RosterScreen`)
- `RosterGrid.tsx` — players from the mock data store (so admin-added players appear here live), grouped by position (GK/DF/MF/FW), filtered by active team.
- `PlayerCard.tsx` — photo (or `InitialsAvatar` fallback in club colors), number, name, position. Pro+ (`expandedProfiles`): card links to `/roster/[playerId]`; on Starter, cards are non-linking.
- Elite: `TeamSwitcher` tabs above the grid (§4.9).

### 4.3 `/roster/[playerId]` (`PlayerProfileScreen`) — Pro+ only
- Client component reads the player from the mock data store by param id.
- `PlayerProfileHeader` (large photo, number, name, position, hometown/height/joined), `PlayerBio`, `PlayerStatsTable` (season stats from `PlayerSeasonStats`).
- Whole page wrapped in `TierGate feature="expandedProfiles"` with the `FeatureUnavailableNote` fallback (§2.5). Unknown id → simple "player not found" state linking back to `/roster`.

### 4.4 `/schedule` (`ScheduleScreen`)
- `ScheduleList.tsx` — all fixtures for active team + current season, chronological, split "Results" / "Upcoming".
- `FixtureRow.tsx` — date block, opponent, venue, home/away chip; played rows show `ResultBadge.tsx` (score + W/D/L color).
- Pro+ (`seasons` feature): a `SeasonSelect` dropdown to flip between seasons from config (on Starter, only current season, no selector).

### 4.5 `/staff` (`StaffScreen`)
- `StaffGrid.tsx` + `StaffCard.tsx` (photo/avatar, name, role, optional bio line). Reads from mock data store.

### 4.6 `/club` (`ClubScreen`) — about + contact
- `ClubStory.tsx` (story paragraphs, `galleryImages` if present, highlights), `ContactBlock.tsx` (email, phone, address, social icons), `ContactForm.tsx` — visually complete form whose submit button shows an inline "Concept preview — messages aren't sent from this demo" note and does nothing else. No fake success state that implies delivery.

### 4.7 `/sponsors` (`SponsorsScreen`) — Pro+
- `SponsorTiers.tsx` — grouped by `level`: title (large single card), gold (medium grid), partner (logo grid). `SponsorCard.tsx` with logo, name, blurb. Links are dead (`#`).
- Tasteful editorial framing ("Our Partners"), not an ad wall.

### 4.8 `/stats` (`StatsScreen`) — Pro+
- `TeamStatsSummary.tsx` — computed from played fixtures in the store: record (W-D-L), goals for/against, clean sheets.
- `PlayerStatsTable.tsx` — sortable-by-click table of roster `stats` (apps, goals, assists, cards, minutes). Simple `useState` sort, no table library.
- `TopPerformers.tsx` — top scorer / most assists / most minutes cards.

### 4.9 Elite academy structure — `TeamSwitcher`
- `ActiveTeamProvider` (in `src/components/layout/TeamSwitcher.tsx` or `src/lib/`): holds `activeTeamId`, defaulting to `prospect.defaultTeamId`. When `hasFeature(tier, "academy")` is false, it always returns the default team and the switcher renders nothing.
- `TeamSwitcher.tsx` — pill tabs `First Team / U23 / Academy` rendered (inside `TierGate feature="academy"`) on `/roster`, `/schedule`, and the home hero area. Switching filters roster/fixtures/staff by `teamId` — purely structural, per stakeholder decision #3.
- **Zero pricing, setup-fee, or billing language anywhere near academy UI.** No "additional fee applies" copy. It is a silent structural demo.

### 4.10 `/store` (`StoreScreen`) — Pro+
- `StoreGrid.tsx` + `ProductCard.tsx` (image, name, price, category chip, size chips).
- `ProductDrawer.tsx` — clicking a product opens a drawer with details and a disabled-styled "Checkout available on the live site" note. **No cart, no checkout flow, no payment UI** — implying operational commerce is prohibited.
- If `store.mode === "external"`, show `externalProviderLabel` caption ("Connected to the club's own store — club receives payments directly") to reflect the merchant-of-record policy without operational claims.

### 4.11 Shared layout
- `SiteHeader.tsx` — crest + short name left; nav from the feature-filtered `NAV_ITEMS` array (Home, Roster, Schedule, Staff, Club, then gated: Partners, Stats, Store); mobile hamburger → full-screen menu; subtle "Admin preview" link on the right.
- `SiteFooter.tsx` — crest, nav, contact, social, `<TierGate feature="sponsors">` footer sponsor row, and the concept-preview disclosure line repeated in small text.

---

## 5. Admin preview — screens, shell, and the semi-interactive pattern

### 5.1 Admin shell (`src/components/admin/AdminShell.tsx`, used by `src/app/admin/layout.tsx`)

Mobile-first — this is the sales pitch ("update from your phone in seconds"):
- **Mobile (< md):** sticky top bar (crest, screen title, tier-aware "Add" button) + bottom tab bar (`AdminBottomNav`) with 4–5 primary items; overflow items in a "More" sheet.
- **Desktop (≥ md):** left sidebar (`AdminSidebar`) with the full nav.
- Nav items declared once in a `ADMIN_NAV_ITEMS` array with optional `feature: FeatureKey`, filtered via `useHasFeature` (same pattern as public nav): Dashboard, Roster, Schedule → then `seasons`, `stats`, `sponsors`, `store`, `analytics` (Pro) → `teams`, `branding`, `workflows` (Elite).
- Visual language: operational, dense-but-clean, neutral surfaces with club-color accents only (avoid the editorial look of the public site).
- Persistent slim note in the shell: "Admin preview — changes are sample-only and reset on refresh." This is required for honesty (decision #4: nothing persists).
- No login screen and no fake login. A small "Signed in as Club Admin (preview)" chip in the shell conveys the concept without simulating auth.

### 5.2 Semi-interactive local-state pattern (the core mechanic)

Per stakeholder decision #4: admin actions open real forms and mutate local React state; the public site reads the same state, so an added player instantly appears on the public roster — a strong demo moment. Nothing persists.

**Single shared in-memory store** (`src/lib/store/`):

- `MockDataProvider.tsx` — `"use client"`; `useReducer` over `MockDataState`, initialized once from the `prospect` config prop:

```typescript
interface MockDataState {
  players: Player[];
  staff: StaffMember[];
  fixtures: Fixture[];
  sponsors: Sponsor[];
  products: Product[];
  seasons: Season[];
  teams: Team[];
}

type MockDataAction =
  | { type: "player/add"; player: Player }
  | { type: "player/update"; player: Player }
  | { type: "player/remove"; id: string }
  | { type: "staff/add"; member: StaffMember }
  | { type: "staff/update"; member: StaffMember }
  | { type: "staff/remove"; id: string }
  | { type: "fixture/add"; fixture: Fixture }
  | { type: "fixture/update"; fixture: Fixture }
  | { type: "fixture/recordResult"; id: string; result: MatchResult }
  | { type: "sponsor/add"; sponsor: Sponsor }
  | { type: "sponsor/update"; sponsor: Sponsor }
  | { type: "sponsor/remove"; id: string }
  | { type: "product/add"; product: Product }
  | { type: "product/update"; product: Product }
  | { type: "product/remove"; id: string }
  | { type: "reset" };  // restores initial config data ("Reset sample data" button)
```

- `hooks.ts` — read hooks (`usePlayers(teamId?)`, `useStaff()`, `useFixtures({ teamId, seasonId })`, `useSponsors()`, `useProducts()`) and a `useMockActions()` hook returning typed action dispatchers (`addPlayer(input)` generates the id via a `nextId("p")` counter helper).
- Immutable in-config data (identity, branding, about, contact, analytics samples) is read straight from `prospect` — only CRUD-able domains go through the store.
- IDs for new records: simple incrementing helper, not uuid dep.
- New players/staff added via forms get no photo → `InitialsAvatar` fallback renders them fine (photo "upload" field in forms is a visual file-picker that shows the chosen filename but never uploads — caption "Photo uploads work on the live platform").

### 5.3 Shared admin primitives (`src/components/admin/`)

- `AdminDrawer.tsx` — bottom sheet on mobile / right panel on desktop (Framer Motion slide, `AnimatePresence`), used by every form.
- `EntityList.tsx` + `EntityRow.tsx` — generic list row (avatar/thumb, title, subtitle, chevron/actions) used by players, staff, sponsors, products.
- Forms (each a controlled form; submit dispatches to the mock store, closes the drawer, and briefly highlights the new/updated row): `PlayerForm.tsx`, `StaffForm.tsx`, `FixtureForm.tsx`, `ResultForm.tsx`, `SponsorForm.tsx`, `ProductForm.tsx`. Plain `useState` forms — no react-hook-form/zod.
- `ConfirmDialog.tsx` — for remove actions.
- `LimitMeter.tsx` — cosmetic capacity display using `TIER_LIMITS` (§2.1), e.g. on Players screen: "18 of 22 player profiles used" (Starter), "18 of 30" (Pro), "18 profiles · Unlimited on Elite plan" (Elite). Display only; the Add button is never disabled by it.
- `StatTile.tsx`, `TrendChart.tsx` (hand-rolled SVG line/bar — no chart library), `PercentBar.tsx` — for analytics.
- `FeatureUnavailableNote.tsx` — shared with public side (§2.5) for direct navigation to gated admin routes.

### 5.4 Starter admin screens

- `/admin` — **Dashboard**: greeting with club name, quick stats (roster count with `LimitMeter`, next fixture, last result), quick actions (Add Player, Add Fixture, Record Result) that deep-link and open the relevant drawer.
- `/admin/roster` — canonical tabbed roster workspace. Players and Technical Staff each have list, add, edit, and remove controls backed by the shared mock store. Legacy `/admin/players` and `/admin/staff` routes redirect here.
- `/admin/schedule` — fixtures list split Upcoming/Played; "Add fixture" (`FixtureForm`); each upcoming row has "Record result" opening `ResultForm` (scores, optional scorers) — submitting flips it to played and the public schedule/home page update immediately.

### 5.5 Pro admin additions

- `/admin/seasons` — season list from store, "active" badge, visual "Start new season" flow (form that adds a `Season` and explains rollover — mutates local state only).
- `/admin/stats` — per-player stat editing: pick player → drawer with stat fields → save updates `player.stats` (public `/stats` reflects it).
- `/admin/sponsors` — `EntityList` grouped by level, `SponsorForm` (name, level, logo picker-visual, blurb). Route/nav entry gated `feature="sponsors"`.
- `/admin/store` — product list + `ProductForm`; a settings card reflecting `store.mode` ("Connected store: club-owned Stripe account" style copy, purely presentational, with a note that the club receives payments directly).
- `/admin/analytics` — staff-facing: `StatTile` row (visitors this week, roster views, top page), `TrendChart` of `weeklyPageViews`, `topPages` list, `deviceSplit` percent bars. Small caption: "Sample analytics for preview purposes."

### 5.6 Elite admin additions

- `/admin/analytics` gains `TierGate feature="advancedAnalytics"` sections: sponsor impressions table (ties to sponsors — a sales hook: "show sponsors their exposure"), attendance trend chart, store interest list.
- `/admin/teams` — academy controls: team list (First Team / U23 / Academy), per-team roster counts, visual "Add team" affordance (opens an informational drawer describing multi-team setup — does not need to actually add teams; **no pricing/fee copy**, per decision #3).
- `/admin/branding` — branding controls preview: shows current crest/colors, a set of layout-style options (e.g. "Hero style: Photo / Solid / Split") where selecting one visibly changes a live mini-preview card in the panel (local state only, does not restyle the whole site), plus typography/accent options rendered as selectable swatches. Demonstrates capability without building a theming engine.
- `/admin/workflows` — custom club-ops examples as static-but-navigable panels: "Matchday checklist" (toggleable checkboxes, local state), "Tryout registrations" (sample table of fake registrants + status chips), "Travel roster" (player multi-select). These demonstrate Elite's custom-tooling capability; keep each to one component ~screen each, no deep flows.

---

## 6. Sample data — the fictional placeholder club

All sample data lives **inside the prospect config module** (`src/config/clubs/meridian/`), not a separate `mockData` directory — the config *is* the mock data source, which keeps the prospect swap to one folder. The `MockDataProvider` seeds from it at runtime.

**Placeholder club (invent exactly this, so it's consistent):**
- **Meridian United FC** ("Meridian United", "MUFC"), Tacoma, WA. Fictional "Pacific Premier League — Northwest Division". Founded 2014. Venue "Alder Field". Colors: deep navy `#0F2A43` primary, gold `#D9A441` secondary, off-white accent. Tagline: "Semi-pro soccer for the South Sound."
- **Crest:** a simple original SVG created in-repo (`public/prospect/crest.svg`) — geometric shield, "MU" monogram, club colors. Must not resemble Rose City FC or any real club.
- **Imagery:** hero + player/staff photos should be neutral placeholder-safe assets. Prefer locally generated abstract/gradient SVG placeholders and initials avatars over stock photos of real people (no licensing/likeness questions in a sales artifact). Sponsor logos: 6 original fictional wordmark SVGs ("Sound Roasters", "Cascade Physical Therapy", "Harborline Credit Union", etc.).

**Data volumes (seed the config with exactly this shape):**
- 3 teams: `first` (default), `u23`, `academy`.
- 2 seasons: `s2026` "2026 Season" (active), `s2025` "2025 Season" (completed).
- Roster: 18 first-team players (2 GK, 6 DF, 6 MF, 4 FW) with full `stats` and `bio`; 8 U23 players and 6 academy players (lighter data) for the Elite demo. Note 18 < 22 so the Starter `LimitMeter` reads "18 of 22" plausibly.
- Staff: 5 (Head Coach, Assistant Coach, GK Coach, Athletic Trainer, Club GM — GM has no `teamId`), plus 1 U23 coach.
- Fixtures: first team — 7 played (mixed W/D/L with scorers, some attendance figures) + 4 upcoming in `s2026`; 6 played in `s2025`; U23 — 3 played + 2 upcoming; academy — 2 upcoming.
- Sponsors: 1 title, 2 gold, 3 partner.
- Store: `mode: "internal"`, 6 products (home/away jersey, training top, scarf, cap, youth kit) with plausible prices ($28–$75).
- Analytics: 8 weeks of page views (600–1,400/wk trending up), 5 top pages, device split 68/27/5, roster profile views for 5 players; Elite extras: impressions for all 6 sponsors, attendance for the 7 played fixtures, store interest for 4 products.

Tier-limit numbers (decision #2) live in `TIER_LIMITS` in `src/lib/tiers.ts` (§2.1) — they are Onzio-product copy, not club data, so they do **not** belong in the prospect config.

---

## 7. Build order / milestones

Execute strictly in order; each milestone leaves the app runnable (`npm run dev`).

1. **M0 — Scaffold.** `create-next-app` per §1.1; install framer-motion; set up `globals.css` with Tailwind `@theme` club-color tokens; pick fonts via `next/font` (one display serif/condensed for editorial headers, one clean sans for UI); root layout with noindex metadata. Update `CLAUDE.md` with real commands (`npm run dev`, `npm run build`, `npm run lint`).
2. **M1 — Types + config + placeholder club.** `src/config/types.ts`, `src/lib/tiers.ts`, full `src/config/clubs/meridian/` dataset (§6), `src/config/prospect.ts`, crest/sponsor/placeholder SVGs in `public/prospect/`.
3. **M2 — Tier system + mock store + providers.** `TierProvider`, `TierGate`, `useHasFeature`, `MockDataProvider` + reducer + hooks, `ActiveTeamProvider`, `providers.tsx`, `VersionSelector` (functional but unstyled-final), `DisclosureBanner`.
4. **M3 — Starter public site.** `(public)` layout, `SiteHeader`/`SiteFooter` (feature-filtered nav), Home, `/roster`, `/schedule`, `/staff`, `/club`. Verify on Starter: zero sponsor traces, no stats lines, no store, no player links.
5. **M4 — Starter admin.** `AdminShell` (mobile bottom nav + desktop sidebar), Dashboard, Roster, and Schedule screens, `AdminDrawer` + Player/Staff/Fixture/Result forms wired to the mock store, `LimitMeter`, `ConfirmDialog`. **Verification demo:** edit a player in admin → the Roster row updates; record a result → home "latest result" updates.
6. **M5 — Pro public layer.** `/sponsors`, `/stats`, `/store`, `/roster/[playerId]`, `SponsorStrip` + `StoreTeaser` on home, footer sponsor row, `SeasonSelect` on schedule, stat lines on player cards — all via `TierGate`. Verify flipping Starter↔Pro adds/removes everything cleanly.
7. **M6 — Pro admin layer.** `/admin/seasons`, `/admin/stats`, `/admin/sponsors`, `/admin/store`, `/admin/analytics` (StatTile/TrendChart/PercentBar), Pro fields in `PlayerForm`, gated admin nav items.
8. **M7 — Elite layer.** `TeamSwitcher` + team-filtered roster/schedule (academy), `/admin/teams`, `/admin/branding`, `/admin/workflows`, advanced-analytics sections. Confirm zero pricing/fee language near academy UI.
9. **M8 — Selector polish + transitions.** Final `VersionSelector` styling (floating pill, collapsible), Framer Motion section transitions on tier switch, `?tier=` URL sync, `FeatureUnavailableNote` fallbacks on all gated routes.
10. **M9 — Responsive / a11y / honesty pass.** Full mobile pass (esp. admin on ~375px width), `MotionConfig reducedMotion="user"` verified, keyboard/focus on drawers and dialogs, contrast check of club colors, confirm disclosures present on every surface, `npm run build` clean.
11. **M10 — Deploy + duplication docs.** Push to GitHub, mark repo as a **template repository**, deploy to Vercel, write `docs/NEW_PROSPECT.md` (§8), update `CLAUDE.md` architecture notes.

---

## 8. Deployment & per-prospect duplication workflow

**Model (locked):** one codebase, duplicated per prospect. No multi-tenancy, no subdomain routing, no runtime config loading.

- The Meridian build lives in a GitHub repo marked as a **Template repository** and stays deployed as the canonical demo (e.g. `onzio-mockup-demo.vercel.app`). Template improvements land here first.
- Per prospect: GitHub "Use this template" → `onzio-mockup-<club-slug>` → edit → import to Vercel → send URL like `https://<club-slug>-preview.vercel.app/?tier=pro`.

**`docs/NEW_PROSPECT.md` checklist (the coding agent writes this file with exactly these steps):**
1. Create repo from template: `onzio-mockup-<club-slug>`.
2. Duplicate `src/config/clubs/meridian/` → `src/config/clubs/<club-slug>/`; edit `index.ts` and the data files: club identity, colors, league/location, contact, and adjust rosters/fixtures/sponsors/products toward the prospect's real context (real player names from their public roster are ideal; otherwise keep plausible samples). Delete or keep `meridian/` (keep — harmless, unreferenced).
3. Point the single import in `src/config/prospect.ts` at the new club.
4. Replace files in `public/prospect/`: `crest.svg` (prospect's real crest), `hero.jpg` (prospect's real imagery if available), sponsor/product placeholders as appropriate. Filenames referenced in config must match.
5. Update `metadata.title`/description in `src/app/layout.tsx` to the club name (keep noindex).
6. `npm run dev` sanity pass across all three tiers, mobile width included.
7. Import repo into Vercel → deploy → optionally set a nicer preview domain.
8. If academy structure isn't relevant for this prospect, trim `teams` to just the first team — the Elite team switcher auto-hides when only one team exists (implement this guard in `TeamSwitcher`).

Everything club-specific is confined to **two locations**: `src/config/clubs/<slug>/` and `public/prospect/` (plus the one-line `prospect.ts` import and layout metadata). If a prospect swap requires touching any component, that is a template bug.

---

## 9. Explicit non-goals — DO NOT BUILD

- **No real authentication** — no login page, no auth library, no protected routes, no fake password screens.
- **No database or persistence** — no ORM, no API routes, no server actions, no localStorage/sessionStorage for club data. All mutations are in-memory React state that resets on refresh (by design).
- **No form submissions that go anywhere** — contact form and admin forms never send data off the page.
- **No real payments or commerce** — no Stripe/Shopify SDKs, no cart, no checkout, no order flow. Store is presentation only.
- **No real analytics** — no tracking scripts, no Vercel Analytics on prospect mockups; analytics screens render config sample numbers only.
- **No multi-tenant architecture** — no subdomain routing, no middleware-based tenant resolution, no dynamic per-request config, no CMS. One prospect per deployment via config swap.
- **No enforcement of tier limits** — `TIER_LIMITS` numbers are cosmetic display strings only.
- **No pricing UI beyond nothing** — the mockup shows no dollar amounts anywhere (tier prices live in outreach messaging, not in the artifact); the version selector is names-only.
- **No extra dependencies** — no state-management, form, chart, table, uuid, or component libraries beyond Next.js, React, Tailwind, Framer Motion.

---

### Critical Files for Implementation

- `src/config/types.ts` — the `ProspectConfig` contract everything depends on
- `src/lib/tiers.ts` — tier ordering, feature map, `hasFeature`, `TIER_LIMITS`
- `src/config/clubs/meridian/index.ts` — the placeholder club dataset and the per-prospect swap unit
- `src/lib/store/MockDataProvider.tsx` — the shared in-memory store powering the semi-interactive admin ↔ public demo
- `src/app/providers.tsx` — composition of Tier/MockData/ActiveTeam providers plus the version selector
