// Données du blog.
// Module « pur » (aucun import Svelte / Vite) : il est aussi chargé côté Node
// par scripts/blog-prerender.js (métadonnées de partage) et scripts/og-image.py.

export const SITE_URL = 'https://joinboost.fr';
export const SITE_NAME = 'Boost';
export const BLOG_PATH = '/blog';
export const BLOG_TITLE = 'Le blog Boost — Les coulisses du Club';
export const BLOG_DESCRIPTION =
  "Retours d'événements, annonces et actualités du Club Boost, le réseau qui booste la nouvelle génération d'entrepreneurs.";

export const authors = {
  matteo: {
    name: 'Mattéo',
    role: 'Fondateur de Boost',
    bio: "Lancé à Angers, avec l'ambition de connecter la nouvelle génération d'entrepreneurs dans toute la France.",
  },
};

/*
  Structure d'un article
  ----------------------
  {
    slug        : identifiant dans l'URL  -> /blog/<slug>
    title       : titre complet
    excerpt     : chapô (affiché sous le titre, dans les cartes et en meta description)
    category    : 'Événement', 'Annonce', 'Conseils'…
    date        : date ISO 'AAAA-MM-JJ'
    location    : ville (optionnel)
    author      : clé de `authors`
    cover       : '/blog/<slug>/cover.jpg' (fichier dans public/blog/<slug>/) ou null
                  -> null = visuel de marque par défaut
    coverAlt    : texte alternatif de la photo
    ogImage     : '/blog/<slug>/og.jpg' généré par `npm run og -- <slug>` (sinon la cover est utilisée)
    sections    : [{ id, title, blocks }]  -> chaque section = une entrée du sommaire
  }

  Types de blocs
  --------------
  { type: 'p', html }                          paragraphe (HTML inline autorisé : <strong>, <em>, <a>)
  { type: 'h3', text }                         sous-titre
  { type: 'list', items: [html] }              liste à puces
  { type: 'steps', items: [{ title, text }] }  étapes numérotées
  { type: 'highlight', html }                  phrase mise en avant
  { type: 'quote', text, author }              citation
  { type: 'tags', items: [text] }              chips (villes, thèmes…)
  { type: 'image', src, alt, caption }         image pleine largeur
  { type: 'gallery', images: [{ src, alt, caption? }] }  grille de 2 à 4 images, légende optionnelle par image
  { type: 'cta', title, text, label, href }    encart d'appel à l'action
*/

