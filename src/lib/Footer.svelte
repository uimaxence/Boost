<script>
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
  <div class="footer-precision">
    <p>
      Pour plus de précision : <a href="mailto:{email}">{email}</a>
      <button
        type="button"
        class="copy-btn"
        class:is-copied={copied}
        on:click={copyEmail}
        aria-label="Copier l'adresse e-mail"
      >
        <span class="copy-icon copy-icon--clipboard" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </span>
        <span class="copy-icon copy-icon--check" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <span class="copy-tooltip" aria-live="polite">Copié !</span>
      </button>
    </p>
  </div>

  <div class="footer-logo-wrap">
    <svg
      class="footer-logo-svg"
      viewBox="0 0 1000 240"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <text
        x="500"
        y="220"
        text-anchor="middle"
        font-family="Switzer, sans-serif"
        font-weight="800"
        font-size="300"
        textLength="1000"
        lengthAdjust="spacing"
        fill="#152556"
      >BOOST</text>
    </svg>

    <div class="footer-band">
      <a class="band-link band-mention" href="/mentions-legales">Mention légale</a>
      <a class="band-link band-social" href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
      <a class="band-link band-social" href="https://linkedin.com" target="_blank" rel="noopener">Linkedin</a>
      <a class="band-link band-social" href="https://tiktok.com" target="_blank" rel="noopener">TikTok</a>
      <a class="band-link band-credits" href="/credits">Fait par xxxxx</a>
    </div>
  </div>

  <div class="footer-bottom">
    <a href="/mentions-legales">Mention légale</a>
    <a href="/credits">Fait par xxxxx</a>
  </div>
</footer>

<style>
  .footer {
    background: var(--blanc);
    padding: 8rem 24px 0;
    overflow: hidden;
    position: relative;
  }

  .footer-precision {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }

  .footer-precision p {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--noir);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .footer-precision a {
    color: var(--bleu-600);
    text-decoration: none;
  }

  .copy-btn {
    position: relative;
    background: transparent;
    border: none;
    padding: 6px;
    width: 32px;
    height: 32px;
    color: var(--gris-400);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: color 0.2s, background 0.2s, transform 0.2s;
  }

  .copy-btn:hover {
    color: var(--bleu-600);
    background: var(--bleu-clair);
  }

  .copy-btn:active {
    transform: scale(0.92);
  }

  .copy-icon {
    position: absolute;
    inset: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .copy-icon--check {
    opacity: 0;
    transform: scale(0.6);
    color: #16a34a;
  }

  .copy-btn.is-copied {
    color: #16a34a;
    background: #dcfce7;
  }

  .copy-btn.is-copied .copy-icon--clipboard {
    opacity: 0;
    transform: scale(0.6);
  }

  .copy-btn.is-copied .copy-icon--check {
    opacity: 1;
    transform: scale(1);
  }

  .copy-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translate(-50%, 4px);
    background: var(--noir);
    color: var(--blanc);
    font-size: 0.75rem;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .copy-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: var(--noir);
  }

  .copy-btn.is-copied .copy-tooltip {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  .footer-logo-wrap {
    position: relative;
    margin-top: 3rem;
    width: 100%;
  }

  .footer-logo-svg {
    display: block;
    width: 96vw;
    max-width: 100%;
    margin: 0 auto;
    user-select: none;
  }

  .footer-band {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bleu-600);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 2rem;
    z-index: 2;
  }

  .band-link {
    color: var(--blanc);
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity 0.2s;
  }

  .band-link:hover {
    opacity: 0.8;
  }

  .footer-bottom {
    display: none;
  }

  @media (max-width: 768px) {
    .footer {
      padding: 5rem 16px 0;
    }

    .footer-logo-wrap {
      margin-top: 2rem;
    }

    .footer-precision p {
      font-size: 0.95rem;
    }

    .footer-logo-svg {
      width: 100%;
    }

    .footer-band {
      padding: 0.85rem 1.25rem;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .band-mention,
    .band-credits {
      display: none;
    }

    .band-link {
      font-size: 0.85rem;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0.25rem 1.25rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .footer-bottom a {
      font-size: 0.85rem;
      color: var(--gris-700);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
</style>
