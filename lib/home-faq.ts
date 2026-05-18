import type { SeoLocale } from "@/lib/seo/types";

export type HomeFaqItem = { question: string; answer: string };

const HOME_FAQ: Record<SeoLocale, HomeFaqItem[]> = {
  fr: [
    {
      question: "Comment aller de l'aéroport Rabat-Salé (RBA) au centre-ville ?",
      answer:
        "Réservez un taxi privé avec point de rendez-vous confirmé au terminal. Le trajet vers Agdal, Hay Riad ou le centre de Rabat prend en général 20 à 35 minutes selon le trafic. Le tarif est annoncé avant départ par WhatsApp ou téléphone.",
    },
    {
      question: "Y a-t-il un taxi disponible 24h/24 à l'aéroport Rabat-Salé ?",
      answer:
        "Oui, sur réservation. Nous assurons les prises en charge et départs vers RBA à toute heure, y compris vols tardifs. Indiquez votre numéro de vol pour ajuster l'horaire en cas de retard.",
    },
    {
      question: "Combien coûte un taxi de l'aéroport Rabat vers Rabat ?",
      answer:
        "Le prix dépend du quartier exact (Hay Riad, Agdal, Souissi, etc.). Nous communiquons un forfait ou une estimation ferme avant la course — sans surprise au compteur. Consultez nos tarifs ou demandez un devis rapide.",
    },
    {
      question: "Proposez-vous un prix fixe pour le transfert aéroport Rabat ?",
      answer:
        "Oui, pour les trajets standards vers ou depuis RBA. Le montant est validé à la réservation selon votre adresse, vos bagages et l'horaire.",
    },
    {
      question: "Faites-vous Rabat ↔ Casablanca en taxi privé ?",
      answer:
        "Oui. La liaison Rabat–Casablanca (ville ou aéroport Mohammed V) se fait en berline premium, avec forfait longue distance sur demande.",
    },
    {
      question: "Comment réserver un chauffeur privé à Rabat ?",
      answer:
        "Appelez le +212 6 745 459 39 ou écrivez sur WhatsApp avec date, heure, adresses et nombre de passagers. Nous confirmons le véhicule et le tarif en quelques minutes.",
    },
  ],
  en: [
    {
      question: "How do I get from Rabat-Salé Airport (RBA) to the city center?",
      answer:
        "Book a private airport transfer with a confirmed meet point at the terminal. The drive to Agdal, Hay Riad or central Rabat usually takes 20–35 minutes depending on traffic. Your fare is quoted before pickup via WhatsApp or phone.",
    },
    {
      question: "Is a taxi available 24/7 at Rabat-Salé Airport?",
      answer:
        "Yes, on reservation. We cover pickups and drop-offs at RBA at any time, including late flights. Share your flight number so we can adjust for delays.",
    },
    {
      question: "How much is a taxi from Rabat airport to Rabat?",
      answer:
        "It depends on your exact neighborhood. We provide a fixed quote or firm estimate before the trip — no meter surprises. Check our pricing or request a quick quote.",
    },
    {
      question: "Do you offer fixed-price Rabat airport transfers?",
      answer:
        "Yes, for standard routes to and from RBA. The amount is confirmed when you book, based on address, luggage and time.",
    },
    {
      question: "Do you provide Rabat ↔ Casablanca private transfers?",
      answer:
        "Yes. Rabat–Casablanca (city or CMN airport) is available in premium sedans, with long-distance flat rates on request.",
    },
    {
      question: "How do I book a private driver in Rabat?",
      answer:
        "Call +212 6 745 459 39 or message us on WhatsApp with date, time, addresses and passenger count. We confirm vehicle and fare within minutes.",
    },
  ],
  ar: [
    {
      question: "كيف أصل من مطار الرباط-سلا (RBA) إلى وسط المدينة؟",
      answer:
        "احجز تاكسي خاصاً مع نقطة لقاء محددة في المطار. الرحلة إلى أكدال أو حي الرياض أو وسط الرباط تستغرق عادة 20–35 دقيقة حسب الازدحام. السعر يُعلَن قبل الانطلاق عبر واتساب أو الهاتف.",
    },
    {
      question: "هل يتوفر تاكسي 24/7 في مطار الرباط-سلا؟",
      answer:
        "نعم، بالحجز المسبق. نغطي الاستقبال والتوصيل إلى RBA في أي وقت، بما في ذلك الرحلات المتأخرة. أرسل رقم رحلتك لتعديل الموعد.",
    },
    {
      question: "كم يكلف التاكسي من مطار الرباط إلى الرباط؟",
      answer:
        "يعتمد على الحي (حي الرياض، أكدال، السويسي…). نقدم سعراً ثابتاً أو تقديراً واضحاً قبل الرحلة — دون مفاجآت على العداد.",
    },
    {
      question: "هل تقدمون سعراً ثابتاً لنقل المطار؟",
      answer:
        "نعم، للمسارات المعتادة من وإلى RBA. يتم تأكيد المبلغ عند الحجز حسب العنوان والأمتعة والوقت.",
    },
    {
      question: "هل تنقلون بين الرباط والدار البيضاء؟",
      answer:
        "نعم. الرباط ↔ الدار البيضاء (المدينة أو مطار محمد الخامس) بسيارات فاخرة، مع تعريفة ثابتة للمسافات الطويلة عند الطلب.",
    },
    {
      question: "كيف أحجز سائقاً خاصاً في الرباط؟",
      answer:
        "اتصل على +212 6 745 459 39 أو راسلنا على واتساب بالتاريخ والوقت والعناوين وعدد الركاب. نؤكد السيارة والسعر خلال دقائق.",
    },
  ],
};

const HOME_AI_ANSWER: Record<SeoLocale, string> = {
  fr: "Rabat Transfert est un service de taxi et chauffeur privé pour l'aéroport Rabat-Salé (RBA), disponible 24h/24. Nous assurons les transferts vers Rabat, Salé et les liaisons longue distance (Casablanca, Marrakech). Tarif annoncé avant départ, réservation par WhatsApp ou téléphone, véhicules Mercedes et BMW.",
  en: "Rabat Transfert provides private taxi and chauffeur service for Rabat-Salé Airport (RBA), available 24/7. We cover Rabat, Salé and long-distance routes (Casablanca, Marrakech). Fare quoted before pickup; book via WhatsApp or phone; premium Mercedes and BMW fleet.",
  ar: "Rabat Transfert خدمة تاكسي وسائق خاص لمطار الرباط-سلا (RBA) على مدار الساعة. نغطي الرباط وسلا والمسافات الطويلة (الدار البيضاء، مراكش). السعر يُعلَن قبل الانطلاق؛ الحجز عبر واتساب أو الهاتف؛ أسطول مرسيدس وBMW.",
};

export function getHomeFaq(locale: SeoLocale = "fr"): HomeFaqItem[] {
  return HOME_FAQ[locale] ?? HOME_FAQ.fr;
}

export function getHomeAiAnswer(locale: SeoLocale = "fr"): string {
  return HOME_AI_ANSWER[locale] ?? HOME_AI_ANSWER.fr;
}
