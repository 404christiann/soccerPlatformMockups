# New Prospect Checklist

1. Create a repository from this template named `onzio-mockup-<club-slug>`.
2. Duplicate `src/config/clubs/meridian/` to `src/config/clubs/<club-slug>/`. Edit the club identity, colors, league, location, contact information, roster, staff, fixtures, sponsors, products, and analytics samples. Keep `meridian/` as an unreferenced example.
3. Change the single import in `src/config/prospect.ts` to the new club module.
4. Replace the files in `public/prospect/` with the prospect’s full-color crest, optional light/white crest, hero artwork or approved photo, optional matchday gallery, and relevant sponsor/product artwork. Keep configuration filenames aligned with the files. Configure gallery paths through `branding.galleryImages`; leave it unset to omit the slideshow. Product photos intended for layered dark sections should use transparent PNGs.
5. Update the title and description in `src/app/layout.tsx` to the prospect club. Keep `robots: { index: false, follow: false }`.
6. Run `npm run dev` and review Starter and Pro at desktop and mobile widths. Confirm both public and admin navigation change with the selected version. Starter must show no sponsor content, statistics, store, seasons, or analytics and its admin must expose only Dashboard, Players, Staff, and Schedule/Results.
7. Import the repository into Vercel, deploy it, and optionally assign a clearer preview domain.
8. Set `defaultTeamId` to the public team the preview should display. The current two-tier public experience does not expose a team switcher.
9. Verify the homepage header starts transparent, uses a large crest-only brand with no separate club/location text, uses the light crest over the hero, and changes to a white header with the colored crest after the hero crest passes the disclosure bar. Confirm the crest remains readable and clear of navigation controls at desktop and mobile widths.
10. Confirm `/roster` includes players by position plus the separate Technical Staff section and that `/staff` redirects to the staff anchor. When a player or staff portrait is missing, the card and Pro modal must fall back to `branding.crest`. Verify Starter cards remain static with no profile modal or statistics, while Pro cards expose hover statistics and player/staff profile modals.
11. Run `npx next typegen`, `npx tsc --noEmit`, `npm run lint`, and `npm run build` before handoff.

Club-specific work belongs in `src/config/clubs/<club-slug>/`, `public/prospect/`, the one-line active import, and layout metadata. The GSAP selectors and shared public information architecture should remain club-agnostic. If a prospect swap requires editing a shared component, treat it as a template defect and fix it here first.
