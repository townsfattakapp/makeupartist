import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const status = searchParams.get('status') || undefined;
  const looks = await repository.getLooks(category, status);
  return NextResponse.json({ looks });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const saved = await repository.saveLook(body);
    return NextResponse.json({ success: true, look: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error saving look' }, { status: 500 });
  }
}
