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
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const route =
    path === '/mentions-legales' ? 'mentions' :
    path === '/credits' ? 'credits' :
    'home';

  const pageTitle =
    route === 'mentions' ? 'Mentions légales — Boost' :
    route === 'credits' ? 'Crédits — Boost' :
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

    // Refresh unique après que tout le contenu soit chargé
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
{:else}
  <Header />

  <main>
    <Hero />
    <SectionCollectif />
    <SectionPiliers />
    <SectionSocialProof />
    <SectionFondateur />
    <SectionSteps />
    <SectionFAQ />
    <SectionOffre />
    <SectionCTA />
  </main>

  <Footer />
{/if}
