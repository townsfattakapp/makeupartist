'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (role: 'OWNER' | 'EDITOR') => {
    if (role === 'OWNER') {
      setEmail('aurelia@aurelialuxe.com');
      setPassword('LuxeOwner2026!');
    } else {
      setEmail('assistant@aurelialuxe.com');
      setPassword('LuxeStudio2026!');
    }
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full pt-4">
        <Link href="/" className="font-serif text-2xl tracking-widest text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
          AURELIA LUXE
        </Link>
        <ThemeToggle />
      </div>

      <div className="max-w-md mx-auto w-full py-12">
        <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-light)] border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
              Studio Portal
            </span>
            <h1 className="font-serif text-3xl text-[var(--foreground)]">
              Artist CMS Sign In
            </h1>
            <p className="text-xs text-[var(--muted)]">
              Authorized access for studio owner & editorial assistants.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[var(--muted)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="artist@aurelialuxe.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[var(--muted)]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-semibold transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Verifying Session...' : 'Enter Studio CMS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="pt-4 border-t border-[var(--border)] space-y-3">
            <span className="text-[10px] tracking-widest uppercase text-[var(--muted)] text-center block">
              Quick Demo Access Credentials
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('OWNER')}
                className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] hover:border-[var(--accent)] text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-[var(--foreground)]">
                  <UserCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Owner</span>
                </div>
                <div className="text-[10px] text-[var(--muted)]">Aurelia Vance (Full)</div>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('EDITOR')}
                className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] hover:border-[var(--accent)] text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-[var(--foreground)]">
                  <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>Editor</span>
                </div>
                <div className="text-[10px] text-[var(--muted)]">Clara (Assistant)</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-[var(--muted)] pb-4">
        <Link href="/" className="hover:underline">
          ← Return to Public Website
        </Link>
      </div>
    </div>
  );
}
