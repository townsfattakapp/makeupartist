import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Award, CheckCircle2, ShieldCheck, Layers, Droplets } from 'lucide-react';
import { repository } from '@/lib/db/repository';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { LookGallery } from '@/components/ui/LookGallery';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { LookCard } from '@/components/ui/LookCard';

interface LookDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LookDetailPage({ params }: LookDetailPageProps) {
  const { slug } = await params;
  const look = await repository.getLookBySlug(slug);

  if (!look) {
    notFound();
  }

  const allServices = await repository.getServices();
  const matchedService = allServices.find((s) => s.id === look.serviceId) || allServices[0];
  const relatedLooks = (await repository.getLooks(look.categoryId))
    .filter((l) => l.id !== look.id)
    .slice(0, 3);

  const galleryImages = [
    look.primaryImageUrl,
    ...(look.galleryUrls || []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs tracking-luxury uppercase text-[var(--muted)] mb-8">
            <Link href="/portfolio" className="hover:text-[var(--accent)] transition-colors flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)] font-medium">{look.categoryName || 'Artistry'}</span>
            <span>/</span>
            <span className="text-[var(--foreground)] font-medium truncate max-w-[200px] sm:max-w-none">
              {look.title}
            </span>
          </div>

          {/* Look Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-8">
              <LookGallery
                images={galleryImages}
                title={look.title}
                category={look.categoryName}
                finishType={look.finishType}
              />

              {/* Consented Before & After Comparison if present */}
              {look.beforeImageUrl && look.afterImageUrl && (
                <div className="p-6 rounded-2xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--accent)] flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>Before / After Transformation</span>
                    </span>
                    <span className="text-[10px] text-[var(--muted)] flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Consented Client Demonstration</span>
                    </span>
                  </div>
                  <BeforeAfterSlider
                    beforeImage={look.beforeImageUrl}
                    afterImage={look.afterImageUrl}
                    beforeLabel="Hydration Prep"
                    afterLabel="Finished Glow"
                  />
                </div>
              )}
            </div>

            {/* Editorial Information Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs tracking-ultra-wide uppercase text-[var(--accent)] font-semibold">
                  <span>{look.categoryName || 'Haute Artistry'}</span>
                  <span>•</span>
                  <span>{look.clientType}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--foreground)] leading-tight">
                  {look.title}
                </h1>

                <p className="text-sm text-[var(--muted)] leading-relaxed pt-2">
                  {look.description}
                </p>
              </div>

              {/* Skin Tone & Finish Breakdown Card */}
              <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-4 text-xs">
                <div className="flex items-start space-x-3">
                  <Droplets className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[var(--foreground)] uppercase tracking-wider block">
                      Skin Tone Harmonization:
                    </span>
                    <p className="text-[var(--muted)] mt-0.5">{look.skinToneDescription}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border-t border-[var(--border)] pt-3">
                  <Layers className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[var(--foreground)] uppercase tracking-wider block">
                      Aesthetic Finish Type:
                    </span>
                    <p className="text-[var(--muted)] mt-0.5">{look.finishType} with 16-hour sweat & camera longevity</p>
                  </div>
                </div>
              </div>

              {/* Products Used */}
              {look.productsUsed && look.productsUsed.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)]">
                    Featured Luxury Formulations
                  </h3>
                  <ul className="text-xs text-[var(--muted)] space-y-2">
                    {look.productsUsed.map((prod, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{prod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Techniques */}
              {look.keyTechniques && look.keyTechniques.length > 0 && (
                <div className="space-y-3 border-t border-[var(--border)] pt-6">
                  <h3 className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)]">
                    Bespoke Techniques Applied
                  </h3>
                  <ul className="text-xs text-[var(--muted)] space-y-2">
                    {look.keyTechniques.map((tech, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[var(--accent)] font-bold">•</span>
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Matching Service Experience Card */}
              {matchedService && (
                <div className="p-6 rounded-2xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="tracking-widest uppercase font-semibold text-[var(--accent)]">
                      Recommended Experience
                    </span>
                    <span className="font-mono font-semibold text-[var(--foreground)]">
                      {matchedService.priceIndicative}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl text-[var(--foreground)] font-medium">
                    {matchedService.title}
                  </h4>

                  <p className="text-xs text-[var(--muted)] line-clamp-2">
                    {matchedService.shortDescription}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/enquire?look=${encodeURIComponent(look.title)}&service=${matchedService.id}`}
                      className="flex-1 inline-flex items-center justify-center space-x-2 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-colors shadow-sm"
                    >
                      <span>Check Availability For This Look</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/services/${matchedService.slug}`}
                      className="inline-flex items-center justify-center px-4 py-3 rounded-full border border-[var(--border)] text-xs tracking-luxury uppercase font-medium hover:border-[var(--foreground)] transition-colors"
                    >
                      <span>View Service</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Looks Carousel / Grid */}
          {relatedLooks.length > 0 && (
            <div className="mt-24 pt-16 border-t border-[var(--border)]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block">
                    More From The Archive
                  </span>
                  <h3 className="font-serif text-3xl text-[var(--foreground)]">
                    Related Artistry Looks
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
                {relatedLooks.map((relLook) => (
                  <LookCard key={relLook.id} look={relLook} />
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
