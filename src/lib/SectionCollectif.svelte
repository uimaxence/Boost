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
      .to(sansLabelGroup, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.2)
      .to(sansConnector, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, 1.3)
      .to(sansDot, { attr: { r: 5.5 }, opacity: 1, duration: 0.4, ease: 'back.out(2.2)' }, 1.7)
      .to(avecLabelGroup, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.0)
      .to(avecConnector, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, 2.1)
      .to(avecDot, { attr: { r: 6 }, opacity: 1, duration: 0.4, ease: 'back.out(2.2)' }, 2.5);
  });
</script>

<section class="section-collectif" data-reveal>
  <!-- Graphique en fond, toute la largeur -->
  <div class="section-collectif-graph">
    <div class="graph-fade" aria-hidden="true"></div>
    <svg
      bind:this={graphEl}
      class="graph-svg"
      viewBox={isMobile ? "80 20 1060 460" : "0 0 1440 520"}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Graphique comparant la progression Avec Boost et Sans Boost"
    >
      <defs>
        <linearGradient id="grad-avec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#184DD9" stop-opacity="0.2" />
          <stop offset="60%" stop-color="#184DD9" stop-opacity="0.06" />
          <stop offset="100%" stop-color="#184DD9" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="grad-sans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#152556" stop-opacity="0.06" />
          <stop offset="100%" stop-color="#152556" stop-opacity="0" />
        </linearGradient>
        <clipPath id="reveal-clip">
          <rect bind:this={clipRect} x="0" y="0" width="0" height="520" />
        </clipPath>
      </defs>

      {#each [160, 260, 360, 460] as yPos}
        <line x1="0" y1={yPos} x2="1440" y2={yPos} stroke="#c7d2fe" stroke-opacity="0.2" stroke-width="1" stroke-dasharray="4 8" />
      {/each}

      {#each Array(13) as _, i}
        <line x1={110 + i * 100} y1="40" x2={110 + i * 100} y2="460" stroke="#c7d2fe" stroke-opacity="0.15" stroke-width="1" />
      {/each}

      <g clip-path="url(#reveal-clip)">
        <!-- Sans Boost — courbe douce avec inflexions naturelles -->
        <path d="M 0 450 C 40 449, 80 446, 120 438 C 160 430, 190 418, 230 400 C 270 382, 300 360, 340 342 C 380 324, 400 312, 440 305 C 480 298, 510 296, 550 298 C 590 300, 620 308, 660 318 C 700 328, 730 338, 770 350 C 810 362, 850 372, 890 380 C 930 388, 960 394, 1000 400 C 1040 406, 1080 412, 1120 418 C 1160 424, 1200 430, 1240 436 C 1280 440, 1320 444, 1360 447 C 1400 449, 1440 450, 1440 450 L 1440 460 L 0 460 Z" fill="url(#grad-sans)" />
        <path bind:this={sansPath} d="M 0 450 C 40 449, 80 446, 120 438 C 160 430, 190 418, 230 400 C 270 382, 300 360, 340 342 C 380 324, 400 312, 440 305 C 480 298, 510 296, 550 298 C 590 300, 620 308, 660 318 C 700 328, 730 338, 770 350 C 810 362, 850 372, 890 380 C 930 388, 960 394, 1000 400 C 1040 406, 1080 412, 1120 418 C 1160 424, 1200 430, 1240 436 C 1280 440, 1320 444, 1360 447 C 1400 449, 1440 450, 1440 450" fill="none" stroke="#152556" stroke-opacity="0.15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        {#each [[120,438],[230,400],[340,342],[440,305],[550,298],[660,318],[770,350],[890,380],[1000,400],[1120,418],[1240,436]] as [cx, cy]}
          <circle {cx} {cy} r="3" fill="#ffffff" stroke="#152556" stroke-opacity="0.18" stroke-width="1.5" />
        {/each}

        <!-- Avec Boost — courbe douce montante avec inflexions -->
        <path d="M 0 450 C 40 449, 80 447, 120 443 C 160 439, 200 433, 240 425 C 280 417, 310 412, 350 405 C 390 398, 420 393, 460 386 C 500 379, 530 374, 570 365 C 610 356, 640 348, 680 335 C 720 322, 750 310, 790 292 C 830 274, 860 258, 900 238 C 940 218, 970 200, 1010 178 C 1050 156, 1080 138, 1120 118 C 1160 98, 1200 82, 1240 68 C 1280 54, 1320 44, 1360 38 C 1400 32, 1440 28, 1440 28 L 1440 460 L 0 460 Z" fill="url(#grad-avec)" />
        <path bind:this={avecPath} d="M 0 450 C 40 449, 80 447, 120 443 C 160 439, 200 433, 240 425 C 280 417, 310 412, 350 405 C 390 398, 420 393, 460 386 C 500 379, 530 374, 570 365 C 610 356, 640 348, 680 335 C 720 322, 750 310, 790 292 C 830 274, 860 258, 900 238 C 940 218, 970 200, 1010 178 C 1050 156, 1080 138, 1120 118 C 1160 98, 1200 82, 1240 68 C 1280 54, 1320 44, 1360 38 C 1400 32, 1440 28, 1440 28" fill="none" stroke="#184DD9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        {#each [[120,443],[240,425],[350,405],[460,386],[570,365],[680,335],[790,292],[900,238],[1010,178],[1120,118],[1240,68],[1360,38]] as [cx, cy]}
          <circle {cx} {cy} r="3.5" fill="#ffffff" stroke="#184DD9" stroke-width="1.5" />
        {/each}
      </g>

      <!-- Sans Boost label -->
      <g bind:this={sansLabelGroup}>
        <line bind:this={sansConnector} x1="440" y1={isMobile ? 200 : 230} x2="440" y2="300" stroke="#152556" stroke-opacity="0.2" stroke-width={isMobile ? 2 : 1} />
        <circle bind:this={sansDot} cx="440" cy="305" r={isMobile ? 8 : 5} fill="#ffffff" stroke="#152556" stroke-opacity="0.3" stroke-width={isMobile ? 3 : 1.5} />
        <rect x={isMobile ? 308 : 348} y={isMobile ? 165 : 208} width={isMobile ? 264 : 184} height={isMobile ? 60 : 38} rx={isMobile ? 30 : 19} fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
        <text x="440" y={isMobile ? 203 : 233} text-anchor="middle" fill="#152556" fill-opacity="0.5" font-size={isMobile ? 28 : 14} font-weight="600">Sans Boost</text>
      </g>

      <!-- Avec Boost label -->
      <g bind:this={avecLabelGroup}>
        <line bind:this={avecConnector} x1="900" y1={isMobile ? 140 : 165} x2="900" y2="233" stroke="#184DD9" stroke-opacity="0.3" stroke-width={isMobile ? 2 : 1} />
        <circle bind:this={avecDot} cx="900" cy="238" r={isMobile ? 8 : 5.5} fill="#ffffff" stroke="#184DD9" stroke-opacity="0.5" stroke-width={isMobile ? 3 : 1.5} />
        <rect x={isMobile ? 768 : 808} y={isMobile ? 100 : 138} width={isMobile ? 264 : 184} height={isMobile ? 60 : 38} rx={isMobile ? 30 : 19} fill="#184DD9" />
        <text x="900" y={isMobile ? 138 : 163} text-anchor="middle" fill="#ffffff" font-size={isMobile ? 28 : 14} font-weight="600">Avec Boost</text>
      </g>
    </svg>
  </div>

  <!-- Texte en superposition dans l'angle haut gauche -->
  <div class="section-collectif-inner">
    <div class="section-collectif-content">
      <div class="section-collectif-header">
        <h2 class="section-collectif-title">
          L'entrepreneuriat est un sport <span class="highlight">collectif.</span>
        </h2>
        <p class="section-collectif-desc">
          Le manque d'entourage est le premier frein à la réussite des indépendants et créatifs. Boost casse cette barrière en créant des ponts entre ceux qui vivent les mêmes défis.
        </p>
      </div>

      <div class="section-collectif-stats">
        <div class="collectif-stat">
          <span class="collectif-stat-number">x3</span>
          <span class="collectif-stat-label">de croissance en moyenne<br/>avec un réseau actif</span>
        </div>
        <div class="collectif-stat">
          <span class="collectif-stat-number">87%</span>
          <span class="collectif-stat-label">des freelances isolés<br/>abandonnent en 2 ans</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .section-collectif {
    position: relative;
    background: linear-gradient(180deg, var(--blanc) 0%, #f0f4fb 100%);
    padding: 8rem 0 0;
    overflow: hidden;
  }

  /* Graphique en fond — grande zone basse */
  .section-collectif-graph {
    position: absolute;
    top: 35%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  /* Dégradé gauche pour fondre la courbe dans le texte */
  .graph-fade {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 30%;
    background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%);
    z-index: 2;
    pointer-events: none;
  }

  .graph-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* Contenu texte — au-dessus du graphique */
  .section-collectif-inner {
    position: relative;
    z-index: 3;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 24px 30rem;
  }

  .section-collectif-content {
    max-width: 480px;
  }

  .section-collectif-header {
    margin-bottom: 3rem;
  }

  .section-collectif-title {
    font-size: 2.75rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--bleu-950);
    margin: 0 0 1.25rem;
    letter-spacing: -0.02em;
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

  .section-collectif-stats {
    display: flex;
    gap: 2.5rem;
  }

  .collectif-stat {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .collectif-stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--bleu-600);
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .collectif-stat-label {
    font-size: 0.85rem;
    line-height: 1.4;
    color: var(--gris-700);
  }

  @media (max-width: 900px) {
    .section-collectif {
      padding: 4rem 0 0;
    }

    .section-collectif-inner {
      padding: 0 1.5rem 2rem;
    }

    .section-collectif-content {
      max-width: none;
    }

    .section-collectif-title {
      font-size: 1.75rem;
    }

    .section-collectif-graph {
      position: relative;
      top: auto;
      margin-top: 1rem;
    }

    .graph-fade {
      display: none;
    }

    .graph-svg {
      position: relative;
      width: 180%;
      margin-left: -40%;
      height: auto;
      min-height: 300px;
    }

    .section-collectif-stats {
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    .collectif-stat-number {
      font-size: 2rem;
    }
  }
</style>
