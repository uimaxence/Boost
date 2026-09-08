<script>
  import { articlePath, formatDate, readingTime } from './articles.js';
  import { authors } from './authors.js';
  import CoverArt from './CoverArt.svelte';

  export let article;
  /** Grande carte horizontale (article à la une) */
  export let featured = false;

  $: author = authors[article.author];
</script>

<a class="card" class:featured href={articlePath(article)}>
  <div class="card-media">
    <CoverArt {article} />
  </div>

  <div class="card-body">
    <div class="card-meta">
      <span class="card-cat">{article.category}</span>
      <span class="card-sep" aria-hidden="true">·</span>
      <time datetime={article.date}>{formatDate(article.date)}</time>
    </div>

    <h3 class="card-title">{article.title}</h3>
    <p class="card-excerpt">{article.excerpt}</p>

    <div class="card-footer">
      {#if author}
        <span class="card-author">
          {#if author.avatar}
            <img src={author.avatar} alt="" width="28" height="28" />
          {/if}
          <span>{author.name}</span>
        </span>
        <span class="card-sep" aria-hidden="true">·</span>
      {/if}
      <span class="card-read">{readingTime(article)} min de lecture</span>
      <span class="card-link">
        Lire l'article
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  </div>
</a>

<style>
  .card {
    display: flex;
    flex-direction: column;
    background: var(--blanc);
    border: 1px solid var(--gris-200);
    border-radius: 16px;
    overflow: hidden;
    color: inherit;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px -20px rgba(21, 37, 86, 0.25);
    border-color: rgba(32, 100, 240, 0.35);
  }

  .card-media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }

  .card-media :global(.cover-art img) {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .card:hover .card-media :global(.cover-art img) {
    transform: scale(1.04);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem;
    flex: 1;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--gris-400);
  }

  .card-cat {
    font-weight: 600;
    color: var(--bleu-600);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.72rem;
  }

  .card-sep {
    color: var(--gris-200);
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--bleu-950);
    letter-spacing: -0.015em;
    margin: 0;
    text-wrap: balance;
  }

  .card-excerpt {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--gris-700);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-footer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 1rem;
    font-size: 0.85rem;
    color: var(--gris-400);
  }

  .card-author {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--gris-700);
    font-weight: 500;
  }

  .card-author img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--gris-200);
  }

  .card-link {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 600;
    color: var(--bleu-600);
    white-space: nowrap;
  }

  .card-link svg {
    transition: transform 0.25s ease;
  }

  .card:hover .card-link svg {
    transform: translateX(3px);
  }

  /* --- Variante « à la une » : horizontale --- */
  .card.featured {
    flex-direction: row;
    border-radius: 20px;
  }

  .card.featured .card-media {
    flex: 0 0 52%;
    aspect-ratio: auto;
    min-height: 360px;
  }

  .card.featured .card-body {
    padding: 2.5rem 2.75rem;
    justify-content: center;
    gap: 1rem;
  }

  .card.featured .card-title {
    font-size: 1.85rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .card.featured .card-excerpt {
    font-size: 1.02rem;
    -webkit-line-clamp: 4;
  }

  .card.featured .card-footer {
    padding-top: 1.5rem;
    border-top: 1px solid var(--gris-200);
    margin-top: 0.5rem;
  }

  @media (max-width: 900px) {
    .card.featured {
      flex-direction: column;
    }

    .card.featured .card-media {
      flex: none;
      aspect-ratio: 16 / 10;
      min-height: 0;
    }

    .card.featured .card-body {
      padding: 1.75rem 1.5rem;
    }

    .card.featured .card-title {
      font-size: 1.45rem;
    }

    .card.featured .card-excerpt {
      font-size: 0.95rem;
    }
  }
</style>
