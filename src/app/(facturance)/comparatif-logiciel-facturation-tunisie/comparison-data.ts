/**
 * Data behind the Tunisian invoicing-software comparison.
 *
 * Every competitor value comes from the vendor's own public pages, consulted
 * on the date in CHECKED_AT. Nothing is inferred: where a page does not state
 * something, the value is "unknown" and renders as "Non communiqué", never as
 * "no". "no" is reserved for cases where absence is established.
 *
 * Facturance Plus is held to the same standard. Its electronic-invoicing entry
 * reports the application's actual state: the "Générer XML" menu exposes a
 * single disabled item and the TTN action in the document history is rendered
 * as unavailable, so no TEIF generation or TTN transmission is claimed.
 */

/** The date the vendor pages were consulted. */
export const CHECKED_AT = "1er octobre 2026";

export type Verdict = "yes" | "no" | "partial" | "unknown";

export type ComparisonSource = {
  label: string;
  url: string;
};

export type CriterionId =
  | "web"
  | "windows"
  | "offline"
  | "documents"
  | "tiers"
  | "stock"
  | "multiDepot"
  | "payments"
  | "multiCompany"
  | "pos"
  | "accounting"
  | "payroll"
  | "mobile";

export const criteria: { id: CriterionId; label: string }[] = [
  { id: "web", label: "Version Web" },
  { id: "windows", label: "Application Windows" },
  { id: "offline", label: "Fonctionnement hors ligne" },
  { id: "documents", label: "Devis, bons et factures" },
  { id: "tiers", label: "Clients et fournisseurs" },
  { id: "stock", label: "Articles et stock" },
  { id: "multiDepot", label: "Multi-dépôt" },
  { id: "payments", label: "Suivi des paiements" },
  { id: "multiCompany", label: "Multi-entreprises" },
  { id: "pos", label: "Point de vente (caisse)" },
  { id: "accounting", label: "Comptabilité intégrée" },
  { id: "payroll", label: "Paie" },
  { id: "mobile", label: "Application mobile" },
];

export type ComparedProduct = {
  id: string;
  name: string;
  /** True for the product published by this site. */
  isPublisher?: boolean;
  website: string;
  focus: string;
  pricing: string;
  trial: string;
  values: Record<CriterionId, Verdict>;
  /** Free text: this criterion is too nuanced for a yes/no cell. */
  electronicInvoice: string;
  strengths: string[];
  limits: string[];
  sources: ComparisonSource[];
};

