import type { SeoPageId } from "./types";
import type { SeoPageMessages } from "./messages/types";

const WA =
  "La réservation se fait par WhatsApp ou téléphone : nous confirmons le tarif, le créneau et le point de rendez-vous avant le départ.";

const TOP_QUERY_KEYWORDS = {
  rabat: [
    "taxi rabat",
    "taxi privé rabat",
    "transport privé rabat",
    "chauffeur privé rabat",
    "taxi rabat aeroport",
    "transfert aeroport rabat",
    "prix taxi rabat",
    "tarif taxi rabat",
    "reservation taxi rabat",
    "taxi rabat 24h",
  ],
  sale: [
    "taxi salé",
    "taxi privé salé",
    "transport privé salé",
    "chauffeur privé salé",
    "taxi salé aéroport",
    "transfert aeroport salé",
    "prix taxi salé",
    "tarif taxi salé",
    "reservation taxi salé",
    "taxi sale rabat",
  ],
} as const;

function sec(h: string, ...paragraphs: string[]) {
  return { heading: h, paragraphs };
}

function hub(city: "rabat" | "sale"): SeoPageMessages {
  const isR = city === "rabat";
  const label = isR ? "Rabat" : "Salé";
  const other = isR ? "Salé" : "Rabat";
  return {
    meta: {
      title: `Taxi ${label} 24/7 | Prix Clair, Réservation Rapide & Aéroport RBA | Rabat Transfert`,
      description: `Taxi ${label} premium : ponctualité, trajets confortables, prix annoncé avant la course. Liaison ${other}, aéroport Rabat-Salé (RBA). ${WA}`,
      keywords: [
        `taxi ${label.toLowerCase()}`,
        `taxi ${label.toLowerCase()} 24h`,
        `réservation taxi ${label.toLowerCase()}`,
        "taxi aéroport rabat salé",
      ],
    },
    h1: `Taxi ${label} — service 24/7`,
    heroSubtitle: `Courses en ville, rendez-vous professionnels et liaisons vers l’aéroport Rabat-Salé (RBA). Idéal habitants, entreprises et voyageurs qui veulent un service fiable, sans surprise tarifaire.`,
    trustBullets: [
      "24h/24 — 7j/7 sur réservation",
      "Prix communiqué avant prise en charge",
      "Chauffeurs expérimentés & véhicules premium",
    ],
    sections: [
      sec(
        `Pourquoi un taxi privé à ${label} ?`,
        `À ${label}, le trafic et les accès varient selon les quartiers et l’heure. Un taxi privé premium permet d’optimiser l’itinéraire, d’éviter les pertes de temps inutiles et d’arriver à l’heure pour un vol, une administration ou un rendez-vous professionnel.`,
        `Nous desservons aussi les liaisons vers ${other} et l’aéroport RBA. Pour un besoin aéroport dédié, consultez les pages taxi ${label} aéroport et transfert ${label} aéroport : le contenu est spécifique (prise en charge, marge horaire, bagages).`,
      ),
      sec(
        "Réservation simple & transparente",
        `Indiquez adresse de départ, destination, date/heure et nombre de bagages. Nous répondons avec un montant clair ou un forfait lorsque le trajet est standardisé — pratique courante pour l’aéroport et certaines liaisons inter-villes.`,
        WA,
      ),
      sec(
        "Zones couvertes & conseils pratiques",
        isR
          ? "Rabat couvre des profils très différents : Hay Riad et les administrations, Agdal et les axes commerçants, Souissi et les résidences, ainsi que les gares et hôtels. Précisez votre secteur pour une estimation plus juste."
          : "Salé couvre la médina, Tabriquet, Hay Salam, Bettana et les liaisons quotidiennes vers Rabat. Indiquez votre quartier exact pour optimiser le point de prise en charge et le temps de trajet.",
        `Pour les budgets, la page prix taxi ${label} détaille les facteurs de tarification. Pour Casablanca / CMN, voir rabat-casablanca-taxi.`,
      ),
    ],
    faq: [
      {
        question: `Comment réserver un taxi à ${label} ?`,
        answer:
          "Par WhatsApp ou appel : adresses, horaire, bagages — nous confirmons le tarif et le créneau.",
      },
      {
        question: "Proposez-vous des transferts aéroport ?",
        answer:
          "Oui — pages dédiées taxi aéroport et transfert aéroport pour RBA, avec process de prise en charge et tarification transparente.",
      },
    ],
    relatedSectionTitle: "Autres services utiles",
  };
}

