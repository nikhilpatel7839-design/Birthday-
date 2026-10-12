import Link from 'next/link';

export default function InviteAcceptPage() {
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

      <main className="mx-auto max-w-xl px-4 py-16">
        <div className="rounded-3xl border border-rose-100 bg-white p-8 shadow-paper">
          <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Invitation</p>
          <h1 className="mt-3 font-display text-4xl text-ink">Accept your invitation</h1>
          <p className="mt-3 text-sm text-ink/75">Securely create or join your personalized birthday website account.</p>
          <button className="mt-8 w-full rounded-full bg-rose-500 px-5 py-3 text-white">Continue to sign in</button>
        </div>
      </main>
    </>
  );
}
