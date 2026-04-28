import { NextRequest, NextResponse } from 'next/server';
import { deleteAdminSession } from '@/lib/supabase/admin-session';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('hamby-admin-token')?.value;

    if (token) {
      await deleteAdminSession(token);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('hamby-admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Greška pri odjavi' },
      { status: 500 }
    );
  }
}
