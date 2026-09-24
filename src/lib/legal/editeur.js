// Informations légales de l'éditeur, partagées par les CGU, la politique de
// confidentialité et les mentions légales.
//
// Module « pur » (aucun import Svelte / Vite) : il est aussi chargé côté Node
// par scripts/blog-prerender.js.
//
// ⚠️  Les valeurs entre crochets sont des PLACEHOLDERS à remplacer dès que les
// informations de la société éditrice de Boost seront connues. Elles sont
// affichées telles quelles sur le site tant qu'elles ne sont pas renseignées.

export const EDITEUR = {
  /** Dénomination sociale, ex. « Boost SAS » */
  societe: '[Nom de la société]',
  /** Forme juridique et capital, ex. « société par actions simplifiée au capital de 1 000 € » */
  forme: '[forme juridique]',
  capital: '[montant du capital]',
  /** Ville du greffe et numéro, ex. « Angers 123 456 789 » */
  rcs: '[numéro RCS]',
  siege: '[adresse du siège social]',
  tva: '[numéro de TVA intracommunautaire]',
  directeur: '[nom du directeur de la publication]',
  email: 'contact@joinboost.fr',
  /** Prestataire qui encaisse l'adhésion, ex. « Stripe » */
  paiement: '[prestataire de paiement]',
  /** Espace en ligne permettant de résilier (portail du prestataire de paiement, lien dans les e-mails…) */
  gestionAbonnement: '[espace de gestion de l’abonnement]',
  /** Obligatoire pour un professionnel vendant à des consommateurs (art. L612-1 C. conso.) */
  mediateur: '[nom et coordonnées du médiateur de la consommation]',
};

export const HEBERGEUR = {
  nom: 'Vercel Inc.',
  adresse: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
  site: 'https://vercel.com',
};

export const SITE = {
  nom: 'Boost',
  club: 'Club Boost',
  domaine: 'joinboost.fr',
  concepteur: { nom: 'Maxence Cailleau', site: 'https://maxence-cailleau.fr' },
};

export const ADHESION = {
  prix: '24,99 € TTC par mois',
  parrainage: '4 semaines',
};

/** Date de dernière mise à jour des trois documents (AAAA-MM-JJ). */
export const LEGAL_UPDATED = '2026-09-24';
export const LEGAL_VERSION = '1.0';

/** Lien mailto prêt à l'emploi. */
export const mailto = `<a href="mailto:${EDITEUR.email}">${EDITEUR.email}</a>`;
