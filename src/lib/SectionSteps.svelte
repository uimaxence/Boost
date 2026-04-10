<script>
  // Section "Comment rejoindre l'aventure ?" — auto-cycle desktop / scroll mobile
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  const STEP_COUNT = 3;
  const STEP_DURATION = 4000; // ms (desktop)
  const MOBILE_BREAKPOINT = '(max-width: 900px)';

  // -1 = aucune étape encore active (état initial avant que la section
  // entre dans le viewport). Permet à la transition CSS de la barre 1
  // de partir bien de 0 quand l'auto-cycle démarre.
  let activeStep = -1;
  let sectionEl;
  let stepEls = [null, null, null];
  let intervalId = null;
  let isMobile = false;
  let lineProgresses = [0, 0]; // % de remplissage des 2 barres en mode mobile

  function startCycle() {
    if (intervalId || isMobile) return;
    // Force un frame intermédiaire entre l'état "rien d'actif" et l'étape 0
    // pour que la transition height: 0 → 100% de la barre 1 démarre vraiment.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (isMobile) return;
        activeStep = 0;
        intervalId = setInterval(() => {
          activeStep = (activeStep + 1) % STEP_COUNT;
        }, STEP_DURATION);
      });
    });
  }

  function stopCycle() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function updateFromScroll() {
    const viewportLine = window.innerHeight * 0.5;
    const ys = stepEls.map((el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return rect.top + 18; // centre du cercle 36px du numéro
    });

    // Étape active : le plus grand index dont la position a dépassé la ligne du viewport
    let active = -1;
    for (let i = 0; i < ys.length; i++) {
      if (ys[i] !== null && ys[i] <= viewportLine) active = i;
    }
    activeStep = active;

    // Progression continue de chaque barre en fonction du scroll
    const next = [0, 0];
    for (let i = 0; i < 2; i++) {
      if (ys[i] == null || ys[i + 1] == null) continue;
      const t = (viewportLine - ys[i]) / (ys[i + 1] - ys[i]);
      next[i] = Math.max(0, Math.min(1, t)) * 100;
    }
    lineProgresses = next;
  }

  onMount(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT);
    isMobile = mql.matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (isMobile) return;
          if (entry.isIntersecting) {
            startCycle();
          } else {
            stopCycle();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(sectionEl);

    const onScroll = () => {
      if (isMobile) updateFromScroll();
    };

    function applyMode() {
      if (isMobile) {
        stopCycle();
        updateFromScroll();
      } else {
        // desktop: cycle is gated by the IntersectionObserver
      }
    }

    function handleMqlChange(e) {
      isMobile = e.matches;
      applyMode();
    }

    mql.addEventListener('change', handleMqlChange);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    applyMode();

    return () => {
      stopCycle();
      observer.disconnect();
      mql.removeEventListener('change', handleMqlChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });
</script>

<section class="steps" data-reveal bind:this={sectionEl}>
  <div class="steps-inner">
    <div class="steps-header">
      <h2 class="steps-title">Comment rejoindre l'aventure ?</h2>
      <span class="steps-pill">Rien de plus simple</span>
    </div>

    <div class="steps-grid">
      <div class="steps-list">
        <div
          class="step"
          class:is-active={activeStep === 0}
          class:is-done={activeStep > 0}
          bind:this={stepEls[0]}
        >
          <div class="step-indicator">
            <span class="step-number">1</span>
            <span class="step-line"><span class="step-line-fill" style="--fill: {lineProgresses[0]}%"></span></span>
          </div>
          <div class="step-content">
            <h3 class="step-title">Remplis le formulaire en 2 minutes</h3>
            <p class="step-desc">
              Postule en quelques clics via notre formulaire en ligne. C'est rapide, sans engagement, et ça nous permet de mieux comprendre ton projet et tes motivations.
            </p>
          </div>
        </div>

        <div
          class="step"
          class:is-active={activeStep === 1}
          class:is-done={activeStep > 1}
          bind:this={stepEls[1]}
        >
          <div class="step-indicator">
            <span class="step-number">2</span>
            <span class="step-line"><span class="step-line-fill" style="--fill: {lineProgresses[1]}%"></span></span>
          </div>
          <div class="step-content">
            <h3 class="step-title">On échange sur ton projet et tes attentes</h3>
            <p class="step-desc">
              Après ta candidature, on organise un appel ou un échange informel pour discuter de ton parcours, de tes besoins et de ce que Boost peut t'apporter. L'objectif ? Vérifier que le club est fait pour toi, et que tu es fait pour le club.
            </p>
          </div>
        </div>

        <div
          class="step"
          class:is-active={activeStep === 2}
          bind:this={stepEls[2]}
        >
          <div class="step-indicator">
            <span class="step-number">3</span>
          </div>
          <div class="step-content">
            <h3 class="step-title">Si le fit est mutuel, tu intègres le club et le groupe WhatsApp</h3>
            <p class="step-desc">
              Une fois validé, tu rejoins officiellement la communauté et accèdes à notre espace d'échange privé. Tu seras aussi ajouté au groupe WhatsApp pour rester connecté en temps réel avec les autres membres et les opportunités du réseau.
            </p>
          </div>
        </div>
      </div>

      <div class="steps-visual">
        <div class="steps-mockup">
          {#if activeStep <= 0}
            <div class="mockup mockup-form" in:fade={{ duration: 300 }}>
              <div class="mockup-window">
                <div class="window-bar">
                  <span class="window-dot red"></span>
                  <span class="window-dot yellow"></span>
                  <span class="window-dot green"></span>
                </div>
                <div class="window-body">
                  <div class="form-title"></div>
                  <div class="form-field">
                    <div class="form-label"></div>
                    <div class="form-input"></div>
                  </div>
                  <div class="form-field">
                    <div class="form-label"></div>
                    <div class="form-input"></div>
                  </div>
                  <div class="form-field">
                    <div class="form-label"></div>
                    <div class="form-input tall"></div>
                  </div>
                  <div class="form-submit">Envoyer ma candidature</div>
                </div>
              </div>
            </div>
          {:else if activeStep === 1}
            <div class="mockup mockup-call" in:fade={{ duration: 300 }}>
              <div class="call-window">
                <div class="call-grid">
                  <div class="call-tile">
                    <div class="call-avatar">M</div>
                    <span class="call-name">Maxime</span>
                    <span class="call-mic on"></span>
                  </div>
                  <div class="call-tile self">
                    <div class="call-avatar alt">T</div>
                    <span class="call-name">Toi</span>
                    <span class="call-mic on"></span>
                  </div>
                </div>
                <div class="call-controls">
                  <span class="call-btn"></span>
                  <span class="call-btn"></span>
                  <span class="call-btn end"></span>
                </div>
              </div>
            </div>
          {:else}
            <div class="mockup mockup-chat" in:fade={{ duration: 300 }}>
              <div class="chat-window">
                <div class="chat-header">
                  <div class="chat-group-icon"></div>
                  <div class="chat-header-text">
                    <span class="chat-group-name">Club Boost</span>
                    <span class="chat-group-meta">42 membres en ligne</span>
                  </div>
                </div>
                <div class="chat-body">
                  <div class="chat-bubble left">
                    <div class="chat-author">Léa</div>
                    <div class="chat-line"></div>
                    <div class="chat-line short"></div>
                  </div>
                  <div class="chat-bubble right">
                    <div class="chat-line"></div>
                  </div>
                  <div class="chat-bubble left">
                    <div class="chat-author">Yanis</div>
                    <div class="chat-line short"></div>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .steps {
    background: var(--blanc);
    padding: 6rem 24px;
  }

  .steps-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .steps-header {
    text-align: center;
    margin: 0 0 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .steps-title {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--bleu-950);
    margin: 0;
    text-align: center;
    letter-spacing: -0.02em;
  }

  .steps-pill {
    display: inline-block;
    background: var(--blanc);
    color: var(--bleu-950);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--gris-200);
  }

  .steps-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .steps-visual {
    position: sticky;
    top: 8rem;
  }

  .steps-mockup {
    background: var(--bleu-clair);
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
  }

  .mockup {
    position: absolute;
    inset: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ---------- Mockup 1 : Formulaire ---------- */
  .mockup-window {
    width: 100%;
    background: var(--blanc);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(21, 37, 86, 0.12);
    overflow: hidden;
  }

  .window-bar {
    background: #f3f5f9;
    padding: 10px 14px;
    display: flex;
    gap: 6px;
    border-bottom: 1px solid #e8ecf3;
  }

  .window-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d8dde6;
  }

  .window-dot.red { background: #ff6058; }
  .window-dot.yellow { background: #ffbe2e; }
  .window-dot.green { background: #2bca41; }

  .window-body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .form-title {
    height: 10px;
    width: 50%;
    background: var(--bleu-600);
    opacity: 0.7;
    border-radius: 4px;
    margin-bottom: 0.25rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-label {
    height: 6px;
    width: 30%;
    background: #c8cfdb;
    border-radius: 3px;
  }

  .form-input {
    height: 22px;
    background: #f1f4f9;
    border: 1px solid #e2e7f0;
    border-radius: 6px;
  }

  .form-input.tall {
    height: 38px;
  }

  .form-submit {
    margin-top: 0.25rem;
    background: var(--bleu-600);
    color: var(--blanc);
    font-size: 0.7rem;
    font-weight: 600;
    text-align: center;
    padding: 8px 0;
    border-radius: 6px;
  }

  /* ---------- Mockup 2 : Visio ---------- */
  .call-window {
    width: 100%;
    background: #0c1a3a;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(21, 37, 86, 0.18);
    overflow: hidden;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .call-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .call-tile {
    aspect-ratio: 4 / 3;
    background: linear-gradient(135deg, #1a2d5e 0%, #243b78 100%);
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .call-tile.self {
    background: linear-gradient(135deg, #184DD9 0%, #2064F0 100%);
  }

  .call-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bleu-600);
    color: var(--blanc);
    font-weight: 700;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.4);
  }

  .call-avatar.alt {
    background: #ffffff;
    color: var(--bleu-600);
  }

  .call-name {
    position: absolute;
    bottom: 6px;
    left: 8px;
    color: var(--blanc);
    font-size: 0.65rem;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.35);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .call-mic {
    position: absolute;
    bottom: 6px;
    right: 8px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
  }

  .call-mic.on {
    background: #2bca41;
  }

  .call-controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    padding-top: 4px;
  }

  .call-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
  }

  .call-btn.end {
    background: #ff5252;
  }

  /* ---------- Mockup 3 : Chat communauté ---------- */
  .chat-window {
    width: 100%;
    background: var(--blanc);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(21, 37, 86, 0.12);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .chat-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    background: var(--bleu-600);
    color: var(--blanc);
  }

  .chat-group-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    flex-shrink: 0;
  }

  .chat-header-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .chat-group-name {
    font-size: 0.8rem;
    font-weight: 700;
  }

  .chat-group-meta {
    font-size: 0.65rem;
    opacity: 0.85;
  }

  .chat-body {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f4f6fb;
  }

  .chat-bubble {
    max-width: 75%;
    padding: 8px 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .chat-bubble.left {
    align-self: flex-start;
    background: var(--blanc);
    border-bottom-left-radius: 2px;
    box-shadow: 0 1px 2px rgba(21, 37, 86, 0.05);
  }

  .chat-bubble.right {
    align-self: flex-end;
    background: var(--bleu-600);
    border-bottom-right-radius: 2px;
  }

  .chat-author {
    font-size: 0.6rem;
    font-weight: 700;
    color: var(--bleu-600);
  }

  .chat-line {
    height: 6px;
    background: #d6dde9;
    border-radius: 3px;
    width: 120px;
  }

  .chat-line.short {
    width: 70px;
  }

  .chat-bubble.right .chat-line {
    background: rgba(255, 255, 255, 0.55);
  }

  /* ---------- Steps list ---------- */
  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .step {
    display: flex;
    gap: 1.5rem;
    padding: 0;
    transition: opacity 0.4s ease;
    opacity: 0.3;
  }

  .step.is-active,
  .step.is-done {
    opacity: 1;
  }

  .step-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .step-number {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bleu-clair);
    color: var(--bleu-600);
    font-weight: 700;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid var(--bleu-clair);
    transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  }

  .step.is-active .step-number,
  .step.is-done .step-number {
    background: var(--bleu-600);
    color: var(--blanc);
    border-color: var(--bleu-600);
  }

  .step.is-active .step-number {
    box-shadow: 0 0 0 6px rgba(32, 100, 240, 0.15);
  }

  .step-line {
    width: 2px;
    flex: 1;
    background: rgba(32, 100, 240, 0.18);
    margin: 0;
    min-height: 40px;
    position: relative;
    overflow: hidden;
    border-radius: 2px;
  }

  .step-line-fill {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    background: var(--bleu-700);
    transition: height 0.5s ease;
  }

  .step.is-active .step-line-fill {
    height: 100%;
    transition: height 4s linear;
  }

  .step.is-done .step-line-fill {
    height: 100%;
    transition: height 0s linear;
  }

  .step-content {
    padding-bottom: 2.5rem;
  }

  .step:last-child .step-content {
    padding-bottom: 0;
  }

  .step-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--bleu-950);
    margin: 0 0 0.5rem;
    line-height: 1.3;
    transition: color 0.4s ease;
  }

  .step-desc {
    font-size: 16px;
    line-height: 1.6;
    color: var(--gris-700);
    margin: 0;
  }

  @media (max-width: 900px) {
    .steps {
      padding: 4rem 24px;
    }

    .steps-title {
      font-size: 1.5rem;
    }

    .steps-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .steps-visual {
      position: static;
      display: none;
    }

    /* Mobile : pas d'auto-cycle, la barre suit directement le scroll
       grâce à la variable --fill calculée dans updateFromScroll */
    .step-line-fill,
    .step.is-active .step-line-fill,
    .step.is-done .step-line-fill {
      height: var(--fill, 0%);
      transition: height 0.12s linear;
    }

    .step.is-active,
    .step.is-done {
      opacity: 1;
    }
  }
</style>
