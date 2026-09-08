import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { blogPrerender } from './scripts/blog-prerender.js';

export default defineConfig({
  plugins: [svelte(), blogPrerender()],
});
