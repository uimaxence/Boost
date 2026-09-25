import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { prerender } from './scripts/prerender.js';

// `hydratable` : au build, chaque page est pré-rendue en HTML complet
// (scripts/prerender.js) et le bundle client « hydrate » ce HTML (src/main.js)
// au lieu de le reconstruire de zéro. Les mêmes options sont passées au build
// SSR du plugin pour que les deux rendus concordent.
const svelteOptions = { compilerOptions: { hydratable: true } };

export default defineConfig({
  plugins: [svelte(svelteOptions), prerender({ svelteOptions })],
});
