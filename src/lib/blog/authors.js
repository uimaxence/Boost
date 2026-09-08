// Avatars des auteurs (côté Svelte uniquement : imports d'assets Vite).
// Les noms / rôles sont dans articles.js pour rester utilisables côté Node.
import matteo from '../../../assets/matteo.webp?url';
import { authors as authorData } from './articles.js';

const avatars = {
  matteo,
};

export const authors = Object.fromEntries(
  Object.entries(authorData).map(([key, a]) => [key, { ...a, avatar: avatars[key] || null }])
);
