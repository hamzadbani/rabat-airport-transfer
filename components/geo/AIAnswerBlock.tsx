type Props = {
  answer: string;
  className?: string;
};

/** Concise direct-answer block optimized for SGE / AI Overview extraction. */
export function AIAnswerBlock({ answer, className = "" }: Props) {
  return (
    <aside
      className={`rounded-2xl border border-teal-200 bg-teal-50/80 p-5 ${className}`}
      data-speakable="ai-answer"
      aria-label="Réponse rapide"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-teal-800">
        En bref
      </p>
      <p className="mt-2 text-base leading-relaxed text-slate-800">{answer}</p>
    </aside>
  );
}
