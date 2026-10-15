import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-subtle)] text-[var(--foreground)] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand & Statement */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl tracking-widest font-medium block">
              KUMKUM PATEL
            </span>
            <p className="text-xs tracking-luxury uppercase text-[var(--accent)] font-medium">
              Haute Bridal & Editorial Makeup Artistry
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm pt-2">
              Unrivalled glass-skin architecture, quiet luxury aesthetics, and dedicated wedding day accompaniment across luxury venues and global destination celebrations.
            </p>
            
            {/* Concierge Actions */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://wa.me/919876543210?text=Hello%20Kumkum%20Patel,%20I%20would%20like%20to%20check%20availability%20for%20my%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)] text-xs tracking-wide transition-all duration-300"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp Concierge</span>
              </a>
              <a
                href="https://instagram.com/kumkumpatelmakeup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)] text-xs tracking-wide transition-all duration-300"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                <span>@kumkumpatelmakeup</span>
                <ArrowUpRight className="w-3 h-3 text-[var(--muted)]" />
              </a>
            </div>
          </div>

          {/* Service Areas */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)]">
              Service Areas
            </h3>
            <ul className="text-sm text-[var(--muted)] space-y-2.5">
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Mayfair, Chelsea & Belgravia</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>The Cotswolds & Oxfordshire</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Paris & French Riviera</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Lake Como & Tuscany</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Global Destination Bookings</span>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)]">
              The Studio
            </h3>
            <ul className="text-sm text-[var(--muted)] space-y-2.5">
              <li>
                <Link href="/portfolio" className="hover:text-[var(--accent)] transition-colors">
                  Portfolio & Finishes
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[var(--accent)] transition-colors">
                  Services & Inclusions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent)] transition-colors">
                  Artist Philosophy & Kit
                </Link>
              </li>
              <li>
                <Link href="/enquire" className="hover:text-[var(--accent)] transition-colors">
                  Bespoke Availability Request
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">
                  Studio FAQ & Retainers
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-xs text-[var(--accent)] hover:underline inline-flex items-center space-x-1 pt-1">
                  <span>Artist Admin Portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Concierge */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)]">
              Studio Inquiries
            </h3>
            <div className="text-sm text-[var(--muted)] space-y-3">
              <a href="mailto:concierge@kumkumpatel.com" className="flex items-center space-x-2 hover:text-[var(--accent)] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>concierge@kumkumpatel.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center space-x-2 hover:text-[var(--accent)] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>+91 98765 43210</span>
              </a>
              <p className="text-xs text-[var(--muted)] pt-2 leading-relaxed">
                Response guarantee: Within 24 business hours for all date enquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Realistic Sample Content Notice */}
        <div className="border-t border-[var(--border)] pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span>
              Sample Portfolio & Studio Demonstrator. Photography and client references are realistic sample content curated for presentation.
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">
              Terms & Booking Policy
            </Link>
            <span>© 2026 Kumkum Patel Artistry. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
