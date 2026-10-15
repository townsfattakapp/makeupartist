'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'About Aurelia', href: '/about' },
  { label: 'Editorial Journal', href: '/#journal' },
  { label: 'Contact & FAQ', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Monogram & Title */}
        <Link href="/" className="group flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm">
          <span className="font-serif text-2xl sm:text-3xl tracking-widest text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300 font-medium">
            AURELIA LUXE
          </span>
          <span className="text-[10px] tracking-luxury uppercase text-[var(--muted)] -mt-1 group-hover:text-[var(--foreground)] transition-colors">
            Mayfair • Cotswolds • Lake Como
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-luxury uppercase">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors duration-300 ${
                  isActive
                    ? 'text-[var(--accent)] font-semibold'
                    : 'text-[var(--foreground)]/80 hover:text-[var(--accent)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent)] animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/enquire"
            id="header-enquire-btn"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-luxury uppercase font-medium bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black transition-all duration-300 rounded-full shadow-sm hover:shadow-md cursor-pointer group"
          >
            <span>Check Availability</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <button
            type="button"
            id="mobile-menu-toggle-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--foreground)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-[var(--background)] z-40 px-6 py-8 flex flex-col justify-between border-t border-[var(--border)] overflow-y-auto">
          <div className="flex flex-col space-y-6 pt-4">
            <div className="text-[11px] tracking-ultra-wide uppercase text-[var(--muted)] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Editorial Navigation</span>
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-serif text-2xl text-[var(--foreground)] hover:text-[var(--accent)] tracking-wide transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[var(--border)]">
              <Link
                href="/admin"
                className="text-xs tracking-luxury uppercase text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                Artist CMS Portal →
              </Link>
            </div>
          </div>

          <div className="pt-8 pb-4 flex flex-col space-y-4">
            <Link
              href="/enquire"
              className="w-full text-center py-3.5 text-xs tracking-luxury uppercase font-medium bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black rounded-full transition-colors"
            >
              Check Availability & Bespoke Quote
            </Link>
            <p className="text-center text-[11px] text-[var(--muted)]">
              London • The Cotswolds • Paris • Lake Como
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
