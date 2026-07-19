# CLAUDE.md

## Project status

This is a complete static concept-preview template for semi-professional soccer clubs. It contains a premium public club site and a semi-interactive mobile-first admin preview. All content and mutations are sample-only and reset on refresh.

## Commands

```bash
npm run dev
npm run lint
npx tsc --noEmit --pretty false
npm run build
npm run start
```

## Architecture

- Next.js App Router, React, strict TypeScript, Tailwind CSS v4, and Framer Motion.
- `src/app/(public)/` contains the fan-facing site; `src/app/admin/` contains the admin preview.
- `src/config/types.ts` is the club configuration contract.
- `src/config/prospect.ts` is the active-club swap point. Components must not import a club module directly.
- `src/lib/tiers.ts` owns all tier ordering and feature gates. Use `TierGate` or `useHasFeature`; do not scatter tier comparisons.
- `src/lib/store/MockDataProvider.tsx` is the shared in-memory store. Public and admin views read the same state.
- Club colors are injected as CSS custom properties by the root layout. Never hard-code prospect colors into components.
- All prospect-specific media lives under `public/prospect/`.

## Product boundaries

- No database, authentication, persistence, API routes, server actions, payments, tracking, or multi-tenant routing.
- Starter must never mount sponsor content, including navigation and footer content.
- The version selector controls the public website and admin portal as one preview. Starter admin exposes only Dashboard, Players, Staff, and Schedule/Results; Pro and Elite navigation appears additively.
- Direct visits to gated public or admin routes render `FeatureUnavailableNote` instead of mounting unavailable feature content.
- Tier changes preserve the current in-memory sample data while navigating inside the app. A browser refresh resets sample data by design.
- Pro adds sponsors, stats, expanded profiles, seasons, store, and analytics.
- Elite adds advanced analytics, multi-team navigation, branding previews, and custom workflows.
- The visible concept-preview disclosure is mandatory across public and admin surfaces.
- Rose City FC is an architecture and capability reference only. Do not copy its brand or exact styling.

## Verification expectations

Before handoff, run TypeScript, lint, production build, and browser checks at desktop and mobile widths. Test tier switching and at least one admin mutation that updates a public view.
