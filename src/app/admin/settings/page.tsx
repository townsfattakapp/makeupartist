import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { repository } from '@/lib/db/repository';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { SettingsManager } from './SettingsManager';

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const settings = await repository.getSettings();

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)]">
            Studio & SEO Settings
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Configure studio brand metadata, contact phone, WhatsApp concierge, and search engine parameters.
          </p>
        </div>

        <SettingsManager initialSettings={settings} userRole={user.role} />
      </div>
    </AdminLayout>
  );
}