/** Les articles, du plus récent au plus ancien. */
export const articles = [
  {
    slug: 'tour-de-france-boost',
    title: 'Le Tour de France Boost : on part à la rencontre des entrepreneurs de France',
    excerpt:
      "Annoncé le 2 septembre à Angers, le Tour de France Boost démarre début 2027. Dix villes, dix soirées, et à chaque étape un nouveau Club Boost lancé avec les entrepreneurs de la ville. On cherche aussi un partenaire officiel pour l'aventure.",
    category: 'Annonce',
    date: '2026-09-25',
    location: 'Angers',
    author: 'matteo',
    cover: '/blog/tour-de-france-boost/cover.webp',
    coverAlt: 'Écran affichant la carte du Tour de France Boost avec les 10 villes reliées entre elles',
    ogImage: '/blog/tour-de-france-boost/og.jpg',
    sections: [
      {
        id: 'tout-a-commence',
        title: 'Tout a commencé le 2 septembre',
        blocks: [
          {
            type: 'p',
            html: "Le 2 septembre dernier, on organisait <a href=\"/blog/soiree-de-rentree-club-boost-angers\">la soirée de rentrée du Club Boost d'Angers</a>, la première soirée portes ouvertes de l'histoire de Boost. 50 entrepreneurs réunis au Pod Coworking pour une soirée de networking, d'échanges et d'annonces.",
          },
          {
            type: 'p',
            html: "C'est lors de cette soirée qu'on a officiellement annoncé le projet qui nous tient le plus à cœur pour les prochains mois : <strong>le Tour de France Boost</strong>.",
          },
          {
            type: 'image',
            src: '/blog/soiree-de-rentree-club-boost-angers/cover.webp',
            alt: "Les participants écoutent les présentations lors de la soirée de rentrée du Club Boost, au Pod Coworking à Angers",
            caption: "La soirée de rentrée du Club Boost d'Angers, le 2 septembre 2026, au Pod Coworking.",
          },
        ],
      },
      {
        id: 'demarche',
        title: 'La démarche',
        blocks: [
          {
            type: 'p',
            html: "Le premier Club Boost a vu le jour à Angers en février 2026. Depuis, une vraie dynamique s'est créée. Des membres qui échangent au quotidien, des rencontres régulières, des tables rondes, des collaborations qui naissent. En quelques mois, on a prouvé que <a href=\"/#concept\">le concept</a> fonctionne, que des entrepreneurs qui se réunissent autour d'un projet commun, ça crée quelque chose de réel et de durable.",
          },
          {
            type: 'p',
            html: "Mais l'ambition de Boost a toujours été nationale. Créer ce même réseau local dans chaque grande ville de France, pour que chaque entrepreneur, où qu'il soit, puisse trouver une communauté près de chez lui.",
          },
          {
            type: 'p',
            html: "Pour développer ce réseau national, on aurait pu attendre. Attendre que les gens viennent à nous, que les demandes arrivent, que les choses se fassent naturellement. Mais ce n'est pas dans notre ADN, et ce n'est pas dans celui des entrepreneurs non plus.",
          },
          {
            type: 'p',
            html: "Alors on passe à l'action. C'est nous qui faisons la démarche d'aller à la rencontre des entrepreneurs de France, directement sur leur terrain, dans leurs villes.",
          },
          {
            type: 'p',
            html: "Plutôt que d'attendre, on a décidé d'aller directement à la rencontre des entrepreneurs de France. De se déplacer, de se présenter, d'expliquer le projet en face à face. Parce que chez Boost, on croit profondément que les meilleures choses se construisent dans la proximité et dans le contact humain.",
          },
          { type: 'highlight', html: "C'est comme ça qu'est né le Tour de France Boost." },
        ],
      },
      {
        id: 'villes',
        title: 'Les 10 villes au programme',
        blocks: [
          {
            type: 'p',
            html: "On a choisi 10 villes pour ce premier tour. Des métropoles françaises dynamiques, avec des écosystèmes entrepreneuriaux forts et des communautés de freelances et d'entrepreneurs en pleine croissance. Des villes qui bougent, qui attirent, et qui méritent d'avoir leur propre Club Boost.",
          },
          {
            type: 'tags',
            items: ['Rennes', 'Nantes', 'Bordeaux', 'Toulouse', 'Montpellier', 'Marseille', 'Lyon', 'Strasbourg', 'Lille', 'Paris'],
          },
        ],
      },
      {
        id: 'sur-place',
        title: "Ce qu'on va faire sur place",
        blocks: [
          {
            type: 'p',
            html: "Dans chaque ville, on organisera une soirée dédiée aux entrepreneurs locaux, ouverte à tous les freelances, chefs d'entreprise et porteurs de projet qui veulent découvrir Boost et rencontrer leur future communauté.",
          },
          { type: 'p', html: 'Au programme de chaque étape :' },
          {
            type: 'steps',
            items: [
              {
                title: 'Une présentation complète du projet Boost',
                text: "Son histoire, sa vision et ses ambitions : pourquoi ce projet existe, et ce qu'on veut construire dans chaque ville.",
              },
              {
                title: "Un temps d'échange",
                text: "Autour des enjeux qui touchent vraiment les entrepreneurs : la solitude, le réseau, les opportunités, la croissance.",
              },
              {
                title: 'Un moment de networking',
                text: "Pour laisser les vraies connexions se faire, celles qui donnent naissance à des collaborations, des partenariats, ou simplement à des gens sur qui on peut compter.",
              },
            ],
          },
          {
            type: 'image',
            src: '/blog/tour-de-france-boost/networking.webp',
            alt: 'Des entrepreneurs discutent en petits groupes pendant un temps de networking',
            caption: "Le networking, au cœur de chaque étape. Ici, lors de la soirée de rentrée à Angers.",
          },
          {
            type: 'p',
            html: "L'objectif est simple : <strong>qu'à la fin de chaque soirée, le Club Boost de la ville soit officiellement lancé.</strong>",
          },
          {
            type: 'p',
            html: "Concrètement, les participants pourront s'inscrire et rejoindre la communauté directement pendant la soirée. Le groupe est créé, les premiers membres se connaissent déjà, la dynamique est lancée. On repart, mais le Club, lui, reste et continue de vivre.",
          },
          { type: 'highlight', html: "Boost, c'est une communauté qui dure." },
        ],
      },
      {
        id: 'partenaire',
        title: 'On cherche un partenaire officiel',
        blocks: [
          {
            type: 'p',
            html: "Pour ce Tour de France, Boost est à la recherche d'un <strong>partenaire officiel</strong>.",
          },
          {
            type: 'p',
            html: "Pas un sponsor au sens traditionnel du terme. Un partenaire qui partage nos valeurs, qui croit au même écosystème que nous, et dont les services apportent une vraie valeur aux entrepreneurs qu'on va rencontrer.",
          },
          {
            type: 'p',
            html: "Une marque qui fait sens avec ce que Boost veut développer : être au plus proche des entrepreneurs, leur apporter les bons outils, les bonnes ressources, et les bonnes personnes.",
          },
          {
            type: 'p',
            html: "Si vous êtes une marque, une entreprise ou un service qui s'adresse aux freelances et entrepreneurs, et que vous voyez dans ce Tour de France une opportunité de vous connecter à votre cible de façon authentique et engagée, <a href=\"mailto:contact@joinboost.fr?subject=Partenariat%20Tour%20de%20France%20Boost\">parlons-en</a>.",
          },
          {
            type: 'cta',
            title: 'Vous voulez devenir partenaire officiel du Tour de France Boost ?',
            text: "Écrivez-nous, on vous présente le projet et ce qu'on peut construire ensemble.",
            label: 'Nous écrire',
            href: 'mailto:contact@joinboost.fr?subject=Partenariat%20Tour%20de%20France%20Boost',
          },
        ],
      },
      {
        id: 'la-suite',
        title: 'La suite',
        blocks: [
          {
            type: 'p',
            html: "Le Tour de France Boost démarre <strong>début 2027</strong>. Les dates et les lieux précis de chaque étape seront communiqués prochainement.",
          },
          {
            type: 'p',
            html: "Pour ne rien rater de l'aventure et être parmi les premiers informés de notre passage dans ta ville, suis Boost sur les réseaux sociaux. C'est là que toutes les annonces seront faites en avant-première.",
          },
          {
            type: 'cta',
            title: 'Tu veux rejoindre le Club Boost près de chez toi ?',
            text: "Réserve un appel de 15 minutes avec l'équipe pour découvrir le Club et candidater.",
            label: 'Candidater au Club',
            href: '/#candidater',
          },
        ],
      },
    ],
  },
  {
    slug: 'soiree-de-rentree-club-boost-angers',
    title: 'La soirée de rentrée du Club Boost : retour sur une première mémorable',
    excerpt:
      "Pour la première fois, le Club Boost d'Angers a ouvert ses portes à tous les entrepreneurs de la ville. Près de 50 personnes, deux annonces majeures et une conviction renforcée : personne ne devrait entreprendre seul.",
    category: 'Événement',
    date: '2026-09-02',
    location: 'Angers',
    author: 'matteo',
    cover: '/blog/soiree-de-rentree-club-boost-angers/cover.webp',
    coverAlt: "Les participants écoutent les présentations lors de la soirée de rentrée du Club Boost, au Pod Coworking à Angers",
    ogImage: '/blog/soiree-de-rentree-club-boost-angers/og.jpg',
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi cet événement ?',
        blocks: [
          {
            type: 'p',
            html: "Depuis le lancement du Club Boost d'Angers, on organise des rencontres régulières entre membres. Des moments d'échange, de partage, de réseau. Mais jusqu'ici, ces rencontres étaient réservées aux membres du Club.",
          },
          {
            type: 'p',
            html: "Pour cette rentrée, on a voulu faire les choses différemment. On a décidé d'ouvrir les portes, pour la première fois, à tous les freelances, chefs d'entreprise et porteurs de projet d'Angers et ses alentours. Le but : leur permettre de découvrir Boost de l'intérieur, rencontrer la communauté, et comprendre pourquoi de plus en plus d'entrepreneurs choisissent de ne plus avancer seuls.",
          },
          {
            type: 'p',
            html: "Parce que Boost est né d'un constat simple : <strong>trop d'entrepreneurs avancent seuls.</strong> Sans réseau solide, sans les bonnes personnes autour d'eux, sans un endroit où poser leurs vraies questions. La solitude entrepreneuriale est réelle, elle pèse, et pourtant personne n'en parle vraiment. C'est exactement pour ça que Boost existe. Et c'est exactement le message qu'on voulait porter lors de cette soirée de rentrée.",
          },
        ],
      },
      {
        id: 'cadre',
        title: 'Un cadre pensé pour les entrepreneurs',
        blocks: [
          {
            type: 'p',
            html: "La soirée s'est tenue le mardi 2 septembre 2026 au Pod Coworking, situé dans le quartier Saint Serge à Angers. Un lieu pensé pour les entrepreneurs, par des entrepreneurs. Difficile de trouver un cadre plus adapté pour une soirée comme celle-là.",
          },
          {
            type: 'image',
            src: '/blog/soiree-de-rentree-club-boost-angers/cadre-lieu.webp',
            alt: 'Des participants discutent sur la terrasse du Pod Coworking',
            caption: 'La terrasse du Pod Coworking, à Angers.',
          },
          {
            type: 'p',
            html: "<strong>Près de 50 personnes ont répondu présent.</strong> Freelances, chefs d'entreprise, porteurs de projet, des profils variés, des secteurs d'activité différents, mais une même envie : rencontrer les bonnes personnes et avancer ensemble. Voir autant de monde réuni dans la même salle, autour d'un projet auquel on croit depuis le début, c'était un moment difficile à décrire.",
          },
        ],
      },
      {
        id: 'deroule',
        title: 'Le déroulé de la soirée',
        blocks: [
          { type: 'p', html: "La soirée s'est construite autour de quatre grands moments." },
          {
            type: 'steps',
            items: [
              {
                title: 'Accueil et networking libre',
                text: "Pour permettre à chacun d'arriver à son rythme, de prendre un verre, et de commencer à se rencontrer naturellement. C'est souvent dans ces moments-là, sans pression, que les premières vraies conversations se font.",
              },
              {
                title: 'Présentation de Boost',
                text: "Son histoire, sa mission, sa vision. Pourquoi ce projet existe, d'où il vient, ce qu'on veut construire. Un moment franc et sans filtre, dans l'ADN de ce qu'on veut incarner chez Boost.",
              },
              {
                title: "Les pitchs des membres du Club Boost d'Angers",
                text: "Chaque membre a pris la parole pour se présenter, son parcours, son activité, et en quoi le Club lui a apporté quelque chose de concret. Un moment authentique, humain, qui a montré mieux que n'importe quel discours ce que la communauté Boost apporte vraiment au quotidien.",
              },
              {
                title: 'Deux temps de networking libre',
                text: "Pour laisser les vraies conversations se faire. Celles qui durent, qui vont en profondeur, qui créent de vraies connexions. C'est souvent là que les meilleures choses se passent.",
              },
            ],
          },
          {
            type: 'gallery',
            images: [
              {
                src: '/blog/soiree-de-rentree-club-boost-angers/matteo-pitch.webp',
                alt: 'Mattéo présente Boost devant les participants',
                caption: 'Mattéo présente Boost : son histoire, sa mission, sa vision.',
              },
              {
                src: '/blog/soiree-de-rentree-club-boost-angers/pitch-membre.webp',
                alt: "Un membre du Club Boost d'Angers pitche devant la salle",
                caption: "Les pitchs des membres du Club Boost d'Angers.",
              },
            ],
          },
        ],
      },
      {
        id: 'annonces',
        title: 'Les annonces de la soirée',
        blocks: [
          {
            type: 'p',
            html: "Cette soirée a aussi été l'occasion de faire deux annonces importantes pour l'avenir de Boost.",
          },
          { type: 'h3', text: "Le lancement officiel du développement de l'application" },
          {
            type: 'p',
            html: "C'est l'une des annonces les plus attendues depuis le lancement de Boost. <strong>L'application est en développement.</strong>",
          },
          {
            type: 'p',
            html: "Boost s'est associé avec Léo Gérard, membre du Club Boost d'Angers. Développeur talentueux et entrepreneur dans l'âme, Léo a rejoint l'aventure pour co-construire l'application aux côtés de Mattéo. Ensemble, ils travaillent main dans la main pour développer l'application la plus complète possible pour les entrepreneurs.",
          },
          {
            type: 'p',
            html: "La priorité du moment : <strong>la section Club</strong>. L'objectif est de digitaliser et d'enrichir l'expérience des membres, avec des fonctionnalités pensées pour le quotidien des entrepreneurs.",
          },
          {
            type: 'image',
            src: '/blog/soiree-de-rentree-club-boost-angers/annonce-club.webp',
            alt: "Écran affichant la section Club de l'application Boost",
            caption: "La section Club de l'application, présentée pendant la soirée.",
          },
          {
            type: 'p',
            html: "Les membres pourront accéder à leur Club directement depuis l'application, échanger avec leur communauté, et suivre les prochaines rencontres et tables rondes. Mais l'application va bien plus loin que ça. Chaque membre aura la possibilité de créer ses propres événements au sein du Club, organiser une session de coworking, proposer un café entre membres, lancer une initiative collective. L'idée : donner à chacun les outils pour faire vivre sa communauté à sa façon.",
          },
          {
            type: 'p',
            html: "L'application intégrera également <strong>une section Learning</strong>, une bibliothèque de modules vidéo courts qui répondent aux problématiques concrètes des entrepreneurs. Comptabilité, communication, fixation des tarifs, gestion de la solitude, développement commercial, autant de sujets traités de façon claire et actionnable, directement accessibles depuis l'app.",
          },
          {
            type: 'p',
            html: "Enfin, Boost travaille au développement de <strong>partenariats avec des marques utiles</strong> au quotidien des entrepreneurs, banques, espaces de coworking, outils de gestion, services professionnels. L'idée est d'offrir aux membres un accès privilégié à des ressources et des avantages concrets, directement depuis l'application.",
          },
          {
            type: 'p',
            html: "Une fois cette première brique posée, l'application s'enrichira progressivement avec notamment un système de matching intelligent pour connecter les entrepreneurs à l'échelle nationale.",
          },
          { type: 'p', html: "C'est une étape majeure pour Boost, et c'est le début de quelque chose de grand." },
          { type: 'h3', text: 'Le Tour de France Boost' },
          {
            type: 'p',
            html: "L'autre grande annonce de la soirée, et celle qui a fait le plus parler dans la salle.",
          },
          {
            type: 'image',
            src: '/blog/soiree-de-rentree-club-boost-angers/tour-de-france.webp',
            alt: "Écran affichant la carte du Tour de France Boost avec les 10 villes reliées entre elles",
            caption: 'Le Tour de France Boost dévoilé pendant la soirée.',
          },
          { type: 'highlight', html: 'Début 2027, Boost part à la rencontre des entrepreneurs de France.' },
          {
            type: 'p',
            html: "L'objectif : organiser un événement dans 10 villes et lancer un Club Boost dans chacune d'elles au passage.",
          },
          { type: 'p', html: 'Les 10 villes au programme :' },
          {
            type: 'tags',
            items: ['Rennes', 'Nantes', 'Bordeaux', 'Toulouse', 'Montpellier', 'Marseille', 'Lyon', 'Strasbourg', 'Lille', 'Paris'],
          },
          {
            type: 'p',
            html: "Un tour de France ambitieux, qui va permettre à Boost de s'ancrer dans les grandes villes françaises et de construire un réseau d'entrepreneurs à l'échelle nationale. Si tu es dans l'une de ces villes et que tu veux être parmi les premiers à rejoindre le Club Boost de ta ville, <a href=\"/#candidater\">les inscriptions ouvrent bientôt</a>. On te raconte tout dans <a href=\"/blog/tour-de-france-boost\">l'article dédié au Tour de France Boost</a>.",
          },
        ],
      },
      {
        id: 'ce-qu-on-retient',
        title: "Ce qu'on retient",
        blocks: [
          {
            type: 'p',
            html: "Cette soirée, c'était bien plus qu'un événement de rentrée. C'était la preuve concrète que ce qu'on construit avec Boost a du sens. Que la solitude entrepreneuriale n'est pas une fatalité. Et que quand on met les bonnes personnes dans la même pièce, il se passe toujours quelque chose.",
          },
          {
            type: 'p',
            html: "On repart de cette soirée avec une conviction encore plus forte. Boost est au bon endroit, au bon moment. Et on n'est vraiment qu'au début de ce qu'on va construire ensemble.",
          },
          {
            type: 'p',
            html: "Merci à toutes les personnes qui ont fait le déplacement ce soir-là. Merci au Pod Coworking pour nous avoir accueillis dans ses locaux. Et merci aux membres du Club Boost d'Angers qui font vivre ce projet au quotidien.",
          },
          {
            type: 'cta',
            title: 'Tu veux rejoindre le Club Boost près de chez toi ?',
            text: "Réserve un appel de 15 minutes avec l'équipe pour découvrir le Club et candidater.",
            label: 'Candidater au Club',
            href: '/#candidater',
          },
        ],
      },
    ],
  },
];

