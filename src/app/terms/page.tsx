import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function TermsPage() {
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
              Studio Policies
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[var(--foreground)]">
              Terms of Commission & Retainer Policy
            </h1>
            <p className="text-xs text-[var(--muted)]">
              Studio Commission Agreement Terms • Aurelia Luxe Artistry
            </p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm text-[var(--muted)] leading-relaxed space-y-6 pt-6 border-t border-[var(--border)]">
            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[var(--foreground)]">1. Booking Retainers & Calendar Exclusivity</h2>
              <p>
                To guarantee single-client calendar dedication on your wedding or event date, a non-refundable booking retainer of 30% of the total quotation is required alongside a countersigned Commission Agreement. Verbal holds and enquiries do not reserve a date.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[var(--foreground)]">2. Bridal Preview Trials</h2>
              <p>
                Bridal trials are held at our Mayfair studio 8 to 12 weeks prior to the wedding date. Should a bride wish to cancel the wedding booking following the trial, the trial fee and initial 30% retainer remain non-refundable to cover artist time and studio reservation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[var(--foreground)]">3. Final Balance Settlement</h2>
              <p>
                The remaining 70% commission balance is due 30 days prior to the wedding date or on-set call date. For international destination commissions, travel logistics and accommodation must be settled upon flight and hotel booking.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[var(--foreground)]">4. Cancellation Policy</h2>
              <p>
                In the rare event of client cancellation more than 90 days before the wedding date, no further balances are due. Cancellations within 30 days of the date require full settlement of the remaining balance, as the exclusive date cannot be re-booked on short notice.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
