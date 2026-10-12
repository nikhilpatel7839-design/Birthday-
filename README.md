# Birthday Platform - Production Implementation

A secure, full-stack Next.js application for managing personalized birthday and friendship websites with enterprise-grade security.

## Architecture

### Technology Stack
- **Frontend:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions, Supabase Auth, PostgreSQL with RLS
- **Storage:** Supabase Storage with signed URLs
- **Validation:** Zod schemas
- **Testing:** Jest with RLS policy tests

### Database Design
- `profiles` - User roles (customer/admin) with strict RLS
- `websites` - Website records with draft/published states
- `website_versions` - Separate draft and published content (JSONB)
- `website_media` - Image management with ownership tracking
- `website_invitations` - Secure token-based customer invitations
- `audit_logs` - Complete action audit trail

## Security Model

### Authentication & Authorization
1. **Supabase Auth** - Email/password with secure session management
2. **Role-Based Access Control (RBAC)**
   - Customers can only edit their assigned websites
   - Admins can manage all websites and customers
   - Roles are database-enforced via RLS policies
   - Role assignment never controlled by client

3. **Row-Level Security (RLS)**
   - Every table has RLS enabled
   - `auth.uid()` checks in all policies
   - Customers see only their own data
   - Public users see only published content
   - Draft content never exposed to public

### Publishing Model
- Websites have independent `draft` and `published` versions
- Saving creates/updates only the draft version
- Publishing validates draft and atomically updates published version
- Unpublishing immediately stops public access
- Secure `publish_website()` function enforces authorization

### Media Management
- Server-side file validation (MIME type, size)
- Files stored with ownership tracking
- Upload/delete restricted to website owner
- Public read via signed URLs or public bucket policies

### Invitations
- Token-based secure invitations (SHA256 hashed)
- 7-day expiration by default
- Only admins or owners can invite
- Revocation immediately blocks access
- All actions audited

## Server Actions

### Authentication
- `signOutAction()` - Secure logout
- `getCurrentUser()` - Fetch authenticated user

### Websites
- `saveDraft()` - Save draft with RLS enforcement
- `publishWebsite()` - Publish with authorization check
- `getWebsitesByOwner()` - List user's websites
- `getPublishedWebsite()` - Public read-only endpoint

### Media
- `uploadWebsiteImage()` - Validated image upload
- `deleteWebsiteImage()` - Owner-only deletion

### Invitations
- `inviteCustomer()` - Create secure invitation
- `revokeInvitation()` - Revoke access

## Routes

### Public
- `/` - Landing page
- `/login` - Sign in
- `/p/[slug]` - Public website viewer
- `/invite/accept` - Invitation acceptance

### Protected (Authenticated)
- `/dashboard` - Customer dashboard
- `/edit/[id]` - Website editor

### Admin Only
- `/admin/customers` - Customer management
- `/admin/websites` - Website management
- `/admin/websites/[id]` - Website detail

## Middleware

- Redirects unauthenticated users from protected routes
- Maintains session via Supabase Auth cookies
- Supports role-based route protection

## Testing

Comprehensive security tests:

```bash
npm test
```

Test suites:
- `tests/auth.test.ts` - Authentication and authorization
- `tests/publishing.test.ts` - Draft/publish workflows
- `tests/media.test.ts` - Image upload/deletion
- `tests/public.test.ts` - Public viewer access
- `tests/security.test.ts` - General security checks

## Setup Instructions

### 1. Create Supabase Project

1. Go to https://app.supabase.com
2. Create a new project
3. Copy the project URL and anon key

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Database Migrations

In Supabase SQL Editor, run migrations in order:

1. `supabase/migrations/001_init_schema.sql` - Base schema
2. `supabase/migrations/002_rls_policies.sql` - RLS policies
3. `supabase/migrations/003_publish_function.sql` - Publish function
4. `supabase/migrations/004_unpublish_function.sql` - Unpublish function
5. `supabase/migrations/005_auth_trigger.sql` - Auto-create profile on signup
6. `supabase/migrations/006_rls_enhancements.sql` - Additional policies

### 4. Configure Storage

1. In Supabase console → Storage → Create bucket `website-media`
2. Set as public bucket
3. Apply storage policies from Supabase SQL Editor

### 5. Setup Authentication

1. Go to Auth → Providers → Email
2. Enable Email provider
3. Configure auth redirect URLs:
   - `http://localhost:3000/auth/callback` (local)
   - `https://yourdomain.com/auth/callback` (production)

### 6. Create Admin User

Run this SQL in Supabase to create an admin account:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

### 7. Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production Deployment

### Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in project settings
4. Deploy

### Important Security Checklist

- [ ] Service role key is server-only (never in browser)
- [ ] All protected routes use middleware auth check
- [ ] RLS policies are tested against real database
- [ ] Storage bucket policies restrict uploads/deletes
- [ ] Audit logs capture all sensitive actions
- [ ] Rate limiting configured for auth endpoints
- [ ] HTTPS enforced in production
- [ ] CORS policies configured for storage
- [ ] Environment variables never committed to Git
- [ ] Regular security audits of RLS policies

## API Security

### Server Actions
- All accept `FormData` or typed parameters
- Perform server-side authorization before DB operations
- Return `{ success, error, data }` format
- Never expose sensitive details in error messages

### Public Endpoints
- Read-only access to published content
- No auth required
- RLS policies enforce published-only visibility
- Rate limited by IP address (recommended)

## Monitoring & Auditing

- All state-changing operations logged to `audit_logs`
- Admin dashboard can review action history
- Timestamp all events in UTC
- Never delete audit records

## License

MIT
