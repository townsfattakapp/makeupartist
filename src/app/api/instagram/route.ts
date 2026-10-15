import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const posts = await repository.getInstagramPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.mediaUrl || !body.caption) {
      return NextResponse.json({ error: 'Media URL and caption are required' }, { status: 400 });
    }

    const saved = await repository.saveInstagramPost(body);
    return NextResponse.json({ success: true, post: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error saving Instagram post' }, { status: 500 });
  }
}
