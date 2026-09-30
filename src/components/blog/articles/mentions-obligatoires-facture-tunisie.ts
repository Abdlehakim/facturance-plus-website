import { ReceiptText } from "lucide-react";
import type { BlogPost } from "./blog-types";

/**
 * Written in French, so the record carries no `localized` block: the fallback
 * in localizeBlogPost serves these fields for every locale.
 *
 * Fiscal topic. Nothing here states a rate, a threshold or an article of law:
 * the piece describes what an invoice contains and sends the reader to the
 * official sources for anything that can change.
 */
export const mentionsObligatoiresFacturePost: BlogPost = {
  slug: "mentions-obligatoires-facture-tunisie",
  icon: ReceiptText,
  category: "Facturation",
  title:
    "Facturation en Tunisie : quelles sont les mentions obligatoires sur une facture ?",
  description:
    "Les informations à contrôler sur chaque facture émise en Tunisie, les oublis qui reviennent le plus souvent, et une méthode simple pour ne plus avoir à y penser.",
  readTime: "9 min de lecture",
  publishedAt: "2026-09-30",
  author: "Équipe Facturance Plus",
  content: [
    {
      type: "paragraph",
      text: "Une facture n’est pas un simple récapitulatif de prix. C’est la pièce qui prouve qu’une vente a eu lieu, qui sert de base à la comptabilité des deux entreprises, et qui sera examinée en cas de contrôle ou de litige. Une facture incomplète peut être refusée par le client, retarder un règlement, ou compliquer le travail de votre comptable des mois plus tard.",
    },
    {
      type: "paragraph",
      text: "Pour une TPE ou une PME tunisienne qui émet quelques dizaines de factures par mois, l’enjeu est surtout pratique : savoir ce qui doit figurer sur le document, et mettre en place une méthode pour que rien ne soit oublié. C’est l’objet de ce guide.",
    },
    {
      type: "heading",
      text: "Pourquoi le contenu d’une facture compte autant",
    },
    {
      type: "paragraph",
      text: "Une facture remplit trois rôles en même temps. Elle est une preuve commerciale : elle dit qui a vendu quoi, à qui, à quel prix et à quelle date. Elle est une pièce comptable : elle alimente vos écritures et celles de votre client. Elle est enfin une pièce fiscale : c’est sur elle que reposent les déclarations liées à la TVA et, le cas échéant, le droit à déduction de votre client.",
    },
    {
      type: "paragraph",
      text: "Ces trois usages expliquent pourquoi une information manquante n’est jamais anodine. Un client dont le matricule fiscal n’apparaît pas sur la facture peut se retrouver dans l’impossibilité de la comptabiliser correctement. Une facture sans numéro identifiable devient difficile à retrouver dans un dossier. Une date absente rend la relance de paiement discutable.",
    },
    {
      type: "heading",
      text: "Les informations qui identifient votre entreprise",
    },
    {
      type: "paragraph",
      text: "La facture doit permettre d’identifier sans ambiguïté qui l’a émise. En pratique, cela suppose de faire figurer la dénomination de l’entreprise, son adresse, et ses identifiants professionnels — au premier rang desquels le matricule fiscal, qui est l’élément que vos clients professionnels vous réclameront le plus souvent.",
    },
    {
      type: "list",
      items: [
        "La dénomination sociale ou le nom commercial exact, tel qu’il est enregistré.",
        "L’adresse du siège ou de l’établissement qui émet la facture.",
        "Le matricule fiscal de l’entreprise.",
        "Un moyen de contact utilisable : téléphone, e-mail, ou les deux.",
      ],
    },
    {
      type: "paragraph",
      text: "Ces éléments changent rarement, ce qui les rend paradoxalement risqués : on les saisit une fois, on ne les relit plus, et une erreur de frappe peut se propager sur des centaines de documents. Il vaut la peine de les vérifier une bonne fois, puis de les enregistrer là où ils seront réutilisés automatiquement.",
    },
    {
      type: "heading",
      text: "Les informations qui identifient le client",
    },
    {
      type: "paragraph",
      text: "Le même raisonnement s’applique de l’autre côté. La facture doit désigner précisément son destinataire : sa dénomination, son adresse, et son identifiant fiscal lorsque le client est un professionnel. C’est souvent là que se logent les frictions, parce que ces informations sont saisies dans l’urgence, au moment de la première commande.",
    },
    {
      type: "paragraph",
      text: "Une bonne habitude consiste à traiter la fiche client comme la source unique de ces données. On la complète correctement une fois, on la corrige quand le client signale un changement, et toutes les factures suivantes en héritent. Cela évite d’avoir trois orthographes différentes du même nom d’entreprise dans un même dossier.",
    },
    {
      type: "heading",
      text: "Le numéro et la date : deux mentions à ne jamais improviser",
    },
    {
      type: "paragraph",
      text: "Chaque facture doit porter un numéro qui lui est propre. Ce numéro doit être unique et suivre une séquence continue : pas de trou inexpliqué, pas de doublon, pas de numéro réattribué après l’annulation d’un document. C’est l’une des rares exigences qui ne souffre aucune approximation, parce qu’une numérotation incohérente est immédiatement visible et met en cause l’ensemble de la série.",
    },
    {
      type: "paragraph",
      text: "La date d’émission doit elle aussi figurer clairement. Lorsque la date de livraison ou d’exécution de la prestation diffère de la date d’émission, il est utile de la mentionner également : cela lève toute ambiguïté sur la période à laquelle l’opération se rattache.",
    },
    {
      type: "callout",
      title: "La numérotation manuelle est la première source d’erreurs",
      text: "Dès que plusieurs personnes émettent des factures, ou qu’on travaille depuis plusieurs postes, une numérotation tenue à la main finit par produire des doublons. Confier la séquence à un outil qui l’attribue lui-même supprime la question.",
    },
    {
      type: "heading",
      text: "Le détail de ce qui est vendu",
    },
    {
      type: "paragraph",
      text: "Une facture doit décrire ce qui est facturé avec assez de précision pour que le client comprenne, et pour qu’un tiers puisse reconstituer l’opération. « Prestation de services » sur une seule ligne, sans autre détail, est rarement suffisant.",
    },
    {
      type: "list",
      items: [
        "La désignation de chaque produit ou prestation, dans des termes compréhensibles.",
        "La quantité, avec son unité lorsque c’est pertinent.",
        "Le prix unitaire hors taxes appliqué à cette ligne.",
        "Les remises accordées, ligne par ligne ou sur le total, quand il y en a.",
      ],
    },
    {
      type: "paragraph",
      text: "Le niveau de détail utile dépend de l’activité. Un négociant a intérêt à reprendre les références de ses articles ; un prestataire gagne à décrire la période couverte et la nature de l’intervention. Dans les deux cas, la règle est la même : la facture doit rester lisible six mois plus tard, par quelqu’un qui n’a pas participé à la vente.",
    },
    {
      type: "heading",
      text: "Les montants, la TVA et le total",
    },
    {
      type: "paragraph",
      text: "La facture doit faire apparaître clairement le montant hors taxes, la taxe applicable, et le montant toutes taxes comprises. Lorsque plusieurs taux coexistent sur un même document, chaque base doit être distinguée : un total unique qui mélange des taux différents est inexploitable pour la déclaration.",
    },
    {
      type: "paragraph",
      text: "Les taux de TVA dépendent de la nature du bien ou du service, et certaines opérations relèvent de régimes particuliers — exonération, suspension, retenue à la source. Ces cas ne s’improvisent pas : ils se vérifient auprès des textes en vigueur ou de votre conseiller comptable avant d’être appliqués, pas après. De même, certaines factures sont soumises à un droit de timbre dont le traitement doit être confirmé pour votre situation.",
    },
    {
      type: "callout",
      title: "Vérifiez toujours auprès des sources officielles",
      text: "Les obligations fiscales peuvent évoluer. Vérifiez les règles applicables auprès des sources officielles tunisiennes ou de votre conseiller comptable. Cet article présente une méthode de travail, il ne remplace pas un avis professionnel et ne constitue pas un conseil fiscal.",
    },
    {
      type: "heading",
      text: "Les conditions de règlement",
    },
    {
      type: "paragraph",
      text: "Indiquer comment et quand la facture doit être payée n’est pas une formalité : c’est ce qui vous permet de relancer un impayé sans discussion. Une échéance explicite, les moyens de paiement acceptés, et les coordonnées bancaires si le virement est attendu, suffisent dans la plupart des cas.",
    },
    {
      type: "paragraph",
      text: "Si vous accordez des délais différents selon les clients, mieux vaut que cette information soit rattachée à la fiche client plutôt que retapée à chaque fois. C’est une des situations où une saisie répétitive finit toujours par produire une incohérence.",
    },
    {
      type: "heading",
      text: "Les oublis les plus fréquents",
    },
    {
      type: "list",
      items: [
        "Le matricule fiscal du client, absent parce que la fiche n’a jamais été complétée après la première vente.",
        "Deux factures portant le même numéro, émises depuis deux postes différents le même jour.",
        "Un avoir qui ne fait pas référence à la facture qu’il corrige, ce qui rend le rapprochement impossible.",
        "Des lignes dont le libellé ne veut plus rien dire une fois sorties du contexte de la vente.",
        "Une remise appliquée sur le total sans que la base de calcul apparaisse.",
        "Une adresse de facturation devenue obsolète après un déménagement du client.",
      ],
    },
    {
      type: "heading",
      text: "Une vérification rapide avant d’envoyer",
    },
    {
      type: "paragraph",
      text: "La plupart des erreurs se détectent en moins d’une minute, à condition de savoir quoi regarder. Voici le contrôle que nous suggérons d’intégrer à votre routine, juste avant l’envoi.",
    },
    {
      type: "list",
      items: [
        "Mon entreprise est-elle identifiée complètement, matricule fiscal compris ?",
        "Le client est-il identifié avec les informations à jour de sa fiche ?",
        "Le numéro est-il unique et dans la continuité de la série ?",
        "La date est-elle celle de l’opération que je facture ?",
        "Chaque ligne est-elle compréhensible hors contexte ?",
        "Les bases hors taxes, la taxe et le total sont-ils cohérents entre eux ?",
        "L’échéance et le moyen de paiement attendu sont-ils indiqués ?",
      ],
    },
    {
      type: "heading",
      text: "Ce qu’un logiciel change concrètement",
    },
    {
      type: "paragraph",
      text: "Un outil de facturation ne vous dispense pas de connaître vos obligations, et aucun logiciel ne peut garantir à votre place la conformité fiscale de votre activité. En revanche, il supprime la classe d’erreurs qui vient de la ressaisie : les informations de votre entreprise, celles de vos clients et celles de vos articles sont enregistrées une fois et réutilisées, et la numérotation est attribuée par le système plutôt que retenue de tête.",
    },
    {
      type: "paragraph",
      text: "Facturance Plus fonctionne sur ce principe. Les fiches clients, fournisseurs et articles alimentent les documents que vous émettez — devis, factures, bons de commande et bons de livraison — et la séquence de numérotation est gérée par l’application, y compris lorsque plusieurs entreprises sont rattachées au même compte. Ce qui reste de votre côté, c’est la décision commerciale et la vérification finale.",
    },
    {
      type: "links",
      title: "Pour aller plus loin",
      items: [
        { label: "Les fonctionnalités de Facturance Plus", href: "/features" },
        {
          label: "Devis, bon de commande, bon de livraison et facture : quelles différences ?",
          href: "/blog/devis-bon-commande-bon-livraison-facture",
        },
        { label: "Voir les tarifs et l’essai gratuit", href: "/pricing" },
      ],
    },
    {
      type: "heading",
      text: "En résumé",
    },
    {
      type: "paragraph",
      text: "Une facture correcte identifie précisément les deux parties, porte un numéro unique dans une série continue, décrit ce qui est vendu de façon compréhensible, présente des montants cohérents et indique comment elle doit être réglée. Le reste — taux applicables, régimes particuliers, droit de timbre — dépend de votre situation et se vérifie auprès des sources officielles ou de votre comptable.",
    },
    {
      type: "paragraph",
      text: "Le meilleur investissement n’est pas de mémoriser une liste, mais de mettre en place une organisation où ces informations sont saisies une fois et réutilisées ensuite. C’est ce qui fait la différence entre une facturation qui demande de l’attention à chaque document et une facturation qui devient une routine fiable.",
    },
  ],
};
