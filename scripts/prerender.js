// Plugin Vite : à la fin du build, pré-rend chaque page du site en HTML complet
// et génère le sitemap.
//
//   dist/index.html                     page d'accueil
//   dist/blog/index.html                index du blog
//   dist/blog/<slug>/index.html         un fichier par article
//   dist/cgu/index.html, dist/confidentialite/index.html, dist/mentions-legales/index.html
//   dist/credits/index.html
//   dist/sitemap.xml
//
// Pourquoi : sans ce plugin, le HTML servi ne contient qu'un <div id="app"> vide
// rempli par JavaScript. Google exécute le JS (avec un délai d'indexation), mais
// pas les robots des réseaux sociaux (LinkedIn, WhatsApp, X…) ni la plupart des
// crawlers IA (GPTBot, ClaudeBot, PerplexityBot…). Chaque page générée contient :
//   1. ses balises <title>, description, canonical, Open Graph, Twitter et JSON-LD ;
//   2. le HTML complet rendu par Svelte côté serveur (src/entry-server.js), que
//      le bundle client « hydrate » ensuite (src/main.js, option hydrate: true).
// Vercel sert ces fichiers statiques avant d'appliquer la réécriture SPA de vercel.json.
//
// Comment : dans le hook closeBundle du build client, on lance un second build
// Vite en mode SSR de src/entry-server.js dans un dossier temporaire, on
// l'importe, puis on appelle render(path) pour chaque route. Les URLs d'assets
// (logo, photos…) sont identiques dans les deux builds (hash de contenu).
//
// Règle pour les composants : aucun accès à window/document en dehors de
// onMount (ou de la fonction de nettoyage retournée par onMount) ; onDestroy
// s'exécute aussi côté serveur.

import { existsSync, readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import {
  articles,
  authors,
  SITE_URL,
  SITE_NAME,
  BLOG_PATH,
  BLOG_TITLE,
  BLOG_DESCRIPTION,
  articleUrl,
  articleShareImage,
} from '../src/lib/blog/articles.js';
import { legalPages } from '../src/lib/legal/index.js';

const SSR_ENTRY = 'src/entry-server.js';
const CONTACT_EMAIL = 'contact@joinboost.fr';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const unesc = (s) =>
  String(s).replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const jsonLdTag = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// ---------------------------------------------------------------------------
// Métadonnées par page
// ---------------------------------------------------------------------------

function homeMeta(template) {
  // Titre et description de l'accueil : ceux d'index.html (source unique).
  const titleMatch = template.match(/<title>([\s\S]*?)<\/title>/);
  const descMatch = template.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  if (!titleMatch || !descMatch) {
    throw new Error('[prerender] <title> ou <meta name="description"> introuvable dans index.html');
  }
  const title = unesc(titleMatch[1]);
  const description = unesc(descMatch[1]);
  const url = `${SITE_URL}/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: 'Club Boost',
        url,
        logo: `${SITE_URL}/favicon.png`,
        email: CONTACT_EMAIL,
        description,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url,
        name: SITE_NAME,
        inLanguage: 'fr-FR',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };

  return {
    title,
    description,
    url,
    image: `${SITE_URL}/og-image.jpg`,
    type: 'website',
    keepImageSize: true,
    extraTags: [jsonLdTag(jsonLd)],
  };
}

function articleMeta(article) {
  const author = authors[article.author];
  const url = articleUrl(article);
  const image = articleShareImage(article);
  const title = `${article.title} — ${SITE_NAME}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [image],
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: author ? { '@type': 'Person', name: author.name } : undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` },
    },
    mainEntityOfPage: url,
  };

  return {
    title,
    description: article.excerpt,
    url,
    image,
    type: 'article',
    // Les dimensions déclarées dans index.html correspondent à og-image.jpg ;
    // on ne les garde que pour le visuel généré (1200x630).
    keepImageSize: Boolean(article.ogImage),
    extraTags: [
      `<meta property="article:published_time" content="${esc(article.date)}" />`,
      article.updated ? `<meta property="article:modified_time" content="${esc(article.updated)}" />` : null,
      author ? `<meta property="article:author" content="${esc(author.name)}" />` : null,
      `<meta property="article:section" content="${esc(article.category)}" />`,
      jsonLdTag(jsonLd),
    ].filter(Boolean),
  };
}

function indexMeta() {
  return {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}${BLOG_PATH}`,
    image: `${SITE_URL}/og-image.jpg`,
    type: 'website',
    keepImageSize: true,
    extraTags: [],
  };
}

function legalMeta(page) {
  return {
    title: `${page.title} — ${SITE_NAME}`,
    description: page.description,
    url: `${SITE_URL}${page.path}`,
    image: `${SITE_URL}/og-image.jpg`,
    type: 'website',
    keepImageSize: true,
    extraTags: [],
  };
}

function creditsMeta() {
  return {
    title: `Crédits — ${SITE_NAME}`,
    description: 'Conception et développement du site joinboost.fr, et remerciements aux membres du Club Boost.',
    url: `${SITE_URL}/credits`,
    image: `${SITE_URL}/og-image.jpg`,
    type: 'website',
    keepImageSize: true,
    extraTags: [],
  };
}

/** Toutes les routes du site, dans l'ordre du sitemap. `lastmod` est optionnel. */
export function pages(template) {
  const latest = articles[0];
  return [
    { path: '/', meta: homeMeta(template) },
    { path: BLOG_PATH, meta: indexMeta(), lastmod: latest ? latest.updated || latest.date : undefined },
    ...articles.map((a) => ({
      path: `${BLOG_PATH}/${a.slug}`,
      meta: articleMeta(a),
      lastmod: a.updated || a.date,
    })),
    ...legalPages.map((p) => ({ path: p.path, meta: legalMeta(p), lastmod: p.updated })),
    { path: '/credits', meta: creditsMeta() },
  ];
}

