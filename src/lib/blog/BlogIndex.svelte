<script>
  // Page /blog : liste de tous les articles.
  import Header from '../Header.svelte';
  import Footer from '../Footer.svelte';
  import ArticleCard from './ArticleCard.svelte';
  import { articles } from './articles.js';

  const [featured, ...rest] = articles;
</script>

<Header solid />

<main class="blog-index">
  <div class="blog-index-inner">
    <header class="blog-index-header">
      <span class="blog-index-pill">Blog</span>
      <h1 class="blog-index-title">Les coulisses du Club Boost</h1>
      <p class="blog-index-subtitle">
        Retours d'événements, annonces et actualités du réseau qui booste la nouvelle génération d'entrepreneurs.
      </p>
    </header>

    {#if featured}
      <ArticleCard article={featured} featured />
    {:else}
      <p class="blog-index-empty">Les premiers articles arrivent bientôt.</p>
    {/if}

    {#if rest.length}
      <div class="blog-index-grid">
        {#each rest as article (article.slug)}
          <ArticleCard {article} />
        {/each}
      </div>
    {/if}
  </div>
</main>

<Footer />

<style>
  .blog-index {
    background: var(--bleu-clair);
    padding: 10rem 24px 6rem;
    min-height: 70vh;
  }

  .blog-index-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .blog-index-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    max-width: 640px;
  }

  .blog-index-pill {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--bleu-950);
    background: var(--blanc);
    border: 1px solid var(--gris-200);
    padding: 0.4rem 1rem;
    border-radius: 999px;
  }

  .blog-index-title {
    font-size: 2.75rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--bleu-950);
    letter-spacing: -0.02em;
    margin: 0;
  }

  .blog-index-subtitle {
    font-size: 1.05rem;
    color: var(--gris-700);
    line-height: 1.6;
    margin: 0;
  }

  .blog-index-empty {
    color: var(--gris-700);
  }

  .blog-index-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    .blog-index-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .blog-index {
      padding: 7rem 24px 4rem;
    }

    .blog-index-title {
      font-size: 2rem;
    }

    .blog-index-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