function taxiAirport(city: "rabat" | "sale"): SeoPageMessages {
  const L = city === "rabat" ? "Rabat" : "Salé";
  return {
    meta: {
      title: `Taxi ${L} Aéroport (RBA) 24/7 | Prix Fixe & Réservation Rapide | Rabat Transfert`,
      description: `Taxi ${L} aéroport Rabat-Salé (RBA) : ponctualité, prix annoncé, prise en charge claire. Suivi de vol sur demande. ${WA}`,
      keywords: [
        `taxi ${L.toLowerCase()} aeroport`,
        "taxi aeroport rabat salé",
        "transfert rba",
        "prix taxi aeroport rabat",
      ],
    },
    h1: `Taxi ${L} — aéroport Rabat-Salé (RBA)`,
    heroSubtitle: `Arrivées et départs 24/7 vers ${L}, ${city === "rabat" ? "Salé" : "Rabat"} et destinations clés. Communication simple, bagages gérés, véhicule premium.`,
    trustBullets: [
      "Devis / forfait confirmé avant départ",
      "Expérience aéroport & accès RBA",
      "Contact direct (appel / WhatsApp)",
    ],
    sections: [
      sec(
        "Prise en charge à RBA : comment ça se passe",
        "Indiquez le numéro de vol, l’heure d’atterrissage ou de décollage, le terminal si connu, et l’adresse finale. Nous confirmons le point de rendez-vous et le tarif : moins d’ambiguïté, plus de sérénité après un vol.",
        "Pour un départ vers RBA, nous recommandons une marge trafic réaliste (surtout aux heures de bureau). Mentionnez le volume de bagages pour dimensionner le véhicule.",
      ),
      sec(
        "Distances usuelles et liaisons longues",
        `Les trajets fréquents depuis RBA desservent les quartiers centraux et périphériques de ${L} et de ${city === "rabat" ? "Salé" : "Rabat"}. Pour Casablanca / CMN, préférez la page rabat-casablanca-taxi : forfait longue distance plus adapté.`,
        "Si vous hésitez entre taxi aéroport et transfert privé, la différence est surtout dans la coordination : les deux pages détaillent l’approche.",
      ),
      sec(
        "Retards, vols décalés et communication",
        "En cas de retard d’avion, envoyez votre nouveau créneau : nous recalculons la prise en charge. Le suivi de vol peut être organisé sur demande.",
        "Le paiement et les options se confirment à la réservation ; l’important est que le prix soit annoncé avant le départ.",
      ),
    ],
    faq: [
      {
        question: "Prix fixe depuis l’aéroport ?",
        answer:
          "Souvent oui pour des trajets standardisés ; sinon estimation ferme avant départ.",
      },
      {
        question: "Bagages volumineux ?",
        answer:
          "Indiquez le format : nous préparons le véhicule adapté (berline premium).",
      },
    ],
    relatedSectionTitle: "Voir aussi",
  };
}

function transfertAirport(city: "rabat" | "sale"): SeoPageMessages {
  const L = city === "rabat" ? "Rabat" : "Salé";
  return {
    meta: {
      title: `Transfert ${L} Aéroport RBA | Privé 24/7 & Prix Annoncé | Rabat Transfert`,
      description: `Transfert privé ${L} ↔ aéroport Rabat-Salé : véhicule dédié, chauffeur professionnel, coordination WhatsApp. ${WA}`,
      keywords: [`transfert ${L.toLowerCase()} aeroport`, "transfert privé rba", "navette privée rabat"],
    },
    h1: `Transfert ${L} — aéroport Rabat-Salé`,
    heroSubtitle:
      "Service porte-à-porte avec véhicule réservé : confort, discrétion, créneau confirmé — idéal affaires et familles.",
    trustBullets: ["Véhicule dédié", "Prix annoncé avant départ", "Premium Mercedes/BMW"],
    sections: [
      sec(
        "Transfert vs taxi aéroport : nuance utile",
        "Le transfert met l’accent sur la planification : confirmation du prix, anticipation du trafic, consignes de pickup claires. Le taxi aéroport reste pertinent pour une course simple mais exige la même rigueur sur le tarif.",
        `Pour ${L}, nous connaissons les accès quartiers et les points de rendez-vous pratiques (hôtels, bureaux, résidences).`,
      ),
      sec(
        "Vol, bagages et ponctualité",
        "Partagez votre vol et votre destination finale : nous dimensionnons la marge et le véhicule. Les bagages volumineux doivent être annoncés à l’avance.",
        "Pour une liaison directe vers Casablanca après atterrissage, demandez un forfait : la page rabat-casablanca-taxi détaille la logique.",
      ),
    ],
    faq: [
      {
        question: "Peut-on payer sur place ?",
        answer: "Modalités confirmées à la réservation ; prix toujours annoncé avant départ.",
      },
    ],
    relatedSectionTitle: "Pages complémentaires",
  };
}