/* ---------- Helpers ---------- */

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug) || null;
}

export function articlePath(article) {
  return `${BLOG_PATH}/${article.slug}`;
}

export function articleUrl(article) {
  return `${SITE_URL}${articlePath(article)}`;
}

/** Image utilisée pour les aperçus de partage (URL absolue). */
export function articleShareImage(article) {
  const img = article.ogImage || article.cover || '/og-image.jpg';
  return img.startsWith('http') ? img : `${SITE_URL}${img}`;
}

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

/** '2026-09-02' -> '2 septembre 2026' */
export function formatDate(iso) {
  return dateFormatter.format(new Date(`${iso}T12:00:00`));
}

function stripTags(html) {
  return String(html).replace(/<[^>]*>/g, ' ');
}

function blockText(block) {
  switch (block.type) {
    case 'p':
    case 'highlight':
      return stripTags(block.html);
    case 'h3':
    case 'quote':
      return block.text;
    case 'list':
      return block.items.map(stripTags).join(' ');
    case 'steps':
      return block.items.map((i) => `${i.title} ${i.text}`).join(' ');
    case 'tags':
      return block.items.join(' ');
    case 'cta':
      return `${block.title} ${block.text}`;
    case 'image':
      return block.caption || '';
    default:
      return '';
  }
}

export function wordCount(article) {
  const text = [
    article.title,
    article.excerpt,
    ...article.sections.flatMap((s) => [s.title, ...s.blocks.map(blockText)]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

/** Temps de lecture estimé en minutes (200 mots / min). */
export function readingTime(article) {
  return Math.max(1, Math.round(wordCount(article) / 200));
}
