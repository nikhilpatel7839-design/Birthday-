import Link from 'next/link';

export function AppHeader() {
  return (
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
  );
}
