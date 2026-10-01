---
title: "Penser les données cloud comme source de vérité"
slug: "cloud-data-source-of-truth"
description: "Une base backend propre aide factures, utilisateurs, entreprises et flux de synchronisation à évoluer sans chaos."
category: "Ingénierie"
publishedAt: "2026-06-18"
author: "Ingénierie Facturance"
readTime: "7 min de lecture"
---

Dans une plateforme qui prend en charge web, desktop, mobile et API, la base de données cloud doit rester la source de vérité. Les caches locaux et l'état client sont utiles, mais ils doivent toujours se réconcilier avec le modèle backend canonique.

## Modéliser soigneusement les objets métier clés

Factures, clients, produits, utilisateurs, entreprises, permissions et enregistrements d'audit doivent avoir des règles claires de propriété et de cycle de vie. Une bonne modélisation réduit l'ambiguïté dans les rapports, la synchronisation et les futures intégrations.

- Utiliser PostgreSQL pour les données cloud canoniques.
- Utiliser des migrations pour chaque changement de schéma.
- Préférer la suppression logique pour les enregistrements métier qui peuvent apparaître dans les rapports.
- Ajouter des champs d'audit de manière cohérente sur les tables importantes.

## Les données locales doivent être traitées comme un cache

Les données SQLite desktop doivent soutenir le travail hors ligne, pas devenir une vérité séparée. La logique de synchronisation doit préserver la validation cloud, la gestion des conflits et le suivi des versions.

> **Ancrage d'architecture**
>
> Lorsque chaque client accepte que le modèle cloud est canonique, de nouvelles apps peuvent rejoindre la plateforme sans inventer des règles métier différentes.
