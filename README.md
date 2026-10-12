# Birthday Platform

A secure, production-oriented Next.js app for managing personalized birthday and friendship websites.

## Features

- Marketing landing page and customer/admin login flows
- Protected customer and admin dashboards
- Secure website editor with draft/publish model
- Public read-only viewer at `/p/[slug]`
- Supabase Auth + PostgreSQL + RLS foundations
- Storage and invitation scaffolding
- Validation, audits, and security-first architecture

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase Auth / PostgreSQL / Storage / RLS
- Zod validation
- React Hook Form
- Jest for policy and access tests

## Local setup

1. Copy `.env.example` to `.env.local` and fill in values.
2. Install dependencies:
   `npm install`
3. Run the app:
   `npm run dev`
4. Open http://localhost:3000

## Supabase setup

1. Create a new Supabase project.
2. In the SQL editor, run migrations from `supabase/migrations/` in order.
3. Create a storage bucket called `website-media` if using private uploads.
4. Apply storage policies from `supabase/storage_policies.sql`.
5. Configure the auth redirect URLs for local and production.

## Administrator provisioning

Use a trusted provisioning workflow. A secure server-side admin assignment should be performed with an elevated database function or service-role script, not via client UI forms.

## Testing

Run:

`npm test`

## Deployment

Deploy to Vercel. Add the required environment variables in Vercel project settings.

## Security notes

- Keep the service role key on the server only.
- Never expose private tables or drafts publicly.
- Always validate content before saving or publishing.
- Use RLS and server authorization for every mutation.
- Do not treat a slug or URL alone as authorization.

## Manual configuration still required

- Configure real Supabase project credentials.
- Add production auth redirect URLs.
- Create storage bucket and policies.
- Enable real database migration execution in your Supabase project.
- Replace schema placeholders with live production admin provisioning logic.