// ---------------------------------------------------------------------------
// Transformation du HTML
// ---------------------------------------------------------------------------

/** Remplace <title>, description, Open Graph, Twitter et ajoute canonical + balises extra. */
export function applyMeta(template, meta) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);

  const values = {
    'name="description"': meta.description,
    'property="og:type"': meta.type,
    'property="og:url"': meta.url,
    'property="og:title"': meta.title,
    'property="og:description"': meta.description,
    'property="og:image"': meta.image,
    'name="twitter:title"': meta.title,
    'name="twitter:description"': meta.description,
    'name="twitter:image"': meta.image,
  };

  for (const [attr, value] of Object.entries(values)) {
    const re = new RegExp(`(<meta\\s+${attr}\\s+content=")[^"]*(")`);
    if (!re.test(html)) {
      throw new Error(`[prerender] balise <meta ${attr}> introuvable dans index.html`);
    }
    html = html.replace(re, `$1${esc(value)}$2`);
  }

  if (!meta.keepImageSize) {
    html = html.replace(/\s*<meta property="og:image:(width|height)" content="[^"]*" \/>/g, '');
  }

  const extra = [`<link rel="canonical" href="${esc(meta.url)}" />`, ...meta.extraTags];
  html = html.replace(/[ \t]*<\/head>/, `    ${extra.join('\n    ')}\n  </head>`);

  return html;
}

/** Injecte le HTML rendu côté serveur dans <div id="app">. */
export function injectApp(html, appHtml) {
  const re = /<div id="app">[\s\S]*?<\/div>/;
  if (!re.test(html)) throw new Error('[prerender] <div id="app"> introuvable dans index.html');
  // Remplacement par fonction : le HTML rendu peut contenir des « $ ».
  return html.replace(re, () => `<div id="app">${appHtml}</div>`);
}

export function sitemapXml(list) {
  const entries = list.map(({ meta, lastmod }) =>
    ['  <url>', `    <loc>${esc(meta.url)}</loc>`, lastmod ? `    <lastmod>${esc(lastmod)}</lastmod>` : null, '  </url>']
      .filter(Boolean)
      .join('\n'),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}

// ---------------------------------------------------------------------------
// Rendu côté serveur
// ---------------------------------------------------------------------------

/** Compile src/entry-server.js en mode SSR dans un dossier temporaire et l'importe. */
async function buildSsr({ root, svelteOptions }) {
  const dir = mkdtempSync(join(tmpdir(), 'boost-ssr-'));
  try {
    await build({
      configFile: false, // ne pas recharger vite.config.js (et donc ce plugin)
      root,
      mode: 'production',
      logLevel: 'warn',
      publicDir: false,
      plugins: [svelte(svelteOptions)],
      build: {
        ssr: SSR_ENTRY,
        outDir: dir,
        emptyOutDir: true,
        minify: false,
        copyPublicDir: false,
        rollupOptions: { output: { entryFileNames: 'entry-server.js' } },
      },
      // Tout est embarqué dans le bundle SSR (gsap est en CommonJS côté Node).
      ssr: { noExternal: true },
    });
    const mod = await import(pathToFileURL(join(dir, 'entry-server.js')).href);
    return { render: mod.render, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
  } catch (err) {
    rmSync(dir, { recursive: true, force: true });
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

/**
 * @param {{ svelteOptions?: import('@sveltejs/vite-plugin-svelte').Options }} options
 *   `svelteOptions` : les mêmes options que le plugin Svelte du build client
 *   (notamment compilerOptions.hydratable), pour que les deux rendus concordent.
 */
export function prerender({ svelteOptions = {} } = {}) {
  let root = process.cwd();
  let outDir = 'dist';

  return {
    name: 'boost-prerender',
    // Actif au build (pré-rendu) et en `vite preview` (middleware ci-dessous).
    apply: (_config, env) => env.command === 'build' || env.isPreview === true,
    configResolved(config) {
      root = config.root;
      outDir = resolve(config.root, config.build.outDir);
    },

    // `npm run preview` : servir /cgu → dist/cgu/index.html comme le fait Vercel.
    // Le fallback SPA de Vite ne cherche que /cgu.html et renverrait l'accueil,
    // ce qui fausserait les tests locaux du HTML pré-rendu.
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [url, query] = (req.url || '/').split('?');
        if (url !== '/' && !url.includes('.')) {
          const dir = url.replace(/^\/|\/$/g, '');
          if (existsSync(join(outDir, dir, 'index.html'))) {
            req.url = `/${dir}/index.html${query ? `?${query}` : ''}`;
          }
        }
        next();
      });
    },
    async closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8');
      const list = pages(template);

      const ssr = await buildSsr({ root, svelteOptions });
      try {
        for (const page of list) {
          const { html } = ssr.render(page.path);
          if (!html || html.length < 1000) {
            throw new Error(`[prerender] rendu vide ou suspect pour ${page.path} (${html ? html.length : 0} caractères)`);
          }
          const dir = page.path === '/' ? outDir : join(outDir, page.path.replace(/^\//, ''));
          mkdirSync(dir, { recursive: true });
          writeFileSync(join(dir, 'index.html'), injectApp(applyMeta(template, page.meta), html));
        }
      } finally {
        ssr.cleanup();
      }

      writeFileSync(join(outDir, 'sitemap.xml'), sitemapXml(list));

      console.log(
        `\n[prerender] ${list.length} page(s) pré-rendue(s) en HTML complet : ${list.map((p) => p.path).join(', ')}` +
          `\n[prerender] sitemap.xml généré (${list.length} URL)\n`,
      );
    },
  };
}
