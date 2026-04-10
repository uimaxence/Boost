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

## Personnalisation

- **Cal.com** : dans `src/App.svelte`, remplace l’`src` de l’iframe par ton lien Cal.com.
- **Police** : la maquette prévoit Switzer ; le projet utilise **Inter** (Google Fonts) en attendant. Pour Switzer, ajoute les fichiers de police et un `@font-face` dans `src/app.css`, puis mets `font-family: 'Switzer', …`.
- **Assets** : images/vidéo dans `public/assets/`. Les SVG `french-map.svg` et `graphique.svg` sont déjà utilisés. Tu peux ajouter les photos membres et du fondateur (remplacer les placeholders dans les sections Stats et Témoignages).
- **Réseaux sociaux / mentions légales** : les liens du footer pointent vers des URLs génériques ; remplace-les par les vrais liens Boost.

## Stack

- Svelte 4, Vite 5
- GSAP + ScrollTrigger (révélation au scroll)
- CSS avec variables (palette : #EFF6FF, #5CA7FE, #1B3A8D, #152556)
