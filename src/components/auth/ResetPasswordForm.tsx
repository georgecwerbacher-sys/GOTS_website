'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function isPasswordStrong(password: string): { isStrong: boolean; errors: string[] } {
  const errors: string[] = [];
  if (password.length < 8) errors.push('Password must be at least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Password must contain lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Password must contain number');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Password must contain special character');
  return { isStrong: errors.length === 0, errors };
}

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    if (!password || !confirmPassword) {
      setMessage('Please fill in both password fields');
      setStatus('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setStatus('error');
      return;
    }

    const strength = isPasswordStrong(password);
    if (!strength.isStrong) {
      setMessage(strength.errors[0] || 'Password does not meet requirements');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      let data: { success?: boolean; message?: string; error?: { message?: string } };
      try {
        data = await res.json();
      } catch {
        setStatus('error');
        setMessage('Invalid response from server. Please try again.');
        return;
      }

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Password reset successfully.');
        setTimeout(() => router.push('/auth/login'), 2000);
      } else {
        setStatus('error');
        setMessage(data.error?.message || 'Invalid or expired reset link. Please request a new one.');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof TypeError ? 'Network error. Please check your connection.' : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {message}
        </div>
        <p className="text-sm text-gray-600">
          Redirecting you to login...
        </p>
        <Link
          href="/auth/login"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {message}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          required
          disabled={status === 'loading'}
          minLength={8}
        />
        <p className="text-xs text-gray-500">
          At least 8 characters, with uppercase, lowercase, number, and special character
        </p>
      </div>

      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          required
          disabled={status === 'loading'}
          minLength={8}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {status === 'loading' ? 'Resetting...' : 'Reset Password'}
      </button>

      <div className="text-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Request new reset link
        </Link>
      </div>
    </form>
  );
}
