import { NextResponse } from 'next/server';

/** GET /api/opt-in - Simple health check (fallback if /api/health 404s) */
export async function GET() {
  return NextResponse.json({
    ok: true,
    health: true,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    // TODO: Integrate with newsletter service (Mailchimp, ConvertKit, etc.)
    // or add to database. For now, accept and return success.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
