import { motion } from 'framer-motion';

export function ThemeCard({ title, color }: { title: string; color: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-2xl border border-rose-100 bg-white p-3 shadow-card">
      <div className="mb-2 h-14 rounded-xl" style={{ background: color }} />
      <p className="text-sm font-semibold text-ink">{title}</p>
    </motion.div>
  );
}
