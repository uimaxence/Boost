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
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  // Évite que ScrollTrigger ne réajuste la position quand la barre d'adresse
  // mobile (iOS Safari) apparaît/disparaît : c'est ce qui provoquait le
  // "scroll vers le haut tout seul" en cours de navigation.
  ScrollTrigger.config({ ignoreMobileResize: true });

  onMount(() => {
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
  });
</script>

<svelte:head>
  <title>Boost — Rejoins le Club</title>
</svelte:head>

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
