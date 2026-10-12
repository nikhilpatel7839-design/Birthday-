import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';

export default function AdminWebsitesPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Admin</p>
            <h1 className="font-display text-4xl text-ink">Website management</h1>
          </div>
          <button className="rounded-full bg-rose-500 px-5 py-3 text-white">New website</button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            ['Maya Birthday', 'published', 'maya-birthday'],
            ['Sea Breeze Memory', 'draft', 'sea-breeze-memory'],
            ['Friendship Parade', 'unpublished', 'friendship-parade']
          ].map(([title, status, slug]) => (
            <Link key={title} href={`/admin/websites/${slug}`} className="rounded-3xl border border-rose-100 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-rose-700">{status}</span>
                <span className="text-xs text-ink/60">#{Math.random().toString(36).slice(2, 6)}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl text-ink">{title}</h3>
              <p className="mt-2 text-sm text-ink/70">/p/{slug}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
