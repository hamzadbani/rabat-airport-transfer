export function AirportTransferInfo() {
  return (
    <section
      className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
      aria-labelledby="airport-info-title"
      data-speakable="airport-transfer"
    >
      <h2 id="airport-info-title" className="text-lg font-bold text-slate-900">
        Transfert aéroport Rabat-Salé (RBA)
      </h2>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        <li>
          <strong>Prise en charge :</strong> terminal arrivées ou adresse au départ
          — point confirmé par WhatsApp.
        </li>
        <li>
          <strong>Marge horaire :</strong> nous recommandons d’anticiper le trafic
          Rabat–Salé aux heures de pointe.
        </li>
        <li>
          <strong>Vol retardé :</strong> envoyez le nouveau créneau ; suivi de vol
          possible sur demande.
        </li>
        <li>
          <strong>CMN :</strong> liaison Rabat ↔ Aéroport Mohammed V sur devis
          longue distance.
        </li>
      </ul>
    </section>
  );
}