function taxiPrix(city: "rabat" | "sale"): SeoPageMessages {
  const L = city === "rabat" ? "Rabat" : "Salé";
  return {
    meta: {
      title: `Prix Taxi ${L} | Aéroport RBA, Ville & Longue Distance | Rabat Transfert`,
      description: `Comprenez les prix taxi à ${L} : exemples, facteurs de variation, forfaits possibles. Devis rapide. ${WA}`,
      keywords: [`prix taxi ${L.toLowerCase()}`, `tarif taxi ${L.toLowerCase()}`, "taxi aeroport prix"],
    },
    h1: `Prix taxi ${L} — repères`,
    heroSubtitle:
      "Transparence avant départ : distance, créneau horaire, attente et destination influencent le tarif. Nous privilégions une estimation ferme ou un forfait lorsque c’est possible.",
    trustBullets: ["Devis gratuit", "Explications simples", "Forfaits quand c’est pertinent"],
    sections: [
      sec(
        "Ce qui fait varier le prix",
        "La distance réelle, le trafic, l’heure (pointe/nuit), l’attente sur place et les bagages sont les principaux leviers. Les trajets aéroport et inter-villes se prêtent souvent à un forfait.",
        `Pour ${L}, préciser le quartier exact (médina, axes centraux, périphérie) améliore la précision du devis.`,
      ),
      sec(
        "Exemples de demandes fréquentes",
        "Courses intra-ville, liaison vers l’aéroport RBA, trajet vers Rabat ou Salé selon votre base, et longue distance vers Casablanca. Chaque cas a une logique tarifaire différente : nous l’expliquons sans jargon.",
        "Pour l’aéroport, croisez avec la page taxi aéroport dédiée : le service et le contexte comptent autant que le prix.",
      ),
    ],
    faq: [
      {
        question: "Les tarifs sont-ils fixes ?",
        answer: "Souvent pour des trajets standard ; sinon estimation ferme avant départ.",
      },
    ],
    relatedSectionTitle: "Réserver un service",
  };
}

function chauffeurCity(city: "rabat" | "sale"): SeoPageMessages {
  const L = city === "rabat" ? "Rabat" : "Salé";
  return {
    meta: {
      title: `Chauffeur Privé ${L} | Mise à Disposition & Transferts VIP | Rabat Transfert`,
      description: `Chauffeur privé ${L} : mise à disposition, transferts premium, image pro. Discrétion & ponctualité. ${WA}`,
      keywords: [`chauffeur privé ${L.toLowerCase()}`, "mise à disposition rabat", "vtc premium"],
    },
    h1: `Chauffeur privé — ${L}`,
    heroSubtitle:
      "Service haut de gamme pour dirigeants, délégations et événements : véhicule impeccable, conduite souple, coordination des étapes.",
    trustBullets: ["Discrétion", "Planning optimisé", "Mercedes / BMW"],
    sections: [
      sec(
        "Mise à disposition et journées chargées",
        "Gardez un chauffeur à votre rythme : rendez-vous multiples, attentes courtes, déplacements imprévus. La facturation horaire est expliquée à l’avance.",
        "Pour RBA ou une liaison Casablanca, le format chauffeur privé apporte confort et fiabilité lorsque l’agenda est serré.",
      ),
    ],
    faq: [
      {
        question: "Facturation entreprise ?",
        answer: "Oui sur demande : précisez vos contraintes administratives.",
      },
    ],
    relatedSectionTitle: "Autres pages",
  };
}

