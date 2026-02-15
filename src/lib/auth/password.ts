import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

/**
 * Hash password for storage
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    console.error('Password hashing failed:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Compare password with hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Password comparison failed:', error);
    return false;
  }
}

/**
 * Validate password strength
 */
export function isPasswordStrong(password: string): {
  isStrong: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain special character');
  }

  return {
    isStrong: errors.length === 0,
    errors,
  };
}

/**
 * Generate random password
 */
export function generateRandomPassword(length: number = 16): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';

  // Ensure all required character types
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[
    Math.floor(Math.random() * 26)
  ];
  password += 'abcdefghijklmnopqrstuvwxyz'[
    Math.floor(Math.random() * 26)
  ];
  password += '0123456789'[Math.floor(Math.random() * 10)];
  password += '!@#$%^&*()'[Math.floor(Math.random() * 10)];

  // Fill rest
  for (let i = password.length; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  // Shuffle
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
