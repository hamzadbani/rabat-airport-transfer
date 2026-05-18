type Props = {
  summary: string;
  children?: React.ReactNode;
};

/** Wraps speakable summary for voice / AI parsers. */
export function SpeakableContent({ summary, children }: Props) {
  return (
    <div data-speakable="summary" className="sr-only" aria-hidden>
      <p>{summary}</p>
      {children}
    </div>
  );
}
