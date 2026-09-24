// Politique de confidentialité du Club Boost.
// Page /confidentialite — rendue par LegalPage.svelte.

import { EDITEUR, HEBERGEUR, SITE, LEGAL_UPDATED, LEGAL_VERSION, mailto } from './editeur.js';

export const confidentialite = {
  path: '/confidentialite',
  shortTitle: 'Confidentialité',
  title: 'Politique de confidentialité',
  description:
    'Quelles données personnelles sont traitées par Boost, pourquoi, combien de temps, et quels sont vos droits.',
  updated: LEGAL_UPDATED,
  version: LEGAL_VERSION,
  sections: [
    {
      id: 'responsable',
      title: 'Introduction et responsable de traitement',
      blocks: [
        {
          type: 'p',
          html: `La présente politique explique quelles données personnelles sont traitées dans le cadre du site ${SITE.domaine} et de l'adhésion au ${SITE.club}, pourquoi, combien de temps, et quels sont vos droits. Elle complète les <a href="/cgu">Conditions générales d'utilisation</a>.`,
        },
        {
          type: 'p',
          html: `Le responsable de traitement est <strong>${EDITEUR.societe}</strong>, ${EDITEUR.forme} au capital de ${EDITEUR.capital}, RCS ${EDITEUR.rcs}, ${EDITEUR.siege} — ${mailto}.`,
        },
      ],
    },
    {
      id: 'donnees',
      title: 'Données collectées',
      blocks: [
        { type: 'h3', text: '2.1 Fournies par vous' },
        {
          type: 'list',
          items: [
            `Identité et coordonnées : nom, prénom, adresse e-mail, numéro de téléphone (nécessaire au groupe privé WhatsApp), ville`,
            `Informations professionnelles : activité, entreprise ou projet, statut, liens vers vos profils professionnels (facultatif)`,
            `Contenu de votre candidature : motivations, attentes et éléments échangés lors de l'appel de découverte`,
            `Données d'adhésion : date de souscription, statut, historique des règlements (les données de carte bancaire ne transitent jamais par Boost, voir l'article 8)`,
            `Contenus partagés au sein du Club : messages, photos, documents, témoignages`,
          ],
        },
        { type: 'h3', text: '2.2 Collectées automatiquement' },
        {
          type: 'list',
          items: [
            `Journaux techniques du Site (adresse IP, type de navigateur, pages consultées, horodatage), générés par notre hébergeur pour la sécurité et le bon fonctionnement du service`,
            `Données de réservation de l'appel de découverte (créneau choisi, fuseau horaire), traitées par Cal.com`,
            `Le Site n'utilise aucun outil de mesure d'audience ni de traceur publicitaire (voir l'article 13)`,
          ],
        },
      ],
    },
    {
      id: 'candidature',
      title: "Candidature et appel de découverte",
      blocks: [
        {
          type: 'p',
          html: `La prise de rendez-vous pour l'appel de découverte s'effectue via le module Cal.com intégré au Site. Les informations que vous y renseignez (nom, e-mail, éventuelles notes) sont transmises à l'équipe Boost pour préparer l'échange. Les éléments recueillis pendant l'appel (projet, motivations, attentes) servent uniquement à évaluer votre candidature et, en cas d'admission, à personnaliser votre accueil dans le Club.`,
        },
        {
          type: 'p',
          html: `Si votre candidature n'aboutit pas, ces données sont conservées au maximum deux ans après le dernier contact, sauf demande de suppression anticipée de votre part.`,
        },
      ],
    },
    {
      id: 'groupe',
      title: 'Groupe privé WhatsApp',
      blocks: [
        {
          type: 'p',
          html: `Les échanges entre membres se tiennent dans un groupe privé hébergé sur WhatsApp, service édité par Meta Platforms Ireland Ltd. En rejoignant ce groupe, votre numéro de téléphone, votre nom de profil et les messages que vous y publiez sont visibles des autres membres. WhatsApp traite vos données selon sa propre <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener">politique de confidentialité</a>, en qualité de responsable de traitement distinct.`,
        },
        {
          type: 'p',
          html: `L'ajout au groupe fait partie du service auquel vous adhérez. Vous pouvez néanmoins le quitter à tout moment depuis WhatsApp ou demander à ne pas y être ajouté en écrivant à ${mailto} ; l'équipe Boost administre le groupe et en retire les personnes dont l'adhésion a pris fin.`,
        },
      ],
    },
    {
      id: 'photos',
      title: 'Photos et vidéos lors des rencontres',
      blocks: [
        {
          type: 'p',
          html: `Des photographies et vidéos peuvent être réalisées lors des rencontres du Club à des fins de communication (Site, blog, réseaux sociaux de Boost). Vous en êtes informé avant ou au début de l'événement ; toute publication d'un visuel sur lequel vous êtes reconnaissable repose sur votre consentement, que vous pouvez retirer à tout moment, y compris après publication, en écrivant à ${mailto}. Le visuel est alors retiré ou anonymisé dans les meilleurs délais.`,
        },
        {
          type: 'p',
          html: `Les témoignages de membres affichés sur le Site (prénom, photo, activité, citation) sont publiés avec leur accord préalable.`,
        },
      ],
    },
    {
      id: 'finalites',
      title: 'Finalités et bases légales',
      blocks: [
        {
          type: 'list',
          items: [
            `Traitement de votre candidature et organisation de l'appel de découverte — mesures précontractuelles prises à votre demande (art. 6.1.b RGPD)`,
            `Gestion de l'adhésion : accès au groupe privé, invitations aux rencontres, facturation et suivi des règlements — exécution du contrat (art. 6.1.b)`,
            `Animation du Club et communication interne (annonces d'événements, actualités du réseau) — exécution du contrat et intérêt légitime (art. 6.1.f)`,
            `Publication de photos, vidéos et témoignages — consentement (art. 6.1.a), révocable à tout moment`,
            `Envoi d'informations sur Boost aux personnes non membres (candidats, contacts) — consentement, révocable via le lien de désinscription ou sur simple demande`,
            `Sécurité du Site, prévention de la fraude (notamment au parrainage) et modération — intérêt légitime (art. 6.1.f)`,
            `Amélioration du Service et statistiques internes anonymisées — intérêt légitime`,
            `Conservation de certaines données après la fin de l'adhésion (comptabilité, gestion des litiges) — obligations légales (art. 6.1.c)`,
          ],
        },
      ],
    },
    {
      id: 'partage',
      title: 'Partage des données — nos engagements',
      blocks: [
        {
          type: 'p',
          html: `Boost ne vend, ne loue et n'échange aucune donnée personnelle. Aucune donnée identifiée ou identifiable (nom, e-mail, téléphone, activité, ou toute combinaison permettant une ré-identification) n'est transmise à des tiers à des fins commerciales, et aucun profilage commercial n'est réalisé pour le compte de tiers. Seules des statistiques strictement anonymes et agrégées (nombre de membres, villes, secteurs) peuvent être partagées, notamment avec les lieux et partenaires qui accueillent les rencontres.`,
        },
        {
          type: 'p',
          html: `Vos données sont en revanche traitées par des sous-traitants techniques, strictement pour notre compte et sur nos instructions :`,
        },
        {
          type: 'list',
          items: [
            `hébergement du Site : ${HEBERGEUR.nom} (${HEBERGEUR.adresse})`,
            `prise de rendez-vous pour l'appel de découverte : Cal.com, Inc. (États-Unis)`,
            `encaissement de l'adhésion : ${EDITEUR.paiement} (voir l'article 8)`,
            `envoi d'e-mails et outils internes de gestion des membres (messagerie, tableur ou CRM)`,
          ],
        },
        {
          type: 'p',
          html: `WhatsApp (Meta) n'agit pas comme sous-traitant mais comme responsable de traitement distinct pour le fonctionnement de la messagerie (article 4). Certains de ces prestataires sont établis aux États-Unis : les transferts sont encadrés par le Data Privacy Framework UE–États-Unis et/ou les clauses contractuelles types de la Commission européenne.`,
        },
      ],
    },
    {
      id: 'paiement',
      title: 'Adhésion et données de paiement',
      blocks: [
        {
          type: 'p',
          html: `Boost ne collecte ni ne conserve jamais votre numéro de carte ni vos coordonnées bancaires. Les paiements sont traités par ${EDITEUR.paiement}, selon sa propre politique de confidentialité. Boost ne reçoit que la confirmation qu'un paiement a eu lieu, ainsi que le statut de l'adhésion et ses dates.`,
        },
        {
          type: 'p',
          html: `Ce traitement repose sur l'exécution du contrat (art. 6.1.b RGPD) et, pour la conservation, sur nos obligations légales (art. 6.1.c). Les données de statut d'adhésion (active ou non, dates, montants réglés) sont conservées pendant la durée de l'adhésion puis jusqu'à cinq ans après sa fin, durée de prescription des actions commerciales ; les pièces comptables sont conservées dix ans conformément au Code de commerce.`,
        },
      ],
    },
    {
      id: 'conservation',
      title: 'Durées de conservation',
      blocks: [
        {
          type: 'list',
          items: [
            `Candidatures non retenues ou sans suite : 2 ans après le dernier contact`,
            `Données d'adhésion et de contact des membres : pendant toute la durée de l'adhésion, puis jusqu'à 5 ans après sa fin (prescription commerciale)`,
            `Pièces comptables (factures, justificatifs de paiement) : 10 ans`,
            `Photos, vidéos et témoignages publiés : tant qu'ils sont en ligne, et jusqu'au retrait de votre consentement`,
            `Messages du groupe privé : conservés par WhatsApp sur les appareils des membres ; Boost n'en tient pas d'archive centralisée`,
            `Journaux techniques du Site : durées limitées fixées par l'hébergeur, avec purge automatique`,
          ],
        },
      ],
    },
    {
      id: 'securite',
      title: 'Sécurité',
      blocks: [
        {
          type: 'p',
          html: `Les données sont protégées par des mesures techniques et organisationnelles appropriées : chiffrement des échanges (TLS), accès aux outils internes protégés par authentification et limités aux personnes qui animent le Club, prestataires sélectionnés pour leurs garanties de sécurité, et absence de stockage des données bancaires par Boost.`,
        },
      ],
    },
    {
      id: 'droits',
      title: 'Vos droits',
      blocks: [
        {
          type: 'p',
          html: `Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits d'accès, de rectification, d'effacement, d'opposition, de limitation du traitement, de retrait du consentement et de portabilité, ainsi que du droit de définir des directives relatives au sort de vos données après votre décès. Pour les exercer, écrivez à ${mailto} en précisant votre demande ; une réponse vous est apportée dans un délai d'un mois. Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>).`,
        },
      ],
    },
    {
      id: 'mineurs',
      title: 'Mineurs',
      blocks: [
        {
          type: 'p',
          html: `L'adhésion au ${SITE.club} est réservée aux personnes majeures. Boost ne collecte pas sciemment de données concernant des mineurs ; si tel était le cas, elles seraient supprimées sur simple demande.`,
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      blocks: [
        {
          type: 'p',
          html: `Le Site ne dépose aucun cookie de mesure d'audience ni de traceur publicitaire. Seuls des cookies et stockages strictement nécessaires au fonctionnement du module de prise de rendez-vous Cal.com, intégré sur la page d'accueil, peuvent être déposés lors de son utilisation ; ils ne servent pas à vous suivre sur d'autres sites. Aucun consentement n'est donc requis, conformément à l'article 82 de la loi Informatique et Libertés.`,
        },
      ],
    },
    {
      id: 'contact',
      title: 'Modifications et contact',
      blocks: [
        {
          type: 'p',
          html: `Cette politique peut évoluer ; les changements importants sont signalés aux membres par e-mail ou via le groupe privé. Pour toute question relative à vos données : ${mailto}.`,
        },
      ],
    },
  ],
};
