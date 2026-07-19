# Onzio Club Platform Mockup Plan

## Purpose

Create a reusable, customer-facing concept mockup for semi-professional soccer clubs. Each mockup will be personalized with the prospect's club name, crest, colors, imagery, and representative content, then hosted on Vercel.

The mockup is a sales prototype rather than a functional club platform. It should demonstrate what a completed Onzio website and admin experience could look like without requiring a database, authentication, payment processing, or persistent data.

## Customer Outreach Context

Current outreach message:

> Hi, I'm Christian, I built the website for Rose City Futbol Club. Congrats on the National Championship. I checked out your current site and had a few ideas, so I put together a quick mockup of what an updated version could look like.
>
> I build sites for semi-pro clubs that help land sponsorships: live rosters and stats, game scheduling and results, a team store, and an admin portal you can update from your phone in seconds.
>
> No setup fee, $65 to $99/month, cancel anytime. Want me to send the mockup?

Recommended revised positioning:

> Hi, I'm Christian, I built the website for Rose City Futbol Club. Congrats on the National Championship. I checked out your current site and had a few ideas, so I put together a quick mockup of what an updated version could look like.
>
> I build sites for semi-pro clubs that are easy to update from your phone. Depending on the plan, they can include live rosters and results, player stats, sponsor showcases, a team store, and a full admin portal.
>
> Plans start at $65/month, with a custom domain and hosting included. Setup fees are currently waived for launch clubs, and you can cancel anytime. Want me to send the mockup?

This wording avoids implying that every feature is included in Starter and preserves the ability to introduce setup fees later.

## Pricing

- Starter: $65 per month
- Pro: $99 per month
- Elite: $119 per month
- Cancel anytime
- One standard available custom domain is included
- Hosting, maintenance, and routine support are included
- Premium domain purchases are quoted separately

## Setup And Onboarding Policy

- Setup fees are initially waived for launch clubs.
- The waived fee should be presented as a launch promotion rather than a permanent promise.
- Initial onboarding includes uploading up to 22 player profiles.
- Club administrators can manage the roster after launch.
- Academies with multiple levels, such as A, B, and C teams, require an additional setup fee because of the extra configuration, content entry, navigation, and testing.
- The amount and billing model for multi-team academies still need to be finalized.

Recommended future proposal presentation:

```text
Platform setup: [standard setup price]
Launch promotion: Waived
```

## Domain Policy

- Every customer receives a custom available domain.
- A normal-priced available domain is included.
- Premium domains are excluded and quoted separately.
- The club should own the domain while Onzio manages its connection and DNS configuration.
- If the subscription ends, the club retains ownership of its domain.

## Service Tiers

### Starter - $65 Per Month

Starter is a professional public club website with lightweight self-service club management.

Public website:

- Home page
- Roster
- Schedule and results
- About and contact information
- Coaching staff
- Mobile-responsive design
- Custom available domain
- Up to 22 player profiles included in initial onboarding

Admin capabilities:

- Add and edit players
- Add and edit coaches or staff
- Add and edit fixtures
- Update match results
- Upload player and staff photos
- Designed to be usable from a phone

Not included:

- Sponsor or partner display
- Sponsor management
- Player or match statistics
- Team store
- Analytics
- Advanced content management
- Custom club workflows

Starter must not display placeholder sponsor logos anywhere, including the footer.

### Pro - $99 Per Month

Pro is the complete standard club platform and should be positioned as the primary plan for most clubs.

Includes everything in Starter, plus:

- Sponsor and partner presentation
- Sponsor and partner management in the admin portal
- Player and match statistics
- Expanded player profiles
- Season management
- Team store
- External store integration or internal commerce integration
- More control over public website content and imagery
- Staff-facing analytics

Commerce policy:

- A club may connect an external store.
- Internal commerce is also supported when the club establishes and owns its payment-provider account.
- Supported examples may include Stripe, Square, Shopify, or another approved provider.
- Onzio connects the applicable API or checkout integration.
- The club receives payments directly and remains responsible for transactions, taxes, refunds, fulfillment, disputes, and payment-provider fees.
- Onzio should not become the merchant of record.

### Elite - $119 Per Month

Elite is the configurable club operations platform.

Includes everything in Pro, plus:

- Advanced analytics
- Advanced administrative workflows
- Custom club operations tools
- More extensive branding and layout customization
- Priority support
- Optional academy workflows
- Optional tryout and registration workflows
- Optional ticketing or venue tools
- Club-specific integrations
- More complicated multi-team structures when required

Features that create meaningful additional implementation or support work may require a separate quote even when the club is on Elite.

## Rose City Reference Positioning

The Rose City Futbol Club platform represents a mixture of Pro and Elite.

Pro-level capabilities include:

- Public roster and schedule
- Match results
- Player and match statistics
- Team store presentation
- Sponsor presentation
- Protected admin portal
- Expanded player profiles

Elite-level characteristics include:

