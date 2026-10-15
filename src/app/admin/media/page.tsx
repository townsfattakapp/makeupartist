import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { repository } from '@/lib/db/repository';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MediaManager } from './MediaManager';

export default async function AdminMediaPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const assets = await repository.getMediaAssets();

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)]">
            Media Asset Library & Focal Tuning
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Inspect photography and video assets, configure accessible alt text, and calibrate focal centers for responsive mobile viewports.
          </p>
        </div>

        <MediaManager initialAssets={assets} userRole={user.role} />
      </div>
    </AdminLayout>
  );
}