export const products: ComparedProduct[] = [
  {
    id: "facturance-plus",
    name: "Facturance Plus",
    isPublisher: true,
    website: "https://facturance.com",
    focus:
      "Facturation et gestion commerciale, avec une application Windows utilisable hors ligne en plus de l’accès par navigateur.",
    pricing:
      "25 à 40 DT par entreprise et par mois selon le mode, remise supplémentaire à partir de trois entreprises",
    trial: "3 jours",
    values: {
      web: "yes",
      windows: "yes",
      offline: "yes",
      documents: "yes",
      tiers: "yes",
      stock: "yes",
      multiDepot: "yes",
      payments: "yes",
      multiCompany: "yes",
      pos: "no",
      accounting: "no",
      payroll: "no",
      mobile: "unknown",
    },
    electronicInvoice:
      "Non. L’application ne génère pas de fichier TEIF et n’assure ni la signature électronique ni la transmission à TTN. Aucune homologation n’est revendiquée.",
    strengths: [
      "Application de bureau Windows 10 et 11, utilisable sans connexion en mode Local uniquement",
      "Devis, bons de commande, bons de livraison, factures et avoirs depuis les mêmes fiches",
      "Articles, services, dépôts avec emplacements, seuils et alertes par article",
      "Paiements clients et fournisseurs, charges et vue trésorerie",
      "Plusieurs entreprises par compte, chacune avec ses documents et sa numérotation",
    ],
    limits: [
      "Pas de génération TEIF ni de transmission à TTN à ce jour",
      "Pas de module de caisse, de comptabilité ni de paie",
      "Essai gratuit de trois jours, plus court que la plupart des solutions comparées",
    ],
    sources: [
      { label: "Fonctionnalités", url: "https://facturance.com/features" },
      { label: "Tarifs", url: "https://facturance.com/pricing" },
    ],
  },
  {
    id: "swiver",
    name: "Swiver",
    website: "https://swiver.io",
    focus:
      "Gestion commerciale en ligne pour TPE et PME, avec une offre de facturation électronique mise en avant.",
    pricing:
      "450 DT HT par an (Economic), 600 DT HT par an (Premium), 7 000 DT en abonnement à vie (VIP)",
    trial: "14 jours sur l’offre gratuite, 15 jours sur les offres payantes",
    values: {
      web: "yes",
      windows: "unknown",
      offline: "unknown",
      documents: "yes",
      tiers: "yes",
      stock: "yes",
      multiDepot: "yes",
      payments: "yes",
      multiCompany: "unknown",
      pos: "yes",
      accounting: "unknown",
      payroll: "unknown",
      mobile: "unknown",
    },
    electronicInvoice:
      "L’éditeur annonce la conversion automatique au format XML-TEIF, la signature électronique via Tuntrust et l’envoi direct à TTN, et se présente comme « Certifié par le Réseau Tunisien de Commerce (TTN) ».",
    strengths: [
      "Offre de facturation électronique détaillée publiquement",
      "Gestion de stock et multi-dépôt annoncées dès les offres payantes",
      "Module de caisse inclus selon la page tarifs",
    ],
    limits: [
      "Offre gratuite limitée à 14 jours et 10 documents par mois",
      "Nombre d’utilisateurs limité à 1 puis 3 selon l’offre",
    ],
    sources: [
      { label: "Tarifs", url: "https://swiver.io/tarifs/" },
      {
        label: "Facture électronique",
        url: "https://swiver.io/facture-electronique-tunisie/",
      },
    ],
  },
  {
    id: "hesabi",
    name: "Hesabi",
    website: "https://hesabi.tn",
    focus:
      "Plateforme de gestion plus large, incluant comptabilité et paie en plus de la facturation.",
    pricing:
      "390 DT par an (Starter), 790 DT par an (Pro), 2 490 DT par an (Cabinet)",
    trial: "14 jours, sans carte bancaire",
    values: {
      web: "yes",
      windows: "unknown",
      offline: "unknown",
      documents: "yes",
      tiers: "yes",
      stock: "yes",
      multiDepot: "unknown",
      payments: "yes",
      multiCompany: "yes",
      pos: "yes",
      accounting: "yes",
      payroll: "yes",
      mobile: "unknown",
    },
    electronicInvoice:
      "L’éditeur annonce la génération de fichiers XML au format TEIF conformes aux spécifications TTN El Fatoora, le dépôt s’effectuant avec les accès de l’entreprise après enrôlement.",
    strengths: [
      "Comptabilité et paie intégrées, rares dans cette gamme de prix",
      "Offre Cabinet pensée pour les experts-comptables, avec plusieurs dossiers clients",
      "Caisse et gestion de stock annoncées",
    ],
    limits: [
      "Le dépôt sur TTN suppose un enrôlement et des accès propres à l’entreprise",
      "Pas d’application de bureau mentionnée sur les pages consultées",
    ],
    sources: [{ label: "Site officiel", url: "https://hesabi.tn/" }],
  },
  {
    id: "iberis",
    name: "Iberis",
    website: "https://www.iberis.io",
    focus:
      "Facturation et suivi financier en ligne, avec une offre gratuite permanente mais plafonnée.",
    pricing: "0 DT par mois (Free), 39 DT par mois (Premium)",
    trial: "Offre gratuite permanente, plafonnée en volume",
    values: {
      web: "yes",
      windows: "unknown",
      offline: "unknown",
      documents: "yes",
      tiers: "yes",
      stock: "yes",
      multiDepot: "unknown",
      payments: "yes",
      multiCompany: "unknown",
      pos: "unknown",
      accounting: "partial",
      payroll: "unknown",
      mobile: "unknown",
    },
    electronicInvoice:
      "L’éditeur se présente comme conforme à la facturation électronique via une intégration El Fatoora. Le détail technique n’est pas précisé sur la page consultée.",
    strengths: [
      "Offre gratuite permanente, utile pour démarrer sans engagement",
      "Achats, dépenses et trésorerie en plus de la facturation",
      "Synchronisation comptable annoncée",
    ],
    limits: [
      "Offre gratuite limitée à 5 clients, 5 factures et 10 articles",
      "Mention HT ou TTC non précisée sur la page tarifs consultée",
    ],
    sources: [
      { label: "Tarifs et fonctionnalités", url: "https://finances.iberis.io/fr/" },
    ],
  },
  {
    id: "finco",
    name: "Finco",
    website: "https://finco.tn",
    focus:
      "Facturation en ligne avec application mobile, orientée simplicité d’usage.",
    pricing: "Offre Découverte gratuite, Pro à 49 DT TTC par mois",
    trial: "14 jours, sans carte bancaire",
    values: {
      web: "yes",
      windows: "unknown",
      offline: "unknown",
      documents: "yes",
      tiers: "yes",
      stock: "yes",
      multiDepot: "yes",
      payments: "yes",
      multiCompany: "unknown",
      pos: "unknown",
      accounting: "unknown",
      payroll: "unknown",
      mobile: "yes",
    },
    electronicInvoice:
      "L’éditeur se présente comme « homologué par l’ANCE » pour la facturation électronique et mentionne une intégration de la plateforme TEJ. Le détail El Fatoora et TEIF n’est pas précisé sur la page consultée.",
    strengths: [
      "Application mobile en plus de l’accès navigateur",
      "Utilisateurs et entrepôts annoncés sans limite sur l’offre Pro",
      "Offre gratuite plafonnée à 20 factures par mois",
    ],
    limits: [
      "Tarif Pro annoncé en TTC, à comparer avec les tarifs HT des autres éditeurs",
      "Détail technique de la facturation électronique peu documenté publiquement",
    ],
    sources: [{ label: "Site officiel", url: "https://finco.tn/" }],
  },
  {
    id: "clic2up",
    name: "Clic2Up",
    website: "https://clic2up.com",
    focus:
      "Facturation et devis en ligne, périmètre volontairement restreint aux documents.",
    pricing: "9 DT HT par mois (Starter), 19 DT HT par mois (PRO)",
    trial: "Premier mois offert",
    values: {
      web: "yes",
      windows: "unknown",
      offline: "unknown",
      documents: "yes",
      tiers: "unknown",
      stock: "unknown",
      multiDepot: "unknown",
      payments: "unknown",
      multiCompany: "unknown",
      pos: "unknown",
      accounting: "unknown",
      payroll: "unknown",
      mobile: "unknown",
    },
    electronicInvoice:
      "L’éditeur annonce une intégration directe avec El Fatoora (TTN) : une fois le certificat de signature configuré (Digigo ou ID-Trust), les factures sont signées, converties en XML conforme et transmises à la plateforme.",
    strengths: [
      "Tarif d’entrée le plus bas des solutions comparées",
      "Intégration El Fatoora décrite précisément, certificat compris",
      "Notes d’honoraires et bons de sortie en plus des documents habituels",
    ],
    limits: [
      "Ni stock, ni fiches fournisseurs, ni suivi des règlements mentionnés sur les pages consultées",
      "Périmètre limité à l’émission de documents",
    ],
    sources: [{ label: "Site officiel", url: "https://clic2up.com/" }],
  },
  {
    id: "swifto",
    name: "Swifto",
    website: "https://www.swifto.io",
    focus:
      "ERP en ligne couvrant vente, achat, stock, finance, RH et CRM pour des structures plus larges.",
    pricing:
      "59,9 DT HT par mois (Premium), 270 DT HT par mois (Diamond), offre sur devis",
    trial: "14 jours, sans carte bancaire",
    values: {
      web: "yes",
      windows: "unknown",
      offline: "partial",
      documents: "yes",
      tiers: "yes",
      stock: "yes",
      multiDepot: "yes",
      payments: "yes",
      multiCompany: "unknown",
      pos: "yes",
      accounting: "partial",
      payroll: "yes",
      mobile: "yes",
    },
    electronicInvoice:
      "L’éditeur mentionne « El Fatoora, conformité TTN » sans détail technique sur la page consultée.",
    strengths: [
      "Périmètre ERP : RH, paie, CRM et caisse en plus de la gestion commerciale",
      "Applications mobiles terrain fonctionnant hors ligne puis se synchronisant",
      "Suivi de lots et de dates de péremption annoncé",
    ],
    limits: [
      "Tarif d’entrée nettement plus élevé que les solutions de facturation seule",
      "Périmètre probablement surdimensionné pour une TPE",
    ],
    sources: [{ label: "Site officiel", url: "https://www.swifto.io/" }],
  },
];
