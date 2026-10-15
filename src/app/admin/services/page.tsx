import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { repository } from '@/lib/db/repository';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ServicesManager } from './ServicesManager';

export default async function AdminServicesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const services = await repository.getServices();

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)]">
            Services & Commission Catalogue
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Manage commission tiers, indicative rates, durations, inclusions, and client preparation guidelines.
          </p>
        </div>

        <ServicesManager initialServices={services} userRole={user.role} />
      </div>
    </AdminLayout>
  );
}
