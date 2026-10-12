import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';

export default function LoginPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-rose-100 bg-white p-8 shadow-paper">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Secure access</p>
          <h1 className="mt-3 font-display text-4xl text-ink">Welcome back</h1>
          <p className="mt-3 text-sm text-ink/70">Sign in with your Supabase account to manage your personalized website.</p>
          <div className="mt-8 space-y-3">
            <Link href="/dashboard" className="block rounded-2xl bg-rose-500 px-5 py-3 text-center text-white transition hover:bg-rose-600">
              Continue as customer
            </Link>
            <Link href="/admin/customers" className="block rounded-2xl border border-rose-200 bg-white px-5 py-3 text-center text-ink transition hover:bg-rose-50">
              Continue as administrator
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
