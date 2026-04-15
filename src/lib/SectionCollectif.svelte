<script>
  // Section "L'entrepreneuriat est un sport collectif" avec graphique Avec / Sans Boost
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let graphEl;
  let avecPath;
  let sansPath;
  let clipRect;
  let sansDot;
  let avecDot;
  let sansConnector;
  let avecConnector;
  let sansLabelGroup;
  let avecLabelGroup;
  let isMobile = false;

  onMount(() => {
    const check = () => { isMobile = window.innerWidth <= 900; };
    check();
    window.addEventListener('resize', check);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(clipRect, { attr: { width: 1440 } });
      gsap.set([sansLabelGroup, avecLabelGroup], { opacity: 1, y: 0 });
      gsap.set([sansDot, avecDot], { opacity: 1 });
      return;
    }

    const sansLen = sansPath.getTotalLength();
    const avecLen = avecPath.getTotalLength();
    const sansConnLen = sansConnector.getTotalLength();
    const avecConnLen = avecConnector.getTotalLength();

    gsap.set(sansPath, { strokeDasharray: sansLen, strokeDashoffset: sansLen });
    gsap.set(avecPath, { strokeDasharray: avecLen, strokeDashoffset: avecLen });
    gsap.set(clipRect, { attr: { width: 0 } });

    gsap.set(sansConnector, { strokeDasharray: sansConnLen, strokeDashoffset: sansConnLen });
    gsap.set(avecConnector, { strokeDasharray: avecConnLen, strokeDashoffset: avecConnLen });

    gsap.set([sansDot, avecDot], { attr: { r: 0 }, opacity: 0 });
    gsap.set([sansLabelGroup, avecLabelGroup], { opacity: 0, y: -10 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: graphEl,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    tl.to(sansPath, { strokeDashoffset: 0, duration: 2.6, ease: 'power2.out' }, 0)
      .to(avecPath, { strokeDashoffset: 0, duration: 2.6, ease: 'power2.out' }, 0.2)
      .to(clipRect, { attr: { width: 1440 }, duration: 2.8, ease: 'power2.out' }, 0)
      // Sans Boost label (peak point reached early in the curve)
      .to(sansLabelGroup, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.2)
      .to(sansConnector, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, 1.3)
      .to(sansDot, { attr: { r: 5.5 }, opacity: 1, duration: 0.4, ease: 'back.out(2.2)' }, 1.7)
      // Avec Boost label (after the curves cross, when Avec surges)
      .to(avecLabelGroup, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.0)
      .to(avecConnector, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, 2.1)
      .to(avecDot, { attr: { r: 6 }, opacity: 1, duration: 0.4, ease: 'back.out(2.2)' }, 2.5);
  });
</script>

<section class="section-collectif" data-reveal>
  <div class="section-collectif-inner">
    <div class="section-collectif-header">
      <h2 class="section-collectif-title">
        L'entrepreneuriat est un sport <span class="highlight">collectif.</span>
      </h2>
      <p class="section-collectif-desc">
        Le manque d'entourage est le premier frein à la réussite des indépendants et créatifs. Boost casse cette barrière en créant des ponts entre ceux qui vivent les mêmes défis.
      </p>
    </div>
  </div>

  <div class="section-collectif-graph-full">
    <svg
      bind:this={graphEl}
      class="graph-svg"
      viewBox={isMobile ? "80 20 1060 460" : "0 0 1440 520"}
      preserveAspectRatio={isMobile ? "xMidYMid meet" : "xMidYMax meet"}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Graphique comparant la progression Avec Boost et Sans Boost"
    >
      <defs>
        <linearGradient id="grad-avec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#184DD9" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#184DD9" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient id="grad-sans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#152556" stop-opacity="0.06" />
          <stop offset="100%" stop-color="#152556" stop-opacity="0" />
        </linearGradient>
        <clipPath id="reveal-clip">
          <rect bind:this={clipRect} x="0" y="0" width="0" height="520" />
        </clipPath>
      </defs>

      <!-- Vertical grid lines -->
      {#each Array(13) as _, i}
        <line
          x1={110 + i * 100}
          y1="40"
          x2={110 + i * 100}
          y2="460"
          stroke="#d1d5db"
          stroke-opacity="0.35"
          stroke-width="1"
        />
      {/each}

      <!-- Baseline -->
      <line
        x1="0"
        y1="460"
        x2="1440"
        y2="460"
        stroke="#d1d5db"
        stroke-opacity="0.4"
        stroke-width="1"
        stroke-dasharray="3 6"
      />

      <!-- Curves + areas, revealed left-to-right via clipPath -->
      <g clip-path="url(#reveal-clip)">
        <!-- Sans Boost: rises early, modest peak, then declines -->
        <path
          d="M 0 450 C 140 440, 260 300, 480 290 C 660 290, 800 340, 960 390 C 1100 430, 1250 445, 1440 450 L 1440 460 L 0 460 Z"
          fill="url(#grad-sans)"
        />
        <path
          bind:this={sansPath}
          d="M 0 450 C 140 440, 260 300, 480 290 C 660 290, 800 340, 960 390 C 1100 430, 1250 445, 1440 450"
          fill="none"
          stroke="#152556"
          stroke-opacity="0.2"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Avec Boost: gradual rise, then steep surge as Sans declines -->
        <path
          d="M 0 450 C 180 445, 360 400, 540 375 C 680 360, 780 345, 880 310 C 1000 260, 1140 130, 1440 40 L 1440 460 L 0 460 Z"
          fill="url(#grad-avec)"
        />
        <path
          bind:this={avecPath}
          d="M 0 450 C 180 445, 360 400, 540 375 C 680 360, 780 345, 880 310 C 1000 260, 1140 130, 1440 40"
          fill="none"
          stroke="#184DD9"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <!-- Sans Boost label at peak -->
      <g bind:this={sansLabelGroup}>
        <line
          bind:this={sansConnector}
          x1="320"
          y1={isMobile ? 95 : 115}
          x2="320"
          y2="350"
          stroke="#152556"
          stroke-opacity="0.25"
          stroke-width={isMobile ? 2 : 1.2}
        />
        <circle
          bind:this={sansDot}
          cx="320"
          cy="350"
          r={isMobile ? 8 : 5.5}
          fill="#ffffff"
          stroke="#152556"
          stroke-opacity="0.35"
          stroke-width={isMobile ? 3 : 2}
        />
        <rect
          x={isMobile ? 188 : 218}
          y={isMobile ? 30 : 78}
          width={isMobile ? 264 : 204}
          height={isMobile ? 60 : 42}
          rx={isMobile ? 30 : 21}
          fill="#ffffff"
          stroke="#d1d5db"
          stroke-width="1"
        />
        <text
          x="320"
          y={isMobile ? 68 : 105}
          text-anchor="middle"
          fill="#152556"
          fill-opacity="0.6"
          font-size={isMobile ? 28 : 16}
          font-weight="600"
        >Sans Boost</text>
      </g>

      <!-- Avec Boost label -->
      <g bind:this={avecLabelGroup}>
        <line
          bind:this={avecConnector}
          x1="980"
          y1={isMobile ? 95 : 120}
          x2="980"
          y2="276"
          stroke="#184DD9"
          stroke-opacity="0.35"
          stroke-width={isMobile ? 2 : 1.2}
        />
        <circle
          bind:this={avecDot}
          cx="980"
          cy="276"
          r={isMobile ? 8 : 6}
          fill="#ffffff"
          stroke="#184DD9"
          stroke-opacity="0.6"
          stroke-width={isMobile ? 3 : 2}
        />
        <rect
          x={isMobile ? 848 : 878}
          y={isMobile ? 30 : 78}
          width={isMobile ? 264 : 204}
          height={isMobile ? 60 : 42}
          rx={isMobile ? 30 : 21}
          fill="#184DD9"
        />
        <text
          x="980"
          y={isMobile ? 68 : 105}
          text-anchor="middle"
          fill="#ffffff"
          font-size={isMobile ? 28 : 16}
          font-weight="600"
        >Avec Boost</text>
      </g>
    </svg>
  </div>
</section>

<style>
  .section-collectif {
    position: relative;
    background: linear-gradient(180deg, var(--blanc) 0%, #f5f7fa 100%);
    padding: 6rem 24px 0;
    overflow: hidden;
  }

  .section-collectif-inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .section-collectif-header {
    max-width: 620px;
    align-self: flex-start;
    text-align: left;
    margin-bottom: 3rem;
  }

  .section-collectif-title {
    font-size: 2.75rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--bleu-950);
    margin: 0 0 1.25rem;
    letter-spacing: -0.02em;
    text-align: left;
  }

  .section-collectif-title .highlight {
    color: var(--bleu-600);
  }

  .section-collectif-desc {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    color: var(--gris-700);
    margin: 0;
  }

  .section-collectif-graph-full {
    width: 100vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(180deg, #f5f7fa 0%, #edf0f4 100%);
    padding-bottom: 0;
    overflow: hidden;
  }

  .section-collectif-graph-full .graph-svg {
    display: block;
    width: 100%;
    height: auto;
    min-height: 340px;
  }

  @media (max-width: 900px) {
    .section-collectif {
      padding: 4rem 1.5rem 0;
    }

    .section-collectif-header {
      margin-bottom: 2rem;
    }

    .section-collectif-title {
      font-size: 1.75rem;
    }

    .section-collectif-graph-full .graph-svg {
      min-height: 260px;
    }
  }
</style>
