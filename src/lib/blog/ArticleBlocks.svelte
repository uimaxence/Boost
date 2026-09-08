<script>
  // Rendu des blocs de contenu d'une section d'article (voir articles.js pour les types).
  import arrowUpRightSvg from '../../../assets/arrow-up-right.svg?url';
  export let blocks = [];
</script>

{#each blocks as block}
  {#if block.type === 'p'}
    <p class="ab-p">{@html block.html}</p>

  {:else if block.type === 'h3'}
    <h3 class="ab-h3">{block.text}</h3>

  {:else if block.type === 'list'}
    <ul class="ab-list">
      {#each block.items as item}
        <li>{@html item}</li>
      {/each}
    </ul>

  {:else if block.type === 'steps'}
    <ol class="ab-steps">
      {#each block.items as item, i}
        <li class="ab-step">
          <span class="ab-step-num" aria-hidden="true">{i + 1}</span>
          <div class="ab-step-body">
            <strong class="ab-step-title">{item.title}</strong>
            <p class="ab-step-text">{item.text}</p>
          </div>
        </li>
      {/each}
    </ol>

  {:else if block.type === 'highlight'}
    <p class="ab-highlight">{@html block.html}</p>

  {:else if block.type === 'quote'}
    <blockquote class="ab-quote">
      <p>{block.text}</p>
      {#if block.author}<cite>{block.author}</cite>{/if}
    </blockquote>

  {:else if block.type === 'tags'}
    <ul class="ab-tags">
      {#each block.items as tag}
        <li>{tag}</li>
      {/each}
    </ul>

  {:else if block.type === 'image'}
    <figure class="ab-figure">
      <img src={block.src} alt={block.alt || ''} loading="lazy" decoding="async" />
      {#if block.caption}<figcaption>{block.caption}</figcaption>{/if}
    </figure>

  {:else if block.type === 'gallery'}
    <div class="ab-gallery" data-count={block.images.length}>
      {#each block.images as img}
        <figure class="ab-gallery-item">
          <img src={img.src} alt={img.alt || ''} loading="lazy" decoding="async" />
          {#if img.caption}<figcaption>{img.caption}</figcaption>{/if}
        </figure>
      {/each}
    </div>

  {:else if block.type === 'cta'}
    <div class="ab-cta">
      <div class="ab-cta-bg" aria-hidden="true"></div>
      <div class="ab-cta-content">
        <h3 class="ab-cta-title">{block.title}</h3>
        <p class="ab-cta-text">{block.text}</p>
      </div>
      <a href={block.href} class="ab-cta-btn">
        {block.label}
        <img src={arrowUpRightSvg} alt="" width="20" height="20" aria-hidden="true" />
      </a>
    </div>
  {/if}
{/each}

<style>
  .ab-p {
    font-size: 1.0625rem;
    line-height: 1.8;
    color: var(--gris-700);
    margin: 0 0 1.4rem;
  }

  .ab-p :global(strong) {
    font-weight: 600;
    color: var(--bleu-950);
  }

  .ab-p :global(a),
  .ab-list :global(a) {
    color: var(--bleu-600);
    font-weight: 500;
    text-decoration: underline;
    text-decoration-color: rgba(32, 100, 240, 0.35);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s ease;
  }

  .ab-p :global(a:hover),
  .ab-list :global(a:hover) {
    text-decoration-color: var(--bleu-600);
  }

  .ab-h3 {
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.35;
    color: var(--bleu-950);
    letter-spacing: -0.01em;
    margin: 2.5rem 0 1rem;
  }

  .ab-list {
    margin: 0 0 1.5rem;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.0625rem;
    line-height: 1.7;
    color: var(--gris-700);
  }

  .ab-list li::marker {
    color: var(--bleu-600);
  }

  /* --- Étapes numérotées --- */
  .ab-steps {
    list-style: none;
    margin: 0.5rem 0 2rem;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .ab-step {
    display: flex;
    gap: 1.25rem;
    padding: 1.25rem 0;
    border-top: 1px solid var(--gris-200);
  }

  .ab-step:last-child {
    border-bottom: 1px solid var(--gris-200);
  }

  .ab-step-num {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bleu-clair);
    color: var(--bleu-600);
    font-size: 0.85rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.1rem;
  }

  .ab-step-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .ab-step-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--bleu-950);
    line-height: 1.4;
  }

  .ab-step-text {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--gris-700);
    margin: 0;
  }

  /* --- Mise en avant --- */
  .ab-highlight {
    font-size: 1.35rem;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: var(--bleu-950);
    margin: 2rem 0;
    padding: 1.25rem 1.5rem;
    border-left: 3px solid var(--bleu-600);
    background: var(--bleu-clair);
    border-radius: 0 12px 12px 0;
  }

  /* --- Citation --- */
  .ab-quote {
    margin: 2rem 0;
    padding: 0 0 0 1.5rem;
    border-left: 3px solid var(--bleu-600);
  }

  .ab-quote p {
    font-size: 1.25rem;
    font-style: italic;
    line-height: 1.5;
    color: var(--bleu-950);
    margin: 0 0 0.5rem;
  }

  .ab-quote cite {
    font-size: 0.9rem;
    font-style: normal;
    color: var(--gris-400);
  }

  /* --- Chips --- */
  .ab-tags {
    list-style: none;
    margin: 0 0 1.75rem;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .ab-tags li {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--blanc);
    border: 1px solid var(--gris-200);
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--bleu-950);
  }

  .ab-tags li::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--bleu-600);
  }

  /* --- Images --- */
  .ab-figure {
    margin: 2rem 0;
  }

  .ab-figure img {
    width: 100%;
    border-radius: 16px;
  }

  .ab-figure figcaption {
    margin-top: 0.75rem;
    font-size: 0.85rem;
    color: var(--gris-400);
  }

  .ab-gallery {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin: 2rem 0;
  }

  .ab-gallery[data-count='3'] {
    grid-template-columns: repeat(3, 1fr);
  }

  .ab-gallery-item {
    margin: 0;
    min-width: 0;
  }

  .ab-gallery img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: 12px;
  }

  .ab-gallery figcaption {
    margin-top: 0.6rem;
    font-size: 0.85rem;
    line-height: 1.45;
    color: var(--gris-400);
  }

  /* --- Encart CTA --- */
  .ab-cta {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    margin: 3rem 0 0;
    padding: 2.25rem 2.5rem;
    border-radius: 20px;
    background: var(--bleu-950);
    color: var(--blanc);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .ab-cta-bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(ellipse 60% 80% at 15% 20%, rgba(32, 100, 240, 0.45), transparent 60%),
      radial-gradient(ellipse 50% 60% at 90% 90%, rgba(24, 77, 217, 0.35), transparent 60%);
  }

  .ab-cta-title {
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.25;
    margin: 0 0 0.5rem;
  }

  .ab-cta-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.72);
    margin: 0;
  }

  .ab-cta-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem 1.25rem;
    border-radius: 8px;
    background: var(--blanc);
    color: var(--bleu-950);
    font-weight: 600;
    font-size: 0.95rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .ab-cta-btn img {
    filter: invert(1) brightness(0.2);
  }

  .ab-cta-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 640px) {
    .ab-p,
    .ab-list {
      font-size: 1rem;
    }

    .ab-highlight {
      font-size: 1.15rem;
      padding: 1rem 1.25rem;
    }

    .ab-gallery,
    .ab-gallery[data-count='3'] {
      grid-template-columns: 1fr 1fr;
    }

    .ab-cta {
      flex-direction: column;
      align-items: flex-start;
      padding: 1.75rem 1.5rem;
    }
  }
</style>
