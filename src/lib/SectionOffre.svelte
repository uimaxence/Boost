<script>
  // Section Offre — carte unique avec toggle hebdo/mensuel
  let isMonthly = true;
</script>

<section class="offre" id="offre" data-reveal>
  <!-- Anneaux décoratifs -->
  <div class="offre-anneau offre-anneau--right" aria-hidden="true">
    <svg viewBox="0 0 500 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="500" cy="450" r="300" stroke="url(#or0)" stroke-width="80" opacity="0.12"/>
      <circle cx="500" cy="450" r="400" stroke="#184DD9" stroke-opacity="0.06" stroke-width="1.5"/>
      <circle cx="500" cy="450" r="200" stroke="#184DD9" stroke-opacity="0.04" stroke-width="1.5"/>
      <defs>
        <linearGradient id="or0" x1="500" y1="50" x2="500" y2="850" gradientUnits="userSpaceOnUse">
          <stop stop-color="#184DD9" stop-opacity="0.05"/>
          <stop offset="1" stop-color="#0D2973" stop-opacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
  <div class="offre-anneau offre-anneau--left" aria-hidden="true">
    <svg viewBox="0 0 500 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="450" r="300" stroke="url(#ol0)" stroke-width="80" opacity="0.12"/>
      <circle cx="0" cy="450" r="400" stroke="#184DD9" stroke-opacity="0.06" stroke-width="1.5"/>
      <circle cx="0" cy="450" r="200" stroke="#184DD9" stroke-opacity="0.04" stroke-width="1.5"/>
      <defs>
        <linearGradient id="ol0" x1="0" y1="50" x2="0" y2="850" gradientUnits="userSpaceOnUse">
          <stop stop-color="#184DD9" stop-opacity="0.05"/>
          <stop offset="1" stop-color="#0D2973" stop-opacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>
  </div>

  <div class="offre-inner">
    <div class="offre-header">
      <span class="offre-pill">Tarifs</span>
      <h2 class="offre-title">Rejoins le Club Boost<br />à un tarif accessible</h2>
      <p class="offre-subtitle">
        Une adhésion pensée pour être accessible à tous les entrepreneurs, tout en finançant la croissance du projet.
      </p>
    </div>

    <div class="offre-card-group">
      <div class="offre-card">
        <div class="offre-card-top">
          <div class="offre-card-left">
            <h3 class="offre-card-name">Adhésion Club Boost</h3>
            <div class="offre-toggle-wrap">
              <button
                class="offre-toggle-btn"
                class:active={!isMonthly}
                on:click={() => isMonthly = false}
              >Par semaine</button>
              <button
                class="offre-toggle-btn"
                class:active={isMonthly}
                on:click={() => isMonthly = true}
              >Par mois</button>
            </div>
          </div>
          <div class="offre-price">
            <span class="offre-amount">
              {isMonthly ? '19,00' : '4,75'}&nbsp;€
            </span>
            <span class="offre-period">/{isMonthly ? 'mois' : 'semaine'}</span>
          </div>
        </div>

        <p class="offre-card-note">
          {isMonthly ? "L'équivalent d'un café par semaine" : 'Sans engagement, résiliable à tout moment'}
        </p>

        <div class="offre-divider"></div>

        <div class="offre-card-features">
          <div class="offre-feature">
            <svg class="offre-check" viewBox="0 0 20 20" fill="none"><path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Groupe privé entre entrepreneurs</span>
          </div>
          <div class="offre-feature">
            <svg class="offre-check" viewBox="0 0 20 20" fill="none"><path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Rencontres régulières dans ta ville</span>
          </div>
          <div class="offre-feature">
            <svg class="offre-check" viewBox="0 0 20 20" fill="none"><path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Mises en relation et opportunités business</span>
          </div>
          <div class="offre-feature">
            <svg class="offre-check" viewBox="0 0 20 20" fill="none"><path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Réseau inter-villes à l'échelle nationale</span>
          </div>
          <div class="offre-feature">
            <svg class="offre-check" viewBox="0 0 20 20" fill="none"><path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Accès prioritaire à la future application</span>
          </div>
        </div>

        <a href="#candidater" class="offre-cta">Candidater</a>
      </div>

      <!-- Parrainage -->
      <div class="offre-parrainage">
        <!-- Cadeau animé SVG -->
        <div class="gift-wrap" aria-hidden="true">
          <svg class="gift-svg" viewBox="0 0 32 32" fill="none">
            <!-- Boîte -->
            <rect class="gift-box" x="5" y="16" width="22" height="13" rx="2" fill="#2064F0"/>
            <rect x="14" y="16" width="4" height="13" fill="#184DD9"/>
            <!-- Couvercle -->
            <g class="gift-lid">
              <rect x="3" y="12" width="26" height="5" rx="1.5" fill="#2064F0"/>
              <rect x="14" y="12" width="4" height="5" fill="#184DD9"/>
            </g>
            <!-- Noeud -->
            <g class="gift-lid">
              <path d="M16 12c0 0-3-4-6-4s-3 2-2 3 4 1 8 1z" fill="#184DD9"/>
              <path d="M16 12c0 0 3-4 6-4s3 2 2 3-4 1-8 1z" fill="#184DD9"/>
            </g>
            <!-- Confettis -->
            <circle class="confetti c1" cx="16" cy="10" r="1.5" fill="#2064F0"/>
            <circle class="confetti c2" cx="16" cy="10" r="1.2" fill="#184DD9"/>
            <rect class="confetti c3" x="15" y="10" width="2.5" height="1.2" rx="0.6" fill="#2064F0"/>
            <circle class="confetti c4" cx="16" cy="10" r="1" fill="#184DD9"/>
            <rect class="confetti c5" x="15.5" y="10" width="2" height="1" rx="0.5" fill="#2064F0"/>
            <circle class="confetti c6" cx="16" cy="10" r="1.3" fill="#184DD9"/>
          </svg>
        </div>
        <span class="parrainage-text">4 semaines offertes en parrainant un membre</span>
      </div>
    </div>
  </div>
</section>

<style>
  .offre {
    background: var(--blanc);
    padding: 6rem 24px;
    position: relative;
    overflow: hidden;
  }

  /* --- Anneaux décoratifs --- */
  .offre-anneau {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 480px;
    pointer-events: none;
    z-index: 0;
  }

  .offre-anneau--right {
    right: -140px;
  }

  .offre-anneau--left {
    left: -140px;
  }

  .offre-anneau svg {
    width: 100%;
    height: auto;
  }

  .offre-inner {
    max-width: 640px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* --- Header --- */
  .offre-header {
    text-align: center;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .offre-pill {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--bleu-950);
    background: var(--blanc);
    border: 1px solid var(--gris-200);
    padding: 0.4rem 1rem;
    border-radius: 999px;
    margin-bottom: 1.25rem;
  }

  .offre-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--bleu-950);
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .offre-subtitle {
    font-size: 1.05rem;
    color: var(--gris-700);
    line-height: 1.6;
    max-width: 520px;
    margin: 0;
  }

  /* --- Card group --- */
  .offre-card-group {
    display: flex;
    flex-direction: column;
  }

  .offre-card {
    background: var(--blanc);
    border: 1px solid var(--gris-200);
    border-radius: 16px 16px 0 0;
    padding: 2.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    box-shadow: 0 2px 16px rgba(21, 37, 86, 0.06);
  }

  .offre-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .offre-card-left {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .offre-card-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--bleu-950);
    margin: 0;
  }

  .offre-toggle-wrap {
    display: inline-flex;
    background: #f1f4f9;
    border-radius: 8px;
    padding: 3px;
  }

  .offre-toggle-btn {
    padding: 0.4rem 0.85rem;
    font-size: 0.8rem;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--gris-400);
    cursor: pointer;
    transition: all 0.25s ease;
    line-height: 1.3;
    text-align: center;
    white-space: nowrap;
  }

  .offre-toggle-btn.active {
    background: var(--blanc);
    color: var(--bleu-950);
    font-weight: 600;
    box-shadow: 0 1px 4px rgba(21, 37, 86, 0.1);
  }

  .offre-price {
    display: flex;
    align-items: baseline;
    gap: 0.2rem;
    flex-shrink: 0;
  }

  .offre-amount {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--bleu-600);
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .offre-period {
    font-size: 0.9rem;
    color: var(--gris-400);
    font-weight: 500;
  }

  .offre-card-note {
    font-size: 0.85rem;
    color: var(--gris-400);
    margin: -0.25rem 0 0;
    line-height: 1.4;
  }

  .offre-divider {
    height: 1px;
    background: var(--gris-200);
  }

  .offre-card-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem 1.5rem;
  }

  .offre-feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--gris-700);
    line-height: 1.3;
  }

  .offre-check {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--bleu-600);
  }

  .offre-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    background: var(--bleu-700);
    color: var(--blanc);
    align-self: flex-start;
    transition: background 0.2s ease, transform 0.15s ease;
    margin-top: 0.25rem;
  }

  .offre-cta:hover {
    background: var(--bleu-600);
    transform: translateY(-1px);
  }

  /* --- Parrainage --- */
  .offre-parrainage {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    background: var(--bleu-clair);
    border: 1px solid var(--gris-200);
    border-top: none;
    border-radius: 0 0 16px 16px;
    padding: 0.85rem 1.5rem;
    overflow: hidden;
  }

  /* --- Gift icon animé --- */
  .gift-wrap {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  .gift-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .gift-lid {
    animation: lid-bounce 3s ease-in-out infinite;
    transform-origin: 16px 14px;
  }

  @keyframes lid-bounce {
    0%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
    50% { transform: translateY(-5px); }
    70% { transform: translateY(0); }
  }

  /* Confettis */
  .confetti {
    opacity: 0;
    animation: confetti-pop 3s ease-out infinite;
  }

  .c1 { animation-delay: 0s; }
  .c2 { animation-delay: 0.08s; }
  .c3 { animation-delay: 0.15s; }
  .c4 { animation-delay: 0.05s; }
  .c5 { animation-delay: 0.12s; }
  .c6 { animation-delay: 0.1s; }

  @keyframes confetti-pop {
    0%, 20% { opacity: 0; transform: translate(0, 0) scale(0.5) rotate(0deg); }
    35% { opacity: 1; }
    60% { opacity: 0; }
    100% { opacity: 0; transform: translate(var(--cx), var(--cy)) scale(0.3) rotate(var(--cr)); }
  }

  .c1 { --cx: -8px; --cy: -14px; --cr: 120deg; }
  .c2 { --cx: 7px;  --cy: -16px; --cr: -90deg; }
  .c3 { --cx: -5px; --cy: -18px; --cr: 200deg; }
  .c4 { --cx: 10px; --cy: -12px; --cr: -150deg; }
  .c5 { --cx: -10px;--cy: -10px; --cr: 80deg; }
  .c6 { --cx: 3px;  --cy: -20px; --cr: -60deg; }

  /* --- Shimmer text --- */
  .parrainage-text {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--bleu-950);
    background: linear-gradient(
      90deg,
      var(--bleu-950) 0%,
      var(--bleu-950) 35%,
      var(--bleu-600) 50%,
      var(--bleu-950) 65%,
      var(--bleu-950) 100%
    );
    background-size: 250% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }

  /* --- Mobile --- */
  @media (max-width: 768px) {
    .offre {
      padding: 4rem 1.5rem;
    }

    .offre-anneau {
      width: 320px;
    }

    .offre-anneau--right {
      right: -100px;
    }

    .offre-anneau--left {
      left: -100px;
    }

    .offre-header {
      align-items: flex-start;
      text-align: left;
      margin-bottom: 2.5rem;
    }

    .offre-title {
      font-size: 1.625rem;
    }

    .offre-title br {
      display: none;
    }

    .offre-subtitle {
      font-size: 0.95rem;
    }

    .offre-card {
      padding: 1.75rem 1.5rem;
    }

    .offre-card-top {
      flex-direction: column;
      gap: 1rem;
    }

    .offre-card-features {
      grid-template-columns: 1fr;
    }

    .offre-parrainage {
      padding: 0.75rem 1rem;
    }

    .parrainage-text {
      font-size: 0.8rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .gift-lid,
    .confetti,
    .parrainage-text {
      animation: none;
    }

    .parrainage-text {
      -webkit-text-fill-color: var(--bleu-950);
    }
  }
</style>
