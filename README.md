# Listing Profit Dashboard for Etsy Makers

A Next.js SaaS app for Etsy 3D print, laser-cut, and handmade sellers to calculate listing profitability, save reusable cost templates, build custom quotes, and track margin across their catalog.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Prisma 7 + SQLite
- NextAuth credentials auth with optional Google OAuth
- Stripe, Resend, and PostHog with guarded fallbacks

## Local Setup

1. Install dependencies:

```bash
npm ci
```

2. Copy `.env.example` to `.env` if needed and adjust values. The app works locally with SQLite and no external service credentials.

3. Initialize the database and seed demo data:

```bash
npx prisma db push
npm run db:seed
```

4. Start the dev server:

```bash
npm run dev
```

The seeded demo login is `demo@example.com` / `demo1234`.

## Build

```bash
npm run build
```

The build script generates the Prisma client before running `next build`, so a clean checkout can build without a separate manual step.

## Deployment

- `next.config.ts` uses `output: "standalone"` for container deployment.
- `Dockerfile` uses `node:20-slim`, generates Prisma client in the builder stage, and initializes the SQLite schema on container start with a Prisma 7 compatible `db push --schema ./prisma/schema.prisma --url "$DATABASE_URL"` command.
- External services are optional. Without credentials, billing uses a safe local fallback and email/analytics calls no-op cleanly.
- If `AUTH_SECRET` is omitted, the container generates a temporary runtime secret so the app still boots. Set a persistent production `AUTH_SECRET` to keep sessions valid across restarts.
