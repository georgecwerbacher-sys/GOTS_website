import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const RESET_TOKEN_EXPIRY_HOURS = 1;
const RESET_TOKEN_BYTES = 32;

export function generateResetToken(): string {
  return randomBytes(RESET_TOKEN_BYTES).toString('hex');
}

export function getResetTokenExpiry(): Date {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + RESET_TOKEN_EXPIRY_HOURS);
  return expiry;
}

export async function createPasswordResetToken(memberId: string): Promise<string> {
  const token = generateResetToken();
  const expiresAt = getResetTokenExpiry();

  await prisma.passwordResetToken.create({
    data: {
      memberId,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function validateResetToken(token: string): Promise<{ memberId: string } | null> {
  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { member: true },
  });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return null;
  }

  return { memberId: record.memberId };
}

export async function sendPasswordResetEmail(
  email: string,
  resetLink: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set - password reset email not sent. Reset link:', resetLink);
    return { success: true };
  }

  try {
    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Reset your password - Guardians of the Spear',
      html: `
        <p>You requested a password reset for your Guardians of the Spear account.</p>
        <p>Click the link below to reset your password (valid for ${RESET_TOKEN_EXPIRY_HOURS} hour):</p>
        <p><a href="${resetLink}" style="color: #a68555; font-weight: bold;">Reset Password</a></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send email';
    console.error('Send password reset email error:', err);
    return { success: false, error: message };
  }
}
