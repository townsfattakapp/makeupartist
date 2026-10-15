import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock, Check, Info, ShieldCheck, MapPin } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { repository } from '@/lib/db/repository';

export default async function ServicesPage() {
  const services = await repository.getServices();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <SectionHeading
            badge="The Service Catalogue"
            title="Bespoke Artistry Experiences"
            subtitle="Tailored commission experiences crafted for high-profile weddings, gala red carpets, and editorial publications. Each commission includes dedicated skin architecture and undivided day-of presence."
            className="mb-8"
          />

          {/* Quotation Policy Banner */}
          <div className="mb-12 p-5 rounded-2xl bg-[var(--background-subtle)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3 text-xs text-[var(--muted)]">
              <Info className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--foreground)]">Indicative Packages vs. Confirmed Quotations:</strong>
                <p className="mt-0.5 leading-relaxed">
                  Prices listed below represent standard studio rates. Final confirmed quotations are tailored to your specific venue location, ready-by schedule, guest count, and destination travel requirements.
                </p>
              </div>
            </div>

            <Link
              href="/enquire"
              className="shrink-0 inline-flex items-center space-x-1.5 px-5 py-2 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-colors"
            >
              <span>Request Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Services Grid */}
          <div className="space-y-12">
            {services.map((svc, idx) => (
              <div
                key={svc.id}
                className="rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Visual Image */}
                <div className={`relative lg:col-span-5 aspect-4/3 sm:aspect-16/9 lg:aspect-auto min-h-[300px] overflow-hidden ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}>
                  <Image
                    src={svc.imageUrl}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] tracking-widest uppercase font-semibold text-white border border-white/20">
                      {svc.category}
                    </span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-8 sm:p-10 lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                      <div className="flex items-center space-x-2 text-xs text-[var(--muted)]">
                        <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>Approx. {svc.durationMinutes} Minutes</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] uppercase tracking-widest text-[var(--muted)] block">
                          Indicative Rate
                        </span>
                        <span className="font-mono text-lg font-bold text-[var(--accent)]">
                          {svc.priceIndicative}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] font-medium">
                      {svc.title}
                    </h3>

                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {svc.fullDescription}
                    </p>

                    {/* Inclusions */}
                    <div className="pt-2">
                      <h4 className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-2.5">
                        What Is Included:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--muted)]">
                        {svc.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions & Links */}
                  <div className="pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-1.5 text-xs text-[var(--muted)]">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{svc.travelPolicy || 'London studio or on-location by arrangement'}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/services/${svc.slug}`}
                        className="px-5 py-2.5 rounded-full border border-[var(--border)] text-xs tracking-luxury uppercase font-medium hover:border-[var(--foreground)] transition-colors"
                      >
                        Preparation Guide
                      </Link>

                      <Link
                        href={`/enquire?service=${svc.id}`}
                        className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-colors shadow-xs"
                      >
                        <span>Check Date</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
