<script>
  import logoSvg from '../../assets/logo.svg?url';

  let copied = false;
  const email = 'contact@Boost.fr';

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch (e) {
      // ignore
    }
  }
</script>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <img src={logoSvg} alt="Boost" class="footer-logo" />
        <p class="footer-tagline">Le réseau qui booste la nouvelle génération d'entrepreneurs.</p>
        <div class="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.19a8.16 8.16 0 004.76 1.53v-3.5a4.84 4.84 0 01-1-.53z"/></svg>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-title">Le Club</h4>
        <a href="#concept">Concept</a>
        <a href="#temoignages">Témoignages</a>
        <a href="#candidater">Candidater</a>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-title">Contact</h4>
        <p class="footer-email">
          <a href="mailto:{email}">{email}</a>
          <button
            type="button"
            class="copy-btn"
            class:is-copied={copied}
            on:click={copyEmail}
            aria-label="Copier l'adresse e-mail"
          >
            {#if copied}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            {:else}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            {/if}
          </button>
        </p>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="footer-copy">&copy; {new Date().getFullYear()} Club Boost. Tous droits réservés.</span>
      <div class="footer-legal">
        <a href="/mentions-legales">Mentions légales</a>
        <span class="footer-sep">·</span>
        <a href="/credits">Crédits</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--bleu-950);
    padding: 4rem 24px 2rem;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 4rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-logo {
    width: 40px;
    height: auto;
    filter: brightness(0) invert(1);
  }

  .footer-tagline {
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    max-width: 300px;
  }

  .footer-socials {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .footer-socials a {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, color 0.2s;
  }

  .footer-socials a:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }

  .footer-socials svg {
    width: 18px;
    height: 18px;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .footer-col-title {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin: 0 0 0.5rem;
  }

  .footer-col a {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-col a:hover {
    color: white;
  }

  .footer-email {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .footer-email a {
    font-size: 0.95rem;
    color: var(--bleu-600);
    text-decoration: none;
  }

  .copy-btn {
    background: transparent;
    border: none;
    padding: 4px;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    transition: color 0.2s, background 0.2s;
  }

  .copy-btn:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  .copy-btn.is-copied {
    color: #22c55e;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
  }

  .footer-copy {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.35);
  }

  .footer-legal {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .footer-legal a {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.35);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-legal a:hover {
    color: rgba(255, 255, 255, 0.6);
  }

  .footer-sep {
    color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    .footer {
      padding: 3rem 1.5rem 1.5rem;
    }

    .footer-top {
      grid-template-columns: 1fr;
      gap: 2.5rem;
      padding-bottom: 2rem;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
    }
  }
</style>
