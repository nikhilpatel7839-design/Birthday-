import { AppHeader } from '@/components/AppHeader';

export default function AdminWebsiteDetailPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl border border-rose-100 bg-white p-8 shadow-card">
          <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Website detail</p>
          <h1 className="mt-3 font-display text-4xl text-ink">Maya Birthday</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-rose-50 p-4">
              <p className="text-sm text-ink/70">Slug</p>
              <p className="mt-1 font-medium">maya-birthday</p>
            </div>
            <div className="rounded-2xl bg-lilac/50 p-4">
              <p className="text-sm text-ink/70">Status</p>
              <p className="mt-1 font-medium">Published</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-rose-500 px-5 py-3 text-white">Publish</button>
            <button className="rounded-full border border-rose-200 bg-white px-5 py-3 text-ink">Copy editor URL</button>
            <button className="rounded-full border border-rose-200 bg-white px-5 py-3 text-ink">Unpublish</button>
          </div>
        </div>
      </main>
    </>
  );
}
