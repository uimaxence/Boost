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

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(clipRect, { attr: { width: 1300 } });
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
      .to(clipRect, { attr: { width: 1300 }, duration: 2.8, ease: 'power2.out' }, 0)
      // Sans Boost label (peak point reached early in the curve)
      .to(sansLabelGroup, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.2)
      .to(sansConnector, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, 1.3)
      .to(sansDot, { attr: { r: 7 }, opacity: 1, duration: 0.4, ease: 'back.out(2.2)' }, 1.7)
      // Avec Boost label (after the curves cross, when Avec surges)
      .to(avecLabelGroup, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.0)
      .to(avecConnector, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, 2.1)
      .to(avecDot, { attr: { r: 8 }, opacity: 1, duration: 0.4, ease: 'back.out(2.2)' }, 2.5)
      // Subtle infinite pulse on the Avec dot
      .to(avecDot, {
        attr: { r: 12 },
        opacity: 0.55,
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      }, 3.0);
  });
</script>

<section class="section-collectif" data-reveal>
  <div class="section-collectif-shapes" aria-hidden="true">
    <span class="shape shape-1"></span>
    <span class="shape shape-2"></span>
    <span class="shape shape-3"></span>
  </div>

  <div class="section-collectif-inner">
    <div class="section-collectif-header">
      <h2 class="section-collectif-title">
        L'entrepreneuriat est un sport <span class="highlight">collectif.</span>
      </h2>
      <p class="section-collectif-desc">
        Le manque d'entourage est le premier frein à la réussite des indépendants et créatifs. Boost casse cette barrière en créant des ponts entre ceux qui vivent les mêmes défis.
      </p>
    </div>
    <div class="section-collectif-graph">
      <svg
        bind:this={graphEl}
        class="graph-svg"
        viewBox="0 0 1280 500"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Graphique comparant la progression Avec Boost et Sans Boost"
      >
        <defs>
          <linearGradient id="grad-avec" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#184DD9" stop-opacity="0.22" />
            <stop offset="100%" stop-color="#184DD9" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="grad-sans" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#184DD9" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#184DD9" stop-opacity="0" />
          </linearGradient>
          <clipPath id="reveal-clip">
            <rect bind:this={clipRect} x="0" y="0" width="0" height="500" />
          </clipPath>
        </defs>

        <!-- Subtle baseline -->
        <line
          x1="60"
          y1="440"
          x2="1180"
          y2="440"
          stroke="#d1d5db"
          stroke-width="1"
          stroke-dasharray="2 5"
        />

        <!-- Curves + areas, revealed left-to-right via clipPath -->
        <g clip-path="url(#reveal-clip)">
          <!-- Sans Boost: rises early, peaks, then declines -->
          <path
            d="M 60 425 C 180 410, 280 200, 460 200 C 620 200, 740 280, 860 360 C 980 410, 1080 425, 1180 430 L 1180 440 L 60 440 Z"
            fill="url(#grad-sans)"
          />
          <path
            bind:this={sansPath}
            d="M 60 425 C 180 410, 280 200, 460 200 C 620 200, 740 280, 860 360 C 980 410, 1080 425, 1180 430"
            fill="none"
            stroke="#184DD9"
            stroke-opacity="0.4"
            stroke-width="3.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <!-- Avec Boost: gradual rise, then steep surge as Sans declines -->
          <path
            d="M 60 425 C 220 420, 360 380, 500 360 C 620 350, 720 340, 820 310 C 920 270, 1020 150, 1180 60 L 1180 440 L 60 440 Z"
            fill="url(#grad-avec)"
          />
          <path
            bind:this={avecPath}
            d="M 60 425 C 220 420, 360 380, 500 360 C 620 350, 720 340, 820 310 C 920 270, 1020 150, 1180 60"
            fill="none"
            stroke="#184DD9"
            stroke-width="4.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>

        <!-- Sans Boost label (marks the early peak before the decline) -->
        <g bind:this={sansLabelGroup}>
          <line
            bind:this={sansConnector}
            x1="280"
            y1="98"
            x2="280"
            y2="270"
            stroke="#184DD9"
            stroke-opacity="0.45"
            stroke-width="1.5"
          />
          <circle
            bind:this={sansDot}
            cx="280"
            cy="270"
            r="7"
            fill="#ffffff"
            stroke="#184DD9"
            stroke-opacity="0.6"
            stroke-width="2.5"
          />
          <rect
            x="180"
            y="50"
            width="200"
            height="48"
            rx="24"
            fill="#ffffff"
            stroke="#184DD9"
            stroke-opacity="0.35"
            stroke-width="1.5"
          />
          <text
            x="280"
            y="80"
            text-anchor="middle"
            fill="#184DD9"
            fill-opacity="0.75"
            font-size="18"
            font-weight="600"
          >Sans Boost</text>
        </g>

        <!-- Avec Boost label (marks the surge after the curves cross) -->
        <g bind:this={avecLabelGroup}>
          <line
            bind:this={avecConnector}
            x1="900"
            y1="98"
            x2="900"
            y2="262"
            stroke="#184DD9"
            stroke-opacity="0.7"
            stroke-width="1.5"
          />
          <circle
            bind:this={avecDot}
            cx="900"
            cy="262"
            r="8"
            fill="#184DD9"
          />
          <rect x="800" y="50" width="200" height="48" rx="24" fill="#184DD9" />
          <text
            x="900"
            y="80"
            text-anchor="middle"
            fill="#ffffff"
            font-size="18"
            font-weight="600"
          >Avec Boost</text>
        </g>
      </svg>
    </div>
  </div>
</section>

<style>
  .section-collectif {
    position: relative;
    background: var(--blanc);
    padding: 6rem 0 6rem 24px;
    overflow: visible;
  }

  .section-collectif-shapes {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    background: var(--bleu-clair);
    opacity: 0.5;
  }

  .shape-1 {
    width: 400px;
    height: 400px;
    top: -120px;
    left: -80px;
    filter: blur(60px);
  }

  .shape-2 {
    width: 320px;
    height: 320px;
    top: -60px;
    right: -60px;
    filter: blur(50px);
  }

  .shape-3 {
    width: 200px;
    height: 200px;
    top: 30%;
    right: 15%;
    opacity: 0.35;
    filter: blur(40px);
  }

  .section-collectif-inner {
    position: relative;
    z-index: 1;
    max-width: 1320px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    overflow: visible;
  }

  .section-collectif-header {
    max-width: 620px;
    align-self: flex-start;
    text-align: left;
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

  .section-collectif-graph {
    /* Extend from the inner's left edge all the way to the right viewport edge.
       On viewports wider than 1320px, this adds the right gutter to the width. */
    width: calc(100% + max(0px, (100vw - 1320px) / 2));
    display: flex;
    justify-content: flex-end;
    overflow: visible;
    min-width: 0;
  }

  .section-collectif-graph .graph-svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  @media (max-width: 900px) {
    .section-collectif {
      padding: 4rem 24px;
    }

    .section-collectif-graph {
      width: 100%;
      justify-content: center;
    }

    .section-collectif-inner {
      gap: 2rem;
    }

    .section-collectif-header {
      max-width: none;
      text-align: center;
    }

    .section-collectif-title {
      font-size: 1.75rem;
      text-align: center;
    }

    .section-collectif-desc {
      font-size: 16px;
    }

    .section-collectif-graph .graph-svg {
      width: 100%;
      max-width: 100%;
    }
  }
</style>
