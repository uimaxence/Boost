<script>
  // Template d'article : photo en tête, titre sur carte blanche qui chevauche la photo,
  // métadonnées + partage, sommaire fixe à gauche, contenu à droite.
  import { onMount } from 'svelte';
  import Header from '../Header.svelte';
  import Footer from '../Footer.svelte';
  import CoverArt from './CoverArt.svelte';
  import ShareBar from './ShareBar.svelte';
  import ArticleToc from './ArticleToc.svelte';
  import ArticleBlocks from './ArticleBlocks.svelte';
  import ArticleCard from './ArticleCard.svelte';
  import { articles, articleUrl, formatDate, readingTime, BLOG_PATH } from './articles.js';
  import { authors } from './authors.js';

  export let article;

  $: author = authors[article.author];
  $: url = articleUrl(article);
  $: minutes = readingTime(article);
  $: others = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  $: sectionNum = (i) => String(i + 1).padStart(2, '0');

  let bodyEl;
  let activeId = article.sections[0]?.id ?? null;
  let progress = 0;

  onMount(() => {
    const OFFSET = 150;
    let ticking = false;

    function update() {
      ticking = false;
      if (!bodyEl) return;

      const sections = Array.from(bodyEl.querySelectorAll('.article-section'));
      let current = sections[0]?.id ?? null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top - OFFSET <= 0) current = el.id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      activeId = current;

      const rect = bodyEl.getBoundingClientRect();
      const start = rect.top + window.scrollY - OFFSET;
      const end = rect.bottom + window.scrollY - window.innerHeight;
      progress = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });
</script>

<Header solid />

