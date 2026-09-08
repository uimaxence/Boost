<script>
  // Barre de partage : lien copiable + réseaux sociaux (+ partage natif sur mobile).
  import { onMount } from 'svelte';

  export let url;
  export let title;
  export let label = 'Partager';

  let copied = false;
  let canNativeShare = false;
  let timer;

  onMount(() => {
    canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
    return () => clearTimeout(timer);
  });

  $: encodedUrl = encodeURIComponent(url);
  $: encodedTitle = encodeURIComponent(title);
  $: displayUrl = url.replace(/^https?:\/\//, '');
  $: networks = [
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: 'linkedin',
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: 'x',
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: 'whatsapp',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'facebook',
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
      clearTimeout(timer);
      timer = setTimeout(() => (copied = false), 2000);
    } catch (e) {
      // Presse-papiers indisponible (contexte non sécurisé) : on sélectionne le texte
      window.prompt('Copie ce lien :', url);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch (e) {
      // Partage annulé
    }
  }
</script>

<div class="share">
  <span class="share-label">{label}</span>

  <div class="share-row">
    <button
      type="button"
      class="share-link"
      class:is-copied={copied}
      on:click={copy}
      aria-label="Copier le lien de l'article"
      title="Copier le lien"
    >
      <span class="share-link-icon" aria-hidden="true">
        {#if copied}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        {:else}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
        {/if}
      </span>
      <span class="share-link-url">{displayUrl}</span>
      <span class="share-link-action">{copied ? 'Lien copié' : 'Copier'}</span>
    </button>

    <div class="share-icons">
      {#each networks as n (n.name)}
        <a
          href={n.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Partager sur {n.name}"
          title="Partager sur {n.name}"
        >
          {#if n.icon === 'linkedin'}
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
          {:else if n.icon === 'x'}
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z" /></svg>
          {:else if n.icon === 'whatsapp'}
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.5A11.82 11.82 0 0012.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 005.68 1.45h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" /></svg>
          {:else}
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" /></svg>
          {/if}
        </a>
      {/each}

      {#if canNativeShare}
        <button type="button" on:click={nativeShare} aria-label="Partager via une application" title="Partager">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .share {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    min-width: 0;
  }

  .share-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gris-400);
  }

  .share-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    min-width: 0;
  }

  /* --- Lien copiable --- */
  .share-link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    max-width: 100%;
    padding: 0.45rem 0.5rem 0.45rem 0.85rem;
    background: var(--bleu-clair);
    border: 1px solid rgba(32, 100, 240, 0.18);
    border-radius: 999px;
    color: var(--bleu-950);
    font-size: 0.85rem;
    line-height: 1;
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }

  .share-link:hover {
    border-color: rgba(32, 100, 240, 0.5);
    box-shadow: 0 6px 18px -10px rgba(32, 100, 240, 0.5);
  }

  .share-link.is-copied {
    background: #ecfdf3;
    border-color: rgba(34, 197, 94, 0.4);
  }

  .share-link-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--bleu-600);
    display: inline-flex;
  }

  .share-link.is-copied .share-link-icon {
    color: #16a34a;
  }

  .share-link-icon svg {
    width: 100%;
    height: 100%;
  }

  .share-link-url {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 260px;
    font-weight: 500;
    color: var(--bleu-950);
  }

  .share-link-action {
    flex-shrink: 0;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--blanc);
    background: var(--bleu-600);
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    transition: background 0.2s ease;
  }

  .share-link.is-copied .share-link-action {
    background: #16a34a;
  }

  /* --- Icônes réseaux --- */
  .share-icons {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .share-icons a,
  .share-icons button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--gris-200);
    background: var(--blanc);
    color: var(--bleu-950);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }

  .share-icons a:hover,
  .share-icons button:hover {
    background: var(--bleu-600);
    border-color: var(--bleu-600);
    color: var(--blanc);
    transform: translateY(-1px);
  }

  .share-icons svg {
    width: 15px;
    height: 15px;
  }

  @media (max-width: 600px) {
    .share-link-url {
      max-width: 160px;
    }
  }
</style>
