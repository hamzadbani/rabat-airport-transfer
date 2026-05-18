type Props = {
  bullets: string[];
};

export function TrustSignals({ bullets }: Props) {
  return (
    <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {bullets.map((line) => (
        <li
          key={line}
          className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-medium text-teal-900"
        >
          {line}
        </li>
      ))}
    </ul>
  );
}
