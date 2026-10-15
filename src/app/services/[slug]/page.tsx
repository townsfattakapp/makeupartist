import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Clock, Check, MapPin, Calendar, HeartHandshake, ShieldCheck } from 'lucide-react';
import { repository } from '@/lib/db/repository';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { LookCard } from '@/components/ui/LookCard';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await repository.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Related looks for this service
  const relatedLooks = (await repository.getLooks()).filter(
    (l) => l.serviceId === service.id || l.categoryName?.toLowerCase().includes(service.category.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs tracking-luxury uppercase text-[var(--muted)] mb-8">
            <Link href="/services" className="hover:text-[var(--accent)] transition-colors flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Services</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)] font-medium">{service.category}</span>
            <span>/</span>
            <span className="text-[var(--foreground)] font-medium truncate max-w-[200px] sm:max-w-none">
              {service.title}
            </span>
          </div>

          {/* Hero Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Visual Cover */}
            <div className="lg:col-span-6 relative aspect-4/5 rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] tracking-widest uppercase font-semibold text-white border border-white/20">
                  {service.category} Artistry
                </span>
              </div>
            </div>

            {/* Service Information */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs tracking-ultra-wide uppercase text-[var(--accent)] font-semibold">
                  <span>Indicative Package</span>
                  <span>•</span>
                  <span>Dedicated Presence</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--foreground)] leading-tight">
                  {service.title}
                </h1>

                <div className="flex items-center space-x-6 py-4 border-y border-[var(--border)]">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">
                      Indicative Rate
                    </span>
                    <span className="font-mono text-2xl font-bold text-[var(--accent)]">
                      {service.priceIndicative}
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-[var(--border)]" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">
                      Estimated Duration
                    </span>
                    <span className="font-mono text-base font-semibold text-[var(--foreground)] flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-[var(--accent)]" />
                      <span>~{service.durationMinutes} Minutes</span>
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[var(--muted)] leading-relaxed pt-2">
                  {service.fullDescription}
                </p>
              </div>

              {/* Inclusions */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-4">
                <h3 className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)]">
                  What This Commission Includes
                </h3>
                <ul className="space-y-2.5 text-xs text-[var(--muted)]">
                  {service.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparation Guidance */}
              {service.preparationGuide && (
                <div className="p-6 rounded-2xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-3">
                  <h3 className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Client Preparation Guidance</span>
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed whitespace-pre-line">
                    {service.preparationGuide}
                  </p>
                </div>
              )}

              {/* Travel Policy */}
              {service.travelPolicy && (
                <div className="flex items-start space-x-3 text-xs text-[var(--muted)]">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--foreground)]">Travel & Destination Coverage:</strong>
                    <p className="mt-0.5">{service.travelPolicy}</p>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href={`/enquire?service=${service.id}`}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-all shadow-md"
                >
                  <span>Request Availability For This Experience</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <p className="text-center text-[10px] text-[var(--muted)] mt-2">
                  Non-binding request • Quotation valid for 7 days upon receipt
                </p>
              </div>
            </div>
          </div>

          {/* Related Looks from Portfolio */}
          {relatedLooks.length > 0 && (
            <div className="mt-24 pt-16 border-t border-[var(--border)]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block">
                    Portfolio Demonstrations
                  </span>
                  <h3 className="font-serif text-3xl text-[var(--foreground)]">
                    Looks Executed with This Experience
                  </h3>
                </div>
                <Link
                  href="/portfolio"
                  className="text-xs tracking-luxury uppercase font-medium hover:text-[var(--accent)] transition-colors"
                >
                  View All Looks →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedLooks.map((look) => (
                  <LookCard key={look.id} look={look} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
