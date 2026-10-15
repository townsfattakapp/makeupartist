import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioLook } from '@/types';

interface LookCardProps {
  look: PortfolioLook;
  priority?: boolean;
}

export function LookCard({ look, priority = false }: LookCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-[var(--card)] border border-[var(--border)] transition-all duration-500 hover:shadow-xl hover:border-[var(--accent)]/50">
      {/* Visual Crop */}
      <Link
        href={`/portfolio/${look.slug}`}
        className="relative block aspect-3/4 sm:aspect-4/5 w-full overflow-hidden bg-[var(--background-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <Image
          src={look.primaryImageUrl}
          alt={look.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Floating Finish Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] tracking-wide text-white border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>{look.finishType}</span>
          </span>
        </div>

        {/* Before/After Tag indicator if available */}
        {look.beforeImageUrl && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent)]/90 text-black text-[10px] font-semibold tracking-wide">
              Before / After Available
            </span>
          </div>
        )}
      </Link>

      {/* Editorial Content Meta */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] tracking-luxury uppercase text-[var(--accent)] font-medium">
            <span>{look.categoryName || 'Bridal & Editorial'}</span>
            <span className="text-[var(--muted)] font-mono">{look.clientType}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
            <Link href={`/portfolio/${look.slug}`}>
              {look.title}
            </Link>
          </h3>

          <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed pt-1">
            {look.excerpt}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[var(--muted)] italic truncate max-w-[60%]">
            {look.skinToneDescription}
          </span>

          <Link
            href={`/portfolio/${look.slug}`}
            className="inline-flex items-center space-x-1 text-xs tracking-luxury uppercase font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
