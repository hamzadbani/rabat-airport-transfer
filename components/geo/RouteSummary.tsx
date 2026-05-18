type Props = {
  from: string;
  to: string;
  distanceKm?: number;
  durationMin?: number;
};

export function RouteSummary({ from, to, distanceKm, durationMin }: Props) {
  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-4 text-sm"
      data-speakable="route-summary"
    >
      <p className="font-semibold text-slate-900">
        {from} → {to}
      </p>
      {(distanceKm != null || durationMin != null) && (
        <p className="mt-1 text-slate-600">
          {distanceKm != null && <span>{distanceKm} km</span>}
          {distanceKm != null && durationMin != null && " · "}
          {durationMin != null && <span>≈ {durationMin} min</span>}
        </p>
      )}
    </div>
  );
}
