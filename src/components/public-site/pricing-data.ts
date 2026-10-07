import type { LucideIcon } from "lucide-react";
import { Cloud, Globe, HardDrive } from "lucide-react";

/** Monthly billing and annual commitments are distinct commercial offers. */
export type Offer = {
  name: string;
  description: string;
  icon: LucideIcon;
  badge?: { label: string; tone: string; context?: string };
  features: string[];
  highlighted?: boolean;
};

export type Plan = Offer & {
  monthlyPrice: string;
  monthlySuffix: string;
  annualMonthlyEquivalent: string;
  annualTotal: string;
  annualSuffix: string;
  volumeMonthlyPrice: string;
  volumeAnnualMonthlyEquivalent: string;
  volumeAnnualTotal: string;
};

export const plans: Plan[] = [
  {
    name: "Local uniquement",
    description:
      "Vos données restent enregistrées localement sur votre ordinateur, sans synchronisation avec le serveur Facturance.",
    icon: HardDrive,
    badge: {
      label: "-37,5 %",
      tone: "border-emerald-300 bg-emerald-100 text-emerald-800",
      context: "Paiement annuel",
    },
    monthlyPrice: "40 DT",
    monthlySuffix: "par entreprise / mois",
    annualMonthlyEquivalent: "25 DT",
    annualTotal: "300 DT",
    annualSuffix: "par entreprise",
    volumeMonthlyPrice: "36 DT",
    volumeAnnualMonthlyEquivalent: "22,50 DT",
    volumeAnnualTotal: "270 DT",
    features: [
      "Données enregistrées localement",
      "Toutes les fonctionnalités de gestion",
      "Aucune synchronisation serveur",
    ],
  },
  {
    name: "Version web",
    description:
      "Utilisez Facturance Plus directement depuis votre navigateur, sans installation : vos données sont hébergées sur le serveur Facturance.",
    icon: Globe,
    badge: {
      label: "-33,33 %",
      tone: "border-emerald-300 bg-emerald-100 text-emerald-800",
      context: "Paiement annuel",
    },
    monthlyPrice: "45 DT",
    monthlySuffix: "par entreprise / mois",
    annualMonthlyEquivalent: "30 DT",
    annualTotal: "360 DT",
    annualSuffix: "par entreprise",
    volumeMonthlyPrice: "40,50 DT",
    volumeAnnualMonthlyEquivalent: "27 DT",
    volumeAnnualTotal: "324 DT",
    features: [
      "Accès depuis votre navigateur",
      "Aucune installation sur votre ordinateur",
      "Données hébergées sur le serveur Facturance",
    ],
  },
  {
    name: "Local + serveur",
    description:
      "Vos données restent disponibles localement et sont synchronisées avec le serveur Facturance.",
    icon: Cloud,
    badge: {
      label: "-33,33 %",
      tone: "border-emerald-300 bg-emerald-100 text-emerald-800",
      context: "Paiement annuel",
    },
    monthlyPrice: "60 DT",
    monthlySuffix: "par entreprise / mois",
    annualMonthlyEquivalent: "40 DT",
    annualTotal: "480 DT",
    annualSuffix: "par entreprise",
    volumeMonthlyPrice: "54 DT",
    volumeAnnualMonthlyEquivalent: "36 DT",
    volumeAnnualTotal: "432 DT",
    features: [
      "Données enregistrées localement",
      "Synchronisation sécurisée avec le serveur",
      "Accès à l’espace client web",
    ],
    highlighted: true,
  },
];
