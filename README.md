# Onzio Prospect Mockup

A reusable, club-branded concept preview for Onzio sales outreach. The template demonstrates a public soccer-club website and a shared-state admin experience without a database, authentication, payments, or persistent data.

## Current Lions preview

The active prospect is **Lions Football Club** in Columbus, Ohio. The current preview includes:

- Lions colors and crest assets from `src/config/clubs/lions/` and `public/prospect/`.
- A slim public header with no gray bottom divider. Interior pages are white immediately; at the untouched top of the homepage it stays transparent with white controls and no small crest, then becomes white and reveals the full-color crest as soon as the visitor scrolls. Its crest-only brand removes the separate club/location text and renders at 70px desktop and 66px mobile.
- A Real Madrid-inspired, photo-led editorial hero pairing the Lions captain with “Capital City. Roar as One.” and direct schedule/roster actions on a solid club-navy stage, with a completely clean photograph and no informational overlays.
- A compact Next Match presentation with enlarged date, kickoff, and venue details.
- A four-photo, responsive matchday slideshow directly after Next Match, with four-second autoplay, interaction-aware pausing, arrows and direct controls, a localized mobile text overlay, and reduced-motion support.
- A Pro-only 2026 kit runway inspired by elite European club stores: a clean editorial introduction followed by three evenly sized solid-color product cards and a swipeable mobile rail.
- A campaign-led Pro store focused on the three official first-team jerseys, with premium product cards and a responsive product-detail modal; the former scarf, cap, and youth-kit placeholders are intentionally removed.
- A minimal Our identity section built around Columbus-led typography, concise club context, and a simple principles row.
- A bold, immersive `/roster` experience that opens directly with a compact right-aligned roster filter, animated filter transitions with synchronized card rows, crest-backed player cards, and a separate editorial Technical Staff section. Starter keeps cards static; Pro adds hover statistics and player/staff profile modals. `/staff` redirects to `/roster#staff`, and Staff is not a public navigation item.
- A completely redesigned `/schedule` match calendar with a horizontal month rail, an unboxed editorial status-tab row, a compact first-viewport layout, responsive matchup cards, animated month/filter transitions, and dedicated fixture match areas. The first upcoming fixture provides a direct “Go to next match” path. Pro retains a borderless season selector; Starter remains locked to the active season.
- A unified admin Roster workspace for players and technical staff, plus editable upcoming/completed fixture details and final scores in Schedule.
- A Pro analytics workspace modeled on Rose City’s player-performance workflow: position filters, roster selection, KPI cards, position-average comparisons, a radar profile, recent-match trend, and discipline status, all rendered with Lions branding and clearly labeled sample data.
- GSAP entrance, scroll-reveal, card-stagger, and restrained parallax motion for desktop and mobile, with reduced-motion support.
- Two concept versions only: Starter and Pro. The retired Elite version and its exclusive admin routes are not part of the application.

## Start locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The preview defaults to Pro. Share a specific version with `?tier=starter` or `?tier=pro`.

## Version switching

The concept selector updates the public website and admin portal together.

- **Starter:** Public club essentials plus Dashboard, Roster, and Schedule/Results admin tools. Roster combines player and technical-staff management, including edit workflows. Sponsor, statistics, season, store, and analytics navigation is removed.
- **Pro:** Adds sponsors, player statistics and profiles, seasons, store management, and staff-facing analytics to both surfaces.

Direct navigation to an unavailable route shows a restrained version-unavailable message with an option to switch tiers. Starter player capacity is displayed as “Up to 22”; capacity is informational and does not disable sample actions.

An unsupported `?tier=` value is normalized to Pro.

## Quality checks

```bash
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

See `IMPLEMENTATION_PLAN.md` for the implementation record, `CLAUDE.md` for the current agent handoff, and `docs/NEW_PROSPECT.md` for the duplication workflow.
