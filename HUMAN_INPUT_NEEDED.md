# HUMAN INPUT NEEDED

No credentials are required to run the app locally with the built-in safe fallbacks.

Optional production credentials:

1. Google OAuth
   Provide `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to enable Google sign-in.

2. Stripe
   Provide `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_STANDARD_MONTHLY`, and `STRIPE_PRICE_PRO_MONTHLY` to use live subscription checkout and webhook syncing instead of the local mock upgrade path.

3. Resend
   Provide `RESEND_API_KEY` and `EMAIL_FROM` to send real welcome emails.

4. PostHog
   Provide `NEXT_PUBLIC_POSTHOG_KEY` and optionally `NEXT_PUBLIC_POSTHOG_HOST` to enable analytics capture.

5. Site URL
   Set `NEXT_PUBLIC_SITE_URL` and `NEXTAUTH_URL` to the deployed domain in production.
