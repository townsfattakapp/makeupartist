import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { repository } from '@/lib/db/repository';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { EnquiriesClient } from './EnquiriesClient';

interface EnquiriesPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function EnquiriesAdminPage({ searchParams }: EnquiriesPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const { id } = await searchParams;
  const enquiries = await repository.getEnquiries();

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)]">
            Enquiries & Client Pipeline
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Manage inbound booking consultations, status workflows, and internal studio notes.
          </p>
        </div>

        <EnquiriesClient initialEnquiries={enquiries} initialSelectedId={id} />
      </div>
    </AdminLayout>
  );
}
