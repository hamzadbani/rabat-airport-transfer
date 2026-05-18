import type { SeoPageId } from "../types";
import type { SeoPageMessages } from "./types";

/**
 * Hand-tuned overrides (money + hubs). All other slugs use `buildProgrammaticFrCopy`.
 */
export const frHandOverrides: Partial<Record<SeoPageId, SeoPageMessages>> = {
  "taxi-rabat": {
    meta: {
      title:
        "Taxi Rabat 24/7 | Prix Clair, Réservation Rapide & Transfert Aéroport",
      description:
        "Taxi Rabat premium 24/7 : ponctualité, trajets confortables et prix annoncés avant la course. Hay Riad, Agdal, Souissi, administrations — réservation WhatsApp ou appel.",
      keywords: [
        "taxi rabat",
        "taxi rabat 24h",
        "réservation taxi rabat",
        "taxi rabat whatsapp",
        "taxi premium rabat",
      ],
    },
    h1: "Taxi Rabat — service 24/7",
    heroSubtitle:
      "Courses en ville, rendez-vous professionnels et liaisons vers l’aéroport Rabat-Salé (RBA). Chauffeur expérimenté, véhicules haut de gamme.",
    trustBullets: [
      "Disponible 24h/24 — 7j/7",
      "Prix communiqué avant prise en charge",
      "Ponctualité & connaissance du réseau rabatais",
    ],
    sections: [
      {
        heading: "Quartiers et axes desservis",
        paragraphs: [
          "Nous desservons l’ensemble de Rabat : Hay Riad, Agdal, Hassan, Océan, Souissi, Yacoub El Mansour, ainsi que les administrations, gares et hôtels. Chaque secteur a ses contraintes (circulation, accès, créneaux) : nous les anticipons pour éviter les retards inutiles sur vos trajets professionnels ou personnels.",
          "Besoin d’un trajet simple ou d’une mise à disposition horaire ? Indiquez l’heure d’arrivée et l’adresse exacte : nous confirmons le créneau rapidement. Pour les liaisons vers Salé ou l’aéroport RBA, nous recommandons une réservation à l’avance lors des pics d’activité (matinées, fins de journée, week-ends chargés).",
        ],
      },
      {
        heading: "Pourquoi choisir un taxi privé à Rabat ?",
        paragraphs: [
          "Confort, discrétion et itinéraire optimisé : idéal pour les voyageurs, familles avec bagages et dirigeants avec agendas serrés. Contrairement à une course improvisée, un service structuré permet de valider le prix, le point de rendez-vous et le véhicule avant le départ — ce qui réduit le stress, surtout après un vol ou avant une réunion importante.",
          "Pour l’aéroport, privilégiez une prise en charge avec communication claire (WhatsApp) et une estimation ferme ou un forfait : consultez la page taxi Rabat aéroport. Pour les budgets, la page prix taxi Rabat explique les facteurs de tarification avec des exemples concrets.",
        ],
      },
      {
        heading: "Réservation, sécurité et qualité de service",
        paragraphs: [
          "La réservation se fait par appel ou WhatsApp : partagez vos adresses, votre horaire et le nombre de passagers/bagages. Nous adaptons le véhicule (berline premium) et le temps de route aux conditions réelles.",
          "Nos chauffeurs sont habitués aux trajets Rabat–Salé, aux accès administrations et aux départs vers l’autoroute lorsque vous enchaînez vers d’autres villes. Objectif : un trajet fluide, une conduite souple et une arrivée à l’heure.",
        ],
      },
    ],
    faq: [
      {
        question: "Comment réserver un taxi à Rabat ?",
        answer:
          "Envoyez votre adresse de prise en charge, destination, date/heure et nombre de bagages par WhatsApp ou appelez-nous : nous confirmons le tarif et le créneau.",
      },
      {
        question: "Proposez-vous des trajets vers l’aéroport Rabat-Salé ?",
        answer:
          "Oui — voir la page dédiée taxi Rabat aéroport (RBA) pour transferts, ponctualité et tarifs indicatifs.",
      },
    ],
    relatedSectionTitle: "Services liés à Rabat",
  },
  "taxi-sale": {
    meta: {
      title:
        "Taxi Salé 24/7 | Trajets Locaux, Rabat & Aéroport RBA — Prix Fixe",
      description:
        "Taxi Salé : déplacements intra-Salé, liaison Rabat et transfert aéroport Rabat-Salé. Service 24/7, ponctualité, prix annoncé — réservation rapide.",
      keywords: [
        "taxi salé",
        "taxi sale rabat",
        "taxi salé aéroport",
        "transfert salé rabat",
        "taxi salé 24h",
      ],
    },
    h1: "Taxi Salé — Rabat & aéroport",
    heroSubtitle:
      "Courses à Salé, traversées vers Rabat et transferts vers l’aéroport RBA. Idéal habitants, voyageurs et pros qui enchaînent les rendez-vous.",
    trustBullets: [
      "24/7 sur réservation",
      "Prix transparent (forfait ou estimation claire)",
      "Véhicules premium & conduite souple",
    ],
    sections: [
      {
        heading: "Déplacements locaux et liaison Rabat",
        paragraphs: [
          "Salé et Rabat sont liées : nous optimisons les horaires de pointe et les accès (pont Hassan II, axes principaux) pour des trajets fluides.",
          "Pour un départ ou une arrivée à l’aéroport Rabat-Salé depuis Salé, indiquez votre quartier (Tabriquet, Bouregreg, etc.) pour un devis précis.",
        ],
      },
      {
        heading: "Entreprises et transferts récurrents",
        paragraphs: [
          "Mise à disposition, transferts équipes et accueil invités : nous adaptons le service (facturation, ponctualité, itinéraires répétés).",
          "Si vous enchaînez vers Casablanca ou l’aéroport Mohammed V, la page rabat-casablanca-taxi détaille la logique de forfait longue distance et les marges horaires recommandées.",
        ],
      },
    ],
    faq: [
      {
        question: "Quel délai pour un taxi à Salé ?",
        answer:
          "Selon la disponibilité et le quartier, comptez souvent 10–25 minutes en journée ; la réservation à l’avance sécurise les créneaux critiques.",
      },
      {
        question: "Tarif Salé → Rabat centre ?",
        answer:
          "Le prix dépend du quartier exact et du trafic. Nous donnons un montant clair avant départ — consultez aussi la page prix taxi Rabat.",
      },
    ],
    relatedSectionTitle: "Autres trajets utiles depuis Salé",
  },
  "taxi-rabat-aeroport": {
    meta: {
      title:
        "Taxi Rabat Aéroport (RBA) 24/7 | Transfert Prix Fixe — Réservation",
      description:
        "Transfert taxi Rabat-Salé (RBA) : prise en charge terminal, suivi de vol, prix fixe annoncé. Hay Riad, Agdal, centre — WhatsApp 24h/24.",
      keywords: [
        "taxi rabat aeroport",
        "taxi aeroport rabat",
        "transfert aeroport rabat",
        "taxi rabat salé aeroport",
        "rabat airport taxi",
        "transport aeroport rabat",
      ],
    },
    h1: "Taxi Rabat Aéroport — transfert Rabat-Salé (RBA)",
    heroSubtitle:
      "Arrivées et départs 24/7 vers Rabat, Salé et le Maroc. Tarif confirmé à la réservation, chauffeur au terminal, véhicules premium.",
    trustBullets: [
      "Prix fixe / devis confirmé avant départ",
      "Ponctualité & expérience aéroport",
      "Contact direct (appel / WhatsApp)",
    ],
    sections: [
      {
        heading: "Prise en charge à l’aéroport : déroulé concret",
        paragraphs: [
          "Indiquez votre numéro de vol, l’heure d’atterrissage (ou de décollage) et l’adresse de destination : nous confirmons le point de rendez-vous et le tarif.",
          "Pour les départs vers RBA, nous recommandons une marge trafic ; nous ajustons l’heure de prise en charge selon votre terminal et vos bagages.",
        ],
      },
      {
        heading: "Destinations fréquentes depuis RBA",
        paragraphs: [
          "Hay Riad, Agdal, centre-ville Rabat, Souissi, administrations, ainsi que Salé médina et quartiers résidentiels.",
          "Longue distance (ex. Casablanca) : voir rabat-casablanca-taxi pour un forfait adapté.",
        ],
      },
      {
        heading: "Suivi de vol, bagages et sérénité",
        paragraphs: [
          "Sur demande, nous organisons un suivi d’horaires pour recaler la prise en charge en cas de retard. Mentionnez le nombre et le format des bagages (valises rigides, sacs volumineux) afin de préparer le véhicule adapté.",
          "Les familles et les voyageurs d’affaires bénéficient d’un accompagnement simple : communication WhatsApp, itinéraire clair, conduite souple après un vol.",
        ],
      },
    ],
    faq: [
      {
        question: "Comment aller de l’aéroport Rabat-Salé au centre-ville ?",
        answer:
          "Réservez un taxi privé avec point de rendez-vous au terminal RBA. Le trajet vers Agdal, Hay Riad ou le centre prend en général 20 à 35 minutes. Le tarif est confirmé par WhatsApp avant départ.",
      },
      {
        question: "Y a-t-il un taxi disponible 24h/24 à l’aéroport Rabat ?",
        answer:
          "Oui, sur réservation. Nous couvrons les vols tardifs et les départs matinaux vers RBA à toute heure.",
      },
      {
        question: "Combien coûte un taxi de l’aéroport Rabat vers Rabat ?",
        answer:
          "Le prix dépend du quartier exact. Nous communiquons un forfait ou une estimation ferme à la réservation — sans surprise au compteur.",
      },
      {
        question: "Proposez-vous un prix fixe depuis l’aéroport ?",
        answer:
          "Oui pour les trajets standards vers les grands quartiers. Le montant est validé avant la prise en charge.",
      },
      {
        question: "Que se passe-t-il en cas de retard d’avion ?",
        answer:
          "Indiquez votre nouveau créneau ou votre numéro de vol : nous ajustons la prise en charge. Suivi de vol possible sur demande.",
      },
    ],
    relatedSectionTitle: "Voir aussi",
  },
  "rabat-casablanca-taxi": {
    meta: {
      title:
        "Taxi Rabat Casablanca 24/7 | Forfait Longue Distance & Aéroport CMN",
      description:
        "Taxi Rabat ↔ Casablanca et liaison aéroport Mohammed V (CMN). Berline premium, forfait clair, réservation WhatsApp — ponctualité garantie.",
      keywords: [
        "taxi rabat casablanca",
        "taxi casablanca rabat",
        "transfert rabat casablanca",
        "rabat casablanca taxi",
        "taxi rabat aeroport casablanca",
      ],
    },
    h1: "Taxi Rabat ↔ Casablanca",
    heroSubtitle:
      "Liaison directe entre Rabat et Casablanca (ville ou aéroport CMN). Idéal après un vol à RBA ou avant un départ international.",
    trustBullets: [
      "Forfait longue distance sur devis",
      "Confort berline / SUV premium",
      "24/7 sur réservation",
    ],
    sections: [
      {
        heading: "Durée et organisation du trajet",
        paragraphs: [
          "Comptez environ 1h à 1h20 selon trafic et point de départ (Rabat centre, Hay Riad, RBA ou Salé). Nous recommandons une marge pour les départs vol à CMN.",
          "Indiquez vos adresses exactes et l’horaire souhaité : nous confirmons le forfait et le véhicule adapté (passagers, bagages).",
        ],
      },
      {
        heading: "RBA → Casablanca ou CMN",
        paragraphs: [
          "Après atterrissage à Rabat-Salé, enchaînez vers Casablanca sans stress : un seul interlocuteur, tarif annoncé à l’avance.",
          "Pour un retour Casablanca → Rabat, même logique : réservation WhatsApp avec date, heure et adresse de prise en charge.",
        ],
      },
    ],
    faq: [
      {
        question: "Quel est le prix d’un taxi Rabat–Casablanca ?",
        answer:
          "Le forfait dépend du quartier de départ, de la destination (ville ou CMN) et de l’horaire. Nous donnons un montant clair avant validation.",
      },
      {
        question: "Peut-on réserver un taxi Rabat aéroport puis Casablanca ?",
        answer:
          "Oui. Précisez RBA comme point de départ et votre adresse à Casablanca ou CMN : nous calibrons le créneau et le tarif en une seule réservation.",
      },
    ],
    relatedSectionTitle: "Autres liaisons utiles",
  },
  "taxi-rabat-prix": {
    meta: {
      title:
        "Prix Taxi Rabat | Grille Indicative Aéroport, Ville & Rabat–Casablanca",
      description:
        "Comprenez les prix taxi à Rabat : exemples de courses, facteurs de variation et devis rapide. Transparence avant départ — contact WhatsApp.",
      keywords: [
        "prix taxi rabat",
        "taxi rabat prix",
        "tarif taxi aeroport rabat",
        "combien coute taxi rabat",
      ],
    },
    h1: "Prix taxi Rabat — repères",
    heroSubtitle:
      "Les tarifs varient selon distance, quartier et créneau horaire. Nous privilégions un prix annoncé clairement plutôt qu’une surprise au compteur.",
    trustBullets: [
      "Devis gratuit & rapide",
      "Explications simples (sans jargon)",
      "Options forfaitaires quand c’est pertinent",
    ],
    sections: [
      {
        heading: "Ce qui influence le prix",
        paragraphs: [
          "Distance réelle, fenêtre horaire (pointe vs nuit), attente sur place, nombre de bagages, et destination (ville, aéroport RBA, Casablanca…).",
          "Les trajets aéroport et inter-villes sont souvent forfaitaires ou estimés fermement pour sécuriser votre budget.",
        ],
      },
      {
        heading: "Obtenir un tarif fiable",
        paragraphs: [
          "Envoyez les deux adresses (ou quartiers) + date/heure : nous répondons avec un montant ou une fourchette honnête.",
          "Pour les trajets standards vers RBA depuis les grands quartiers, voir la page taxi Rabat aéroport pour le contexte service.",
        ],
      },
    ],
    faq: [
      {
        question: "Les prix sont-ils fixes ?",
        answer:
          "Quand le trajet est standard, nous proposons souvent un forfait. Sinon, une estimation ferme avant départ est communiquée.",
      },
      {
        question: "Y a-t-il des suppléments la nuit ?",
        answer:
          "Selon l’horaire et la demande, un ajustement peut s’appliquer : il est indiqué avant confirmation de la course.",
      },
    ],
    relatedSectionTitle: "Réserver un service précis",
  },
  "taxi-hay-riad": {
    meta: {
      title:
        "Taxi Hay Riad Rabat 24/7 | Quartier, Admin & Aéroport RBA — Prix Clair",
      description:
        "Taxi Hay Riad : courses locales, administrations, gares et transfert aéroport Rabat-Salé. Ponctualité, service premium, réservation WhatsApp.",
      keywords: [
        "taxi hay riad",
        "taxi hay riad rabat",
        "taxi quartier hay riad",
        "taxi rabat hay riad aeroport",
      ],
    },
    h1: "Taxi Hay Riad (Rabat)",
    heroSubtitle:
      "Hay Riad concentre administrations et bureaux : nous maîtrisons les accès, parkings et créneaux chargés pour des arrivées à l’heure.",
    trustBullets: [
      "Connaissance fine du quartier",
      "Idéal RDV pro & dossiers",
      "Liaison rapide vers RBA",
    ],
    sections: [
      {
        heading: "Trajets typiques",
        paragraphs: [
          "Déplacements intra Hay Riad, liaisons vers Agdal, Souissi, centre-ville, gare ONCF ou aéroport RBA.",
          "Pour un départ vol, prévoir une marge : nous recommandons une prise en charge adaptée au trafic des heures de bureau.",
        ],
      },
    ],
    faq: [
      {
        question: "Peut-on rejoindre l’aéroport depuis Hay Riad rapidement ?",
        answer:
          "Oui, selon trafic. Un devis ferme ou un forfait est communiqué avant départ selon votre demande.",
      },
    ],
    relatedSectionTitle: "Autres quartiers & services",
  },
  "taxi-agdal": {
    meta: {
      title:
        "Taxi Agdal Rabat 24/7 | Commerces, Affaires & Transfert Aéroport RBA",
      description:
        "Taxi quartier Agdal : trajets locaux, soirées, restaurants et transferts aéroport. Service premium 24/7, prix annoncé — WhatsApp.",
      keywords: [
        "taxi agdal",
        "taxi agdal rabat",
        "taxi rabat agdal",
        "taxi agdal aeroport",
      ],
    },
    h1: "Taxi Agdal (Rabat)",
    heroSubtitle:
      "Agdal est dense et vivant : nous optimisons les prises en charge près des axes commerçants, hôtels et lieux de sortie.",
    trustBullets: [
      "Attente courte possible sur demande",
      "Confort premium en soirée",
      "Transferts RBA maîtrisés",
    ],
    sections: [
      {
        heading: "Usages fréquents",
        paragraphs: [
          "Courses courtes, trajets restaurants/bars avec reprise tardive, rendez-vous pro et liaisons vers Hay Riad ou Souissi.",
          "Pour l’aéroport, indiquez votre rue précise : certains accès influencent le temps de prise en charge.",
        ],
      },
    ],
    faq: [
      {
        question: "Service tard le soir ?",
        answer:
          "Oui 24/7 sur réservation : précisez l’heure et le lieu pour confirmer disponibilité et tarif.",
      },
    ],
    relatedSectionTitle: "Découvrir aussi",
  },
  "taxi-souissi": {
    meta: {
      title:
        "Taxi Souissi Rabat 24/7 | Résidentiel, Ambassades & Aéroport RBA",
      description:
        "Taxi Souissi : quartiers résidentiels, ambassades, trajets premium vers Rabat centre et aéroport RBA. Ponctualité & discrétion — réservation rapide.",
      keywords: [
        "taxi souissi",
        "taxi souissi rabat",
        "taxi rabat souissi",
        "taxi souissi aeroport",
      ],
    },
    h1: "Taxi Souissi (Rabat)",
    heroSubtitle:
      "Souissi demande souvent discrétion, confort et ponctualité : accueils, villas, institutions et liaisons longues vers RBA ou autres villes.",
    trustBullets: [
      "Chauffeurs courtois & discrets",
      "Véhicules premium",
      "Idéal résidents & hôtes internationaux",
    ],
    sections: [
      {
        heading: "Prises en charge adaptées",
        paragraphs: [
          "Adresses résidentielles, portails, points de rendez-vous précis : nous suivons vos consignes d’accès.",
          "Pour transferts inter-villes (ex. Casablanca), un forfait est souvent le plus simple : voir rabat-casablanca-taxi.",
        ],
      },
    ],
    faq: [
      {
        question: "Attente sur place possible ?",
        answer:
          "Oui, en mise à disposition ou attente courte facturée : tout est annoncé avant validation.",
      },
    ],
    relatedSectionTitle: "Navigation locale",
  },
  "chauffeur-prive-rabat": {
    meta: {
      title:
        "Chauffeur Privé Rabat | Mise à Disposition, VIP & Transferts Premium",
      description:
        "Chauffeur privé Rabat : mise à disposition horaire, accueil VIP, rendez-vous pro et transferts premium. Discrétion & ponctualité — réservation WhatsApp.",
      keywords: [
        "chauffeur privé rabat",
        "chauffeur rabat",
        "mise à disposition rabat",
        "vtc premium rabat",
      ],
    },
    h1: "Chauffeur privé à Rabat",
    heroSubtitle:
      "Service haut de gamme pour dirigeants, délégations et événements : véhicule impeccable, conduite souple, organisation des étapes.",
    trustBullets: [
      "Discrétion & image professionnelle",
      "Planning serré : optimisation des trajets",
      "Flotte premium (Mercedes / BMW)",
    ],
    sections: [
      {
        heading: "Mise à disposition",
        paragraphs: [
          "Gardez un chauffeur et un véhicule à votre rythme : rendez-vous multiples, attentes courtes, shopping ou visites.",
          "La facturation horaire est expliquée à l’avance avec un minimum de durée si nécessaire.",
        ],
      },
      {
        heading: "Transferts aéroport & intervilles",
        paragraphs: [
          "Le chauffeur privé est idéal pour RBA et les liaisons longue distance (ex. Casablanca) quand le confort et la fiabilité priment.",
        ],
      },
    ],
    faq: [
      {
        question: "Chauffeur privé vs taxi : quelle différence ?",
        answer:
          "Chez nous, la différence est surtout le niveau de service et la coordination (mise à disposition, image, confort). Le besoin « course simple » peut rester un taxi classique premium.",
      },
      {
        question: "Facturation entreprise ?",
        answer:
          "Oui sur demande : indiquez raison sociale et besoin (facture, bon de commande, procédure interne).",
      },
    ],
    relatedSectionTitle: "Autres pages utiles",
  },
};
