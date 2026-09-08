<script>
  import Header from './lib/Header.svelte';
  import Hero from './lib/Hero.svelte';
  import SectionCollectif from './lib/SectionCollectif.svelte';
  import SectionPiliers from './lib/SectionPiliers.svelte';
  import SectionSocialProof from './lib/SectionSocialProof.svelte';
  import SectionFondateur from './lib/SectionFondateur.svelte';
  import SectionSteps from './lib/SectionSteps.svelte';
  import SectionFAQ from './lib/SectionFAQ.svelte';
  import SectionOffre from './lib/SectionOffre.svelte';
  import SectionCTA from './lib/SectionCTA.svelte';
  import Footer from './lib/Footer.svelte';
  import MentionsLegales from './lib/MentionsLegales.svelte';
  import Credits from './lib/Credits.svelte';
  import SectionBlog from './lib/blog/SectionBlog.svelte';
  import BlogIndex from './lib/blog/BlogIndex.svelte';
  import ArticlePage from './lib/blog/ArticlePage.svelte';
  import { getArticle, BLOG_TITLE, SITE_NAME } from './lib/blog/articles.js';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  // Routage minimal basé sur le pathname (pas de navigation côté client :
  // chaque page est un chargement complet, cf. la réécriture SPA dans vercel.json).
  const rawPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;

  let route = 'home';
  let article = null;

  if (path === '/mentions-legales') {
    route = 'mentions';
  } else if (path === '/credits') {
    route = 'credits';
  } else if (path === '/blog') {
    route = 'blog';
  } else if (path.startsWith('/blog/')) {
    article = getArticle(decodeURIComponent(path.slice('/blog/'.length)));
    route = article ? 'article' : 'blog';
  }

  const pageTitle =
    route === 'mentions' ? 'Mentions légales — Boost' :
    route === 'credits' ? 'Crédits — Boost' :
    route === 'blog' ? BLOG_TITLE :
    route === 'article' ? `${article.title} — ${SITE_NAME}` :
    'Boost — Rejoins le Club';

  // Évite que ScrollTrigger ne réajuste la position quand la barre d'adresse
  // mobile (iOS Safari) apparaît/disparaît : c'est ce qui provoquait le
  // "scroll vers le haut tout seul" en cours de navigation.
  ScrollTrigger.config({ ignoreMobileResize: true });

  onMount(() => {
    // Désactive l'auto-refresh de ScrollTrigger pour éviter les sauts de scroll
    // quand le contenu change de taille (images, embed Cal, etc.)
    ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange' });

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    setTimeout(() => ScrollTrigger.refresh(), 2000);
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

{#if route === 'mentions'}
  <MentionsLegales />
{:else if route === 'credits'}
  <Credits />
{:else if route === 'blog'}
  <BlogIndex />
{:else if route === 'article'}
  <ArticlePage {article} />
{:else}
  <Header />

  <main>
    <Hero />
    <SectionCollectif />
    <SectionPiliers />
    <SectionSocialProof />
    <SectionBlog />
    <SectionFondateur />
    <SectionSteps />
    <SectionFAQ />
    <SectionOffre />
    <SectionCTA />
  </main>

  <Footer />
{/if}
