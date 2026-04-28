import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminSession } from '@/lib/supabase/admin-session';
import { loginSchema } from '@/lib/utils/validation';

const SESSION_DURATION_HOURS = 24;

/** Lozinka za admin panel — u produkciji koristiti env varijablu */
const ADMIN_PASSWORD = 'hamby2024';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Lozinka je obavezna' },
        { status: 400 }
      );
    }

    const { password } = parsed.data;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Pogrešna lozinka' },
        { status: 401 }
      );
    }

    // Generiraj siguran token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(
      Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000
    );

    // Spremi sesiju u bazu
    const { error: sessionError } = await createAdminSession(token, expiresAt);

    if (sessionError) {
      // Ako Supabase ne radi (nema service role key), svejedno pusti login s cookie-jem
      console.warn('Sesija nije spremljena u bazu:', sessionError);
    }

    // Postavi httpOnly cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('hamby-admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: SESSION_DURATION_HOURS * 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Interna greška servera' },
      { status: 500 }
    );
  }
}
