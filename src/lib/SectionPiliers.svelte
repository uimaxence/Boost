<script>
  // Section 3 piliers — fond vidéo
  import bgVideo from '../../assets/bg-video-section-compress.mp4?url';
</script>

<section class="piliers" id="concept" data-reveal>
  <!-- Vidéo de fond -->
  <video class="piliers-video" autoplay loop muted playsinline>
    <source src={bgVideo} type="video/mp4" />
  </video>
  <div class="piliers-overlay"></div>

  <!-- Éléments graphiques de fond -->
  <div class="piliers-bg" aria-hidden="true">
    <svg class="piliers-shape piliers-shape--1" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    <svg class="piliers-shape piliers-shape--2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
    <svg class="piliers-shape piliers-shape--3" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
    <svg class="piliers-shape piliers-shape--4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>
    <div class="piliers-grid-lines">
      {#each Array(8) as _, i}
        <div class="piliers-hline" style="top: {12 + i * 12}%"></div>
      {/each}
      {#each Array(6) as _, i}
        <div class="piliers-vline" style="left: {10 + i * 16}%"></div>
      {/each}
    </div>
  </div>
  <div class="piliers-inner">
    <h2 class="piliers-title">
      Rejoindre le Club Boost, c'est intégrer<br />
      un environnement qui accélère ton<br />
      parcours entrepreneurial.
    </h2>
    <div class="piliers-grid">
      <!-- Card LOCAL -->
      <div class="pilier-card">
        <div class="pilier-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M16 2C10.48 2 6 6.48 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.52-4.48-10-10-10z" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="16" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <span class="pilier-label">LOCAL</span>
        <h3 class="pilier-name">L'ancrage local</h3>
        <p class="pilier-desc">
          Rejoins un Club Boost dans ta ville. Des rencontres physiques pour transformer les connexions digitales en de réelles opportunités.
        </p>
      </div>
      <!-- Card ENTRAIDE -->
      <div class="pilier-card">
        <div class="pilier-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="11" cy="10" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="21" cy="10" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M4 26c0-4.42 3.58-8 8-8h8c4.42 0 8 3.58 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
        <span class="pilier-label">ENTRAIDE</span>
        <h3 class="pilier-name">L'esprit club</h3>
        <p class="pilier-desc">
          Un accès privilégié à des opportunités et des recommandations entre membres. Sans jugement, juste de l'entraide.
        </p>
      </div>
      <!-- Card RÉSEAU -->
      <div class="pilier-card">
        <div class="pilier-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <ellipse cx="16" cy="16" rx="4" ry="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <span class="pilier-label">RÉSEAU</span>
        <h3 class="pilier-name">Le réseau national</h3>
        <p class="pilier-desc">
          Accède à une communauté d'entrepreneur partout en France. Pose tes questions, partage tes outils, tes galères, et trouve tes futurs partenaires.
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .piliers {
    background: #0c1a3a;
    padding: 6rem 24px;
    position: relative;
    overflow: hidden;
  }

  .piliers-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .piliers-overlay {
    position: absolute;
    inset: 0;
    background: rgba(12, 26, 58, 0.55);
    z-index: 1;
  }

  .piliers-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }

  .piliers-grid-lines {
    position: absolute;
    inset: 0;
  }

  .piliers-hline {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.04);
  }

  .piliers-vline {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.04);
  }

  .piliers-shape {
    position: absolute;
    color: rgba(255, 255, 255, 0.06);
  }

  .piliers-shape--1 {
    width: 22px;
    right: 8%;
    top: 15%;
    animation: pilier-float 9s ease-in-out infinite;
  }

  .piliers-shape--2 {
    width: 16px;
    left: 5%;
    bottom: 20%;
    animation: pilier-float 11s ease-in-out infinite 2s;
  }

  .piliers-shape--3 {
    width: 18px;
    right: 15%;
    bottom: 25%;
    animation: pilier-float 10s ease-in-out infinite 3s;
  }

  .piliers-shape--4 {
    width: 8px;
    left: 12%;
    top: 25%;
    animation: pilier-float 8s ease-in-out infinite 1s;
  }

  @keyframes pilier-float {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(-10px); opacity: 1; }
  }

  .piliers-inner {
    position: relative;
    z-index: 3;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .piliers-title {
    text-align: center;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.25;
    color: var(--blanc);
    margin: 0 0 4rem;
    letter-spacing: -0.02em;
  }

  .piliers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .pilier-card {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .pilier-icon {
    width: 40px;
    height: 40px;
    color: var(--bleu-600);
    margin-bottom: 0.25rem;
  }

  .pilier-icon svg {
    width: 100%;
    height: 100%;
  }

  .pilier-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--bleu-600);
    background: rgba(32, 100, 240, 0.12);
    padding: 4px 12px;
    border-radius: 4px;
    width: fit-content;
  }

  .pilier-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--blanc);
    margin: 0.25rem 0 0;
  }

  .pilier-desc {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }

  @media (max-width: 900px) {
    .piliers {
      padding: 4rem 1.5rem;
    }

    .piliers-title {
      font-size: 1.625rem;
      text-align: left;
      margin-bottom: 2.5rem;
    }

    .piliers-title br {
      display: none;
    }

    .piliers-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