<main class="article">
  <!-- Photo en tête -->
  <div class="article-cover" data-header-dark>
    <CoverArt {article} loading="eager" />
    <div class="article-cover-shade" aria-hidden="true"></div>
  </div>

  <!-- Titre sur carte blanche qui chevauche la photo -->
  <header class="article-head">
    <div class="article-head-card">
      <a href={BLOG_PATH} class="article-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
        Tous les articles
      </a>

      <div class="article-kicker">
        <span class="article-pill">{article.category}</span>
        {#if article.location}
          <span class="article-kicker-sep" aria-hidden="true">·</span>
          <span>{article.location}</span>
        {/if}
        <span class="article-kicker-sep" aria-hidden="true">·</span>
        <time datetime={article.date}>{formatDate(article.date)}</time>
      </div>

      <h1 class="article-title">{article.title}</h1>

      {#if article.excerpt}
        <p class="article-lede">{article.excerpt}</p>
      {/if}

      <div class="article-meta">
        <div class="article-meta-left">
          {#if author}
            <div class="article-author">
              {#if author.avatar}
                <img src={author.avatar} alt="" width="44" height="44" />
              {/if}
              <div class="article-author-text">
                <span class="article-author-name">{author.name}</span>
                <span class="article-author-role">{author.role}</span>
              </div>
            </div>
          {/if}
          <dl class="article-facts">
            <div>
              <dt>Publié le</dt>
              <dd><time datetime={article.date}>{formatDate(article.date)}</time></dd>
            </div>
            <div>
              <dt>Lecture</dt>
              <dd>{minutes} min</dd>
            </div>
          </dl>
        </div>
        <ShareBar {url} title={article.title} />
      </div>
    </div>
  </header>

  <!-- Sommaire + contenu -->
  <div class="article-layout">
    <aside class="article-side">
      <ArticleToc sections={article.sections} {activeId} {progress} />
    </aside>

    <div class="article-body" bind:this={bodyEl}>
      {#each article.sections as section, i (section.id)}
        <section class="article-section" id={section.id}>
          <span class="article-section-num" aria-hidden="true">{sectionNum(i)}</span>
          <h2 class="article-h2">{section.title}</h2>
          <ArticleBlocks blocks={section.blocks} />
        </section>
      {/each}

      <footer class="article-end">
        <ShareBar {url} title={article.title} label="Partager cet article" />
        {#if author}
          <div class="article-author-card">
            {#if author.avatar}
              <img src={author.avatar} alt="" width="56" height="56" />
            {/if}
            <div>
              <span class="article-author-card-label">Écrit par</span>
              <span class="article-author-card-name">{author.name} <span class="article-author-card-role">· {author.role}</span></span>
              {#if author.bio}<p class="article-author-card-bio">{author.bio}</p>{/if}
            </div>
          </div>
        {/if}
      </footer>
    </div>
  </div>

  {#if others.length}
    <section class="article-more">
      <div class="article-more-inner">
        <div class="article-more-header">
          <h2 class="article-more-title">Continuer la lecture</h2>
          <a href={BLOG_PATH} class="article-more-all">Tous les articles →</a>
        </div>
        <div class="article-more-grid">
          {#each others as a (a.slug)}
            <ArticleCard article={a} />
          {/each}
        </div>
      </div>
    </section>
  {/if}
</main>

<Footer />

<style>
  .article {
    --article-w: 1040px;
    --article-pad: 3.5rem;
    --overlap: 150px;
    background: var(--blanc);
  }

  /* ---------- Photo ---------- */
  .article-cover {
    position: relative;
    height: clamp(380px, 64vh, 700px);
    background: #0c1a3a;
  }

  .article-cover-shade {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(12, 26, 58, 0.5) 0%,
      rgba(12, 26, 58, 0) 32%,
      rgba(12, 26, 58, 0) 70%,
      rgba(12, 26, 58, 0.3) 100%
    );
  }

  /* ---------- Carte titre ---------- */
  .article-head {
    position: relative;
    z-index: 2;
    margin-top: calc(-1 * var(--overlap));
    padding: 0 24px;
  }

  .article-head-card {
    max-width: var(--article-w);
    margin: 0 auto;
    background: var(--blanc);
    border-radius: 24px 24px 0 0;
    padding: 2.75rem var(--article-pad) 0;
  }

  .article-back {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--gris-400);
    margin-bottom: 1.75rem;
    transition: color 0.2s ease;
  }

  .article-back:hover {
    color: var(--bleu-600);
  }

  .article-back svg {
    transition: transform 0.25s ease;
  }

  .article-back:hover svg {
    transform: translateX(-3px);
  }

  .article-kicker {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.6rem;
    font-size: 0.875rem;
    color: var(--gris-400);
    margin-bottom: 1.25rem;
  }

  .article-pill {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--bleu-600);
    background: var(--bleu-clair);
    border: 1px solid rgba(32, 100, 240, 0.18);
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
  }

  .article-kicker-sep {
    color: var(--gris-200);
  }

  .article-title {
    font-size: clamp(2rem, 4.2vw, 3.25rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: var(--bleu-950);
    margin: 0 0 1.5rem;
    text-wrap: balance;
  }

  .article-lede {
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--gris-700);
    margin: 0;
    max-width: 780px;
  }

  .article-meta {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem 3rem;
    flex-wrap: wrap;
    margin-top: 2.25rem;
    padding: 1.75rem 0;
    border-top: 1px solid var(--gris-200);
    border-bottom: 1px solid var(--gris-200);
  }

  .article-meta-left {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    flex-wrap: wrap;
  }

  .article-author {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .article-author img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--gris-200);
  }

  .article-author-text {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }

  .article-author-name {
    font-weight: 600;
    color: var(--bleu-950);
    font-size: 0.95rem;
  }

  .article-author-role {
    font-size: 0.8rem;
    color: var(--gris-400);
  }

  .article-facts {
    display: flex;
    gap: 2rem;
    margin: 0;
  }

  .article-facts div {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }

  .article-facts dt {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gris-400);
  }

  .article-facts dd {
    margin: 0.15rem 0 0;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--bleu-950);
  }

  /* ---------- Sommaire + contenu ---------- */
  .article-layout {
    max-width: var(--article-w);
    margin: 0 auto;
    padding: 2.5rem var(--article-pad) 5rem;
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: 4rem;
    align-items: start;
  }

  .article-side {
    position: sticky;
    top: 130px;
  }

  .article-body {
    min-width: 0;
  }

  .article-section {
    scroll-margin-top: 130px;
  }

  .article-section + .article-section {
    margin-top: 3.25rem;
  }

  .article-section-num {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: var(--bleu-600);
    margin-bottom: 0.5rem;
    font-variant-numeric: tabular-nums;
  }

  .article-h2 {
    font-size: 1.85rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--bleu-950);
    margin: 0 0 1.25rem;
    text-wrap: balance;
  }

  /* ---------- Fin d'article ---------- */
  .article-end {
    margin-top: 3.5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--gris-200);
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .article-author-card {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    padding: 1.5rem;
    background: var(--bleu-clair);
    border-radius: 16px;
  }

  .article-author-card img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .article-author-card-label {
    display: block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gris-400);
    margin-bottom: 0.2rem;
  }

  .article-author-card-name {
    display: block;
    font-weight: 700;
    color: var(--bleu-950);
    font-size: 1.05rem;
  }

  .article-author-card-role {
    font-weight: 400;
    color: var(--gris-400);
    font-size: 0.9rem;
  }

  .article-author-card-bio {
    margin: 0.5rem 0 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--gris-700);
  }

  /* ---------- Autres articles ---------- */
  .article-more {
    background: var(--bleu-clair);
    padding: 5rem 24px;
  }

  .article-more-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .article-more-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .article-more-title {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--bleu-950);
    margin: 0;
  }

  .article-more-all {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--bleu-600);
  }

  .article-more-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  /* ---------- Responsive ---------- */
  @media (max-width: 1024px) {
    .article {
      --article-pad: 2.5rem;
    }

    .article-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding-top: 2rem;
    }

    .article-side {
      position: static;
    }

    .article-more-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .article {
      --article-pad: 1.5rem;
      --overlap: 56px;
    }

    .article-cover {
      height: clamp(280px, 48vh, 420px);
    }

    .article-head {
      padding: 0;
    }

    .article-head-card {
      border-radius: 20px 20px 0 0;
      padding-top: 1.75rem;
    }

    .article-back {
      margin-bottom: 1.25rem;
    }

    .article-title {
      font-size: 1.85rem;
      margin-bottom: 1rem;
    }

    .article-lede {
      font-size: 1.05rem;
    }

    .article-meta {
      margin-top: 1.5rem;
      padding: 1.25rem 0;
      gap: 1.5rem;
    }

    .article-meta-left {
      gap: 1.25rem 2rem;
    }

    .article-layout {
      padding-bottom: 3.5rem;
    }

    .article-h2 {
      font-size: 1.5rem;
    }

    .article-section + .article-section {
      margin-top: 2.5rem;
    }

    .article-more {
      padding: 3.5rem 24px;
    }

    .article-more-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
