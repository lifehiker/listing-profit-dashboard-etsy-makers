# FORGE PRD Tasks

Status key: `[x] complete` `[~] partial` `[ ] remaining`

Final pass updated on 2026-05-14 after build, migration, seed, dev-server smoke tests, lint, and route verification.

## Foundation
- [x] Read `PRD.md` and `BUILD_INSTRUCTIONS.md` end-to-end
- [x] Audit existing codebase against PRD requirements
- [x] App Router, TypeScript, Tailwind, and standalone Next config
- [x] Next.js 16 compatibility updates
  Completed: replaced deprecated `middleware` convention with `src/proxy.ts`, removed `useSearchParams` prerender issue, verified production build
- [x] Shared design system, layout primitives, metadata baseline
- [x] Local-safe environment defaults and `.env.example`

## Data Model
- [x] Prisma schema for `User`, `Account`, `Session`, `VerificationToken`
- [x] Prisma schema for `Subscription`, `Listing`, `CostTemplate`, `FeePreset`
- [x] Prisma schema for `Quote`, `QuoteLineItem`, `LeadCapture`, `UsageEvent`
- [x] Local database bootstrap
  Completed: Prisma 7 config migration, adapter-based client, migration, seed script, SQLite fallback database

## Auth
- [x] Account signup/login flow with credentials
- [x] Google OAuth path with missing-env guard/fallback
  Completed: provider only mounts when env vars exist; app still works without Google credentials
- [x] Protected app routes and session-aware navigation
- [x] Guided onboarding with seeded sample data
- [x] Auth hardening for current Next version
  Completed: explicit secret handling, JWT session strategy for credentials, proxy route protection smoke-tested

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
- [x] Page completeness/polish audit
  Completed: major empty states, seeded content, editable management flows, print/export path, pricing/billing flows

## API / Server Actions
- [x] Auth handlers and signup action
- [x] Listing CRUD, duplicate, archive
- [x] Cost template CRUD
- [x] Fee preset CRUD
- [x] Quote CRUD
- [x] CSV import handler
- [x] Listings export endpoint
- [x] Quotes export endpoint
- [x] Billing checkout/mock upgrade route
- [x] Stripe webhook handler with guard
- [x] Lead capture action

## Core Workflows
- [x] Shared profit calculation engine
- [x] Public calculator with live results
- [x] Save gate from public calculator
  Completed: authenticated users are routed into workspace save flow, anonymous users to signup
- [x] Saved listings dashboard with profit breakdowns
- [x] Reusable templates and Etsy fee presets
- [x] Quote builder from listing or scratch
- [x] Printable/exportable quote view
- [x] Basic reporting with tags/season filters
  Completed: dashboard profitability summary and seasonal/listing watchlist coverage for MVP
- [x] CSV import/export

## Integrations / Safe Fallbacks
- [x] Stripe billing or guarded local fallback
- [x] Resend email or guarded no-op fallback
- [x] PostHog analytics or guarded client fallback
- [x] Storage/export assets with local-safe implementation
  Completed: local SQLite, CSV exports, and seeded sample content keep the app usable without external services

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
- [x] Sitemap, robots, structured metadata/JSON-LD
- [x] Marketing page quality audit

## Deployment / Ops
- [x] Production-ready Dockerfile
- [x] `output: "standalone"` in Next config
- [x] Env var documentation
- [x] `HUMAN_INPUT_NEEDED.md`

## Verification
- [x] `npm run build`
- [x] `npm run lint`
- [x] Start dev server successfully
- [x] Smoke test primary routes
- [~] Docker build verification
  Attempted: `docker build .`
  Result: blocked by local Docker socket permissions (`permission denied while trying to connect to the docker API`)
- [x] Review UI polish and interactions
  Completed: route/content review plus authenticated flow smoke tests for login, billing fallback, exports, quotes, and protected navigation
- [x] Create `FORGE_COMPLETION_AUDIT.md`
