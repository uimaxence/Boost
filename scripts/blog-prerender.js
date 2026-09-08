// Plugin Vite : après le build, génère une page HTML statique par article
// (dist/blog/<slug>/index.html) et pour l'index (dist/blog/index.html),
// avec les bonnes balises <title>, description, Open Graph, Twitter et JSON-LD.
//
// Pourquoi : les robots des réseaux sociaux (LinkedIn, WhatsApp, X…) n'exécutent
// pas le JavaScript. Sans ces fichiers, tous les liens partagés afficheraient
// l'aperçu de la page d'accueil. Vercel sert ces fichiers statiques avant
// d'appliquer la réécriture SPA de vercel.json.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
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

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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
      `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
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
      throw new Error(`[blog-prerender] balise <meta ${attr}> introuvable dans index.html`);
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

export function blogPages() {
  return [
    { dir: BLOG_PATH.replace(/^\//, ''), meta: indexMeta() },
    ...articles.map((a) => ({ dir: `${BLOG_PATH.replace(/^\//, '')}/${a.slug}`, meta: articleMeta(a) })),
  ];
}

export function blogPrerender() {
  let outDir = 'dist';

  return {
    name: 'boost-blog-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8');
      const pages = blogPages();
      for (const page of pages) {
        const dir = join(outDir, page.dir);
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, 'index.html'), applyMeta(template, page.meta));
      }
      console.log(`\n[blog] ${pages.length} page(s) pré-rendue(s) : ${pages.map((p) => '/' + p.dir).join(', ')}\n`);
    },
  };
}
