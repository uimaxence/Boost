// Conditions générales d'utilisation (et d'adhésion) du Club Boost.
// Page /cgu — rendue par LegalPage.svelte avec les blocs du blog (voir articles.js
// pour les types de blocs : p, h3, list, quote…).

import { EDITEUR, SITE, ADHESION, LEGAL_UPDATED, LEGAL_VERSION, mailto } from './editeur.js';

export const cgu = {
  path: '/cgu',
  shortTitle: 'CGU',
  title: "Conditions générales d'utilisation",
  description:
    "Les règles qui encadrent l'utilisation du site joinboost.fr, la candidature et l'adhésion au Club Boost.",
  updated: LEGAL_UPDATED,
  version: LEGAL_VERSION,
  sections: [
    {
      id: 'objet',
      title: 'Objet',
      blocks: [
        {
          type: 'p',
          html: `Les présentes Conditions Générales d'Utilisation (« CGU ») régissent l'accès et l'utilisation du site ${SITE.domaine} (le « Site ») ainsi que l'adhésion au ${SITE.club} et la participation à ses activités (ensemble, le « Service »), édités par <strong>${EDITEUR.societe}</strong> (« l'Éditeur », « Boost », « nous »).`,
        },
        {
          type: 'p',
          html: `Le ${SITE.club} est un réseau d'entrepreneurs, de freelances et de porteurs de projet. Il propose à ses membres un groupe d'échange privé, des rencontres régulières dans leur ville, des mises en relation et l'accès à un réseau inter-villes à l'échelle nationale.`,
        },
        {
          type: 'p',
          html: `Les présentes CGU constituent également les conditions générales de vente de l'adhésion payante décrite à l'article 8. L'Éditeur ne vend aucune donnée personnelle ; seules des statistiques strictement anonymes et agrégées peuvent être partagées dans le cadre de partenariats (article 12).`,
        },
      ],
    },
    {
      id: 'acceptation',
      title: 'Acceptation',
      blocks: [
        {
          type: 'p',
          html: `L'utilisation du Site et, a fortiori, la candidature puis l'adhésion au Club impliquent l'acceptation pleine et entière des présentes CGU. Cette acceptation vous est demandée expressément lors de la souscription de l'adhésion. Si vous n'acceptez pas les CGU, vous devez cesser d'utiliser le Service.`,
        },
      ],
    },
    {
      id: 'acces',
      title: 'Accès au service',
      blocks: [
        {
          type: 'p',
          html: `Le Site est librement accessible. L'adhésion au ${SITE.club} est réservée aux personnes physiques majeures ayant, au sens large, la qualité d'entrepreneur, de freelance ou de porteur de projet. Le Club se veut inclusif : aucun critère de chiffre d'affaires, de statut juridique ou d'ancienneté n'est exigé. L'admission est soumise au processus de candidature décrit à l'article 4 et au paiement de l'adhésion (article 8).`,
        },
        {
          type: 'p',
          html: `Les dispositions du Code de la consommation citées dans les présentes s'appliquent aux membres ayant la qualité de consommateur ou de non-professionnel. L'Éditeur fait néanmoins le choix d'en faire bénéficier l'ensemble de ses membres, quel que soit leur statut.`,
        },
      ],
    },
    {
      id: 'candidature',
      title: 'Candidature et admission',
      blocks: [
        {
          type: 'p',
          html: `L'entrée dans le Club se déroule en trois étapes :`,
        },
        {
          type: 'list',
          items: [
            `vous réservez un appel de découverte (environ 15 minutes) depuis le Site ou remplissez le formulaire de candidature ;`,
            `un échange avec l'équipe Boost permet de comprendre votre parcours, votre projet et vos attentes, et de vérifier que le Club y répond ;`,
            `si l'envie est réciproque, vous recevez une proposition d'adhésion. L'adhésion prend effet au paiement de la première mensualité ; vous êtes alors ajouté au groupe privé des membres.`,
          ],
        },
        {
          type: 'p',
          html: `L'Éditeur apprécie librement les candidatures, dans le respect de la loi et sans discrimination illicite ; un refus n'a pas à être motivé. Vous vous engagez à fournir des informations exactes et à les tenir à jour.`,
        },
      ],
    },
    {
      id: 'espace-membre',
      title: 'Accès membre et identifiants',
      blocks: [
        {
          type: 'p',
          html: `L'accès aux outils du Club (groupe privé, calendrier des rencontres et, à terme, application Boost) est strictement personnel. L'adhésion est nominative et ne peut être ni cédée ni partagée. Vous êtes responsable de la confidentialité de vos identifiants et de l'usage qui est fait de vos accès ; signalez sans délai toute utilisation non autorisée à ${mailto}.`,
        },
      ],
    },
    {
      id: 'outils',
      title: 'Groupe privé et outils tiers',
      blocks: [
        {
          type: 'p',
          html: `Les échanges entre membres se tiennent principalement dans un groupe privé hébergé sur <strong>WhatsApp</strong> (Meta Platforms Ireland Ltd) et la prise de rendez-vous s'effectue via <strong>Cal.com</strong>. Ces services sont édités par des tiers : leurs conditions d'utilisation et leurs politiques de confidentialité s'appliquent, et l'Éditeur ne saurait être tenu responsable de leur fonctionnement, de leur disponibilité ou de leurs évolutions.`,
        },
        {
          type: 'p',
          html: `En rejoignant le groupe privé, votre numéro de téléphone et votre nom de profil deviennent visibles des autres membres. Vous pouvez quitter le groupe à tout moment ; son accès est réservé aux membres à jour de leur adhésion. L'Éditeur peut faire évoluer les outils utilisés (par exemple vers l'application Boost) en informant les membres.`,
        },
      ],
    },
    {
      id: 'rencontres',
      title: 'Rencontres et événements',
      blocks: [
        {
          type: 'p',
          html: `Le Club organise des rencontres régulières (afterworks, ateliers, soirées, événements inter-villes). Le programme, les lieux et les dates sont communiqués aux membres via le groupe privé et peuvent être modifiés ou annulés, notamment en cas d'imprévu ou d'indisponibilité du lieu, sans que cela ouvre droit à indemnité.`,
        },
        {
          type: 'p',
          html: `Sauf mention contraire, la participation aux rencontres est incluse dans l'adhésion ; les consommations et frais personnels (transport, restauration, hébergement) restent à la charge de chacun. Certains événements exceptionnels peuvent être proposés avec une participation complémentaire, annoncée à l'avance.`,
        },
        {
          type: 'p',
          html: `Les participants respectent le règlement des lieux d'accueil et adoptent un comportement courtois et professionnel. Les rencontres réunissant des personnes physiques, chacun demeure responsable de ses actes et de ses biens ; l'Éditeur ne répond pas des dommages causés par un membre à un autre membre ou à un tiers.`,
        },
        {
          type: 'p',
          html: `Des photographies et vidéos peuvent être réalisées lors des rencontres à des fins de communication du Club (Site, blog, réseaux sociaux). Vous en êtes informé avant ou au début de l'événement et pouvez vous y opposer à tout moment, y compris après publication, en écrivant à ${mailto} (voir la <a href="/confidentialite#photos">Politique de confidentialité</a>).`,
        },
      ],
    },
    {
      id: 'adhesion',
      title: 'Adhésion au Club Boost',
      blocks: [
        { type: 'h3', text: '8.1 Description' },
        {
          type: 'p',
          html: `L'adhésion donne accès, pendant sa durée, à l'ensemble des avantages décrits sur le Site au jour de la souscription : groupe privé entre entrepreneurs, rencontres régulières dans votre ville, mises en relation et opportunités business, réseau inter-villes et accès prioritaire à la future application Boost. L'Éditeur peut faire évoluer le contenu des avantages ; en cas de modification substantielle à la baisse, le membre en est informé et peut résilier conformément à l'article 8.7.`,
        },
        { type: 'h3', text: '8.2 Prix' },
        {
          type: 'p',
          html: `Le prix en vigueur est affiché sur le Site avant toute souscription : à titre indicatif, <strong>${ADHESION.prix}</strong>, sans engagement de durée. Toute évolution du prix est notifiée dans les conditions de l'article 8.7.`,
        },
        { type: 'h3', text: '8.3 Souscription et paiement' },
        {
          type: 'p',
          html: `L'adhésion est souscrite à distance, après validation de la candidature, par paiement via notre prestataire de paiement ${EDITEUR.paiement}. Le contrat est conclu avec ${EDITEUR.societe}. Vous recevez une confirmation par e-mail récapitulant les caractéristiques de l'adhésion, son prix, sa date de renouvellement et les modalités de résiliation. L'Éditeur ne collecte ni ne conserve vos données de carte bancaire, qui sont traitées exclusivement par le prestataire de paiement.`,
        },
        { type: 'h3', text: '8.4 Durée et reconduction tacite' },
        {
          type: 'p',
          html: `L'adhésion est conclue pour une durée d'un mois à compter du premier paiement et se renouvelle tacitement par périodes d'un mois, au prix en vigueur au jour du renouvellement, sauf résiliation avant la fin de la période en cours dans les conditions de l'article 8.6. L'adhésion étant mensuelle et résiliable à tout moment, aucun engagement de durée n'est imposé. À toutes fins utiles, l'article L215-1 du Code de la consommation est reproduit ci-dessous :`,
        },
        {
          type: 'quote',
          text: `Pour les contrats de prestations de services conclus pour une durée déterminée avec une clause de reconduction tacite, le professionnel prestataire de services informe le consommateur par écrit, par lettre nominative ou courrier électronique dédiés, au plus tôt trois mois et au plus tard un mois avant le terme de la période autorisant le rejet de la reconduction, de la possibilité de ne pas reconduire le contrat qu'il a conclu avec une clause de reconduction tacite. Cette information, délivrée dans des termes clairs et compréhensibles, mentionne, dans un encadré apparent, la date limite de non-reconduction. Lorsque cette information ne lui a pas été adressée conformément aux dispositions du premier alinéa, le consommateur peut mettre gratuitement un terme au contrat, à tout moment à compter de la date de reconduction. Les avances effectuées après la dernière date de reconduction ou, s'agissant des contrats à durée indéterminée, après la date de transformation du contrat initial à durée déterminée, sont dans ce cas remboursées dans un délai de trente jours à compter de la date de résiliation, déduction faite des sommes correspondant, jusqu'à celle-ci, à l'exécution du contrat.`,
          author: 'Article L215-1 du Code de la consommation',
        },
        { type: 'h3', text: '8.5 Droit de rétractation' },
        {
          type: 'p',
          html: `Conformément aux articles L221-18 et suivants du Code de la consommation, vous disposez d'un délai de quatorze jours à compter de la souscription pour vous rétracter, sans motif ni pénalité, en nous adressant une déclaration dénuée d'ambiguïté (par exemple par e-mail à ${mailto}, ou au moyen du formulaire ci-dessous). L'adhésion prenant effet immédiatement, à votre demande expresse, avant l'expiration de ce délai, vous restez redevable, en cas de rétractation, d'un montant proportionnel au service fourni jusqu'à la communication de votre décision (article L221-25) ; le solde vous est remboursé dans les quatorze jours.`,
        },
        { type: 'h3', text: 'Modèle de formulaire de rétractation' },
        {
          type: 'list',
          items: [
            `À l'attention de ${EDITEUR.societe}, ${EDITEUR.siege} — ${EDITEUR.email} ;`,
            `« Je vous notifie par la présente ma rétractation du contrat portant sur l'adhésion au ${SITE.club} souscrite le [date]. » ;`,
            `nom, adresse, date et signature (uniquement en cas de notification sur papier).`,
          ],
        },
        { type: 'h3', text: '8.6 Résiliation' },
        {
          type: 'p',
          html: `Vous pouvez résilier à tout moment, sans frais ni motif, par voie électronique conformément à l'article L215-1-1 du Code de la consommation : depuis ${EDITEUR.gestionAbonnement} ou par simple e-mail à ${mailto}. Nous accusons réception de votre demande et vous confirmons la date de fin d'adhésion.`,
        },
        {
          type: 'p',
          html: `La résiliation prend effet au terme de la période mensuelle en cours, qui reste due ; l'accès aux avantages du Club est maintenu jusqu'à cette date, puis vous êtes retiré du groupe privé. Les sommes versées au titre de la période en cours ne sont pas remboursées au prorata, sans préjudice des articles 8.4 et 8.5, de l'article 14 (garantie légale) et de toute disposition impérative contraire. Vous pourrez candidater à nouveau ultérieurement.`,
        },
        { type: 'h3', text: '8.7 Modification du prix ou des avantages' },
        {
          type: 'p',
          html: `En cas de hausse de prix ou de modification substantielle des avantages, le membre en est informé par e-mail au moins trente jours avant l'application au prochain renouvellement et peut résilier avant cette date dans les conditions de l'article 8.6. La poursuite de l'adhésion après l'entrée en vigueur vaut acceptation.`,
        },
        { type: 'h3', text: '8.8 Parrainage' },
        {
          type: 'p',
          html: `Lorsqu'une personne que vous avez parrainée est admise au Club et règle sa première mensualité, vous bénéficiez de <strong>${ADHESION.parrainage} d'adhésion offertes</strong>, selon les modalités précisées par l'Éditeur au moment du parrainage. Cet avantage n'est ni cessible, ni convertible en espèces, ni cumulable avec une autre offre sauf mention contraire. L'Éditeur peut modifier ou suspendre le programme pour l'avenir et annuler les avantages obtenus frauduleusement (auto-parrainage, personnes fictives, etc.).`,
        },
        { type: 'h3', text: '8.9 Défaut de paiement' },
        {
          type: 'p',
          html: `En cas d'échec du paiement lors d'un renouvellement, vous en êtes informé et disposez de sept jours pour régulariser. À défaut, l'adhésion est suspendue, puis résiliée, et l'accès au groupe privé est retiré.`,
        },
      ],
    },
    {
      id: 'conduite',
      title: 'Règles de conduite',
      blocks: [
        {
          type: 'p',
          html: `Le Club repose sur la confiance et la bienveillance entre membres. Sont notamment interdits :`,
        },
        {
          type: 'list',
          items: [
            `le harcèlement, les propos injurieux, haineux, discriminatoires ou diffamatoires, en ligne comme lors des rencontres ;`,
            `la divulgation, hors du Club, des échanges du groupe privé et des informations confidentielles partagées par d'autres membres (projets, chiffres, contacts) sans leur accord ;`,
            `le démarchage abusif, la prospection non sollicitée et la diffusion massive de messages promotionnels au sein du groupe ;`,
            `la collecte, l'extraction ou la réutilisation des coordonnées des membres à d'autres fins que les échanges au sein du Club ;`,
            `la publication de contenus illégaux ou portant atteinte aux droits de tiers ;`,
            `les usages frauduleux, notamment du programme de parrainage, et les tentatives d'accès non autorisé aux outils du Club ;`,
            `l'utilisation du Club pour des activités illicites ou contraires à l'éthique professionnelle (ventes pyramidales, escroqueries, etc.).`,
          ],
        },
      ],
    },
    {
      id: 'contenus',
      title: 'Contenus partagés',
      blocks: [
        {
          type: 'p',
          html: `Vous restez propriétaire des contenus que vous partagez (messages, photos, documents, témoignages). En les publiant dans les espaces du Club, vous accordez à l'Éditeur une licence non exclusive, mondiale et gratuite, pour la durée de la protection des droits, aux seules fins de fonctionnement et d'animation du Service (hébergement, affichage aux membres, modération). Toute réutilisation à des fins de communication (témoignage sur le Site, réseaux sociaux) fait l'objet de votre accord préalable.`,
        },
        {
          type: 'p',
          html: `Vous garantissez détenir les droits sur les contenus que vous publiez. L'Éditeur peut retirer tout contenu contraire aux présentes CGU.`,
        },
      ],
    },
    {
      id: 'mises-en-relation',
      title: 'Mises en relation et opportunités',
      blocks: [
        {
          type: 'p',
          html: `Le Club a pour vocation de favoriser les rencontres et les mises en relation entre membres. L'Éditeur n'est pas partie aux relations, collaborations ou contrats qui peuvent naître entre membres, ou entre membres et tiers, et ne garantit aucun résultat commercial, financier ou professionnel. Chaque membre reste seul responsable de ses engagements, de la vérification de ses interlocuteurs et du respect de ses propres obligations professionnelles et légales.`,
        },
      ],
    },
    {
      id: 'partage-donnees',
      title: 'Partage de données et partenaires',
      blocks: [
        {
          type: 'p',
          html: `L'Éditeur ne vend, ne loue et n'échange aucune donnée personnelle, et ne transmet aucune donnée identifiée ou identifiable à des tiers à des fins commerciales. Seules des statistiques strictement anonymes et agrégées (nombre de membres, villes, secteurs d'activité) peuvent être partagées, notamment avec les lieux et partenaires qui accueillent les rencontres.`,
        },
        {
          type: 'p',
          html: `Les données sont par ailleurs traitées par des sous-traitants techniques agissant pour le compte de l'Éditeur (hébergement du Site, prise de rendez-vous, paiement, e-mail), dans les conditions détaillées dans la <a href="/confidentialite">Politique de confidentialité</a>.`,
        },
      ],
    },
    {
      id: 'responsabilite',
      title: 'Responsabilité',
      blocks: [
        {
          type: 'p',
          html: `L'Éditeur met en œuvre des moyens raisonnables pour assurer le fonctionnement du Service et l'animation du Club, mais ne garantit ni la disponibilité permanente du Site et des outils tiers, ni l'exactitude des contenus publiés par les membres, ni un nombre minimal de rencontres ou de membres dans une ville donnée. Sa responsabilité ne saurait être engagée en cas de force majeure ou de fait d'un tiers.`,
        },
        {
          type: 'p',
          html: `Le membre reste responsable de l'usage qu'il fait du Service et des contenus qu'il publie. Aucune stipulation des présentes n'exclut ou ne limite la responsabilité de l'Éditeur en cas de faute lourde ou dolosive, ni ne prive le consommateur des droits qu'il tient de dispositions d'ordre public.`,
        },
      ],
    },
    {
      id: 'garantie',
      title: 'Garantie légale de conformité',
      blocks: [
        {
          type: 'p',
          html: `L'Éditeur est tenu de fournir un Service conforme au contrat. Pour les composantes numériques du Service (groupe privé, outils en ligne, application Boost), vous bénéficiez de la garantie légale de conformité des contenus et services numériques prévue aux articles L224-25-12 et suivants du Code de la consommation. En cas de défaut, vous pouvez obtenir la mise en conformité du Service et, à défaut, une réduction du prix ou la résolution du contrat, dans les conditions prévues par la loi. Ces droits s'exercent sans frais auprès de ${mailto}.`,
        },
      ],
    },
    {
      id: 'exclusion',
      title: 'Suspension et exclusion',
      blocks: [
        {
          type: 'p',
          html: `L'Éditeur se réserve le droit de suspendre ou de résilier l'adhésion d'un membre en cas de manquement aux présentes CGU ou aux lois applicables, après l'avoir invité à présenter ses observations, sauf urgence ou gravité particulière. L'exclusion entraîne le retrait du groupe privé et des outils du Club ; les sommes correspondant à la période en cours restent dues. Le membre peut contester la mesure à ${mailto}.`,
        },
      ],
    },
    {
      id: 'modifications',
      title: 'Modifications des CGU',
      blocks: [
        {
          type: 'p',
          html: `Les présentes CGU peuvent être modifiées. Les membres sont informés des changements importants par e-mail ou via le groupe privé au moins quinze jours avant leur entrée en vigueur ; la poursuite de l'utilisation du Service après cette date vaut acceptation. Les modifications affectant le prix ou les avantages de l'adhésion suivent le régime de l'article 8.7. La version en vigueur est toujours consultable à l'adresse ${SITE.domaine}/cgu.`,
        },
      ],
    },
    {
      id: 'propriete-intellectuelle',
      title: 'Propriété intellectuelle',
      blocks: [
        {
          type: 'p',
          html: `Tous les éléments du Service (nom et marque Boost, logo, Site, designs, textes, photographies, vidéos, bases de données) sont protégés par des droits de propriété intellectuelle dont l'Éditeur est titulaire ou licencié. Toute reproduction, représentation ou extraction non autorisée est interdite. Les membres peuvent mentionner leur appartenance au ${SITE.club} dans leur communication professionnelle, sans laisser entendre un partenariat ou une approbation de l'Éditeur.`,
        },
      ],
    },
    {
      id: 'litiges',
      title: 'Droit applicable, médiation et litiges',
      blocks: [
        {
          type: 'p',
          html: `Les présentes CGU sont régies par le droit français. En cas de difficulté, nous vous invitons à adresser d'abord une réclamation écrite à ${mailto} ; nous nous efforçons d'y répondre sous quinze jours ouvrés.`,
        },
        {
          type: 'p',
          html: `Conformément aux articles L612-1 et suivants du Code de la consommation, en cas de litige non résolu, le consommateur peut recourir gratuitement au médiateur de la consommation dont relève l'Éditeur : ${EDITEUR.mediateur}.`,
        },
        {
          type: 'p',
          html: `À défaut de résolution amiable, le litige pourra être porté devant les juridictions françaises compétentes ; conformément à l'article R631-3 du Code de la consommation, le consommateur peut saisir, à son choix, l'une des juridictions territorialement compétentes en vertu du Code de procédure civile ou la juridiction du lieu où il demeurait au moment de la conclusion du contrat ou de la survenance du fait dommageable.`,
        },
      ],
    },
    {
      id: 'mentions-legales',
      title: 'Mentions légales',
      blocks: [
        {
          type: 'list',
          items: [
            `Éditeur : ${EDITEUR.societe}, ${EDITEUR.forme} au capital de ${EDITEUR.capital}, immatriculée au RCS sous le n° ${EDITEUR.rcs}`,
            `Siège social : ${EDITEUR.siege}`,
            `TVA intracommunautaire : ${EDITEUR.tva}`,
            `Directeur de la publication : ${EDITEUR.directeur}`,
            `Contact : ${mailto}`,
          ],
        },
        {
          type: 'p',
          html: `Les informations relatives à l'hébergement du Site et aux prestataires techniques figurent dans les <a href="/mentions-legales">Mentions légales</a>.`,
        },
      ],
    },
  ],
};
