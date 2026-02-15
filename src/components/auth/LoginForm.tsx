'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FieldError {
  field: string;
  message: string;
}

export default function LoginForm() {
  const { login, error: authError, clearError } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  function handleInputChange(
    field: keyof LoginFormData,
    value: string | boolean
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => prev.filter((e) => e.field !== field));
    if (localError) setLocalError(null);
    if (authError) clearError();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);
    setLocalError(null);
    setLoading(true);

    try {
      // Validate form
      const validationErrors = validateForm(formData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      // Call login
      await login(formData.email, formData.password, formData.rememberMe);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setLocalError(message);
    } finally {
      setLoading(false);
    }
  }

  function getFieldError(field: string): string | undefined {
    return errors.find((e) => e.field === field)?.message;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Messages */}
      {(localError || authError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {localError || authError}
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="you@example.com"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('email')
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          }`}
          required
        />
        {getFieldError('email') && (
          <p className="text-sm text-red-600">{getFieldError('email')}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          placeholder="••••••••"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('password')
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          }`}
          required
        />
        {getFieldError('password') && (
          <p className="text-sm text-red-600">{getFieldError('password')}</p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
          Keep me logged in for 90 days
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">New to GOTS?</span>
        </div>
      </div>

      {/* Register Link */}
      <Link
        href="/auth/register"
        className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition-colors"
      >
        Create an Account
      </Link>

      {/* Forgot Password */}
      <div className="text-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}

function validateForm(data: LoginFormData): FieldError[] {
  const errors: FieldError[] = [];

  if (!data.email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (!data.password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
