import { AppHeader } from '@/components/AppHeader';
import Link from 'next/link';

export default function AdminCustomersPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Admin</p>
            <h1 className="font-display text-4xl text-ink">Customer management</h1>
          </div>
          <button className="rounded-full bg-rose-500 px-5 py-3 text-white">Invite customer</button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-rose-50 text-ink/70">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Website</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Maya', 'Maya Birthday', 'Active'],
                ['Ava', 'Friendship Weekend', 'Pending'],
                ['Layla', 'Retreat Surprise', 'Revoked']
              ].map(([name, website, status]) => (
                <tr key={name} className="border-t border-rose-50">
                  <td className="p-4">{name}</td>
                  <td className="p-4">{website}</td>
                  <td className="p-4">{status}</td>
                  <td className="p-4">
                    <Link href="/admin/websites/1" className="text-rose-700">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
