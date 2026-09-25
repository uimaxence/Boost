import App from './App.svelte';
import './app.css';

// `hydrate` : en production, #app contient déjà le HTML de la page rendu au
// build (scripts/prerender.js) ; Svelte le réutilise au lieu de le reconstruire.
// En dev (vite), #app est vide et le composant est simplement monté.
const app = new App({
  target: document.getElementById('app'),
  hydrate: true,
});

export default app;
