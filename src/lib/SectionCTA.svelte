<script>
  import { onMount } from 'svelte';
  import bgCalWebp from '../../assets/bg-section-cal.webp?url';

  onMount(() => {
    // Cal.com inline embed init (script officiel)
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.eu/embed/embed.js', 'init');

    window.Cal('init', '15min', { origin: 'https://app.cal.eu' });

    window.Cal.ns['15min']('inline', {
      elementOrSelector: '#my-cal-inline-15min',
      config: { layout: 'month_view' },
      calLink: 'matteorbrt/15min',
    });

    window.Cal.ns['15min']('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
      cssVarsPerTheme: {
        light: { 'cal-border-booker-width': '0px' },
      },
    });

  });
</script>

<section class="cta-final" id="candidater" data-reveal>
  <div class="cta-bg" style="background-image: url({bgCalWebp});"></div>
  <div class="cta-overlay"></div>

  <!-- Lueurs bleues animées -->
  <div class="cta-glow cta-glow-left-1" aria-hidden="true"></div>
  <div class="cta-glow cta-glow-left-2" aria-hidden="true"></div>
  <div class="cta-glow cta-glow-right-1" aria-hidden="true"></div>
  <div class="cta-glow cta-glow-right-2" aria-hidden="true"></div>

  <div class="cta-inner">
    <span class="cta-badge">Candidater</span>
    <h2 class="cta-title">Pour rejoindre <span class="cta-highlight">l'aventure</span>, c'est par ici</h2>
    <p class="cta-subtitle">Réserve un appel de découverte de 15 min avec notre équipe pour en savoir plus sur le Club Boost.</p>
    <div class="cta-cal-wrapper">
      <div id="my-cal-inline-15min" class="cal-inline"></div>
    </div>
  </div>
</section>

<style>
  .cta-final {
    position: relative;
    padding: 6rem 24px 7rem;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .cta-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #0c1a3a;
  }

  .cta-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 22, 40, 0.75);
    z-index: 1;
  }

  /* Lueurs bleues animées — au-dessus de l'overlay */
  .cta-glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 2;
    will-change: transform, opacity;
  }

  .cta-glow-left-1 {
    width: 500px;
    height: 500px;
    left: -100px;
    top: 10%;
    background: radial-gradient(circle, rgba(32, 100, 240, 0.5) 0%, transparent 65%);
    filter: blur(60px);
    animation: glow-drift-1 8s ease-in-out infinite;
  }

  .cta-glow-left-2 {
    width: 350px;
    height: 350px;
    left: -40px;
    bottom: 8%;
    background: radial-gradient(circle, rgba(24, 77, 217, 0.35) 0%, transparent 65%);
    filter: blur(55px);
    animation: glow-drift-2 10s ease-in-out infinite;
  }

  .cta-glow-right-1 {
    width: 480px;
    height: 480px;
    right: -80px;
    top: 15%;
    background: radial-gradient(circle, rgba(32, 100, 240, 0.45) 0%, transparent 65%);
    filter: blur(60px);
    animation: glow-drift-3 9s ease-in-out infinite;
  }

  .cta-glow-right-2 {
    width: 380px;
    height: 380px;
    right: -20px;
    bottom: 5%;
    background: radial-gradient(circle, rgba(24, 77, 217, 0.3) 0%, transparent 65%);
    filter: blur(55px);
    animation: glow-drift-4 11s ease-in-out infinite;
  }

  @keyframes glow-drift-1 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
    50% { transform: translate(30px, 40px) scale(1.15); opacity: 1; }
  }

  @keyframes glow-drift-2 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
    50% { transform: translate(20px, -30px) scale(1.1); opacity: 1; }
  }

  @keyframes glow-drift-3 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
    50% { transform: translate(-25px, 35px) scale(1.12); opacity: 1; }
  }

  @keyframes glow-drift-4 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    50% { transform: translate(-20px, -25px) scale(1.08); opacity: 0.9; }
  }

  .cta-inner {
    position: relative;
    z-index: 3;
    max-width: 960px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cta-badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--blanc);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 0.35rem 1rem;
    border-radius: 999px;
    margin-bottom: 1.25rem;
  }

  .cta-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--blanc);
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .cta-highlight {
    color: var(--bleu-600);
  }

  .cta-subtitle {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
    max-width: 520px;
    margin: 0 0 2.5rem;
  }

  .cta-cal-wrapper {
    background: var(--blanc);
    border-radius: 16px;
    padding: 0.5rem;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.06),
      0 4px 12px rgba(0, 0, 0, 0.06),
      0 20px 50px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.06);
    overflow: hidden;
    width: 100%;
  }

  .cal-inline {
    width: 100%;
    min-height: 400px;
    max-height: 50vh;
    overflow: auto;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    .cta-final {
      padding: 4rem 1.5rem 5rem;
      min-height: auto;
    }

    .cta-inner {
      align-items: flex-start;
    }

    .cta-title {
      font-size: 1.625rem;
      text-align: left;
    }

    .cta-subtitle {
      text-align: left;
      font-size: 0.95rem;
      margin-bottom: 2rem;
    }

    .cta-cal-wrapper {
      padding: 0.25rem;
      border-radius: 12px;
    }

    .cal-inline {
      min-height: 600px;
      max-height: none;
      overflow: visible;
    }

    .cta-glow-left-1,
    .cta-glow-right-1 {
      width: 250px;
      height: 250px;
    }

    .cta-glow-left-2,
    .cta-glow-right-2 {
      width: 180px;
      height: 180px;
    }
  }
</style>
