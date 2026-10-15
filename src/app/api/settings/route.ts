import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const settings = await repository.getSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Only Owner can edit site settings and service area configurations
  if (user.role !== 'OWNER') {
    return NextResponse.json({ error: 'Permission denied. Only Owner can modify studio settings.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const updated = await repository.updateSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating settings' }, { status: 500 });
  }
}
