<script>
  // Section 3 piliers — fond bleu foncé
</script>

<section class="piliers" id="concept" data-reveal>
  <div class="piliers-inner">
    <h2 class="piliers-title">
      Rejoindre le Club Boost, c'est intégrer<br />
      un environnement qui accélère ton<br />
      parcours entrepreneurial.
    </h2>
    <div class="piliers-grid">
      <!-- Card LOCAL -->
      <div class="pilier-card">
        <span class="pilier-label">LOCAL</span>
        <h3 class="pilier-name">L'ancrage local</h3>
        <p class="pilier-desc">
          Rejoins un Club Boost dans ta ville. Des rencontres physiques pour transformer les connexions digitales en de réelles opportunités.
        </p>
      </div>
      <!-- Card ENTRAIDE -->
      <div class="pilier-card">
        <span class="pilier-label">ENTRAIDE</span>
        <h3 class="pilier-name">L'esprit club</h3>
        <p class="pilier-desc">
          Un accès privilégié à des opportunités et des recommandations entre membres. Sans jugement, juste de l'entraide.
        </p>
      </div>
      <!-- Card RÉSEAU -->
      <div class="pilier-card">
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

  .piliers-inner {
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
