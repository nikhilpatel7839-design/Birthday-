import './globals.css';
import { AppHeader } from '@/components/AppHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birthday Platform',
  description: 'Secure birthday and friendship website platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#fffaf3] text-ink antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,223,231,0.7),_rgba(255,250,243,0.96)_45%)] bg-grain">
          {children}
        </div>
      </body>
    </html>
  );
}
