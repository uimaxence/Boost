<script>
  import { onMount } from 'svelte';
  import logoSvg from '../../assets/logo.svg?url';
  import ButtonCta from './ButtonCta.svelte';

  let open = false;
  let inverted = false;
  let headerEl;

  function close() { open = false; }

  onMount(() => {
    const darkSelectors = '.piliers, .fondateur, .cta-final';

    function update() {
      if (!headerEl) return;
      const mid = headerEl.getBoundingClientRect().top + headerEl.getBoundingClientRect().height / 2;
      const sections = document.querySelectorAll(darkSelectors);
      let overDark = false;
      sections.forEach(s => {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) overDark = true;
      });
      inverted = overDark;
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  });
</script>

<header class="header" class:menu-open={open} class:inverted bind:this={headerEl}>
  <a href="/" class="logo" aria-label="Boost accueil">
    <img src={logoSvg} alt="" width="70" height="41" aria-hidden="true" />
  </a>
  <span class="divider" aria-hidden="true"></span>

  <nav class="nav" aria-label="Navigation principale">
    <a href="#concept">Le concept</a>
    <a href="#clubs">Les clubs</a>
    <a href="#faq">FAQ</a>
  </nav>
  <span class="divider" aria-hidden="true"></span>

  <span class="header-cta">
    <ButtonCta href="#candidater" label="Candidater" />
  </span>

  <button
    class="burger"
    class:is-open={open}
    aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
    aria-expanded={open}
    on:click={() => open = !open}
  >
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
  </button>
</header>

{#if open}
  <div class="mobile-overlay" role="dialog" aria-modal="true" aria-label="Menu">
    <nav class="mobile-nav">
      <a href="#concept" on:click={close}>
        <span class="mobile-nav-num">01</span>
        <span class="mobile-nav-label">Le concept</span>
        <span class="mobile-nav-arrow">→</span>
      </a>
      <a href="#clubs" on:click={close}>
        <span class="mobile-nav-num">02</span>
        <span class="mobile-nav-label">Les clubs</span>
        <span class="mobile-nav-arrow">→</span>
      </a>
      <a href="#faq" on:click={close}>
        <span class="mobile-nav-num">03</span>
        <span class="mobile-nav-label">FAQ</span>
        <span class="mobile-nav-arrow">→</span>
      </a>
    </nav>

    <div class="mobile-footer">
      <a href="#candidater" class="btn-cta-mobile" on:click={close}>
        Candidater au Club
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 17L17 7M17 7H8M17 7v9"/>
        </svg>
      </a>
      <p class="mobile-footer-note">contact@Boost.fr</p>
    </div>
  </div>
{/if}

<style>
  .header {
    position: fixed;
    top: 36px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 48px);
    max-width: 800px;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(var(--header-blur, 12px));
    -webkit-backdrop-filter: blur(var(--header-blur, 12px));
    border-radius: 8px;
    z-index: 100;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .logo {
    color: var(--bleu-950);
    display: flex;
    align-items: center;
  }

  .divider {
    width: 1px;
    height: 24px;
    background: var(--gris-200);
    flex-shrink: 0;
  }

  .header-cta {
    flex-shrink: 0;
  }

  .nav {
    display: flex;
    gap: 32px;
    flex-shrink: 0;
  }

  .nav a {
    color: var(--bleu-950);
    font-weight: 400;
    font-size: 1rem;
    word-spacing: -3%;
    transition: color 0.3s ease;
  }

  .nav a:hover {
    color: var(--bleu-600);
  }

  .burger {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    padding: 8px;
    position: relative;
    z-index: 110;
  }

  .burger-line {
    width: 24px;
    height: 2px;
    background: var(--bleu-950);
    border-radius: 1px;
    transition: transform 0.3s ease, opacity 0.2s ease, background 0.3s ease;
    transform-origin: center;
  }

  .burger.is-open .burger-line {
    background: var(--blanc);
  }

  .burger.is-open .burger-line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .burger.is-open .burger-line:nth-child(2) {
    opacity: 0;
  }

  .burger.is-open .burger-line:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  /* Inversion sur fond sombre */
  .header.inverted {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.12);
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  .header.inverted .logo img {
    filter: invert(1) brightness(2);
    transition: filter 0.3s ease;
  }

  .header.inverted .divider {
    background: rgba(255, 255, 255, 0.2);
    transition: background 0.3s ease;
  }

  .header.inverted .nav a {
    color: var(--blanc);
  }

  .header.inverted .nav a:hover {
    color: var(--bleu-clair);
  }

  .header.inverted .burger-line {
    background: var(--blanc);
  }

  .header.menu-open .logo {
    filter: invert(1) brightness(2);
  }

  .mobile-overlay {
    display: none;
  }

  @media (max-width: 1024px) {
    .nav {
      gap: 20px;
    }
  }

  @media (max-width: 768px) {
    .nav,
    .header-cta,
    .header .divider {
      display: none;
    }

    .burger {
      display: flex;
    }

    .header {
      top: 16px;
      padding: 10px 16px;
    }

    .header.menu-open {
      background: transparent;
      border-color: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }

    .mobile-overlay {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: fixed;
      inset: 0;
      background: linear-gradient(160deg, #152556 0%, #0c1a3a 100%);
      z-index: 99;
      padding: 110px 1.5rem 2rem;
      animation: overlayIn 0.35s ease-out;
    }

    .mobile-overlay::before {
      content: '';
      position: absolute;
      top: -20%;
      right: -20%;
      width: 60%;
      height: 60%;
      background: radial-gradient(circle, rgba(32, 100, 240, 0.35), transparent 70%);
      pointer-events: none;
    }

    .mobile-overlay::after {
      content: '';
      position: absolute;
      bottom: -10%;
      left: -20%;
      width: 70%;
      height: 50%;
      background: radial-gradient(circle, rgba(32, 100, 240, 0.2), transparent 70%);
      pointer-events: none;
    }

    @keyframes overlayIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .mobile-nav {
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
    }

    .mobile-nav a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem 0.25rem;
      color: var(--blanc);
      font-weight: 600;
      font-size: 1.75rem;
      letter-spacing: -0.02em;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      animation: navItemIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .mobile-nav a:nth-child(1) { animation-delay: 0.08s; }
    .mobile-nav a:nth-child(2) { animation-delay: 0.16s; }
    .mobile-nav a:nth-child(3) { animation-delay: 0.24s; }

    @keyframes navItemIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .mobile-nav-num {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--bleu-600);
      letter-spacing: 0.1em;
    }

    .mobile-nav-label {
      flex: 1;
    }

    .mobile-nav-arrow {
      color: rgba(255, 255, 255, 0.4);
      font-size: 1.25rem;
    }

    .mobile-footer {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      animation: navItemIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both;
    }

    .btn-cta-mobile {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1.1rem 1.5rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 1rem;
      background: var(--bleu-600);
      color: var(--blanc);
      box-shadow: 0 12px 30px -10px rgba(32, 100, 240, 0.6);
    }

    .mobile-footer-note {
      text-align: center;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.5);
      margin: 0;
    }
  }
</style>