- Multi-season operations
- Advanced analytics
- Shared club-branding controls
- Custom sponsor and opponent-logo workflows
- Custom shop-management workflows
- Club-specific administrative behavior

Rose City is proof that the underlying product direction is real, but the mockup should not copy Rose City's branding or exact visual design.

## Mockup Product Definition

The customer mockup will be:

- A reusable static website template
- Hosted on Vercel
- Personalized for each prospect
- Built with hard-coded sample data
- Responsive on desktop and mobile
- A visual representation of both the public website and the admin portal
- Honest about being a concept preview

The mockup will not include:

- A production database
- Working authentication
- Persistent form submissions
- Real payment processing
- Real product inventory
- Real analytics
- Operational admin mutations

Recommended disclosure:

> Interactive concept preview - sample content only

## Version Selector

The mockup should contain a simple version selector:

```text
[ Starter ] [ Pro ] [ Elite ]
```

The selector refers to versions of the proposed club platform. It should not resemble a large SaaS pricing table or interrupt the personalized club experience.

Switching versions changes both the public website and visual admin preview.

The admin navigation adjusts at the same time as the public site. Starter shows only Dashboard, Players, Staff, and Schedule/Results. Pro adds Seasons, Statistics, Sponsors, Store, and Analytics. Elite adds Teams, Branding, and Workflows. If a user manually opens a route outside the selected version, the mockup shows a quiet version-unavailable message and a control to switch versions rather than displaying the gated interface.

### Starter Preview

- Public home, roster, schedule/results, and about/contact views
- Coaching-staff presentation
- Visual roster and schedule admin controls
- Admin navigation limited to Dashboard, Players, Staff, and Schedule/Results
- Informational player capacity displayed as up to 22 profiles; sample actions remain available
- No sponsor areas
- No store
- No player statistics
- No analytics

### Pro Preview

Adds:

- Sponsor presentation
- Sponsor-management preview
- Player and match statistics
- Expanded player profiles
- Team-store presentation
- Commerce-management preview
- Season controls
- Staff-facing analytics preview

### Elite Preview

Adds:

- Advanced analytics
- Multi-team or academy navigation examples
- Custom operations panels
- Advanced branding controls
- Examples of club-specific workflows

## Mockup Information Architecture

### Public Experience

- Homepage hero using the prospect's identity
- Upcoming match or recent result
- Roster preview
- Schedule and results preview
- Club story or about section
- Contact information
- Pro and Elite only: sponsors and partners
- Pro and Elite only: statistics and expanded player profiles
- Pro and Elite only: team store
- Elite only: optional academy or custom club modules

### Visual Admin Experience

- Mobile-friendly admin shell
- Starter: players, staff, schedule, and results
- Pro: Starter tools plus seasons, statistics, sponsors, store, and analytics
- Elite: Pro tools plus custom workflows, advanced analytics, multi-team controls, and branding options

Admin interactions may open sample screens, drawers, or modals, but no information will be saved.

## Design Principles

- The prospect's club identity should lead the experience.
- Each mockup should look like that club's potential website, not an Onzio pricing page.
- Use the club's real crest, colors, imagery, and relevant competition context when available.
- Keep the Starter, Pro, and Elite selector secondary to the club presentation.
- Public pages should feel premium, editorial, and soccer-specific.
- Admin pages should feel efficient, operational, and credible on a phone.
- Do not copy Rose City's exact styling.
- Avoid implying that mock features are already operational.

## Reusable Prospect Configuration

Each generated mockup should be driven by a small prospect configuration containing:

- Club name
- Short name or initials
- Crest
- Primary and secondary colors
- League or competition
- City and state
- Hero image
- Sample roster
- Sample coaching staff
- Sample fixtures and results
- Contact details
- Pro and Elite sponsor examples
- Pro and Elite store examples
- Optional academy structure

The goal is to create new prospect mockups quickly without redesigning the application for every club.

## Commercial Decisions Still Open

1. Academy monthly billing:
   - One subscription plus a multi-team setup fee, or
   - An additional monthly charge for each additional team
2. Final academy setup-fee amount or calculation
3. Standard setup fee after the launch-waiver period ends
4. Limits for included initial staff, fixtures, photos, products, and sponsors
5. Routine-support boundaries and response expectations
6. Which payment and external-store providers will be officially supported
7. Whether heavily customized Elite work receives a separate implementation quote

## Recommended Next Steps

1. Confirm the remaining academy and onboarding limits.
2. Choose one representative fictional or real prospect for the first mockup.
3. Collect the club crest, colors, photos, league, location, and sample content.
4. Define the reusable prospect-configuration format.
5. Create a focused visual direction for the public site and mobile admin preview.
6. Build the static Starter version first.
7. Layer the Pro features onto the same template.
8. Layer the Elite examples onto the same template.
9. Add the simple Starter/Pro/Elite selector.
10. Verify desktop, mobile, and reduced-motion behavior.
11. Deploy the first concept to Vercel.
12. Use the first prospect response to refine the template before scaling outreach.
