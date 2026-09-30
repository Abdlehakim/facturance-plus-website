import { Boxes } from "lucide-react";
import type { BlogPost } from "./blog-types";

/**
 * French-authored, so no `localized` block.
 *
 * The product paragraphs describe article records, stock movements tied to
 * commercial documents and multi-company separation. No automatic reordering,
 * alerting or forecasting is claimed, because the application does not do it.
 */
export const gestionStockPost: BlogPost = {
  slug: "gestion-stock-bonnes-pratiques",
  icon: Boxes,
  category: "Stock",
  title:
    "Gestion de stock : 7 bonnes pratiques pour éviter les ruptures et le surstock",
  description:
    "Sept habitudes concrètes pour garder un stock sous contrôle, applicables sans outil sophistiqué, et ce qu’un logiciel de gestion apporte réellement au quotidien.",
  readTime: "9 min de lecture",
  publishedAt: "2026-09-30",
  author: "Équipe Facturance Plus",
  content: [
    {
      type: "paragraph",
      text: "Le stock est l’un des postes où une petite entreprise immobilise le plus de trésorerie, et l’un de ceux qu’elle pilote le moins. Tant que les ventes suivent, personne ne regarde. Le jour où un client demande un article indisponible, ou qu’un inventaire révèle des palettes invendables depuis deux ans, le sujet redevient urgent.",
    },
    {
      type: "paragraph",
      text: "Les deux problèmes — la rupture et le surstock — semblent opposés. Ils viennent en réalité de la même cause : une information de stock qui ne reflète pas la réalité. Voici sept pratiques qui corrigent cela, sans exiger d’outil sophistiqué.",
    },
    {
      type: "heading",
      text: "Rupture et surstock : deux symptômes, une même origine",
    },
    {
      type: "paragraph",
      text: "La rupture est visible : un client commande, vous n’avez pas, la vente est perdue ou reportée. Le coût est immédiat, parfois définitif si le client trouve ailleurs.",
    },
    {
      type: "paragraph",
      text: "Le surstock est silencieux, et souvent plus coûteux. De l’argent dort en rayon, occupe de la place, se démode, s’abîme ou se périme. Il n’apparaît dans aucun tableau de bord parce que rien ne se passe — c’est précisément le problème.",
    },
    {
      type: "paragraph",
      text: "Dans les deux cas, la décision d’achat a été prise sur une information fausse ou absente. Améliorer la qualité de cette information est donc le seul levier qui agit sur les deux à la fois.",
    },
    {
      type: "heading",
      text: "1. Tenir des fiches articles propres",
    },
    {
      type: "paragraph",
      text: "Tout commence là, et c’est l’étape la plus négligée. Si le même article existe sous trois libellés différents parce qu’il a été créé trois fois, aucun suivi n’est possible : votre stock est réparti entre trois fiches dont aucune ne dit la vérité.",
    },
    {
      type: "list",
      items: [
        "Une référence unique par article, et une convention de nommage que tout le monde applique.",
        "Des désignations compréhensibles par quelqu’un qui n’a pas créé la fiche.",
        "Une unité de mesure explicite — pièce, carton, kilo, mètre — et jamais mélangée sur la même fiche.",
        "Les doublons fusionnés ou supprimés plutôt que laissés en place « au cas où ».",
      ],
    },
    {
      type: "paragraph",
      text: "Ce nettoyage prend du temps une fois. Sans lui, toutes les pratiques qui suivent reposent sur du sable.",
    },
    {
      type: "heading",
      text: "2. Enregistrer les mouvements au moment où ils ont lieu",
    },
    {
      type: "paragraph",
      text: "Un stock n’est juste que si chaque entrée et chaque sortie est enregistrée quand elle se produit. Noter les sorties « en fin de semaine » garantit des oublis, et un écart qui grandit sans qu’on sache d’où il vient.",
    },
    {
      type: "paragraph",
      text: "Le principe le plus efficace est de rattacher le mouvement au document commercial qui le provoque : une livraison sort la marchandise, une réception la fait entrer. Le stock devient alors la conséquence de l’activité enregistrée, et non une saisie supplémentaire que quelqu’un doit penser à faire.",
    },
    {
      type: "heading",
      text: "3. Définir un seuil pour les articles qui comptent",
    },
    {
      type: "paragraph",
      text: "Pour chaque article important, définissez la quantité en dessous de laquelle il faut réapprovisionner. Ce seuil n’a rien de théorique : il correspond à ce que vous vendez pendant le délai que met votre fournisseur à livrer, augmenté d’une marge de sécurité.",
    },
    {
      type: "paragraph",
      text: "Inutile de le faire pour tout le catalogue. Concentrez-vous sur les articles qui représentent l’essentiel de vos ventes ou de votre valeur immobilisée. Une dizaine de seuils bien choisis est plus utile que trois cents seuils approximatifs que personne ne tient à jour.",
    },
    {
      type: "callout",
      title: "Un seuil n’est utile que s’il est relu",
      text: "Un seuil défini il y a deux ans, alors que vos volumes étaient différents, est une mauvaise information. Prévoyez de revoir les principaux une ou deux fois par an, ou dès qu’un délai fournisseur change durablement.",
    },
    {
      type: "heading",
      text: "4. Repérer ce qui ne bouge plus",
    },
    {
      type: "paragraph",
      text: "Les articles dormants sont les plus faciles à ignorer, parce qu’ils ne provoquent aucun incident. Prenez l’habitude, chaque trimestre, de lister ce qui n’a pas été vendu depuis six mois ou un an.",
    },
    {
      type: "paragraph",
      text: "Pour chaque ligne, une décision : écouler à prix réduit, retourner au fournisseur si c’est possible, ou accepter la perte et libérer la place. Ne rien décider est aussi une décision — celle de payer le stockage indéfiniment.",
    },
    {
      type: "heading",
      text: "5. Compter physiquement, régulièrement",
    },
    {
      type: "paragraph",
      text: "Aucun système ne reste exact indéfiniment. Casse, erreur de saisie, prélèvement non enregistré, vol : l’écart entre le stock théorique et le stock réel se creuse toujours. Le comptage physique est le seul moyen de le mesurer.",
    },
    {
      type: "paragraph",
      text: "Plutôt qu’un inventaire général annuel, qui immobilise l’entreprise et qu’on repousse, préférez des comptages tournants : quelques familles d’articles chaque mois, en rotation. Les écarts sont détectés plus tôt, et leur cause est encore identifiable.",
    },
    {
      type: "heading",
      text: "6. Faire parler les achats et les ventes ensemble",
    },
    {
      type: "paragraph",
      text: "Dans beaucoup de petites structures, celui qui achète et celui qui vend ne regardent pas les mêmes chiffres. On commande sur une intuition, ou sur une promotion fournisseur, sans confronter cela au rythme réel des sorties.",
    },
    {
      type: "paragraph",
      text: "Une remise sur quantité n’est intéressante que si la marchandise s’écoule avant de coûter plus cher qu’elle n’a fait économiser. Rapprocher systématiquement une décision d’achat de l’historique des ventes de l’article évite la plupart des surstocks.",
    },
    {
      type: "heading",
      text: "7. Regarder quelques indicateurs, mais les regarder vraiment",
    },
    {
      type: "paragraph",
      text: "Il n’est pas nécessaire de suivre vingt ratios. Trois ou quatre questions, posées à intervalle régulier, suffisent à détecter une dérive avant qu’elle ne devienne coûteuse.",
    },
    {
      type: "list",
      items: [
        "Quels articles sont passés sous leur seuil depuis le dernier point ?",
        "Quelle part de la valeur du stock n’a connu aucun mouvement ce trimestre ?",
        "Sur quels articles ai-je refusé ou reporté une vente faute de disponibilité ?",
        "Quels écarts le dernier comptage a-t-il révélés, et pour quelle raison ?",
      ],
    },
    {
      type: "paragraph",
      text: "Un rendez-vous mensuel de trente minutes avec ces quatre questions vaut mieux qu’un tableau de bord complet que personne n’ouvre.",
    },
    {
      type: "heading",
      text: "Une vérification rapide",
    },
    {
      type: "list",
      items: [
        "Chaque article a-t-il une fiche unique, avec une unité claire ?",
        "Les sorties sont-elles enregistrées le jour même ?",
        "Mes articles principaux ont-ils un seuil de réapprovisionnement défini ?",
        "Ai-je listé les articles dormants au cours des trois derniers mois ?",
        "Ai-je compté physiquement une partie du stock récemment ?",
        "Mes décisions d’achat s’appuient-elles sur l’historique des ventes ?",
      ],
    },
    {
      type: "heading",
      text: "Ce qu’un logiciel de gestion apporte",
    },
    {
      type: "paragraph",
      text: "Un logiciel ne décide pas à votre place ce qu’il faut acheter. Ce qu’il apporte, c’est une information fiable et immédiatement disponible, là où un tableur demande une mise à jour manuelle que personne ne tient dans la durée.",
    },
    {
      type: "paragraph",
      text: "Dans Facturance Plus, les articles sont tenus dans des fiches uniques, réutilisées par tous les documents commerciaux. Les mouvements de stock découlent de l’activité enregistrée — ce qui sort en livraison, ce qui entre à la réception — plutôt que d’une saisie séparée. L’historique reste consultable, et lorsque vous gérez plusieurs entreprises, chacune conserve son propre stock et ses propres articles.",
    },
    {
      type: "paragraph",
      text: "Les sept pratiques ci-dessus restent de votre ressort : c’est vous qui fixez les seuils, qui décidez du sort des invendus et qui organisez les comptages. L’outil se contente de vous donner des chiffres justes pour le faire.",
    },
    {
      type: "links",
      title: "Pour aller plus loin",
      items: [
        { label: "Les fonctionnalités de Facturance Plus", href: "/features" },
        {
          label: "Devis, bon de commande, bon de livraison et facture",
          href: "/blog/devis-bon-commande-bon-livraison-facture",
        },
        { label: "Voir les tarifs", href: "/pricing" },
      ],
    },
    {
      type: "heading",
      text: "En résumé",
    },
    {
      type: "paragraph",
      text: "Ruptures et surstock découlent d’une même faiblesse : une information de stock qui ne correspond pas à la réalité. Des fiches propres, des mouvements enregistrés au bon moment et des comptages réguliers corrigent cela plus sûrement que n’importe quel outil ajouté par-dessus le désordre.",
    },
    {
      type: "paragraph",
      text: "Commencez par les deux premières pratiques. Elles demandent un effort ponctuel, et elles conditionnent toutes les autres.",
    },
  ],
};
