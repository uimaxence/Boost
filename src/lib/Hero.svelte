<script>
  import ButtonCta from './ButtonCta.svelte';
  import FranceMap from './FranceMap.svelte';
  import { onMount } from 'svelte';

  let count = 0;
  const target = 20;

  onMount(() => {
    const step = () => {
      if (count < target) {
        count++;
        setTimeout(step, 60);
      }
    };
    setTimeout(step, 800);
  });
</script>

<section class="hero" data-reveal>
  <!-- Carte D3 en absolute derrière tout -->
  <div class="hero-map">
    <FranceMap />
  </div>

  <!-- Dégradé blanc pour protéger le texte -->
  <div class="hero-fade" aria-hidden="true"></div>

  <div class="hero-inner">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="hero-title-bold">Arrête d'entreprendre seul.</span>
        <span class="hero-title-medium">Rejoins un réseau local.</span>
      </h1>
      <p class="hero-desc">
        <span class="hero-dash">—</span> Le Club Boost rassemble la nouvelle génération d'entrepreneurs au sein d'un réseau d'entraide local et national. Accède à l'écosystème qui manquait à ton business.
      </p>
      <div class="hero-cta">
        <ButtonCta href="#candidater" label="Candidater au Club" />
        <div class="hero-social-proof">
          <div class="avatar-stack">
            <span class="avatar" style="background: #3b82f6;">M</span>
            <span class="avatar" style="background: #6366f1;">L</span>
            <span class="avatar" style="background: #8b5cf6;">R</span>
            <span class="avatar" style="background: #2064F0;">P</span>
          </div>
          <p class="hero-cta-note">
            <span class="note-count">+{count}</span> nouveaux inscrits cette semaine
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    background: var(--blanc);
    padding: 10rem 0 6rem;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  /* Carte D3 en absolute */
  .hero-map {
    position: absolute;
    top: -10%;
    right: -10%;
    width: 70%;
    height: 120%;
    pointer-events: auto;
    mask-image: radial-gradient(ellipse 80% 70% at 60% 50%, black 40%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 70% at 60% 50%, black 40%, transparent 100%);
  }

  /* Dégradé blanc couvrant la zone texte */
  .hero-fade {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background: linear-gradient(
      to right,
      rgba(255,255,255,1) 0%,
      rgba(255,255,255,1) 25%,
      rgba(255,255,255,0.5) 40%,
      rgba(255,255,255,0) 55%
    );
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 64px;
  }

  .hero-content {
    max-width: 520px;
  }

  .hero-title {
    font-size: 42px;
    line-height: 1.15;
    color: var(--bleu-950);
    margin: 0 0 1.5rem;
    letter-spacing: -0.02em;
  }

  .hero-title-bold {
    font-weight: 700;
    display: block;
  }

  .hero-title-medium {
    font-weight: 500;
    display: block;
  }

  .hero-desc {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    color: var(--gris-700);
    margin: 0 0 2rem;
  }

  .hero-dash {
    color: var(--bleu-600);
  }

  .hero-cta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Social proof avec avatars */
  .hero-social-proof {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .avatar-stack {
    display: flex;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    border: 2px solid white;
    margin-right: -10px;
    animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  .avatar:nth-child(1) { animation-delay: 0.9s; }
  .avatar:nth-child(2) { animation-delay: 1.05s; }
  .avatar:nth-child(3) { animation-delay: 1.2s; }
  .avatar:nth-child(4) { animation-delay: 1.35s; }

  .avatar:last-child {
    margin-right: 0;
  }

  @keyframes popIn {
    0% { opacity: 0; transform: scale(0); }
    100% { opacity: 1; transform: scale(1); }
  }

  .hero-cta-note {
    font-size: 0.875rem;
    color: var(--gris-400);
    margin: 0;
  }

  .note-count {
    font-weight: 600;
    color: var(--bleu-600);
  }

  /* ---- Responsive ---- */

  @media (max-width: 1100px) {
    .hero-map {
      right: -15%;
      width: 70%;
    }

    .hero-fade {
      background: linear-gradient(
        to right,
        rgba(255,255,255,1) 0%,
        rgba(255,255,255,1) 20%,
        rgba(255,255,255,0.5) 35%,
        rgba(255,255,255,0) 50%
      );
    }
  }

  @media (max-width: 900px) {
    .hero {
      padding: 6rem 0 0;
      min-height: auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      overflow: hidden;
    }

    .hero-inner {
      position: relative;
      z-index: 2;
      padding: 0 1.5rem;
      order: 1;
    }

    .hero-fade {
      display: none;
    }

    .hero-map {
      position: relative;
      order: 2;
      top: auto;
      right: auto;
      width: 100%;
      height: 340px;
      margin-top: -1rem;
      pointer-events: none;
      mask-image: linear-gradient(to bottom, black 30%, transparent 95%);
      -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 95%);
    }

    .hero-content {
      max-width: none;
    }

    .hero-title {
      font-size: 2rem;
    }

    .hero-desc {
      font-size: 16px;
    }

    .hero-social-proof {
      flex-wrap: wrap;
    }

    .hero-cta-note {
      font-size: 0.8125rem;
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding: 5.5rem 0 0;
    }

    .hero-inner {
      padding: 0 1.5rem;
    }

    .hero-title {
      font-size: 1.75rem;
    }

    .hero-map {
      height: 300px;
    }
  }
</style>
