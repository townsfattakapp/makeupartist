import { NextResponse } from 'next/server';

const AUTH_COOKIE = process.env.ADMIN_SESSION_COOKIE || 'aurelia_admin_session';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(AUTH_COOKIE);
  return response;
}
