import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LookCard } from '@/components/ui/LookCard';
import { repository } from '@/lib/db/repository';

interface PortfolioPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { category = 'all' } = await searchParams;
  const categories = await repository.getCategories();
  const looks = await repository.getLooks(category === 'all' ? undefined : category);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <SectionHeading
            badge="The Portfolio"
            title="Editorial Archives & Bridal Finishes"
            subtitle="Explore our curated collection of haute bridal artistry, red-carpet appearances, and high-fashion editorial commissions. Every finish is art-directed to honor unique skin topography and individual radiance."
            className="mb-10"
          />

          {/* Filter Pills with Shareable Query URLs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => {
              const isActive = (category === 'all' && cat.slug === 'all') || category === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/portfolio?category=${cat.slug}`}
                  scroll={false}
                  className={`px-5 py-2.5 rounded-full text-xs tracking-luxury uppercase font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm'
                      : 'bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--muted)]'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-8 pb-3 border-b border-[var(--border)]">
            <span>
              Displaying <strong className="text-[var(--foreground)]">{looks.length}</strong> bespoke looks
            </span>
            <span className="italic">
              Click any look to inspect skin tone harmonization, products used, and trial recommendations.
            </span>
          </div>

          {/* Looks Grid */}
          {looks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {looks.map((look) => (
                <LookCard key={look.id} look={look} />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-4">
              <p className="font-serif text-2xl text-[var(--foreground)]">No looks found in this category.</p>
              <Link
                href="/portfolio?category=all"
                className="inline-flex px-6 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs tracking-luxury uppercase font-medium"
              >
                View All Artistry
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
