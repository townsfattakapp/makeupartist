import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const services = await repository.getServices();
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: 'Service title is required' }, { status: 400 });
    }

    const saved = await repository.saveService(body);
    return NextResponse.json({ success: true, service: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error saving service' }, { status: 500 });
  }
}
