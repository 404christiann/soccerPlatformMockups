# Onzio Prospect Mockup

A reusable, club-branded concept preview for Onzio sales outreach. The template demonstrates a public soccer-club website and a shared-state admin experience without a database, authentication, payments, or persistent data.

## Start locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The preview defaults to Pro. Share a specific version with `?tier=starter`, `?tier=pro`, or `?tier=elite`.

## Version switching

The concept selector updates the public website and admin portal together.

- **Starter:** Public club essentials plus Dashboard, Players, Staff, and Schedule/Results admin tools. Sponsor, statistics, season, store, analytics, team, branding, and workflow navigation is removed.
- **Pro:** Adds sponsors, player statistics and profiles, seasons, store management, and staff-facing analytics to both surfaces.
- **Elite:** Adds multi-team controls, advanced analytics, branding previews, and custom club workflows.

Direct navigation to an unavailable route shows a restrained version-unavailable message with an option to switch tiers. Starter player capacity is displayed as “Up to 22”; capacity is informational and does not disable sample actions.

## Quality checks

```bash
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

See `IMPLEMENTATION_PLAN.md` for the build specification and `docs/NEW_PROSPECT.md` for the duplication workflow.
