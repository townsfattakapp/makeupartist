'use client';

import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Mail, Phone, MapPin, CheckCircle2, ArrowUp, Lock } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-subtle)] text-[var(--foreground)] pt-12 sm:pt-16 pb-10 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {/* Top Header Marque & Quick Concierge Actions */}
        <div className="border-b border-[var(--border)] pb-10 sm:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            <div className="space-y-2">
              <span className="text-[10px] sm:text-[11px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block">
                Haute Bridal & Celebrity Makeup Atelier
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--foreground)] font-normal">
                Kumkum Patel
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed pt-1">
                Celebrating modern Indian bridal heritage, luminous glass-skin architecture, and dedicated wedding day accompaniment across royal palaces and global destinations.
              </p>
            </div>

            {/* Concierge Action Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0">
              <a
                href="https://wa.me/919876543210?text=Hello%20Kumkum%20Patel,%20I%20would%20like%20to%20check%20availability%20for%20my%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs tracking-wider uppercase font-medium transition-all duration-300 shadow-xs group"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[var(--accent)] transition-transform group-hover:scale-110" />
                <span>WhatsApp Concierge</span>
              </a>

              <a
                href="https://instagram.com/kumkumpatelmakeup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs tracking-wider uppercase font-medium transition-all duration-300 shadow-xs group"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[var(--accent)] transition-transform group-hover:scale-110" />
                <span>@kumkumpatelmakeup</span>
                <ArrowUpRight className="w-3 h-3 text-[var(--muted)] group-hover:text-[var(--accent)]" />
              </a>

              <Link
                href="/enquire"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)] text-xs tracking-luxury uppercase font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <span>Check Date Availability</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Structured 4-Column Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-sm">
          {/* Column 1: The Atelier & Philosophy */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-mono tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] pb-2 border-b border-[var(--border)]">
              The Atelier
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Every bridal transformation is treated as an individual commission of fine art. We accept a limited number of clients per season to ensure singular focus.
            </p>
            <ul className="text-xs text-[var(--muted)] space-y-2 pt-1">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>Single Client Dedication Policy</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>Hospital-Grade Clean Kit Guarantee</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>16-Hour Tear-Proof Formula Finish</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Signature Services */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-mono tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] pb-2 border-b border-[var(--border)]">
              Bespoke Services
            </h3>
            <ul className="text-xs sm:text-sm text-[var(--muted)] space-y-2.5">
              <li>
                <Link href="/services/bespoke-bridal-haute-couture" className="hover:text-[var(--accent)] transition-colors block">
                  The Royal Bridal Transformation
                </Link>
              </li>
              <li>
                <Link href="/services/red-carpet-editorial-glam" className="hover:text-[var(--accent)] transition-colors block">
                  Sangeet & Cocktail Couture Glam
                </Link>
              </li>
              <li>
                <Link href="/services/masterclass-private-tutelage" className="hover:text-[var(--accent)] transition-colors block">
                  Private Tutelage & Vanity Curation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[var(--accent)] hover:underline inline-flex items-center space-x-1 pt-1 text-xs">
                  <span>View All Indicative Tiers</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Studio Navigation */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-mono tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] pb-2 border-b border-[var(--border)]">
              Studio Navigation
            </h3>
            <ul className="text-xs sm:text-sm text-[var(--muted)] space-y-2.5">
              <li>
                <Link href="/portfolio" className="hover:text-[var(--accent)] transition-colors block">
                  Portfolio & Finishes Archive
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent)] transition-colors block">
                  Artist Philosophy & Prestige Kit
                </Link>
              </li>
              <li>
                <Link href="/enquire" className="hover:text-[var(--accent)] transition-colors block">
                  Bespoke Availability Request
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--accent)] transition-colors block">
                  Studio FAQ & Retainer Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] inline-flex items-center space-x-1.5 pt-1">
                  <Lock className="w-3 h-3 text-[var(--accent)]" />
                  <span>Artist Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Concierge & Venues */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-mono tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] pb-2 border-b border-[var(--border)]">
              Direct Concierge
            </h3>
            <div className="text-xs sm:text-sm text-[var(--muted)] space-y-3">
              <a
                href="mailto:concierge@kumkumpatel.com"
                className="flex items-center space-x-2.5 hover:text-[var(--accent)] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span className="truncate">concierge@kumkumpatel.com</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center space-x-2.5 hover:text-[var(--accent)] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-start space-x-2.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                <div className="text-xs leading-relaxed">
                  <span className="text-[var(--foreground)] font-medium block">Destination Availability:</span>
                  <span>Mumbai • Delhi NCR • Udaipur • Goa • Dubai & Worldwide</span>
                </div>
              </div>
              <p className="text-[11px] text-[var(--muted)]/80 pt-1 leading-snug">
                Response guarantee: Within 24 business hours for all date enquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Kumkum Patel Atelier. All Rights Reserved. Crafted for Haute Indian & Global Bridal Elegance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">
              Terms & Booking Policy
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1.5 text-[var(--accent)] hover:underline cursor-pointer transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
