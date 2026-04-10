<script>
  import bgCalWebp from '../../assets/bg-section-cal.webp?url';
</script>

<section class="cta-final" id="candidater" data-reveal>
  <div class="cta-bg" style="background-image: url({bgCalWebp});"></div>
  <div class="cta-overlay"></div>
  <div class="cta-inner">
    <h2 class="cta-title">Pour rejoindre l'aventure, c'est par ici</h2>
    <div class="cta-cal-wrapper">
      <!-- Cal.com embed placeholder — remplacer par l'iframe ou le script Cal.com -->
      <div class="cal-embed-placeholder">
        <div class="cal-header">
          <div class="cal-month">
            <span class="cal-nav-arrow">‹</span>
            <span class="cal-month-name">Appel découverte SEO</span>
            <span class="cal-nav-arrow">›</span>
          </div>
        </div>
        <div class="cal-grid">
          {#each ['L', 'M', 'M', 'J', 'V', 'S', 'D'] as day}
            <span class="cal-day-name">{day}</span>
          {/each}
          {#each Array(31) as _, i}
            <span class="cal-day" class:active={i === 14}>{i + 1}</span>
          {/each}
        </div>
        <p class="cal-subtitle">Choisi un créneau qui te convient</p>
      </div>
    </div>
  </div>
</section>

<style>
  .cta-final {
    position: relative;
    padding: 6rem 24px;
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
  }

  .cta-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 22, 40, 0.6);
  }

  .cta-inner {
    position: relative;
    z-index: 1;
    max-width: 800px;
    width: 100%;
    text-align: center;
  }

  .cta-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--blanc);
    margin: 0 0 3rem;
    letter-spacing: -0.02em;
  }

  .cta-cal-wrapper {
    background: var(--blanc);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .cal-embed-placeholder {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .cal-header {
    display: flex;
    justify-content: center;
  }

  .cal-month {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--bleu-950);
  }

  .cal-nav-arrow {
    color: var(--gris-400);
    cursor: pointer;
    font-size: 1.25rem;
  }

  .cal-month-name {
    font-weight: 600;
  }

  .cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    text-align: center;
  }

  .cal-day-name {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--gris-400);
    padding: 8px 0;
    text-transform: uppercase;
  }

  .cal-day {
    font-size: 0.875rem;
    color: var(--bleu-950);
    padding: 8px 0;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .cal-day:hover {
    background: var(--bleu-clair);
  }

  .cal-day.active {
    background: var(--bleu-600);
    color: var(--blanc);
    font-weight: 600;
  }

  .cal-subtitle {
    font-size: 0.875rem;
    color: var(--gris-400);
    margin: 0;
    text-align: center;
  }

  @media (max-width: 768px) {
    .cta-final {
      padding: 4rem 1.5rem;
      min-height: auto;
    }

    .cta-inner {
      text-align: left;
    }

    .cta-title {
      font-size: 1.625rem;
      text-align: left;
    }

    .cta-cal-wrapper {
      padding: 1.25rem;
    }

    .cal-grid {
      gap: 2px;
    }

    .cal-day,
    .cal-day-name {
      font-size: 0.8rem;
      padding: 6px 0;
    }
  }
</style>
