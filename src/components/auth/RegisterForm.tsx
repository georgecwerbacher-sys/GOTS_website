'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface RegisterFormData {
  email: string;
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FieldError {
  field: keyof RegisterFormData;
  message: string;
}

export default function RegisterForm() {
  const { register, error: authError, clearError } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    username: '',
    displayName: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  function handleInputChange(
    field: keyof RegisterFormData,
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

      // Call register
      await register(formData);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setLocalError(message);
    } finally {
      setLoading(false);
    }
  }

  function getFieldError(field: keyof RegisterFormData): string | undefined {
    return errors.find((e) => e.field === field)?.message;
  }

  const passwordStrength = calculatePasswordStrength(formData.password);

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

      {/* Username Field */}
      <div className="space-y-1">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          placeholder="Choose a username"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('username')
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          }`}
          required
        />
        {!getFieldError('username') && (
          <p className="text-xs text-gray-500">3-20 characters, letters and numbers only</p>
        )}
        {getFieldError('username') && (
          <p className="text-sm text-red-600">{getFieldError('username')}</p>
        )}
      </div>

      {/* Display Name Field */}
      <div className="space-y-1">
        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
          Display Name (Optional)
        </label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={(e) => handleInputChange('displayName', e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {!getFieldError('displayName') && (
          <p className="text-xs text-gray-500">How other members will see you</p>
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
          placeholder="Create a strong password"
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
        {formData.password && <PasswordStrengthIndicator strength={passwordStrength} />}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          placeholder="Confirm your password"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('confirmPassword')
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          }`}
          required
        />
        {getFieldError('confirmPassword') && (
          <p className="text-sm text-red-600">{getFieldError('confirmPassword')}</p>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
          I agree to the{' '}
          <Link href="/terms" target="_blank" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>
      {getFieldError('agreeToTerms') && (
        <p className="text-sm text-red-600">{getFieldError('agreeToTerms')}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}

function validateForm(data: RegisterFormData): FieldError[] {
  const errors: FieldError[] = [];

  // Email
  if (!data.email || !isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  // Username
  if (!data.username || data.username.length < 3 || data.username.length > 20) {
    errors.push({ field: 'username', message: 'Username must be 3-20 characters' });
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
    errors.push({
      field: 'username',
      message: 'Username can only contain letters, numbers, and underscores',
    });
  }

  // Password
  if (!data.password || data.password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
  } else {
    const { isStrong, errors: passwordErrors } = getPasswordValidation(data.password);
    if (!isStrong && passwordErrors.length > 0) {
      errors.push({ field: 'password', message: passwordErrors[0] });
    }
  }

  // Confirm Password
  if (!data.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Please confirm your password' });
  } else if (data.password !== data.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
  }

  // Terms
  if (!data.agreeToTerms) {
    errors.push({ field: 'agreeToTerms', message: 'You must agree to the terms' });
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getPasswordValidation(password: string): { isStrong: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!/[A-Z]/.test(password)) errors.push('Must contain uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Must contain lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Must contain number');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    errors.push('Must contain special character');

  return {
    isStrong: errors.length === 0,
    errors,
  };
}

function calculatePasswordStrength(password: string): number {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 10;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[a-z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
  return Math.min(strength, 100);
}

function PasswordStrengthIndicator({ strength }: { strength: number }) {
  const getLabel = (s: number) => {
    if (s < 25) return 'Weak';
    if (s < 50) return 'Fair';
    if (s < 75) return 'Good';
    return 'Strong';
  };

  const getColor = (s: number) => {
    if (s < 25) return 'bg-red-500';
    if (s < 50) return 'bg-orange-500';
    if (s < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const label = getLabel(strength);
  const color = getColor(strength);

  return (
    <div className="mt-2 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">Password Strength</span>
        <span
          className={`text-xs font-semibold ${
            strength < 25
              ? 'text-red-600'
              : strength < 50
              ? 'text-orange-600'
              : strength < 75
              ? 'text-yellow-600'
              : 'text-green-600'
          }`}
        >
          {label}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${strength}%` }}
        />
      </div>
    </div>
  );
}
