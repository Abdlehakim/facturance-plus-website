import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  Banknote,
  Building2,
  ChartNoAxesCombined,
  CreditCard,
  FileChartColumn,
  FileText,
  History,
  Landmark,
  Mail,
  PackageCheck,
  Printer,
  ReceiptText,
  RefreshCw,
  ShoppingCart,
  Truck,
  UserRoundCheck,
  Users,
  WalletCards,
  Warehouse,
} from "lucide-react";

export type ProductFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
};

type FeatureLink = { label: string; href: string };

export type ProductFeatureCategory = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accentClassName: string;
  numberClassName: string;
  features: readonly ProductFeature[];
  more?: readonly FeatureLink[];
};

// Confirmed against the local customer navigation/document workflows and the
// API stock, payments, treasury, reports, dashboard and synchronization modules.
// Web XML/TEJ and WhatsApp actions are unavailable and are intentionally omitted.
export const productOverviewFeatures: readonly ProductFeature[] = [
  {
    title: "Documents commerciaux",
    description: "Devis, factures, proformas, avoirs, bons de commande et de livraison.",
    icon: ReceiptText,
    href: "/logiciel-facturation-tunisie",
  },
  {
    title: "Achats & dépenses",
    description: "Suivez factures d’achat, dépenses et règlements fournisseurs.",
    icon: ShoppingCart,
  },
  {
    title: "Clients & fournisseurs",
    description: "Centralisez fiches, coordonnées et historiques partenaires.",
    icon: UserRoundCheck,
    href: "/logiciel-gestion-commerciale-tunisie",
  },
  {
    title: "Articles, services & stock",
    description: "Gérez catalogue, dépôts, inventaire et mouvements de stock.",
    icon: PackageCheck,
    href: "/logiciel-gestion-stock-tunisie",
  },
  {
    title: "Paiements clients & fournisseurs",
    description: "Suivez règlements, soldes et échéances de vos partenaires.",
    icon: CreditCard,
  },
  {
    title: "Trésorerie",
    description: "Consultez comptes, entrées, sorties et transferts de trésorerie.",
    icon: WalletCards,
  },
  {
    title: "Rapports & indicateurs",
    description: "Retrouvez rapports de taxes, relevés et indicateurs de gestion.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Multi-entreprises & synchronisation",
    description: "Accédez à vos sociétés et synchronisez selon votre configuration.",
    icon: Building2,
  },
];

