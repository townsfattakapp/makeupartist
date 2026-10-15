import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getCurrentUser } from '@/lib/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Only Owner can delete portfolio content
  if (user.role !== 'OWNER') {
    return NextResponse.json({ error: 'Permission denied. Only Owner can delete content.' }, { status: 403 });
  }

  const { id } = await params;
  const deleted = await repository.deleteLook(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Look not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
