import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  actionText,
  actionHref,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col ${
        centered ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {badge && (
        <span className="text-[11px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] mb-2.5 block">
          {badge}
        </span>
      )}
      
      <div className={`w-full flex flex-col md:flex-row md:items-end justify-between gap-4 ${
        centered ? 'justify-center' : ''
      }`}>
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--foreground)] tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actionText && actionHref && !centered && (
          <Link
            href={actionHref}
            className="shrink-0 inline-flex items-center space-x-1.5 text-xs tracking-luxury uppercase font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors py-1 group"
          >
            <span>{actionText}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
