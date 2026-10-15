import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const search = searchParams.get('search') || undefined;

  const enquiries = await repository.getEnquiries(status, search);
  return NextResponse.json({ enquiries });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validation
    const { fullName, email, phone, eventType, eventDate, readyByTime, location, guestsCount } = body;

    if (!fullName || !email || !phone || !eventType || !eventDate || !location) {
      return NextResponse.json(
        { error: 'Please provide all required fields (Name, Email, Phone, Event Type, Date, Location).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const enquiry = await repository.createEnquiry({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      eventType,
      eventDate,
      readyByTime: readyByTime || '12:00 PM',
      location: String(location).trim(),
      guestsCount: Number(guestsCount) || 1,
      serviceId: body.serviceId,
      aestheticNotes: body.aestheticNotes || '',
      budgetRange: body.budgetRange || '₹25,000 - ₹50,000',
      referenceImageUrl: body.referenceImageUrl,
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating enquiry:', err);
    return NextResponse.json({ error: 'Server error processing enquiry.' }, { status: 500 });
  }
}
