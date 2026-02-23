import { Suspense } from 'react';
import Link from 'next/link';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export const metadata = {
  title: 'Reset Password - Guardians of the Spear',
  description: 'Set your new password',
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Invalid Reset Link</h2>
          <p className="text-gray-600 mt-2">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
        </div>
        <Link
          href="/auth/forgot-password"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Request New Reset Link
        </Link>
        <div className="text-center">
          <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-700">
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-gray-600 mt-2">
          Enter your new password below.
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm token={token} />
      </Suspense>
    </div>
  );
}
