'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Inbox, 
  Sparkles, 
  Briefcase, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Shield 
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { User } from '@/types';

interface AdminLayoutProps {
  user: User;
  children: React.ReactNode;
}

const SIDEBAR_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Enquiries Pipeline', href: '/admin/enquiries', icon: Inbox },
  { label: 'Portfolio Looks', href: '/admin/portfolio', icon: Sparkles },
  { label: 'Services & Pricing', href: '/admin/services', icon: Briefcase },
  { label: 'Instagram Curation', href: '/admin/instagram', icon: InstagramIcon },
  { label: 'Media Asset Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Studio & SEO Settings', href: '/admin/settings', icon: Settings },
];

export function AdminLayout({ user, children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-[var(--border)] bg-[var(--card)] p-6 shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="space-y-8">
          {/* Brand & Portal Header */}
          <div>
            <Link href="/" className="font-serif text-xl tracking-widest text-[var(--foreground)] hover:text-[var(--accent)] transition-colors font-medium">
              KUMKUM PATEL
            </Link>
            <div className="text-[10px] tracking-ultra-wide uppercase text-[var(--accent)] mt-0.5 font-semibold">
              Studio Management CMS
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-medium">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-xs'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-subtle)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-6 border-t border-[var(--border)] space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[var(--accent-light)] border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center font-serif text-sm font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="font-semibold text-xs truncate">{user.name}</div>
              <div className="flex items-center space-x-1 text-[10px] text-[var(--muted)]">
                <Shield className="w-3 h-3 text-[var(--accent)]" />
                <span className="font-mono">{user.role}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg border border-[var(--border)] hover:bg-red-500/10 hover:border-red-500/30 text-xs text-[var(--muted)] hover:text-red-500 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border border-[var(--border)] text-[var(--foreground)]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden sm:block text-xs text-[var(--muted)]">
              Studio Operations • Signed in as <strong className="text-[var(--foreground)]">{user.name}</strong> ({user.role})
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border)] text-xs text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex">
            <div className="w-72 bg-[var(--card)] p-6 flex flex-col justify-between h-full border-r border-[var(--border)] animate-fadeIn">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="font-serif text-lg font-bold">KUMKUM PATEL</div>
                  <button onClick={() => setMobileOpen(false)} className="p-1 text-[var(--muted)]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1 text-xs">
                  {SIDEBAR_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl ${
                          isActive
                            ? 'bg-[var(--foreground)] text-[var(--background)] font-semibold'
                            : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-[var(--border)] text-xs text-red-500"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
