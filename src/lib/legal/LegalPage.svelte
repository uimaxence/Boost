<script>
  // Page légale (CGU, politique de confidentialité, mentions légales) :
  // en-tête sur fond bleu clair avec onglets vers les autres documents,
  // sommaire fixe à gauche, articles numérotés à droite.
  // Le contenu vient de cgu.js / confidentialite.js / mentionsLegales.js et
  // est rendu avec les blocs du blog (ArticleBlocks).
  import { onMount } from 'svelte';
  import Header from '../Header.svelte';
  import Footer from '../Footer.svelte';
  import ArticleToc from '../blog/ArticleToc.svelte';
  import ArticleBlocks from '../blog/ArticleBlocks.svelte';
  import { formatDate } from '../blog/articles.js';
  import { legalPages } from './index.js';
  import { EDITEUR } from './editeur.js';

  export let page;

  $: others = legalPages.filter((p) => p.path !== page.path);

  let bodyEl;
  let activeId = page.sections[0]?.id ?? null;
  let progress = 0;

  onMount(() => {
    const OFFSET = 150;
    let ticking = false;

    function update() {
      ticking = false;
      if (!bodyEl) return;

      const sections = Array.from(bodyEl.querySelectorAll('.legal-section'));
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

<main class="legal">
  <header class="legal-head">
    <div class="legal-head-inner">
      <nav class="legal-tabs" aria-label="Documents légaux">
        {#each legalPages as p (p.path)}
          <a
            href={p.path}
            class:is-active={p.path === page.path}
            aria-current={p.path === page.path ? 'page' : undefined}
          >{p.shortTitle}</a>
        {/each}
      </nav>

      <h1 class="legal-title">{page.title}</h1>
      <p class="legal-lede">{page.description}</p>

      <dl class="legal-facts">
        <div>
          <dt>Dernière mise à jour</dt>
          <dd><time datetime={page.updated}>{formatDate(page.updated)}</time></dd>
        </div>
        <div>
          <dt>Version</dt>
          <dd>{page.version}</dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd><a href="mailto:{EDITEUR.email}">{EDITEUR.email}</a></dd>
        </div>
      </dl>
    </div>
  </header>

  <div class="legal-layout">
    <aside class="legal-side">
      <ArticleToc sections={page.sections} {activeId} {progress} />
    </aside>

    <div class="legal-body" bind:this={bodyEl}>
      {#each page.sections as section, i (section.id)}
        <section class="legal-section" id={section.id}>
          <span class="legal-section-num" aria-hidden="true">Article {i + 1}</span>
          <h2 class="legal-h2">{section.title}</h2>
          <ArticleBlocks blocks={section.blocks} />
        </section>
      {/each}

      <footer class="legal-end">
        <p class="legal-end-text">
          Une question sur ce document ? Écrivez-nous à
          <a href="mailto:{EDITEUR.email}">{EDITEUR.email}</a>.
        </p>
        <nav class="legal-end-links" aria-label="Autres documents légaux">
          {#each others as p (p.path)}
            <a href={p.path}>
              {p.title}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          {/each}
        </nav>
      </footer>
    </div>
  </div>
</main>

<Footer />

<style>
  .legal {
    --legal-w: 1040px;
    --legal-pad: 3.5rem;
    background: var(--blanc);
  }

  /* ---------- En-tête ---------- */
  .legal-head {
    background: var(--bleu-clair);
    padding: 10rem 24px 3.5rem;
  }

  .legal-head-inner {
    max-width: var(--legal-w);
    margin: 0 auto;
    padding: 0 var(--legal-pad);
  }

  .legal-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.75rem;
  }

  .legal-tabs a {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--bleu-950);
    background: var(--blanc);
    border: 1px solid var(--gris-200);
    padding: 0.4rem 1rem;
    border-radius: 999px;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  }

  .legal-tabs a:hover {
    border-color: var(--bleu-600);
    color: var(--bleu-600);
  }

  .legal-tabs a.is-active {
    background: var(--bleu-950);
    border-color: var(--bleu-950);
    color: var(--blanc);
  }

  .legal-title {
    font-size: clamp(2rem, 4.2vw, 3rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: var(--bleu-950);
    margin: 0 0 1rem;
    text-wrap: balance;
  }

  .legal-lede {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--gris-700);
    margin: 0;
    max-width: 640px;
  }

  .legal-facts {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2.5rem;
    margin: 2rem 0 0;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(21, 37, 86, 0.12);
  }

  .legal-facts div {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }

  .legal-facts dt {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gris-400);
  }

  .legal-facts dd {
    margin: 0.15rem 0 0;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--bleu-950);
  }

  .legal-facts dd a {
    color: var(--bleu-600);
  }

  .legal-facts dd a:hover {
    text-decoration: underline;
  }

  /* ---------- Sommaire + contenu ---------- */
  .legal-layout {
    max-width: var(--legal-w);
    margin: 0 auto;
    padding: 3rem var(--legal-pad) 5rem;
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: 4rem;
    align-items: start;
  }

  .legal-side {
    position: sticky;
    top: 130px;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--gris-200) transparent;
  }

  .legal-body {
    min-width: 0;
  }

  .legal-section {
    scroll-margin-top: 130px;
  }

  .legal-section + .legal-section {
    margin-top: 2.75rem;
    padding-top: 2.75rem;
    border-top: 1px solid var(--gris-200);
  }

  .legal-section-num {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--bleu-600);
    margin-bottom: 0.5rem;
    font-variant-numeric: tabular-nums;
  }

  .legal-h2 {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--bleu-950);
    margin: 0 0 1.1rem;
    text-wrap: balance;
  }

  /* La citation d'un article de loi reste en taille de texte courant. */
  .legal-body :global(.ab-quote p) {
    font-size: 1rem;
    line-height: 1.7;
  }

  .legal-body :global(.ab-h3) {
    margin-top: 2rem;
  }

  /* ---------- Fin de document ---------- */
  .legal-end {
    margin-top: 3.5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--gris-200);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .legal-end-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--gris-700);
    margin: 0;
  }

  .legal-end-text a {
    color: var(--bleu-600);
    font-weight: 500;
  }

  .legal-end-text a:hover {
    text-decoration: underline;
  }

  .legal-end-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .legal-end-links a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.1rem;
    border-radius: 10px;
    background: var(--bleu-clair);
    color: var(--bleu-950);
    font-size: 0.9rem;
    font-weight: 600;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .legal-end-links a:hover {
    background: var(--bleu-600);
    color: var(--blanc);
  }

  .legal-end-links svg {
    transition: transform 0.25s ease;
  }

  .legal-end-links a:hover svg {
    transform: translateX(3px);
  }

  /* ---------- Responsive ---------- */
  @media (max-width: 1024px) {
    .legal {
      --legal-pad: 2.5rem;
    }

    .legal-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding-top: 2rem;
    }

    .legal-side {
      position: static;
      max-height: none;
      overflow: visible;
    }
  }

  @media (max-width: 768px) {
    .legal {
      --legal-pad: 0;
    }

    .legal-head {
      padding: 7rem 24px 2.5rem;
    }

    .legal-tabs {
      margin-bottom: 1.25rem;
    }

    .legal-title {
      font-size: 1.85rem;
    }

    .legal-lede {
      font-size: 1rem;
    }

    .legal-facts {
      gap: 1rem 1.75rem;
      margin-top: 1.5rem;
    }

    .legal-layout {
      padding: 1.5rem 24px 3.5rem;
    }

    .legal-h2 {
      font-size: 1.35rem;
    }

    .legal-section + .legal-section {
      margin-top: 2.25rem;
      padding-top: 2.25rem;
    }
  }
</style>
