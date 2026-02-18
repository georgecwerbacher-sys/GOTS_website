import { ReactNode } from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold text-white mb-2">Guardians of the Spear</h1>
          </Link>
          <p className="text-blue-100">Enter the world of interactive storytelling</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-2xl p-8 text-black">{children}</div>

        {/* Footer */}
        <p className="text-center text-blue-100 mt-6 text-sm">
          Need help?{' '}
          <a href="/support" className="text-white hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}