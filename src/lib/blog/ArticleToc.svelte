<script>
  // Sommaire : fixe (sticky) sur desktop, repliable sur mobile.
  export let sections = [];
  export let activeId = null;
  /** Progression de lecture (0 → 1) */
  export let progress = 0;

  const num = (i) => String(i + 1).padStart(2, '0');
</script>

<nav class="toc" aria-label="Sommaire de l'article">
  <p class="toc-label">Sommaire</p>
  <div class="toc-body">
    <div class="toc-rail" aria-hidden="true">
      <span class="toc-rail-fill" style="height: {Math.round(progress * 100)}%"></span>
    </div>
    <ol class="toc-list">
      {#each sections as s, i (s.id)}
        <li class:is-active={s.id === activeId}>
          <a href="#{s.id}" aria-current={s.id === activeId ? 'true' : undefined}>
            <span class="toc-num">{num(i)}</span>
            <span class="toc-text">{s.title}</span>
          </a>
        </li>
      {/each}
    </ol>
  </div>
</nav>

<details class="toc-mobile">
  <summary>
    <span class="toc-mobile-title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
      Sommaire
    </span>
    <svg class="toc-mobile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
  </summary>
  <ol class="toc-mobile-list">
    {#each sections as s, i (s.id)}
      <li>
        <a href="#{s.id}">
          <span class="toc-num">{num(i)}</span>
          <span>{s.title}</span>
        </a>
      </li>
    {/each}
  </ol>
</details>

<style>
  .toc-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gris-400);
    margin: 0 0 1rem;
  }

  .toc-body {
    position: relative;
    padding-left: 1rem;
  }

  .toc-rail {
    position: absolute;
    left: 0;
    top: 0.35rem;
    bottom: 0.35rem;
    width: 2px;
    background: var(--gris-200);
    border-radius: 2px;
    overflow: hidden;
  }

  .toc-rail-fill {
    display: block;
    width: 100%;
    background: var(--bleu-600);
    transition: height 0.15s linear;
  }

  .toc-list,
  .toc-mobile-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .toc-list li a {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    padding: 0.4rem 0;
    font-size: 0.9rem;
    line-height: 1.4;
    color: var(--gris-700);
    transition: color 0.2s ease;
  }

  .toc-list li a:hover {
    color: var(--bleu-950);
  }

  .toc-list li.is-active a {
    color: var(--bleu-950);
    font-weight: 600;
  }

  .toc-num {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--bleu-600);
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  /* Repère du chapitre actif sur le rail */
  .toc-list li {
    position: relative;
  }

  .toc-list li::before {
    content: '';
    position: absolute;
    left: -1rem;
    top: 0.55rem;
    bottom: 0.55rem;
    width: 2px;
    border-radius: 2px;
    background: var(--bleu-950);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .toc-list li.is-active::before {
    opacity: 1;
  }

  /* --- Mobile --- */
  .toc-mobile {
    display: none;
    border: 1px solid var(--gris-200);
    border-radius: 12px;
    background: var(--blanc);
    overflow: hidden;
  }

  .toc-mobile summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.9rem 1rem;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--bleu-950);
  }

  .toc-mobile summary::-webkit-details-marker {
    display: none;
  }

  .toc-mobile-title {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .toc-mobile-title svg {
    color: var(--bleu-600);
  }

  .toc-mobile-chevron {
    color: var(--gris-400);
    transition: transform 0.25s ease;
  }

  .toc-mobile[open] .toc-mobile-chevron {
    transform: rotate(180deg);
  }

  .toc-mobile-list {
    border-top: 1px solid var(--gris-200);
    padding: 0.5rem 0;
  }

  .toc-mobile-list a {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    padding: 0.55rem 1rem;
    font-size: 0.9rem;
    color: var(--gris-700);
  }

  @media (max-width: 1024px) {
    .toc {
      display: none;
    }

    .toc-mobile {
      display: block;
    }
  }
</style>
