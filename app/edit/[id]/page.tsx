import Link from 'next/link';
import { EditorStatus } from '@/components/EditorStatus';

export default function EditPage() {
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Edit website</p>
            <h1 className="font-display text-4xl text-ink">Maya Birthday</h1>
          </div>
          <button className="rounded-full bg-rose-500 px-5 py-3 text-white">Publish changes</button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-ink">Core details</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-rose-100 bg-rose-50 p-3" placeholder="Recipient name" defaultValue="Maya" />
                <input className="rounded-2xl border border-rose-100 bg-rose-50 p-3" placeholder="Sender name" defaultValue="Jamie" />
                <input className="md:col-span-2 rounded-2xl border border-rose-100 bg-rose-50 p-3" placeholder="Headline" defaultValue="You are the sparkle in every room." />
                <textarea className="md:col-span-2 min-h-[140px] rounded-2xl border border-rose-100 bg-rose-50 p-3" placeholder="Birthday message" defaultValue="Happy birthday, Maya! Thank you for being such a radiant friend and a source of so much love and laughter." />
              </div>
            </section>

            <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-ink">Gallery</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {['#f5e8d7', '#eed6e6', '#dfeee8', '#e5d8ff', '#f9dfe7', '#f7d7c4'].map((color, index) => (
                  <div key={color} className="h-32 rounded-2xl border border-dashed border-rose-200 bg-white" style={{ background: color }}>
                    <div className="flex h-full items-end p-3 text-xs font-medium text-ink/70">Photo {index + 1}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <EditorStatus saving={false} published={true} />
            <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-ink">Theme</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ['Blush', '#f9dfe7'],
                  ['Lavender', '#e8ddff'],
                  ['Cream', '#fffaf3'],
                  ['Warm', '#f7d7c4']
                ].map(([name, color]) => (
                  <div key={name} className="rounded-2xl border border-rose-100 bg-rose-50 p-3">
                    <div className="mb-2 h-10 rounded-xl" style={{ background: color }} />
                    <p className="text-sm text-ink">{name}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
