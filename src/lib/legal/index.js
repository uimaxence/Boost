// Registre des pages légales : /cgu, /confidentialite, /mentions-legales.
// Module « pur » (aucun import Svelte / Vite), aussi chargé côté Node par
// scripts/prerender.js pour générer les balises <title> / <meta>.

import { cgu } from './cgu.js';
import { confidentialite } from './confidentialite.js';
import { mentionsLegales } from './mentionsLegales.js';

export const legalPages = [cgu, confidentialite, mentionsLegales];

export function getLegalPage(path) {
  return legalPages.find((p) => p.path === path) || null;
}
