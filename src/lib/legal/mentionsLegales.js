// Mentions légales du site joinboost.fr (art. 6 de la loi pour la confiance dans
// l'économie numérique). Page /mentions-legales — rendue par LegalPage.svelte.

import { EDITEUR, HEBERGEUR, SITE, LEGAL_UPDATED, LEGAL_VERSION, mailto } from './editeur.js';

export const mentionsLegales = {
  path: '/mentions-legales',
  shortTitle: 'Mentions légales',
  title: 'Mentions légales',
  description: "Identité de l'éditeur du site joinboost.fr, hébergement et propriété intellectuelle.",
  updated: LEGAL_UPDATED,
  version: LEGAL_VERSION,
  sections: [
    {
      id: 'editeur',
      title: 'Éditeur du site',
      blocks: [
        {
          type: 'p',
          html: `Le site ${SITE.domaine} (le « Site ») et le ${SITE.club} sont édités par :`,
        },
        {
          type: 'list',
          items: [
            `Dénomination : <strong>${EDITEUR.societe}</strong>`,
            `Forme juridique : ${EDITEUR.forme} au capital de ${EDITEUR.capital}`,
            `Immatriculation : RCS ${EDITEUR.rcs}`,
            `Siège social : ${EDITEUR.siege}`,
            `TVA intracommunautaire : ${EDITEUR.tva}`,
            `Contact : ${mailto}`,
          ],
        },
      ],
    },
    {
      id: 'publication',
      title: 'Directeur de la publication',
      blocks: [
        {
          type: 'p',
          html: `Le directeur de la publication est ${EDITEUR.directeur}. Il peut être contacté à l'adresse ${mailto}.`,
        },
      ],
    },
    {
      id: 'hebergement',
      title: 'Hébergement',
      blocks: [
        {
          type: 'p',
          html: `Le Site est hébergé par <strong>${HEBERGEUR.nom}</strong>, ${HEBERGEUR.adresse} — <a href="${HEBERGEUR.site}" target="_blank" rel="noopener">${HEBERGEUR.site.replace('https://', '')}</a>.`,
        },
        {
          type: 'p',
          html: `Les données des membres sont traitées par les prestataires listés dans la <a href="/confidentialite#partage">Politique de confidentialité</a>.`,
        },
      ],
    },
    {
      id: 'conception',
      title: 'Conception et réalisation',
      blocks: [
        {
          type: 'p',
          html: `Le Site a été conçu et développé par <a href="${SITE.concepteur.site}" target="_blank" rel="noopener"><strong>${SITE.concepteur.nom}</strong></a>. Voir aussi la page <a href="/credits">Crédits</a>.`,
        },
      ],
    },
    {
      id: 'propriete-intellectuelle',
      title: 'Propriété intellectuelle',
      blocks: [
        {
          type: 'p',
          html: `L'ensemble des éléments du Site (nom et marque Boost, logo, textes, photographies, vidéos, illustrations, interfaces et bases de données) est protégé par le droit d'auteur, le droit des marques et le droit des bases de données. Ces éléments sont la propriété de l'Éditeur ou font l'objet d'une licence à son profit. Toute reproduction, représentation, adaptation ou extraction, même partielle, sans autorisation écrite préalable est interdite et peut constituer une contrefaçon.`,
        },
        {
          type: 'p',
          html: `Les photographies de membres et de rencontres publiées sur le Site le sont avec l'accord des personnes concernées ; toute demande de retrait peut être adressée à ${mailto}.`,
        },
      ],
    },
    {
      id: 'donnees-personnelles',
      title: 'Données personnelles et cookies',
      blocks: [
        {
          type: 'p',
          html: `Les traitements de données personnelles réalisés dans le cadre du Site et de l'adhésion au Club (candidature, gestion de l'adhésion, groupe privé, photos d'événements) sont décrits dans la <a href="/confidentialite">Politique de confidentialité</a>. Conformément au RGPD, vous disposez notamment d'un droit d'accès, de rectification, d'effacement et d'opposition, que vous pouvez exercer à ${mailto}.`,
        },
        {
          type: 'p',
          html: `Le Site ne dépose aucun cookie de mesure d'audience ni de traceur publicitaire (voir l'<a href="/confidentialite#cookies">article dédié</a>).`,
        },
      ],
    },
    {
      id: 'conditions',
      title: "Conditions d'utilisation et litiges",
      blocks: [
        {
          type: 'p',
          html: `L'utilisation du Site et l'adhésion au Club sont régies par les <a href="/cgu">Conditions générales d'utilisation</a>, soumises au droit français. En cas de litige, une solution amiable est recherchée en priorité ; le consommateur peut recourir gratuitement au médiateur de la consommation dont relève l'Éditeur : ${EDITEUR.mediateur}.`,
        },
      ],
    },
  ],
};
