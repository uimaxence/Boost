// Point d'entrée du rendu côté serveur, utilisé uniquement au build par
// scripts/prerender.js pour générer le HTML statique de chaque page.
import App from './App.svelte';

/** Rend la page correspondant au chemin (ex. '/', '/blog', '/cgu'). */
export function render(path) {
  return App.render({ path });
}
