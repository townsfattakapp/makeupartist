'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/types';

interface FaqAccordionProps {
  faqs: FAQ[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <div className="space-y-1">
                <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block">
                  {faq.category}
                </span>
                <span className="font-serif text-lg sm:text-xl text-[var(--foreground)] font-medium">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[var(--muted)] transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-180 text-[var(--accent)]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-6 sm:px-6 text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--border)] pt-4 animate-fadeIn">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
