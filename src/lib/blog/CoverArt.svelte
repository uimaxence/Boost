<script>
  // Visuel de couverture d'un article.
  // Si `article.cover` est vide, on affiche un visuel de marque (dégradé bleu + logo)
  // pour que la mise en page reste soignée en attendant les photos.
  import bgArt from '../../../assets/bg-section-cal.webp?url';
  import logoSvg from '../../../assets/logo.svg?url';

  export let article;
  /** 'eager' pour la grande photo au-dessus de la ligne de flottaison */
  export let loading = 'lazy';
  export let showLogo = true;
</script>

<div class="cover-art" class:is-placeholder={!article.cover}>
  {#if article.cover}
    <img src={article.cover} alt={article.coverAlt || ''} {loading} decoding="async" />
  {:else}
    <img src={bgArt} alt="" {loading} decoding="async" />
    <div class="cover-art-tint" aria-hidden="true"></div>
    {#if showLogo}
      <img src={logoSvg} alt="" class="cover-art-logo" aria-hidden="true" />
    {/if}
  {/if}
</div>

<style>
  .cover-art {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: #0c1a3a;
  }

  .cover-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .cover-art-tint {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 80% at 80% 20%, rgba(92, 167, 254, 0.25), transparent 60%),
      linear-gradient(160deg, rgba(12, 26, 58, 0.55) 0%, rgba(21, 37, 86, 0.25) 55%, rgba(32, 100, 240, 0.15) 100%);
  }

  .cover-art-logo {
    position: absolute;
    left: 6%;
    bottom: 9%;
    width: clamp(36px, 7%, 72px);
    height: auto;
    filter: invert(1) brightness(2);
    opacity: 0.9;
  }
</style>