const features = {
  quotes: {
    title: "Devis",
    description: "Préparez et suivez vos propositions commerciales.",
    icon: FileText,
  },
  invoices: {
    title: "Factures",
    description: "Créez et numérotez vos factures avec vos modèles de document.",
    icon: ReceiptText,
  },
  proformas: {
    title: "Factures proforma",
    description: "Préparez vos proformas et convertissez-les en factures.",
    icon: FileText,
  },
  orders: {
    title: "Bons de commande",
    description: "Préparez et suivez vos commandes auprès des fournisseurs.",
    icon: ShoppingCart,
  },
  deliveries: {
    title: "Bons de livraison",
    description: "Documentez les livraisons et retrouvez les pièces associées.",
    icon: Truck,
  },
  creditNotes: {
    title: "Factures d’avoir",
    description: "Créez vos avoirs à partir des factures concernées.",
    icon: ReceiptText,
  },
  conversion: {
    title: "Conversion & historique",
    description: "Transformez vos documents et consultez leur historique.",
    icon: History,
  },
  documentOutputs: {
    title: "PDF, impression & email",
    description: "Prévisualisez, imprimez, exportez et envoyez vos PDF par email.",
    icon: Printer,
  },
  purchaseInvoices: {
    title: "Factures d’achat",
    description: "Enregistrez les factures et références de vos fournisseurs.",
    icon: ReceiptText,
  },
  expenses: {
    title: "Dépenses",
    description: "Enregistrez vos dépenses, leurs périodes et leurs règlements.",
    icon: Banknote,
  },
  stockEntries: {
    title: "Bons d’entrée",
    description: "Enregistrez les réceptions dans vos dépôts et magasins.",
    icon: Warehouse,
  },
  paymentTracking: {
    title: "Suivi des règlements",
    description: "Distinguez factures payées, partiellement payées et impayées.",
    icon: CreditCard,
  },
  clients: {
    title: "Clients",
    description: "Centralisez coordonnées et informations de vos clients.",
    icon: Users,
  },
  suppliers: {
    title: "Fournisseurs",
    description: "Retrouvez les fiches et coordonnées de vos fournisseurs.",
    icon: UserRoundCheck,
  },
  transporters: {
    title: "Transporteurs",
    description: "Associez transporteur, chauffeur et véhicule aux livraisons.",
    icon: Truck,
  },
  partnerHistory: {
    title: "Historique partenaire",
    description: "Retrouvez les mouvements et règlements par partenaire.",
    icon: History,
  },
  clientStatements: {
    title: "Relevés clients",
    description: "Consultez les opérations et soldes clients sur une période.",
    icon: FileChartColumn,
  },
  supplierStatements: {
    title: "Relevés fournisseurs",
    description: "Consultez les opérations et soldes de chaque fournisseur.",
    icon: FileChartColumn,
  },
  clientPayments: {
    title: "Paiements clients",
    description: "Enregistrez vos encaissements et exportez leur historique.",
    icon: CreditCard,
  },
  supplierPayments: {
    title: "Paiements fournisseurs",
    description: "Enregistrez règlements et avances de vos fournisseurs.",
    icon: Banknote,
  },
  articles: {
    title: "Articles",
    description: "Gérez références, désignations, prix et quantités en stock.",
    icon: PackageCheck,
  },
  services: {
    title: "Services",
    description: "Réutilisez vos prestations dans les documents commerciaux.",
    icon: FileText,
  },
  charges: {
    title: "Charges",
    description: "Réutilisez vos charges dans les lignes de vos dépenses.",
    icon: Banknote,
  },
  depots: {
    title: "Dépôts / magasins",
    description: "Organisez vos articles par dépôt et emplacement.",
    icon: Warehouse,
  },
  inventory: {
    title: "Inventaire",
    description: "Consultez les quantités disponibles et les seuils de stock.",
    icon: PackageCheck,
  },
  stockMovements: {
    title: "Mouvements de stock",
    description: "Suivez entrées, sorties et documents à l’origine des mouvements.",
    icon: ArrowRightLeft,
  },
  stockDocuments: {
    title: "Bons d’entrée & de sortie",
    description: "Documentez les réceptions et sorties de marchandises.",
    icon: Truck,
  },
  stockAlerts: {
    title: "Alertes de stock",
    description: "Repérez les articles au seuil minimum ou en rupture.",
    icon: PackageCheck,
  },
  treasuryAccounts: {
    title: "Comptes de trésorerie",
    description: "Consultez vos comptes de caisse et de banque et leurs soldes.",
    icon: Landmark,
  },
  treasuryMovements: {
    title: "Entrées & sorties",
    description: "Saisissez vos mouvements manuels et consultez les règlements.",
    icon: Banknote,
  },
  transfers: {
    title: "Transferts entre comptes",
    description: "Enregistrez les transferts entre vos comptes de trésorerie.",
    icon: ArrowRightLeft,
  },
  paymentMethods: {
    title: "Chèques & virements",
    description: "Suivez aussi espèces, cartes et prélèvements.",
    icon: CreditCard,
  },
  bills: {
    title: "Traites & billets à ordre",
    description: "Préparez vos lettres de change et billets avec leurs échéances.",
    icon: FileText,
  },
  commercialEffects: {
    title: "Effets de commerce",
    description: "Suivez dépôts, encaissements, paiements et impayés des effets.",
    icon: History,
  },
  salesTax: {
    title: "Taxes à la vente",
    description: "Consultez le rapport de taxes à la vente sur la période choisie.",
    icon: FileChartColumn,
  },
  purchaseTax: {
    title: "Taxes à l’achat",
    description: "Consultez le rapport de taxes à l’achat sur la période choisie.",
    icon: FileChartColumn,
  },
  reportPdf: {
    title: "Export PDF",
    description: "Prévisualisez et exportez vos rapports et relevés en PDF.",
    icon: Printer,
  },
  dashboard: {
    title: "Tableaux de bord",
    description: "Consultez les synthèses de ventes, achats et règlements.",
    icon: ChartNoAxesCombined,
  },
  documentIndicators: {
    title: "Indicateurs documents",
    description: "Suivez nombres, montants, statuts et soldes des documents.",
    icon: ReceiptText,
  },
  paymentIndicators: {
    title: "Indicateurs paiements",
    description: "Consultez les montants encaissés et les règlements fournisseurs.",
    icon: CreditCard,
  },
  companies: {
    title: "Gestion multi-entreprises",
    description: "Passez entre les entreprises autorisées depuis votre compte.",
    icon: Building2,
  },
  exercises: {
    title: "Exercices par entreprise",
    description: "Choisissez l’entreprise et l’exercice de votre espace de travail.",
    icon: FileText,
  },
  companyProfile: {
    title: "Profil & identité société",
    description: "Personnalisez coordonnées et logo de votre entreprise.",
    icon: Building2,
  },
  sync: {
    title: "Synchronisation sécurisée",
    description: "Synchronisez les données des entreprises de votre compte.",
    icon: RefreshCw,
  },
  sharedData: {
    title: "Données desktop & web",
    description: "Retrouvez documents, catalogue et règlements en mode synchronisé.",
    icon: RefreshCw,
  },
  emailSettings: {
    title: "Messagerie de l’entreprise",
    description: "Configurez l’envoi des documents depuis votre messagerie.",
    icon: Mail,
  },
} satisfies Record<string, ProductFeature>;

