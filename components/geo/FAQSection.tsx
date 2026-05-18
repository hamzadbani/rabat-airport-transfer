"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SeoFaqItem } from "@/lib/seo/messages/types";

type Props = {
  items: SeoFaqItem[];
  title?: string;
  variant?: "faq" | "paa";
};

export function FAQSection({
  items,
  title = "Questions fréquentes",
  variant = "faq",
}: Props) {
  const heading =
    variant === "paa" ? "Les internautes demandent aussi" : title;
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => new Set());

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section
      className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-labelledby="faq-section-title"
    >
      <h2 id="faq-section-title" className="text-lg font-bold text-slate-900">
        {heading}
      </h2>
      <dl className="mt-4 space-y-2">
        {items.map((item, index) => {
          const isOpen = openIndexes.has(index);
          const questionId = `faq-section-q-${variant}-${index}`;
          const answerId = `faq-section-a-${variant}-${index}`;

          return (
            <div
              key={item.question}
              className={`overflow-hidden rounded-xl border transition-colors ${
                isOpen
                  ? "border-teal-200 bg-teal-50/30 shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <dt>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left font-semibold text-slate-900 transition-colors hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  id={questionId}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-teal-700 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
              </dt>
              <dd
                id={answerId}
                className="px-4 pb-3.5 text-slate-600"
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
              >
                {item.answer}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
