import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getCurrentUser } from '@/lib/auth';
import { EnquiryStatus } from '@/types';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status, internalNotes } = body;

  const validStatuses: EnquiryStatus[] = ['NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'COMPLETED', 'CLOSED'];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid enquiry status.' }, { status: 400 });
  }

  const updated = await repository.updateEnquiryStatus(id, status, internalNotes);
  if (!updated) {
    return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, enquiry: updated });
}
