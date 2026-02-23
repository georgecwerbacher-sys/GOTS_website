import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isValidEmail } from '@/lib/auth/password';
import {
  createPasswordResetToken,
  sendPasswordResetEmail,
} from '@/lib/auth/password-reset';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: { message: 'Email is required' } },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid email format' } },
        { status: 400 }
      );
    }

    const member = await prisma.member.findUnique({
      where: { email: normalizedEmail },
    });

    // Always return success to prevent email enumeration
    const successResponse = {
      success: true,
      message: 'If an account exists with this email, you will receive password reset instructions.',
    };

    if (!member || !member.isActive) {
      return NextResponse.json(successResponse, { status: 200 });
    }

    const token = await createPasswordResetToken(member.id);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/auth/reset-password?token=${token}`;

    const emailResult = await sendPasswordResetEmail(member.email, resetLink);

    if (!emailResult.success && emailResult.error) {
      console.error('Password reset email failed:', emailResult.error);
      // Still return success - don't reveal email delivery failure to user
    }

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { message: 'Something went wrong. Please try again.' },
      },
      { status: 500 }
    );
  }
}
