import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <header className="border-b border-rose-100 bg-cream/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-bold uppercase tracking-[0.2em] text-ink">
            Birthday Platform
          </Link>
          <nav className="flex items-center gap-4 text-sm text-ink/80">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-rose-100 bg-white p-8 shadow-paper">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Secure access</p>
          <h1 className="mt-3 font-display text-4xl text-ink">Welcome back</h1>
          <p className="mt-3 text-sm text-ink/70">Use your secure Supabase account to manage your personalized website.</p>

          <form className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Email</label>
              <input type="email" className="w-full rounded-2xl border border-rose-100 bg-rose-50 p-3 outline-none" placeholder="customer@example.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">Password</label>
              <input type="password" className="w-full rounded-2xl border border-rose-100 bg-rose-50 p-3 outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full rounded-full bg-rose-500 px-5 py-3 text-white">Sign in</button>
          </form>

          <div className="mt-6 space-y-3">
            <Link href="/dashboard" className="block rounded-2xl border border-rose-200 bg-white px-5 py-3 text-center text-ink transition hover:bg-rose-50">
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
