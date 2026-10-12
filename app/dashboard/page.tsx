import Link from 'next/link';

export default function DashboardPage() {
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

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Dashboard</p>
            <h1 className="font-display text-4xl text-ink">Your celebration workspace</h1>
          </div>
          <Link href="/edit/demo" className="rounded-full bg-rose-500 px-5 py-3 text-white shadow-card hover:bg-rose-600">
            Open editor
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Websites', '24'],
            ['Published', '15'],
            ['Customer access', '8']
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-rose-100 bg-white p-6 shadow-card">
              <p className="text-sm text-ink/70">{label}</p>
              <p className="mt-2 text-3xl font-display text-ink">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Recent activity</h2>
            <ul className="mt-6 space-y-4">
              <li className="border-b border-rose-50 pb-3 text-sm text-ink/75">Published Maya&apos;s birthday page</li>
              <li className="border-b border-rose-50 pb-3 text-sm text-ink/75">Updated the anniversary gallery</li>
              <li className="text-sm text-ink/75">Invited a new customer for a friendship page</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Quick actions</h2>
            <div className="mt-5 space-y-3">
              <Link href="/edit/demo" className="block rounded-2xl bg-lilac/60 px-4 py-3 text-ink">Edit website</Link>
              <Link href="/admin/websites" className="block rounded-2xl bg-cream px-4 py-3 text-ink">Manage websites</Link>
              <Link href="/invite/accept" className="block rounded-2xl bg-peach px-4 py-3 text-ink">Review invitation</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
