import { motion } from 'framer-motion';

export function EditorStatus({ saving, published, error }: { saving: boolean; published: boolean; error?: string }) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white/80 p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">Save status</p>
          <p className="text-xs text-ink/70">
            {saving ? 'Saving draft…' : published ? 'Published successfully' : 'Draft changes pending'}
          </p>
        </div>
        <span className={saving ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'}
          className="rounded-full px-3 py-1 text-xs font-medium">
          {error ? 'Error' : saving ? 'Saving' : published ? 'Live' : 'Draft'}
        </span>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
