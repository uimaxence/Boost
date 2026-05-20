<script>
  import logoSvg from '../../assets/logo.svg?url';
</script>

<header class="static-header">
  <a href="/" class="static-brand" aria-label="Retour à l'accueil">
    <img src={logoSvg} alt="Boost" />
  </a>
  <a href="/" class="static-back">← Retour à l'accueil</a>
</header>

<main class="static-page">
  <div class="static-inner">
    <h1>Mentions légales</h1>

    <section>
      <h2>Éditeur du site</h2>
      <p>Club Boost</p>
      <p>Contact : <a href="mailto:contact@boostapp.fr">contact@boostapp.fr</a></p>
    </section>

    <section>
      <h2>Hébergement</h2>
      <p>Le site est hébergé par un prestataire d'hébergement web standard. Pour toute information complémentaire, contactez-nous à l'adresse ci-dessus.</p>
    </section>

    <section>
      <h2>Propriété intellectuelle</h2>
      <p>L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos) est protégé par le droit d'auteur. Toute reproduction, même partielle, sans autorisation préalable est interdite.</p>
    </section>

    <section>
      <h2>Données personnelles</h2>
      <p>Les informations que vous nous transmettez via les formulaires sont utilisées uniquement dans le cadre de votre demande. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données, en nous contactant à <a href="mailto:contact@boostapp.fr">contact@boostapp.fr</a>.</p>
    </section>
  </div>
</main>

<style>
  .static-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--gris-200);
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .static-brand img {
    width: 36px;
    height: auto;
  }

  .static-back {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--bleu-600);
    transition: color 0.2s;
  }

  .static-back:hover {
    color: var(--bleu-700);
  }

  .static-page {
    padding: 3rem 2rem 5rem;
  }

  .static-inner {
    max-width: 720px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--bleu-950);
    margin: 0 0 2.5rem;
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--bleu-950);
    margin: 0 0 0.75rem;
  }

  section {
    margin-bottom: 2rem;
  }

  p {
    font-size: 1rem;
    color: var(--gris-700);
    line-height: 1.65;
    margin: 0 0 0.5rem;
  }

  p a {
    color: var(--bleu-600);
  }

  p a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .static-header { padding: 1rem 1.5rem; }
    .static-page { padding: 2rem 1.5rem 4rem; }
    h1 { font-size: 1.875rem; margin-bottom: 2rem; }
  }
</style>
