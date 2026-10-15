import { NextRequest, NextResponse } from 'next/server';
import { authenticate, createSessionToken } from '@/lib/auth';

const AUTH_COOKIE = process.env.ADMIN_SESSION_COOKIE || 'aurelia_admin_session';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Please provide both email and password.' }, { status: 400 });
    }

    const user = authenticate(email, password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials. Please verify your email and password.' }, { status: 401 });
    }

    const token = createSessionToken(user);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server authentication failure.' }, { status: 500 });
  }
}
