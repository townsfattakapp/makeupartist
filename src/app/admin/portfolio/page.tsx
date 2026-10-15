import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { repository } from '@/lib/db/repository';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PortfolioManager } from './PortfolioManager';

export default async function AdminPortfolioPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const looks = await repository.getLooks(undefined, 'ALL');
  const categories = await repository.getCategories();

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)]">
            Portfolio Look Management
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Curate editorial looks, manage before-and-after imagery, update product formulations, and publish status.
          </p>
        </div>

        <PortfolioManager
          initialLooks={looks}
          categories={categories}
          userRole={user.role}
        />
      </div>
    </AdminLayout>
  );
}
