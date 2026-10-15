import { Suspense } from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EnquiryForm } from '@/components/ui/EnquiryForm';
import { repository } from '@/lib/db/repository';
import { Clock, MessageCircle, ShieldCheck, Phone } from 'lucide-react';

interface EnquirePageProps {
  searchParams: Promise<{ look?: string; service?: string }>;
}

export default async function EnquirePage({ searchParams }: EnquirePageProps) {
  const { look, service } = await searchParams;
  const services = await repository.getServices();
  const settings = await repository.getSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <SectionHeading
            badge="Consultation & Availability"
            title="Check Event Availability"
            subtitle="To uphold our single-commission commitment per day, we kindly ask that you provide details regarding your envisioned date, venue location, and bridal retinue size."
            centered
            className="mb-10"
          />

          {/* Quick Commitments Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 text-xs text-[var(--muted)] text-center">
            <div className="p-3 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] flex items-center justify-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Response within {settings.responseTimeHours} hours</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] flex items-center justify-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Non-binding enquiry</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] flex items-center justify-center space-x-2">
              <MessageCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Complimentary trial call</span>
            </div>
          </div>

          {/* Multi-Step Interactive Form */}
          <Suspense fallback={<div className="p-16 text-center text-xs text-[var(--muted)]">Loading enquiry concierge...</div>}>
            <EnquiryForm
              services={services}
              initialServiceId={service}
              initialLookName={look}
              responseTimeHours={settings.responseTimeHours}
            />
          </Suspense>

          {/* Urgent Inquiries Callout */}
          <div className="mt-12 text-center text-xs text-[var(--muted)] space-y-2">
            <p>
              Short-notice wedding or immediate press appearance within 7 days?
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Urgent%20Enquiry%20for%20Kumkum%20Patel`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline flex items-center space-x-1 font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Urgent WhatsApp Concierge</span>
              </a>
              <span>•</span>
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="text-[var(--foreground)] hover:underline flex items-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{settings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
