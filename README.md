# Landing Page Boost — Club

Landing page pour le Club Boost, réalisée avec **Svelte**, **Vite** et **GSAP** (animations au scroll).

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # prévisualiser le build
```

## Contenu

- **Header** : logo, liens (Le concept, Les clubs, FAQ), bouton Candidater, menu burger sur mobile
- **Sections** : Hero, Section bleue (3 cartes), FAQ accordéon, Calendrier (Cal.com), Carte France + graphique, Statistiques, Témoignages, répétition Hero/FAQ, Footer

## Blog

- **Section « Blog » sur la home** : `src/lib/blog/SectionBlog.svelte` (article à la une + 3 derniers).
- **Index** : `/blog` → `src/lib/blog/BlogIndex.svelte`.
- **Template d'article** : `/blog/<slug>` → `src/lib/blog/ArticlePage.svelte` (photo en tête, titre sur carte blanche, métadonnées + partage, sommaire fixe, contenu).

### Ajouter un article

1. Ajoute un objet en tête du tableau `articles` dans `src/lib/blog/articles.js` (la structure et les types de blocs sont documentés en haut du fichier). Chaque `section` devient une entrée du sommaire.
2. Dépose les photos dans `public/blog/<slug>/` et renseigne `cover: '/blog/<slug>/cover.jpg'` (photo en tête) ; ajoute des blocs `image` / `gallery` dans le contenu.
3. Génère le visuel de partage (1200x630, affiché quand le lien est partagé sur LinkedIn, WhatsApp, X…) :
   ```bash
   npm run og -- <slug>                     # visuel de marque
   npm run og -- <slug> --photo photo.jpg   # avec une photo en fond
   ```
   Il est écrit dans `public/blog/<slug>/og.jpg` et référencé par `ogImage`. Nécessite Playwright Python (`python3 -m pip install playwright && python3 -m playwright install chromium`).
4. `npm run build` : le plugin `scripts/blog-prerender.js` génère `dist/blog/<slug>/index.html` avec les balises `<title>`, Open Graph, Twitter et JSON-LD de l'article (les robots des réseaux sociaux n'exécutent pas le JS). Vercel sert ces fichiers avant la réécriture SPA.

## Pages légales

Trois pages, une seule mise en page (`src/lib/legal/LegalPage.svelte`, qui réutilise le sommaire et les blocs du blog) :

- `/cgu` → `src/lib/legal/cgu.js` (conditions d'utilisation et d'adhésion)
- `/confidentialite` → `src/lib/legal/confidentialite.js` (politique de confidentialité)
- `/mentions-legales` → `src/lib/legal/mentionsLegales.js`

Les informations de la société (dénomination, RCS, siège, TVA, directeur de la publication, prestataire de paiement, médiateur…) sont centralisées dans `src/lib/legal/editeur.js`. **Les valeurs entre crochets sont des placeholders à remplacer** dès que les informations seront connues ; elles s'affichent telles quelles sur le site en attendant. La date de mise à jour (`LEGAL_UPDATED`) est à avancer à chaque modification des textes.

Au build, ces trois pages sont pré-rendues dans `dist/` avec leurs balises `<title>` / Open Graph (même mécanisme que le blog).

## Personnalisation

- **Cal.com** : dans `src/App.svelte`, remplace l’`src` de l’iframe par ton lien Cal.com.
- **Police** : la maquette prévoit Switzer ; le projet utilise **Inter** (Google Fonts) en attendant. Pour Switzer, ajoute les fichiers de police et un `@font-face` dans `src/app.css`, puis mets `font-family: 'Switzer', …`.
- **Assets** : images/vidéo dans `public/assets/`. Les SVG `french-map.svg` et `graphique.svg` sont déjà utilisés. Tu peux ajouter les photos membres et du fondateur (remplacer les placeholders dans les sections Stats et Témoignages).
- **Réseaux sociaux** : les liens Instagram / LinkedIn / TikTok du footer pointent vers des URLs génériques ; remplace-les par les vrais liens Boost.

## Stack

- Svelte 4, Vite 5
- GSAP + ScrollTrigger (révélation au scroll)
- CSS avec variables (palette : #EFF6FF, #5CA7FE, #1B3A8D, #152556)
