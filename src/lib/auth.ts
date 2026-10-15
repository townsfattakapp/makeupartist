import { cookies } from 'next/headers';
import crypto from 'crypto';
import { User, UserRole } from '@/types';
import { INITIAL_USERS } from './db/seed-data';

const AUTH_COOKIE = process.env.ADMIN_SESSION_COOKIE || 'aurelia_admin_session';
const AUTH_SECRET = process.env.AUTH_SECRET || 'aurelia_luxe_secure_jwt_secret_key_2026';

// Realistic password verification with default demo accounts
const CREDENTIALS: Record<string, { role: UserRole; name: string; passwordHash: string }> = {
  'aurelia@aurelialuxe.com': {
    role: 'OWNER',
    name: 'Aurelia Vance',
    // SHA256 of "LuxeOwner2026!"
    passwordHash: crypto.createHmac('sha256', AUTH_SECRET).update('LuxeOwner2026!').digest('hex'),
  },
  'assistant@aurelialuxe.com': {
    role: 'EDITOR',
    name: 'Clara Delacroix',
    // SHA256 of "LuxeStudio2026!"
    passwordHash: crypto.createHmac('sha256', AUTH_SECRET).update('LuxeStudio2026!').digest('hex'),
  },
};

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  exp: number;
}

export function createSessionToken(user: User): string {
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const dataStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(dataStr).digest('base64url');
  return `${dataStr}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [dataStr, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', AUTH_SECRET).update(dataStr).digest('base64url');
    if (expectedSig !== signature) return null;

    const payload: SessionPayload = JSON.parse(Buffer.from(dataStr, 'base64url').toString('utf-8'));
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  const payload = verifySessionToken(token);
  if (!payload) return null;

  return {
    id: payload.userId,
    email: payload.email,
    name: payload.name,
    role: payload.role,
    createdAt: new Date().toISOString(),
  };
}

export function authenticate(email: string, password: string): User | null {
  const normalizedEmail = email.toLowerCase().trim();
  const creds = CREDENTIALS[normalizedEmail];
  if (!creds) return null;

  const inputHash = crypto.createHmac('sha256', AUTH_SECRET).update(password).digest('hex');
  if (inputHash !== creds.passwordHash) return null;

  const initialUser = INITIAL_USERS.find(u => u.email.toLowerCase() === normalizedEmail);

  return {
    id: initialUser?.id || `user-${Date.now()}`,
    email: normalizedEmail,
    name: creds.name,
    role: creds.role,
    createdAt: initialUser?.createdAt || new Date().toISOString(),
  };
}
