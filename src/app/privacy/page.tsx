import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-8">
          <Link href="/" className="inline-flex items-center space-x-1 text-xs tracking-luxury uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio</span>
          </Link>

          <div className="space-y-3">
            <span className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
              Client Confidentiality
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[var(--foreground)]">
              Privacy Policy & Client Data Charter
            </h1>
            <p className="text-xs text-[var(--muted)]">
              Last updated: October 2026 • Compliant with UK GDPR & Data Protection Act 2018
            </p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm text-[var(--muted)] leading-relaxed space-y-6 pt-6 border-t border-[var(--border)]">
            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[var(--foreground)]">1. Commitment to Client Discretion</h2>
              <p>
                At Kumkum Patel Artistry, we hold our clients’ personal affairs, wedding timelines, and privacy in the highest regard. We never sell, lease, or monetize your contact details, event locations, or personal imagery.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[var(--foreground)]">2. Information We Collect</h2>
              <p>
                When submitting an availability enquiry or booking a bespoke commission, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Your full name, contact telephone, and email address</li>
                <li>Event commission date, venue location, and scheduled ready-by time</li>
                <li>Skin sensitivities, dermatological notes, and aesthetic inspirations</li>
                <li>Party size and chosen artistry experience tier</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[var(--foreground)]">3. Client Photography & Social Media Consent</h2>
              <p>
                We operate under strict consent protocols. Prior to taking or publishing any behind-the-scenes video, before-and-after imagery, or bridal portraits on Instagram or our portfolio, we secure explicit, written consent from the client. Non-disclosure agreements (NDAs) are honored for high-profile and celebrity engagements without exception.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[var(--foreground)]">4. Data Retention & Security</h2>
              <p>
                Enquiry records are encrypted on secure database servers (Tiger Cloud / PostgreSQL) with restricted access limited to the lead artist and authorized studio coordinator. You may request deletion of your records at any time by contacting <a href="mailto:concierge@kumkumpatel.com" className="text-[var(--accent)] underline">concierge@kumkumpatel.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
