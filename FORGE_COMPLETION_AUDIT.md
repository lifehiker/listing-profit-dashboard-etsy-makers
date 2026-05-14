# FORGE COMPLETION AUDIT

This audit maps each major PRD requirement to the concrete files that implement it.

## Foundation

- Next.js App Router app shell, metadata, and providers:
  `src/app/layout.tsx`
  `src/components/auth/app-providers.tsx`
  `src/app/globals.css`
  `next.config.ts`
- Next 16 route protection convention:
  `src/proxy.ts`
- Prisma 7 configuration:
  `prisma/schema.prisma`
  `prisma.config.ts`
  `src/lib/db.ts`
  `src/lib/database-url.ts`
- Clean-build Prisma generation and package scripts:
  `package.json`

## Data model

- Auth/session models and product models:
  `prisma/schema.prisma`
- Seeded sample content and default presets:
  `src/lib/sample-data.ts`
  `prisma/seed.ts`
- Initial migration:
  `prisma/migrations/20260514061501_init/migration.sql`

## Auth

- NextAuth config, credentials auth, optional Google OAuth:
  `src/lib/auth.ts`
  `src/app/api/auth/[...nextauth]/route.ts`
- Signup flow:
  `src/app/signup/page.tsx`
  `src/app/signup/actions.ts`
- Login flow:
  `src/app/login/page.tsx`
- Session-aware nav and route protection:
  `src/components/site/site-header.tsx`
  `src/components/app/topbar.tsx`
  `src/proxy.ts`

## Shared business logic

- Profit engine and quote totals:
  `src/lib/profit.ts`
- Plan entitlements:
  `src/lib/plan.ts`
- Validation schemas:
  `src/lib/schemas.ts`
- Setup helpers, onboarding seeding, and plan lookup:
  `src/lib/data.ts`

## Marketing and SEO pages

- Homepage:
  `src/app/(marketing)/page.tsx`
  `src/components/marketing/hero.tsx`
  `src/components/marketing/feature-grid.tsx`
  `src/components/marketing/pricing-cards.tsx`
- SEO calculator and article pages:
  `src/app/(marketing)/etsy-listing-margin-calculator/page.tsx`
  `src/app/(marketing)/etsy-fee-calculator-handmade-sellers/page.tsx`
  `src/app/(marketing)/3d-print-seller-cost-calculator/page.tsx`
  `src/app/(marketing)/laser-cut-etsy-pricing-tool/page.tsx`
  `src/app/(marketing)/how-to-price-custom-3d-prints-on-etsy/page.tsx`
  `src/app/(marketing)/how-to-price-laser-cut-products-on-etsy/page.tsx`
  `src/app/(marketing)/compare/craftybase-vs-listing-profit-dashboard/page.tsx`
  `src/app/(marketing)/compare/fablog-vs-listing-profit-dashboard/page.tsx`
  `src/app/(marketing)/templates/custom-order-quote-template-etsy/page.tsx`
  `src/components/marketing/seo-page.tsx`
- SEO infrastructure:
  `src/app/sitemap.ts`
  `src/app/robots.ts`

## Public calculator and lead capture

- Public calculator:
  `src/components/calculator/public-profit-calculator.tsx`
- Lead capture form and action:
  `src/components/marketing/lead-capture-form.tsx`
  `src/app/actions.ts`

## App pages and workflows

- App layout and navigation:
  `src/app/app/layout.tsx`
  `src/components/app/app-sidebar.tsx`
  `src/components/app/topbar.tsx`
- Dashboard and reporting summary:
  `src/app/app/dashboard/page.tsx`
  `src/components/app/kpi-card.tsx`
  `src/components/onboarding/checklist.tsx`
- Listings management:
  `src/app/app/listings/page.tsx`
  `src/app/app/listings/new/page.tsx`
  `src/app/app/listings/[id]/page.tsx`
  `src/app/app/listings/actions.ts`
  `src/components/listings/listing-form.tsx`
  `src/components/listings/listings-table.tsx`
  `src/components/listings/profit-breakdown-card.tsx`
- Templates and fee presets:
  `src/app/app/templates/page.tsx`
  `src/app/app/templates/actions.ts`
  `src/components/templates/template-form.tsx`
  `src/components/fees/fee-preset-form.tsx`
- Quotes:
  `src/app/app/quotes/page.tsx`
  `src/app/app/quotes/new/page.tsx`
  `src/app/app/quotes/[id]/page.tsx`
  `src/app/q/[id]/page.tsx`
  `src/app/app/quotes/actions.ts`
  `src/components/quotes/quote-form.tsx`
  `src/components/quotes/quote-preview.tsx`
  `src/components/quotes/print-button.tsx`
- CSV import/export:
  `src/app/app/import/page.tsx`
  `src/app/app/import/actions.ts`
  `src/components/listings/import-csv-dialog.tsx`
  `src/app/api/export/listings/route.ts`
  `src/app/api/export/quotes/route.ts`
- Billing:
  `src/app/app/billing/page.tsx`
  `src/components/billing/billing-client-page.tsx`
  `src/app/api/stripe/checkout/route.ts`
  `src/app/api/webhooks/stripe/route.ts`
  `src/lib/stripe.ts`

## Integrations and fallbacks

- Email fallback and welcome email:
  `src/lib/email.ts`
  `src/emails/welcome-email.tsx`
- Analytics fallback:
  `src/components/analytics/posthog-provider.tsx`
- External credential documentation:
  `HUMAN_INPUT_NEEDED.md`

## Deployment

- Standalone Next build config:
  `next.config.ts`
- Docker image:
  `Dockerfile`
  `.dockerignore`
- Deployment fix applied:
  `Dockerfile`
  Replaced the stale Prisma CLI startup command with a Prisma 7 compatible `db push --schema ./prisma/schema.prisma --url "$DATABASE_URL"` call so the runtime image no longer fails on a removed flag or on missing `prisma.config.ts`.
- Environment variable and setup documentation:
  `.env.example`
  `README.md`

## Verification completed

- `./node_modules/.bin/prisma db push --schema ./prisma/schema.prisma --url 'file:./prisma/dev.db'`
- `npm run db:seed`
- `npm run lint`
- `npm run build`
- `npm run dev`
- production-style standalone boot:
  `PORT=3001 ... node .next/standalone/server.js`
- HTTP smoke tests:
  public homepage and SEO route
  protected redirect to sign-in
  credentials login with seeded demo user
  authenticated dashboard, listings, templates, quotes, import, billing, printable quote
  billing mock upgrade path
- `docker build .` attempted but blocked by local Docker socket permissions

## Intentionally deferred external-credential items

- Live Google OAuth requires Google app credentials.
- Live Stripe checkout/webhooks require Stripe keys and price IDs.
- Live Resend delivery requires Resend credentials and sender configuration.
- Live PostHog capture requires a project key.

The app still runs without those credentials because it uses local SQLite persistence, guarded provider initialization, mock Stripe upgrade handling, and no-op email/analytics fallbacks.
