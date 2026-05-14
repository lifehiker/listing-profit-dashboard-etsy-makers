# FORGE PRD Tasks

Status key: `[x] complete` `[~] blocked outside app` `[ ] remaining`

Final pass updated on 2026-05-14 after re-reading `PRD.md` and `BUILD_INSTRUCTIONS.md`, auditing the existing implementation, fixing the production container startup path, rerunning the production build, linting, smoke-testing the dev server, and booting the standalone server locally.

## Foundation
- [x] Read `PRD.md` end-to-end
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end
- [x] Audit existing codebase against PRD scope before edits
- [x] Verify Next.js 16 conventions from installed docs
- [x] Confirm App Router, TypeScript, Tailwind, and `output: "standalone"`
- [x] Confirm shared layout, metadata, and provider setup
- [x] Confirm `.env.example` documents the supported local-safe configuration

## Data Model
- [x] Auth/session models: `User`, `Account`, `Session`, `VerificationToken`
- [x] App models: `Subscription`, `Listing`, `CostTemplate`, `FeePreset`
- [x] Quote and growth models: `Quote`, `QuoteLineItem`, `LeadCapture`, `UsageEvent`
- [x] Local SQLite-backed Prisma setup with Prisma 7 config
- [x] Seed data and default presets for onboarding/demo flows

## Auth
- [x] Credentials signup and login flow
- [x] Optional Google OAuth with missing-env guard
- [x] Protected `/app/*` routes via `src/proxy.ts`
- [x] Session-aware app and marketing navigation
- [x] Onboarding-safe sample data flow

## Core Pages
- [x] `/`
- [x] `/pricing`
- [x] `/login`
- [x] `/signup`
- [x] `/app/dashboard`
- [x] `/app/listings`
- [x] `/app/listings/new`
- [x] `/app/listings/[id]`
- [x] `/app/templates`
- [x] `/app/quotes`
- [x] `/app/quotes/new`
- [x] `/app/quotes/[id]`
- [x] `/app/import`
- [x] `/app/billing`
- [x] `/q/[id]`
- [x] Review page UX/content for polish and completeness

## API / Server Actions
- [x] Auth route handler
- [x] Signup server action
- [x] Listing CRUD, duplicate, archive actions
- [x] Template CRUD actions
- [x] Fee preset CRUD actions
- [x] Quote CRUD actions
- [x] CSV import action
- [x] Listings CSV export route
- [x] Quotes CSV export route
- [x] Stripe checkout route with safe mock fallback
- [x] Stripe webhook route with missing-env guard
- [x] Lead capture action

## Core Workflows
- [x] Shared profit calculation engine
- [x] Public calculator with live profitability output
- [x] Save-listing CTA gated by auth
- [x] Saved listings dashboard and profit breakdowns
- [x] Reusable cost templates and Etsy fee presets
- [x] Quote builder from saved listing or scratch
- [x] Public printable quote route
- [x] Basic reporting/watchlist coverage on dashboard
- [x] CSV import/export flows

## Integrations / Safe Fallbacks
- [x] Stripe integration guarded behind env vars with local fallback behavior
- [x] Resend email sending guarded behind env vars
- [x] PostHog client initialization guarded behind env vars
- [x] Local-safe persistence/export story without external services

## Marketing / SEO Pages
- [x] `/etsy-listing-margin-calculator`
- [x] `/etsy-fee-calculator-handmade-sellers`
- [x] `/3d-print-seller-cost-calculator`
- [x] `/laser-cut-etsy-pricing-tool`
- [x] `/how-to-price-custom-3d-prints-on-etsy`
- [x] `/how-to-price-laser-cut-products-on-etsy`
- [x] `/compare/craftybase-vs-listing-profit-dashboard`
- [x] `/compare/fablog-vs-listing-profit-dashboard`
- [x] `/templates/custom-order-quote-template-etsy`
- [x] Sitemap, robots, and metadata coverage
- [x] Review public UI/content for polish and CTA quality

## Deployment / Ops
- [x] Production-ready Dockerfile
  Completed: fixed runtime bootstrap to use Prisma 7 compatible `db push` syntax and explicit `--url` so the container no longer depends on a missing runtime Prisma config file.
- [x] Standalone Next.js output config
- [x] Environment variable documentation
- [x] `HUMAN_INPUT_NEEDED.md` for optional external credentials

## Verification
- [x] `npm run build`
- [x] `npm run lint`
- [x] Start dev server successfully
- [x] Smoke test public routes
- [x] Smoke test protected route redirect
- [x] Smoke test authenticated dashboard/listings/templates/quotes routes
- [x] Smoke test export endpoints
- [x] Smoke test billing fallback
- [x] Smoke test standalone production server boot
- [~] Run `docker build .`
  Blocked outside app: local Docker socket permissions deny access to the daemon.
- [x] Create `FORGE_COMPLETION_AUDIT.md`
