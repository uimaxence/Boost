<script>
  import matteoPhoto from '../../assets/matteo.webp?url';
</script>

<section class="fondateur" data-reveal>
  <div class="fondateur-bg" aria-hidden="true"></div>
  <div class="fondateur-inner">
    <div class="fondateur-photo">
      <div class="fondateur-img">
        <img src={matteoPhoto} alt="Mattéo, fondateur de Boost" />
      </div>
      <div class="fondateur-badge">
        <span class="badge-dot"></span>
        Fondateur
      </div>
    </div>
    <div class="fondateur-content">
      <span class="fondateur-eyebrow">Mot du fondateur</span>
      <blockquote class="fondateur-quote">
        <span class="quote-mark" aria-hidden="true">“</span>
        À 22 ans, j'ai compris que mon gros frein n'était pas technique, mais humain. J'ai créé Boost pour que personne n'ait à chercher ses réponses seul.
      </blockquote>
      <div class="fondateur-signature">
        <span class="fondateur-name">Mattéo</span>
        <span class="fondateur-sep">·</span>
        <span class="fondateur-role">Fondateur de Boost</span>
      </div>
      <p class="fondateur-context">
        Lancé à Angers, avec l'ambition de connecter la nouvelle génération d'entrepreneurs dans toute la France.
      </p>
    </div>
  </div>
</section>

<style>
  .fondateur {
    background: var(--bleu-950);
    padding: 8rem 24px;
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  .fondateur-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 30%, rgba(32, 100, 240, 0.35), transparent 60%),
      radial-gradient(ellipse 50% 40% at 85% 80%, rgba(24, 77, 217, 0.25), transparent 60%);
    z-index: -1;
    pointer-events: none;
  }

  .fondateur-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 5rem;
    align-items: center;
  }

  .fondateur-photo {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fondateur-img {
    width: 380px;
    height: 460px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    overflow: hidden;
    box-shadow:
      0 30px 60px -20px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset;
    position: relative;
  }

  .fondateur-img::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(21, 37, 86, 0.4));
    pointer-events: none;
  }

  .fondateur-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .fondateur-badge {
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--blanc);
    color: var(--bleu-950);
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 0.625rem 1.25rem;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5);
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--bleu-600);
    box-shadow: 0 0 0 4px rgba(32, 100, 240, 0.2);
  }

  .fondateur-content {
    max-width: 680px;
  }

  .fondateur-eyebrow {
    display: inline-block;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--bleu-600);
    margin-bottom: 1.5rem;
    padding: 0.4rem 0.9rem;
    background: rgba(32, 100, 240, 0.12);
    border: 1px solid rgba(32, 100, 240, 0.25);
    border-radius: 999px;
  }

  .fondateur-quote {
    font-size: 2.25rem;
    font-weight: 600;
    line-height: 1.3;
    color: var(--blanc);
    margin: 0 0 2rem;
    position: relative;
    letter-spacing: -0.01em;
  }

  .quote-mark {
    color: var(--bleu-600);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    margin-right: 0.25rem;
    vertical-align: -0.4em;
    font-family: Georgia, serif;
  }

  .fondateur-signature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .fondateur-name {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--blanc);
  }

  .fondateur-sep {
    color: rgba(255, 255, 255, 0.4);
  }

  .fondateur-role {
    font-size: 1.125rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
  }

  .fondateur-context {
    font-size: 16px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 540px;
  }

  @media (max-width: 1024px) {
    .fondateur-inner {
      gap: 3.5rem;
    }

    .fondateur-img {
      width: 320px;
      height: 400px;
    }

    .fondateur-quote {
      font-size: 1.875rem;
    }
  }

  @media (max-width: 900px) {
    .fondateur {
      padding: 5rem 24px;
    }

    .fondateur-inner {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }

    .fondateur-content {
      max-width: none;
    }

    .fondateur-quote {
      font-size: 1.5rem;
    }

    .quote-mark {
      font-size: 3rem;
    }

    .fondateur-signature {
      justify-content: center;
    }

    .fondateur-context {
      margin: 0 auto;
    }

    .fondateur-img {
      width: 280px;
      height: 340px;
      margin: 0 auto;
    }
  }
</style>