export const productFeatureCategories: readonly ProductFeatureCategory[] = [
  {
    id: "overview",
    number: "01",
    title: "Vue d’ensemble",
    description: "Documents, stock, paiements et pilotage, selon votre environnement et votre configuration.",
    icon: ReceiptText,
    accentClassName: "bg-blue-50 text-blue-600",
    numberClassName: "text-blue-600",
    features: productOverviewFeatures,
  },
  {
    id: "documents",
    number: "02",
    title: "Documents commerciaux",
    description: "Vos documents, modèles et numérotation, avec PDF, impression et email configuré.",
    icon: ReceiptText,
    accentClassName: "bg-rose-50 text-rose-500",
    numberClassName: "text-rose-500",
    features: [
      features.quotes, features.invoices, features.proformas, features.orders,
      features.deliveries, features.creditNotes, features.conversion, features.documentOutputs,
    ],
    more: [{ label: "Devis et factures avec Facturance Plus", href: "/logiciel-facturation-tunisie" }],
  },
  {
    id: "purchases",
    number: "03",
    title: "Achats & dépenses",
    description: "De la commande fournisseur à la réception, retrouvez achats, dépenses et règlements.",
    icon: ShoppingCart,
    accentClassName: "bg-teal-50 text-teal-600",
    numberClassName: "text-teal-600",
    features: [
      features.purchaseInvoices, features.expenses, features.orders,
      features.stockEntries, features.supplierPayments, features.paymentTracking,
    ],
  },
  {
    id: "partners",
    number: "04",
    title: "Clients & partenaires",
    description: "Des fiches réutilisables et des relevés pour suivre vos relations commerciales.",
    icon: UserRoundCheck,
    accentClassName: "bg-teal-50 text-teal-600",
    numberClassName: "text-teal-600",
    features: [
      features.clients, features.suppliers, features.transporters, features.partnerHistory,
      features.clientStatements, features.supplierStatements, features.clientPayments, features.supplierPayments,
    ],
    more: [{ label: "Gestion commerciale, clients et fournisseurs", href: "/logiciel-gestion-commerciale-tunisie" }],
  },
  {
    id: "stock",
    number: "05",
    title: "Stock & catalogue",
    description: "Articles, services et charges, avec inventaire, dépôts et suivi des mouvements de stock.",
    icon: PackageCheck,
    accentClassName: "bg-rose-50 text-rose-500",
    numberClassName: "text-rose-500",
    features: [
      features.articles, features.services, features.charges, features.depots,
      features.inventory, features.stockMovements, features.stockDocuments, features.stockAlerts,
    ],
    more: [{ label: "Catalogue, inventaire et gestion de stock", href: "/logiciel-gestion-stock-tunisie" }],
  },
  {
    id: "payments",
    number: "06",
    title: "Paiements & trésorerie",
    description: "Règlements partenaires, comptes et mouvements de trésorerie, avec suivi des effets de commerce.",
    icon: WalletCards,
    accentClassName: "bg-indigo-50 text-indigo-500",
    numberClassName: "text-indigo-500",
    features: [
      features.clientPayments, features.supplierPayments, features.treasuryAccounts, features.treasuryMovements,
      features.transfers, features.paymentMethods, features.bills, features.commercialEffects,
    ],
  },
  {
    id: "reports",
    number: "07",
    title: "Rapports & pilotage",
    description: "Rapports de taxes, relevés partenaires et tableaux de bord pour suivre votre activité.",
    icon: ChartNoAxesCombined,
    accentClassName: "bg-blue-50 text-blue-600",
    numberClassName: "text-blue-600",
    features: [
      features.salesTax, features.purchaseTax, features.clientStatements, features.supplierStatements,
      features.reportPdf, features.dashboard, features.documentIndicators, features.paymentIndicators,
    ],
  },
  {
    id: "companies",
    number: "08",
    title: "Entreprises & synchronisation",
    description: "Entreprises, exercices et données synchronisées selon votre environnement et votre configuration.",
    icon: Building2,
    accentClassName: "bg-indigo-50 text-indigo-500",
    numberClassName: "text-indigo-500",
    features: [
      features.companies, features.exercises, features.companyProfile,
      features.sync, features.sharedData, features.emailSettings,
    ],
  },
];
