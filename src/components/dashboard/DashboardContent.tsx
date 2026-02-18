'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function DashboardContent() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gots-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gots-accent mb-2">Your Dashboard</h1>
          <p className="text-gots-secondary text-lg">
            Welcome back, {user?.displayName || user?.username || 'Reader'}
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/characters" className="block p-6 bg-gots-charred rounded-lg border border-gots-accent/20 hover:border-gots-accent/40">
            <h2 className="text-xl font-bold text-gots-accent mb-2">Continue Reading</h2>
            <p className="text-gots-secondary mb-4">Choose a character and follow their journey through the story.</p>
            <span className="text-gots-accent font-semibold">View Characters →</span>
          </Link>
          <Link href="/" className="block p-6 bg-gots-charred rounded-lg border border-gots-accent/20 hover:border-gots-accent/40">
            <h2 className="text-xl font-bold text-gots-accent mb-2">Explore the Story</h2>
            <p className="text-gots-secondary mb-4">Discover characters, groups, and locations.</p>
            <span className="text-gots-accent font-semibold">Back to Home →</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