const ZONE_COPY: Record<string, { title: string; hook: string; local: string }> = {
  "taxi-hay-riad": {
    title: "Taxi Hay Riad Rabat 24/7 | Admin & Aéroport RBA | Rabat Transfert",
    hook: "Hay Riad concentre administrations et bureaux : accès, parkings et créneaux chargés maîtrisés.",
    local:
      "Déplacements intra-quartier, liaisons vers Agdal/Souissi, gare ONCF et aéroport RBA. Précisez l’entrée du bâtiment pour une prise en charge fluide.",
  },
  "taxi-agdal": {
    title: "Taxi Agdal Rabat 24/7 | Commerces, Soirées & RBA | Rabat Transfert",
    hook: "Agdal combine résidentiel, commerce et sorties : nous optimisons les prises en charge près des axes vivants.",
    local:
      "Courses courtes, restaurants/bars avec reprise tardive, liaisons Hay Riad/Souissi et transferts aéroport.",
  },
  "taxi-souissi": {
    title: "Taxi Souissi Rabat 24/7 | Résidentiel & Ambassades | Rabat Transfert",
    hook: "Souissi exige discrétion et ponctualité : villas, résidences, institutions.",
    local:
      "Points de rendez-vous précis, attentes encadrées, liaisons longues vers RBA ou inter-villes sur forfait.",
  },
  "taxi-yaacoub-el-mansour": {
    title: "Taxi Yaacoub El Mansour Rabat 24/7 | Quartier & Aéroport | Rabat Transfert",
    hook: "Quartier résidentiel et familial : trajets locaux, écoles, commerces et liaisons vers le centre.",
    local:
      "Bon compromis pour rejoindre Hay Riad, l’Océan ou l’aéroport selon le créneau ; indiquez votre adresse exacte pour un devis juste.",
  },
  "taxi-hassan-rabat": {
    title: "Taxi Hassan Rabat 24/7 | Tour Hassan & Centre | Rabat Transfert",
    hook: "Proximité zone monumentale et centre : idéal touristique et transferts hôtels.",
    local:
      "Nous gérons les accès sensibles au trafic touristique et les créneaux chargés du week-end.",
  },
  "taxi-ocean-rabat": {
    title: "Taxi Océan Rabat 24/7 | Front de Mer & Aéroport | Rabat Transfert",
    hook: "Axes côtiers et hôtels : prise en charge claire pour arrivées et départs.",
    local:
      "Parfait pour liaisons vers Agdal, Souissi ou RBA ; précisez votre hôtel ou résidence pour optimiser l’accès.",
  },
  "taxi-akkari": {
    title: "Taxi Akkari Rabat 24/7 | Quartier & Liaisons | Rabat Transfert",
    hook: "Déplacements locaux et connexions vers les grands axes de Rabat.",
    local:
      "Indiquez votre point de départ précis : le trajet vers RBA ou Salé varie selon l’itinéraire optimal au moment T.",
  },
  "taxi-takkadoum": {
    title: "Taxi Takkadoum Rabat 24/7 | Quartier & Aéroport | Rabat Transfert",
    hook: "Quartier en expansion : résidences, commerces et liaisons vers le centre-ville.",
    local:
      "Pour l’aéroport, anticipez les heures de pointe ; un forfait ou une estimation ferme est communiqué avant départ.",
  },
};

