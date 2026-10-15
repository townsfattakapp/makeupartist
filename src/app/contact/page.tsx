import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { repository } from '@/lib/db/repository';

export default async function ContactPage() {
  const settings = await repository.getSettings();
  const faqs = await repository.getFaqs();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <SectionHeading
            badge="Studio & Concierge"
            title="Connect With The Atelier"
            subtitle="Whether booking a destination bridal commission, editorial production, or inquiring about preview trial dates, our studio concierge is here to assist."
            className="mb-12"
          />

          {/* Contact Details & Service Areas Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Direct Studio Channels */}
            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-6">
              <h3 className="font-serif text-2xl text-[var(--foreground)]">Direct Communications</h3>
              <div className="space-y-4 text-xs text-[var(--muted)]">
                <div>
                  <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block mb-1">
                    Concierge Email
                  </span>
                  <a href={`mailto:${settings.contactEmail}`} className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[var(--accent)]" />
                    <span>{settings.contactEmail}</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-[var(--border)]">
                  <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block mb-1">
                    Studio Telephone
                  </span>
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[var(--accent)]" />
                    <span>{settings.phone}</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-[var(--border)]">
                  <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block mb-1">
                    WhatsApp Concierge
                  </span>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Aurelia%20Luxe`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Live Chat via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Locations */}
            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-6">
              <h3 className="font-serif text-2xl text-[var(--foreground)]">Studio Addresses</h3>
              <div className="space-y-4 text-xs text-[var(--muted)]">
                <div>
                  <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block mb-1">
                    Mayfair Preview Atelier (By Appointment)
                  </span>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    28 Berkeley Square, Mayfair, London W1J 6EN
                  </p>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
                    Private 3-hour bridal trials & cosmetic moodboard consultations.
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--border)]">
                  <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block mb-1">
                    Cotswolds Studio Retreat
                  </span>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    Chipping Campden, Gloucestershire, GL55
                  </p>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
                    Servicing Daylesford, Estelle Manor, and Soho Farmhouse weddings.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Areas & Response Commitment */}
            <div className="p-8 rounded-2xl bg-[var(--background-subtle)] border border-[var(--border)] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-[var(--foreground)]">Travel & Coverage</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Aurelia travels regularly across the UK and Continental Europe with full mobile editorial lighting and backstage cosmetic trunks.
                </p>
                <ul className="text-xs text-[var(--foreground)] space-y-2">
                  {settings.serviceAreas.map((area, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <Link
                  href="/enquire"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-colors"
                >
                  <span>Submit Date Enquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="max-w-4xl mx-auto pt-8">
            <SectionHeading
              badge="Frequently Answered Questions"
              title="Booking Policies, Trials & Sanitation"
              subtitle="Clear guidance on retainers, trial timings, wedding day itineraries, and sensitive skincare standards."
              centered
              className="mb-12"
            />

            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
