# New Prospect Checklist

1. Create a repository from this template named `onzio-mockup-<club-slug>`.
2. Duplicate `src/config/clubs/meridian/` to `src/config/clubs/<club-slug>/`. Edit the club identity, colors, league, location, contact information, roster, staff, fixtures, sponsors, products, and analytics samples. Keep `meridian/` as an unreferenced example.
3. Change the single import in `src/config/prospect.ts` to the new club module.
4. Replace the files in `public/prospect/` with the prospect’s crest, hero artwork or approved photo, and relevant sponsor/product artwork. Keep configuration filenames aligned with the files.
5. Update the title and description in `src/app/layout.tsx` to the prospect club. Keep `robots: { index: false, follow: false }`.
6. Run `npm run dev` and review Starter, Pro, and Elite at desktop and mobile widths. Confirm both public and admin navigation change with the selected version. Starter must show no sponsor content, statistics, store, seasons, or analytics and its admin must expose only Dashboard, Players, Staff, and Schedule/Results.
7. Import the repository into Vercel, deploy it, and optionally assign a clearer preview domain.
8. If the club has no academy or multi-team structure, keep only the first team in `teams`. The Elite team switcher hides automatically when only one team exists.

Club-specific work belongs in `src/config/clubs/<club-slug>/`, `public/prospect/`, the one-line active import, and layout metadata. If a prospect swap requires editing a shared component, treat it as a template defect and fix it here first.