function zonePage(id: SeoPageId): SeoPageMessages {
  const z = ZONE_COPY[id];
  if (!z) {
    return generic(id, "Taxi Rabat — quartier", "Service premium 24/7 sur réservation.");
  }
  return {
    meta: {
      title: z.title,
      description: `${z.hook} ${WA}`,
      keywords: [id.replace(/-/g, " "), "taxi rabat quartier", "taxi rabat aeroport"],
    },
    h1: id
      .replace("taxi-", "Taxi ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    heroSubtitle: z.hook,
    trustBullets: ["Quartier maîtrisé", "Prix annoncé", "24/7"],
    sections: [
      sec("Spécificités du quartier", z.local, WA),
      sec(
        "Liaisons fréquentes",
        "Depuis ce secteur, les demandes aéroport RBA et les trajets vers administrations ou gares sont courantes. Nous adaptons l’itinéraire au trafic réel.",
        "Pour un budget global, croisez avec la page prix taxi Rabat ; pour Casablanca, voir rabat-casablanca-taxi.",
      ),
    ],
    faq: [
      {
        question: "Combien de temps vers l’aéroport ?",
        answer: "Variable selon trafic et créneau ; nous donnons une estimation honnête avant confirmation.",
      },
    ],
    relatedSectionTitle: "Autres zones & services",
  };
}

function intercityCasa(way: "rabat-casa" | "casa-rabat"): SeoPageMessages {
  const forward = way === "rabat-casa";
  return {
    meta: {
      title: forward
        ? "Rabat → Casablanca Taxi / Transfert 24/7 | Prix Annoncé | Rabat Transfert"
        : "Casablanca → Rabat Taxi / Transfert 24/7 | Prix Annoncé | Rabat Transfert",
      description: forward
        ? "Transfert Rabat–Casablanca : confort, bagages, forfait ou devis ferme. Idéal CMN, Roches Noires, centre-ville. WhatsApp."
        : "Transfert Casablanca–Rabat : même exigence de clarté tarifaire et ponctualité. WhatsApp.",
      keywords: forward
        ? ["taxi rabat casablanca", "transfert rabat casablanca", "rabat casa taxi"]
        : ["taxi casablanca rabat", "transfert casa rabat"],
    },
    h1: forward ? "Transfert Rabat — Casablanca" : "Transfert Casablanca — Rabat",
    heroSubtitle:
      "Longue distance premium : trajet direct, pauses si besoin, marge prudente pour vols depuis CMN.",
    trustBullets: ["Forfait / devis clair", "Chauffeur inter-villes", "Bagages annoncés"],
    sections: [
      sec(
        "Planification & durée",
        "La durée dépend du trafic, du point de dépose (CMN, centre, port…) et des fenêtres horaires. Pour un vol international, communiquez votre heure limite d’enregistrement.",
        "Nous recommandons une marge réaliste ; le prix est validé avant départ pour éviter les tensions en fin de course.",
      ),
      sec(
        "Pourquoi un transfert privé sur cet axe",
        "Confort, silence de travail en route et conduite souple : avantages nets sur un trajet long. Les équipes apprécient un interlocuteur unique et une confirmation écrite.",
        "Pour un aller-retour le même jour, indiquez les attentes : nous construisons un forfait cohérent.",
      ),
    ],
    faq: [
      {
        question: "Rabat → CMN possible ?",
        answer: "Oui, très demandé : forfait ou estimation ferme selon quartier de départ.",
      },
    ],
    relatedSectionTitle: "Tarifs & aéroport",
  };
}

function taxiRabatCasaPrix(): SeoPageMessages {
  return {
    meta: {
      title: "Prix Taxi Rabat Casablanca | Forfait, Exemples & Devis | Rabat Transfert",
      description:
        "Comprenez le prix d’un taxi / transfert Rabat–Casablanca : facteurs, exemples, forfaits possibles. Devis WhatsApp rapide.",
      keywords: ["prix taxi rabat casablanca", "tarif rabat casa", "taxi rabat casa prix"],
    },
    h1: "Prix taxi Rabat — Casablanca",
    heroSubtitle:
      "Longue distance : le tarif se comprend comme un forfait ou une estimation ferme, pas comme une simple course minute.",
    trustBullets: ["Transparence", "Devis rapide", "Premium"],
    sections: [
      sec(
        "Ce qui fait le prix Rabat–Casablanca",
        "Point de départ précis (Rabat vs Salé, quartier), destination (CMN vs centre Casa), créneau horaire, attente et bagages. Chaque paramètre peut faire varier le montant.",
        "Nous expliquons la logique avant validation : objectif zéro surprise.",
      ),
      sec(
        "Comparer avec d’autres options",
        "Pour l’aéroport Rabat, voir taxi Rabat aéroport. Pour un service image entreprise, voir chauffeur privé Rabat.",
        WA,
      ),
    ],
    faq: [
      {
        question: "Un forfait est-il possible ?",
        answer: "Oui, c’est la forme la plus fréquente pour cet axe lorsque les adresses sont standardisées.",
      },
    ],
    relatedSectionTitle: "Réserver",
  };
}

function intercityTo(dest: string, slug: SeoPageId): SeoPageMessages {
  return {
    meta: {
      title: `Taxi Rabat ${dest} | Transfert Longue Distance 24/7 | Rabat Transfert`,
      description: `Transfert Rabat vers ${dest} : confort, bagages, devis avant départ. Chauffeur expérimenté inter-villes. ${WA}`,
      keywords: [slug.replace(/-/g, " "), "taxi rabat longue distance", `transfert rabat ${dest.toLowerCase()}`],
    },
    h1: `Taxi Rabat — ${dest}`,
    heroSubtitle: `Liaison longue distance vers ${dest} : trajet direct, pauses si besoin, tarif annoncé clairement avant le départ.`,
    trustBullets: ["Devis / forfait", "Véhicule premium", "Itinéraire optimisé"],
    sections: [
      sec(
        "Préparer un trajet long",
        "Indiquez l’adresse exacte de départ à Rabat/Salé, l’adresse d’arrivée, l’horaire souhaité et le nombre de bagages. Nous dimensionnons la marge (trafic, pauses).",
        "Les trajets longs demandent une validation tarifaire ferme : c’est ce que nous privilégions.",
      ),
      sec(
        "Pourquoi ne pas improviser sur la route",
        "Un long trajet improvisé crée souvent des incompréhensions tarifaires. Un devis structuré protège le client et le chauffeur, et fixe les attentes (durée, confort, type de véhicule).",
        "Pour Casablanca / CMN, la page rabat-casablanca-taxi reste la référence la plus complète sur cet axe majeur.",
      ),
    ],
    faq: [
      {
        question: "Peut-on faire un aller-retour ?",
        answer: "Oui sur devis : précisez attentes et horaires.",
      },
    ],
    relatedSectionTitle: "Autres destinations",
  };
}

function airportCentre(): SeoPageMessages {
  return {
    meta: {
      title: "Taxi Aéroport Rabat → Centre-Ville | RBA, Délais & Prix | Rabat Transfert",
      description:
        "Trajet aéroport Rabat-Salé vers centre-ville Rabat : conseils de timing, prise en charge, tarification transparente. WhatsApp.",
      keywords: ["taxi aeroport rabat centre", "rba vers centre rabat", "transfert aeroport rabat"],
    },
    h1: "Taxi aéroport Rabat — vers centre-ville",
    heroSubtitle:
      "Besoin spécifique « RBA → centre » : nous clarifions point de rendez-vous, durée indicative et prix avant départ.",
    trustBullets: ["Prix annoncé", "Ponctualité", "Premium"],
    sections: [
      sec(
        "Ce que les voyageurs oublient souvent",
        "Le centre-ville Rabat n’est pas un point unique : Hay Riad, Agdal et la zone administrative n’ont pas le même temps de trajet depuis RBA selon l’heure.",
        "Indiquez une adresse précise (hôtel, rue, portail) pour une estimation fiable.",
      ),
      sec(
        "Liens utiles",
        "Pour une vision globale aéroport, voir taxi Rabat aéroport. Pour les budgets, voir prix taxi Rabat.",
        WA,
      ),
    ],
    faq: [
      {
        question: "Temps moyen RBA → centre ?",
        answer: "Variable selon trafic et quartier ; nous donnons une fourchette honnête.",
      },
    ],
    relatedSectionTitle: "Voir aussi",
  };
}

function longTail(id: SeoPageId): SeoPageMessages {
  const angle: Record<string, string> = {
    "reserver-taxi-rabat": "Réservation guidée : étapes, infos à fournir, confirmation rapide.",
    "taxi-rabat-24-7": "Disponibilité 24/7 : comment obtenir une voiture fiable même tard.",
    "taxi-rabat-nuit": "Taxi de nuit : sécurité, tarification et bonnes pratiques à Rabat.",
    "taxi-rabat-whatsapp": "Réserver par WhatsApp : le format de message le plus efficace.",
    "taxi-rabat-rapide": "Besoin urgent : comment accélérer la confirmation sans sacrifier la clarté du prix.",
    "taxi-rabat-fiable": "Fiabilité : ponctualité, confirmation écrite et professionnalisme.",
    "taxi-rabat-pas-cher": "Bon prix ≠ mauvais service : comprendre le juste équilibre à Rabat.",
  };
  const a = angle[id] ?? "Service taxi premium à Rabat : transparence et confort.";
  const label = id.replace(/-/g, " ");
  return {
    meta: {
      title: `${label.charAt(0).toUpperCase() + label.slice(1)} | Rabat Transfert`,
      description: `${a} Rabat Transfert : chauffeurs pros, prix annoncé, véhicules premium. ${WA}`,
      keywords: [label, "taxi rabat", "em taxi rabat"],
    },
    h1: label.charAt(0).toUpperCase() + label.slice(1),
    heroSubtitle: a,
    trustBullets: ["Transparence", "Premium", "24/7"],
    sections: [
      sec(
        "Contenu utile (pas une page vide SEO)",
        "Cette page répond à une intention de recherche précise. Nous détaillons l’essentiel : ce que nous faisons, comment réserver, et comment le prix est annoncé avant départ — sans promesse irréaliste.",
        "Pour l’aéroport, préférez la page taxi Rabat aéroport ; pour les tarifs, prix taxi Rabat ; pour Casablanca, rabat-casablanca-taxi.",
      ),
      sec("Process de réservation", WA, "Indiquez toujours adresses, horaire, bagages et type de trajet (aller simple / retour)."),
    ],
    faq: [
      {
        question: "Puis-je avoir un prix avant de confirmer ?",
        answer: "Oui : c’est notre règle de base pour éviter les surprises.",
      },
    ],
    relatedSectionTitle: "Services liés",
  };
}

function saleGeo(id: SeoPageId): SeoPageMessages {
  const place = id.replace("taxi-sale-", "").replace(/-/g, " ");
  return {
    meta: {
      title: `Taxi Salé ${place} 24/7 | Quartier & Aéroport RBA | Rabat Transfert`,
      description: `Taxi à Salé (${place}) : trajets locaux, liaison Rabat, transfert aéroport. Prix annoncé. ${WA}`,
      keywords: [`taxi salé ${place}`, "taxi sale rabat", "taxi salé aéroport"],
    },
    h1: `Taxi Salé — ${place}`,
    heroSubtitle: `Service dans ce secteur de Salé : prise en charge précise, connaissance des accès, liaison Rabat et RBA.`,
    trustBullets: ["Quartier Salé", "Prix clair", "24/7"],
    sections: [
      sec(
        "Spécificités locales",
        "Les accès varient selon les ruelles, marchés et axes principaux. Indiquez un point de rendez-vous clair (repère, porte, café connu).",
        "Pour l’aéroport, la page taxi Salé aéroport détaille la logique RBA depuis Salé.",
      ),
      sec("Liaison Rabat", "Le pont et les heures de pointe influencent le temps : nous intégrons une marge prudente.", WA),
    ],
    faq: [
      {
        question: "Tarif vers Rabat centre ?",
        answer: "Selon quartier exact ; devis avant départ.",
      },
    ],
    relatedSectionTitle: "Autres pages Salé",
  };
}

function premium(id: SeoPageId): SeoPageMessages {
  const titles: Record<string, { t: string; d: string }> = {
    "taxi-luxe-rabat": {
      t: "Taxi Luxe Rabat | Mercedes & BMW | Chauffeur Pro | Rabat Transfert",
      d: "Taxi premium Rabat : confort maximal, image soignée, réservation WhatsApp.",
    },
    "chauffeur-prive-aeroport-rabat": {
      t: "Chauffeur Privé Aéroport Rabat RBA | VIP & Ponctualité | Rabat Transfert",
      d: "Chauffeur privé pour arrivées/départs RBA : coordination vol, discrétion, véhicule haut de gamme.",
    },
    "transfert-vip-rabat": {
      t: "Transfert VIP Rabat | Accueil Premium & Itinéraire Sur-Mesure | Rabat Transfert",
      d: "Transfert VIP : service calibré pour délégations, dirigeants et exigence image.",
    },
    "taxi-avec-chauffeur-rabat": {
      t: "Taxi avec Chauffeur Rabat | Mise à Disposition & Transferts | Rabat Transfert",
      d: "Taxi avec chauffeur : journée, demi-journée ou transferts : un interlocuteur, un niveau de service constant.",
    },
  };
  const pack = titles[id] ?? {
    t: "Service Premium Taxi Rabat | Rabat Transfert",
    d: "Transport premium à Rabat : confort, ponctualité, prix annoncé.",
  };
  return {
    meta: { title: pack.t, description: `${pack.d} ${WA}`, keywords: ["taxi premium rabat", "chauffeur rabat", "vip rabat"] },
    h1: id.includes("chauffeur") ? "Chauffeur privé — aéroport & Rabat" : "Taxi premium — Rabat",
    heroSubtitle: pack.d,
    trustBullets: ["Image & discrétion", "Véhicules haut de gamme", "Coordination WhatsApp"],
    sections: [
      sec(
        "Quand le premium est pertinent",
        "Événements, délégations, accueils sensibles, trajets longs après vol : le premium réduit le risque d’improvisation.",
        "Nous alignons le véhicule, l’horaire et le niveau de discrétion attendu.",
      ),
    ],
    faq: [{ question: "Devis ?", answer: "Oui, toujours avant validation." }],
    relatedSectionTitle: "Services associés",
  };
}

function generic(id: SeoPageId, h1: string, sub: string): SeoPageMessages {
  const phrase = id.replace(/-/g, " ");
  const isSale = /\bsale\b/.test(phrase);
  const city = isSale ? "salé" : "rabat";
  const topQueries = isSale ? TOP_QUERY_KEYWORDS.sale : TOP_QUERY_KEYWORDS.rabat;
  const serviceKeyword = /aeroport|rba/.test(phrase)
    ? `transfert ${city} aeroport`
    : `taxi ${city} 24h`;

  return {
    meta: {
      title: `${h1} | Rabat Transfert–Salé`,
      description: `${sub} ${WA}`,
      keywords: [phrase, ...topQueries, serviceKeyword],
    },
    h1,
    heroSubtitle: sub,
    trustBullets: ["24/7", "Prix annoncé", "Premium"],
    sections: [sec("Service", sub, WA)],
    faq: [{ question: "Réservation ?", answer: "WhatsApp ou appel." }],
    relatedSectionTitle: "Liens utiles",
  };
}

/** Programmatic FR copy — unique angles per template (avoid thin duplicates). */
export function buildProgrammaticFrCopy(id: SeoPageId): SeoPageMessages {
  if (id === "transfert-rabat-casablanca" || id === "taxi-rabat-casablanca") {
    return intercityCasa("rabat-casa");
  }
  if (id === "taxi-aeroport-rabat") return taxiAirport("rabat");
  if (id === "taxi-prix-rabat") return taxiPrix("rabat");
  if (id === "taxi-rabat-gare-agdal") {
    return generic(
      id,
      "Taxi Rabat gare Agdal",
      "Prise en charge gare ONCF Agdal, correspondances et liaisons aéroport RBA avec tarif annoncé avant départ.",
    );
  }
  if (id === "taxi-rabat-hotel-sofitel") {
    return generic(
      id,
      "Taxi hôtel Sofitel Rabat",
      "Transferts depuis ou vers Sofitel Jardin des Roses : aéroport RBA, centre-ville et Casablanca sur réservation.",
    );
  }
  if (id === "taxi-rabat") return hub("rabat");
  if (id === "taxi-sale") return hub("sale");
  if (id === "taxi-rabat-aeroport") return taxiAirport("rabat");
  if (id === "taxi-sale-aeroport") return taxiAirport("sale");
  if (id === "transfert-rabat-aeroport") return transfertAirport("rabat");
  if (id === "transfert-sale-aeroport") return transfertAirport("sale");
  if (id === "taxi-rabat-prix") return taxiPrix("rabat");
  if (id === "taxi-sale-prix") return taxiPrix("sale");
  if (id === "chauffeur-prive-rabat") return chauffeurCity("rabat");
  if (id === "chauffeur-prive-sale") return chauffeurCity("sale");
  if (id in ZONE_COPY) return zonePage(id);
  if (id === "rabat-casablanca-taxi") return intercityCasa("rabat-casa");
  if (id === "casablanca-rabat-taxi") return intercityCasa("casa-rabat");
  if (id === "taxi-rabat-casa-prix") return taxiRabatCasaPrix();
  if (id === "taxi-rabat-marrakech") return intercityTo("Marrakech", id);
  if (id === "taxi-rabat-tanger") return intercityTo("Tanger", id);
  if (id === "taxi-rabat-fes") return intercityTo("Fès", id);
  if (id === "taxi-rabat-meknes") return intercityTo("Meknès", id);
  if (id === "taxi-rabat-kenitra") return intercityTo("Kénitra", id);
  if (id === "taxi-rabat-temara") return intercityTo("Témara", id);
  if (id === "taxi-rabat-mohammedia") return intercityTo("Mohammedia", id);
  if (id === "taxi-rabat-skhirat") return intercityTo("Skhirat", id);
  if (id === "taxi-aeroport-rabat-centre") return airportCentre();
  if (
    id === "reserver-taxi-rabat" ||
    id === "taxi-rabat-24-7" ||
    id === "taxi-rabat-nuit" ||
    id === "taxi-rabat-whatsapp" ||
    id === "taxi-rabat-rapide" ||
    id === "taxi-rabat-fiable" ||
    id === "taxi-rabat-pas-cher"
  ) {
    return longTail(id);
  }
  if (
    id === "taxi-sale-medina" ||
    id === "taxi-sale-tabriquet" ||
    id === "taxi-sale-hay-salam" ||
    id === "taxi-sale-bettana"
  ) {
    return saleGeo(id);
  }
  if (
    id === "taxi-luxe-rabat" ||
    id === "chauffeur-prive-aeroport-rabat" ||
    id === "transfert-vip-rabat" ||
    id === "taxi-avec-chauffeur-rabat"
  ) {
    return premium(id);
  }
  if (id === "taxi-rabat-gare") {
    return generic(
      id,
      "Taxi Rabat — gare & liaisons",
      "Prise en charge gare ONCF, correspondances, liaisons quartiers et aéroport RBA avec prix annoncé.",
    );
  }
  if (id === "taxi-rabat-entreprise") {
    return generic(
      id,
      "Taxi Rabat entreprise",
      "Transport pro : invitations, séminaires, transferts invités, facturation sur demande.",
    );
  }
  if (id === "navette-aeroport-rabat") {
    return generic(
      id,
      "Navette aéroport Rabat",
      "Organisation de navette vers RBA : créneaux, points de rassemblement et tarification claire pour groupes ou entreprises.",
    );
  }
  if (id === "taxi-rabat-evenement" || id === "taxi-rabat-seminaire") {
    return generic(
      id,
      id === "taxi-rabat-evenement" ? "Taxi Rabat événements" : "Taxi Rabat séminaires",
      "Logistique invités, horaires serrés, véhicules premium : nous calibrons le dispositif avec vous.",
    );
  }
  return generic(id, "Rabat Transfert", "Service premium Rabat–Salé.");
}
