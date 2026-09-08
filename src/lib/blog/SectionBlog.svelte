<script>
  // Section « Blog » de la page d'accueil : article à la une + derniers articles.
  import { articles, BLOG_PATH } from './articles.js';
  import ArticleCard from './ArticleCard.svelte';

  const [featured, ...rest] = articles;
  const others = rest.slice(0, 3);
</script>

{#if featured}
  <section class="blog" id="blog" data-reveal>
    <div class="blog-inner">
      <div class="blog-header">
        <div class="blog-heading">
          <span class="blog-pill">Blog</span>
          <h2 class="blog-title">Les coulisses du Club</h2>
          <p class="blog-subtitle">
            Retours d'événements, annonces et actualités du réseau Boost.
          </p>
        </div>
        <a href={BLOG_PATH} class="blog-all">
          Voir tous les articles
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <ArticleCard article={featured} featured />

      {#if others.length}
        <div class="blog-grid">
          {#each others as article (article.slug)}
            <ArticleCard {article} />
          {/each}
        </div>
      {/if}
    </div>
  </section>
{/if}

<style>
  .blog {
    background: var(--bleu-clair);
    padding: 6rem 24px;
    position: relative;
  }

  .blog-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .blog-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem;
  }

  .blog-heading {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .blog-pill {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--bleu-950);
    background: var(--blanc);
    border: 1px solid var(--gris-200);
    padding: 0.4rem 1rem;
    border-radius: 999px;
  }

  .blog-title {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--bleu-950);
    letter-spacing: -0.02em;
    margin: 0;
  }

  .blog-subtitle {
    font-size: 1.05rem;
    color: var(--gris-700);
    line-height: 1.6;
    margin: 0;
    max-width: 520px;
  }

  .blog-all {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--bleu-600);
    white-space: nowrap;
    padding-bottom: 0.35rem;
    transition: color 0.2s ease;
  }

  .blog-all svg {
    transition: transform 0.25s ease;
  }

  .blog-all:hover {
    color: var(--bleu-700);
  }

  .blog-all:hover svg {
    transform: translateX(3px);
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    .blog-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .blog {
      padding: 4rem 24px;
    }

    .blog-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .blog-title {
      font-size: 1.75rem;
    }

    .blog-subtitle {
      font-size: 0.95rem;
    }

    .blog-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
