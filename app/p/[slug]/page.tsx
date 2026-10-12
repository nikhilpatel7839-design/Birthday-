import { AppHeader } from '@/components/AppHeader';

export default function PublicPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <article className="rounded-[2rem] border border-rose-100 bg-white p-8 shadow-paper">
          <div className="mb-8 rounded-[1.5rem] bg-gradient-to-br from-[#f5dce2] via-[#fffaf3] to-[#f5dfd8] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-rose-700">For Maya</p>
            <h1 className="mt-4 font-display text-4xl text-ink">You are the sparkle in every room.</h1>
          </div>

          <div className="space-y-8 text-ink/80">
            <p className="text-lg">
              Happy birthday, sweet friend. Your kindness, laughter, and warmth make the whole world brighter.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {['#f9dfe7', '#f7d7c4', '#e8ddff'].map((color) => (
                <div key={color} className="h-40 rounded-[1.5rem] border border-rose-100" style={{ background: color }} />
              ))}
            </div>
            <p className="text-base">With love, Jamie</p>
          </div>
        </article>
      </main>
    </>
  );
}
