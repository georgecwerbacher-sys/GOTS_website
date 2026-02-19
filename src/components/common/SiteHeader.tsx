'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function SiteHeader() {
  const { isAuthenticated, user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-gots-charred/95 backdrop-blur-sm border-b border-gots-accent/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gots-accent hover:text-gots-accent-light transition-colors">
            Guardians of the Spear
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gots-content hover:text-gots-accent transition-colors">Home</Link>
            <Link href="/characters" className="text-gots-content hover:text-gots-accent transition-colors">Characters</Link>
            <Link href="/locations" className="text-gots-content hover:text-gots-accent transition-colors">Locations</Link>
            {!loading && (
              isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="px-4 py-2 rounded font-semibold bg-gots-accent !text-black hover:bg-gots-accent-light">
                    Dashboard
                  </Link>
                  <button onClick={() => logout()} className="text-gots-medium-gray hover:text-gots-accent text-sm">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gots-content hover:text-gots-accent">Login</Link>
                  <Link href="/auth/register" className="px-4 py-2 rounded font-semibold bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black">
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
