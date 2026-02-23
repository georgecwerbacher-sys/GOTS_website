import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';
import { isPasswordStrong } from '@/lib/auth/password';
import { validateResetToken } from '@/lib/auth/password-reset';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password, confirmPassword } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid or expired reset link' } },
        { status: 400 }
      );
    }

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: { message: 'Password and confirmation are required' } },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: { message: 'Passwords do not match' } },
        { status: 400 }
      );
    }

    const strength = isPasswordStrong(password);
    if (!strength.isStrong) {
      return NextResponse.json(
        {
          success: false,
          error: { message: strength.errors[0] || 'Password does not meet requirements' },
        },
        { status: 400 }
      );
    }

    const validToken = await validateResetToken(token);
    if (!validToken) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid or expired reset link. Please request a new one.' } },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    await prisma.$transaction([
      prisma.member.update({
        where: { id: validToken.memberId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { token },
        data: { usedAt: new Date() },
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Password reset successfully. You can now log in with your new password.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    const errStr = String(error);
    const isTableMissing =
      errStr.includes('does not exist') ||
      errStr.includes('password_reset_tokens') ||
      (error && typeof error === 'object' && (error as { code?: string }).code === 'P1014');
    return NextResponse.json(
      {
        success: false,
        error: {
          message: isTableMissing
            ? 'Database setup incomplete. Please run: npx prisma db push'
            : 'Something went wrong. Please try again.',
        },
      },
      { status: 500 }
    );
  }
}
