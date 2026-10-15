import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { repository } from '@/lib/db/repository';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { InstagramManager } from './InstagramManager';

export default async function AdminInstagramPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const posts = await repository.getInstagramPosts();
  const settings = await repository.getSettings();

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)]">
            Instagram Feed Curation
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Curate verified client reels and backstage moments for the public homepage showcase.
          </p>
        </div>

        <InstagramManager
          initialPosts={posts}
          userRole={user.role}
          handle={settings.instagramHandle}
        />
      </div>
    </AdminLayout>
  );
}
