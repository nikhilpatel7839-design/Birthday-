import Link from 'next/link';

export function LandingHero() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-ink">
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
              Personalized celebrations
            </p>
            <h1 className="max-w-xl text-4xl font-display leading-tight md:text-6xl">
              Sweet memories for every milestone.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink/75">
              Build premium birthday and friendship websites with secure admin controls, customer-only editing, and public celebration pages.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/login" className="rounded-full bg-rose-500 px-6 py-3 text-white shadow-card transition hover:bg-rose-600">
                Customer login
              </Link>
              <Link href="/dashboard" className="rounded-full border border-rose-200 bg-white px-6 py-3 text-ink transition hover:bg-rose-50">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -rotate-6 rounded-[2rem] bg-lilac/60" />
            <div className="relative rounded-[2rem] border border-rose-100 bg-white p-5 shadow-paper">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-[#f8dfe9] via-[#fffaf3] to-[#f5dfd8] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-rose-700">HAPPY BDAY</span>
                  <span className="text-xs text-ink/70">Public page</span>
                </div>
                <div className="space-y-4">
                  <div className="h-36 rounded-[1.5rem] bg-[linear-gradient(135deg,#d5b7d8,#f8dce3,#f7d7c4)]" />
                  <h2 className="font-display text-3xl text-ink">Maya, you are deeply loved.</h2>
                  <p className="text-sm text-ink/75">A curated scrapbook of laughter, cake wishes, and heartfelt notes from the people who adore you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
