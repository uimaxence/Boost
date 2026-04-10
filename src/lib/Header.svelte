<script>
  let open = false;
  import logoSvg from '../../assets/logo.svg?url';
  import ButtonCta from './ButtonCta.svelte';
</script>

<header class="header">
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

  <button class="burger" aria-label="Ouvrir le menu" aria-expanded={open} on:click={() => open = !open}>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
  </button>
</header>

{#if open}
  <div class="mobile-overlay" role="dialog" aria-modal="true" aria-label="Menu">
    <nav class="mobile-nav">
      <a href="#concept" on:click={() => open = false}>Le concept</a>
      <a href="#clubs" on:click={() => open = false}>Les clubs</a>
      <a href="#faq" on:click={() => open = false}>FAQ</a>
      <a href="#candidater" class="btn-cta-mobile" on:click={() => open = false}>Candidater</a>
    </nav>
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
  }

  .burger-line {
    width: 24px;
    height: 2px;
    background: var(--noir);
    border-radius: 1px;
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

    .mobile-overlay {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(255, 255, 255, 0.98);
      z-index: 99;
      padding: 100px 24px 24px;
    }

    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 24px;
      font-size: 1.25rem;
    }

    .mobile-nav a {
      color: var(--noir);
      font-weight: 500;
    }

    .mobile-nav .btn-cta-mobile {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 16px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: 400;
      font-size: 1rem;
      background: var(--bleu-700);
      color: var(--blanc);
    }
  }
</style>
