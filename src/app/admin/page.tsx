import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Inbox, 
  Sparkles, 
  Briefcase, 
  Clock, 
  ArrowUpRight, 
  Plus, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { getCurrentUser } from '@/lib/auth';
import { repository } from '@/lib/db/repository';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const enquiries = await repository.getEnquiries();
  const looks = await repository.getLooks(undefined, 'ALL');
  const services = await repository.getServices();
  const settings = await repository.getSettings();

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;
  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <AdminLayout user={user}>
      <div className="space-y-8 animate-fadeIn">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)]">
              Studio Executive Dashboard
            </h1>
            <p className="text-xs text-[var(--muted)] mt-1">
              Welcome back, {user.name}. Overview of studio enquiries, active portfolio assets, and service packages.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs font-semibold transition-colors"
            >
              <Inbox className="w-4 h-4" />
              <span>Review Enquiries ({newEnquiriesCount} New)</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>New Client Enquiries</span>
              <Inbox className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[var(--foreground)]">
              {newEnquiriesCount}
            </div>
            <div className="text-[11px] text-[var(--muted)] flex items-center space-x-1">
              <span className="text-amber-500 font-semibold">•</span>
              <span>Awaiting consultation quote</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Total Enquiries Logged</span>
              <AlertCircle className="w-4 h-4 text-blue-500" />
            </div>
            <div className="font-serif text-3xl font-bold text-[var(--foreground)]">
              {enquiries.length}
            </div>
            <div className="text-[11px] text-[var(--muted)]">
              Across London & Destination
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Portfolio Looks</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-serif text-3xl font-bold text-[var(--foreground)]">
              {looks.length}
            </div>
            <div className="text-[11px] text-[var(--muted)]">
              {looks.filter(l => l.status === 'PUBLISHED').length} Published • {looks.filter(l => l.status !== 'PUBLISHED').length} Drafts
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Response Commitment</span>
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="font-serif text-3xl font-bold text-[var(--foreground)]">
              {settings.responseTimeHours}h
            </div>
            <div className="text-[11px] text-[var(--muted)]">
              Configured Studio Target
            </div>
          </div>
        </div>

        {/* Recent Enquiries & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enquiries Pipeline Widget */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-[var(--foreground)]">
                  Recent Inbound Enquiries
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  Latest clients requesting date reservations.
                </p>
              </div>

              <Link
                href="/admin/enquiries"
                className="text-xs text-[var(--accent)] hover:underline inline-flex items-center space-x-1"
              >
                <span>View All In CRM</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--muted)] uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Ref & Client</th>
                    <th className="pb-3 font-semibold">Event Type</th>
                    <th className="pb-3 font-semibold">Event Date</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {recentEnquiries.map((enq) => {
                    const statusColor = 
                      enq.status === 'NEW' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' :
                      enq.status === 'CONFIRMED' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                      enq.status === 'QUOTED' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' :
                      'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30';

                    return (
                      <tr key={enq.id} className="hover:bg-[var(--background-subtle)] transition-colors">
                        <td className="py-3.5">
                          <div className="font-semibold text-[var(--foreground)]">{enq.fullName}</div>
                          <div className="text-[10px] text-[var(--muted)] font-mono">{enq.referenceNumber}</div>
                        </td>
                        <td className="py-3.5 text-[var(--foreground)]">{enq.eventType}</td>
                        <td className="py-3.5 font-mono text-[var(--muted)]">{enq.eventDate}</td>
                        <td className="py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusColor}`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <Link
                            href={`/admin/enquiries?id=${enq.id}`}
                            className="text-xs text-[var(--accent)] hover:underline"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Studio CMS Actions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--background-subtle)] border border-[var(--border)] shadow-xs space-y-6">
            <div>
              <h3 className="font-serif text-xl text-[var(--foreground)]">
                Studio Actions
              </h3>
              <p className="text-xs text-[var(--muted)]">
                Manage website content and live services.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/admin/portfolio"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-xs transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">Portfolio Archive</div>
                    <div className="text-[10px] text-[var(--muted)]">Publish or edit looks & before/afters</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--muted)]" />
              </Link>

              <Link
                href="/admin/services"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-xs transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-4 h-4 text-[var(--accent)]" />
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">Service Packages</div>
                    <div className="text-[10px] text-[var(--muted)]">Edit prices, duration & prep guidance</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--muted)]" />
              </Link>

              <Link
                href="/admin/instagram"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-xs transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <InstagramIcon className="w-4 h-4 text-pink-500" />
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">Instagram Feed Curation</div>
                    <div className="text-[10px] text-[var(--muted)]">Update featured reels & captions</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--muted)]" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-xs transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[var(--accent)]" />
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">Studio & SEO Settings</div>
                    <div className="text-[10px] text-[var(--muted)]">Bio, telephone, WhatsApp, SEO title</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--muted)]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
