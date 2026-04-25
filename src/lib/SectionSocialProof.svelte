<script>
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import robinImg from '../../assets/robin.png?url';
  import charlotteImg from '../../assets/charlotte.png?url';
  import noemieImg from '../../assets/noemie.png?url';

  const testimonials = [
    {
      name: 'Robin Berthault',
      age: '19 ans',
      role: 'Étudiant-entrepreneur',
      club: "Club d'Angers",
      image: robinImg,
      paragraphs: [
        "Je dirige Puresolutions, une entreprise spécialisée dans le nettoyage automobile à Angers. Passionné par l'entrepreneuriat, j'ai rejoint le Club Boost dès sa création pour structurer mon activité et ne pas rester isolé.",
        "Le club m'a apporté un soutien concret, notamment sur la gestion administrative et sur le plan digital. J'ai pu soumettre mon site internet au regard critique du groupe, et les retours techniques et stratégiques de vrais professionnels m'ont permis de l'optimiser avec une précision que je n'aurais jamais atteinte seul.",
        "Le Club Boost est aussi un formidable levier de visibilité : en peu de temps, j'ai présenté Puresolutions à 42 entrepreneurs locaux, et deux membres se sont déjà montrés intéressés par mes prestations.",
        "La volonté de créer du lien authentique à travers des rencontres physiques est remarquable : on peut réellement compter les uns sur les autres."
      ]
    },
    {
      name: 'Charlotte Mallassagne',
      age: '21 ans',
      role: 'Vidéaste, photographe',
      club: "Club d'Angers",
      image: charlotteImg,
      paragraphs: [
        "À 21 ans, j'ouvre tout juste ma micro-entreprise. Vidéaste, photographe, bref, un peu touche-à-tout. Mais le problème quand on a 21 ans et qu'on étudie les sciences politiques comme moi, c'est qu'on est 100 % autodidacte.",
        "J'ai rejoint le Club Boost à ses débuts, car j'étais souvent perdue et je me sentais même parfois seule dans cette aventure. Ce club permet des rencontres, il débloque des situations et surtout crée du lien. Je recommande le Club Boost."
      ]
    },
    {
      name: 'Noémie Chenouard',
      age: null,
      role: 'Ostéopathe pour animaux',
      club: "Club d'Angers",
      image: noemieImg,
      paragraphs: [
        "J'ai rejoint le club Boost car je viens d'emménager à Angers et j'avais besoin de rencontrer du monde et de me constituer un réseau. Le club est ultra bienveillant : chacun partage ses progrès et ses doutes sans jugement.",
        "Marc-Antoine de Moutarde Sérigraphie a floqué des polos avec mon logo et m'a recommandée à ses amis. Grâce aux rencontres organisées, j'ai pu avoir des discussions enrichissantes avec des personnes que je n'aurais sans doute jamais rencontrées autrement.",
        "Je recommande le club, car c'est une safe place dans le monde difficile de l'entrepreneuriat et un vrai moyen de s'entraider entre chefs d'entreprise !"
      ]
    }
  ];

  const N = testimonials.length;
  const AUTO_DELAY = 5000;
  const SWIPE_THRESH = 80;

  let active = 0;
  let expandedMap = {};
  let autoTimer;

  // Drag (imperative, not reactive — perf)
  let isDragging = false;
  let startX = 0;
  let dx = 0;
  let cardEls = [];
  let wrapperEl;

  $: order = testimonials.map((_, i) => (i - active + N) % N);

  function advance() {
    expandedMap = {};
    active = (active + 1) % N;
  }

  function goTo(i) {
    expandedMap = {};
    active = i;
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(advance, AUTO_DELAY);
  }

  function toggleExpand(i) {
    expandedMap[i] = !expandedMap[i];
    expandedMap = expandedMap;
  }

  // --- Drag handlers ---
  function onDown(e) {
    if (e.target.closest('.stack-expand')) return; // don't drag on "Voir plus"
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    dx = 0;
    const top = cardEls[active];
    if (top) {
      top.style.transition = 'none';
      top.classList.add('is-dragging');
    }
    startAuto(); // reset timer on interaction
  }

  function onMove(e) {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    dx = x - startX;

    const top = cardEls[active];
    if (top) {
      const rot = dx * 0.04;
      top.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;
    }

    // Reveal card behind
    const nextIdx = (active + 1) % N;
    const behind = cardEls[nextIdx];
    if (behind) {
      const p = Math.min(Math.abs(dx) / 200, 1);
      behind.style.transform = `scale(${0.95 + p * 0.05}) translateY(${8 * (1 - p)}px)`;
    }

    if (e.cancelable && Math.abs(dx) > 8) e.preventDefault();
  }

  function onUp() {
    if (!isDragging) return;
    isDragging = false;

    const top = cardEls[active];
    if (!top) return;
    top.classList.remove('is-dragging');

    if (Math.abs(dx) > SWIPE_THRESH) {
      // Fly out
      const dir = dx > 0 ? 1 : -1;
      top.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      top.style.transform = `translateX(${dir * 600}px) rotate(${dir * 20}deg)`;
      top.style.opacity = '0';
      setTimeout(() => {
        top.style.transition = '';
        top.style.transform = '';
        top.style.opacity = '';
        advance();
      }, 400);
    } else {
      // Snap back
      top.style.transition = 'transform 0.3s ease';
      top.style.transform = '';
      // Also snap the behind card back
      const nextIdx = (active + 1) % N;
      const behind = cardEls[nextIdx];
      if (behind) {
        behind.style.transition = 'transform 0.3s ease';
        behind.style.transform = '';
        setTimeout(() => { behind.style.transition = ''; }, 300);
      }
      setTimeout(() => { top.style.transition = ''; }, 300);
    }
    dx = 0;
  }

  onMount(() => {
    // Counter animations
    document.querySelectorAll('[data-counter]').forEach((el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        onUpdate: () => { el.textContent = prefix + Math.round(obj.val); }
      });
    });

    startAuto();

    // Drag listeners
    if (wrapperEl) {
      wrapperEl.addEventListener('mousedown', onDown);
      wrapperEl.addEventListener('touchstart', onDown, { passive: true });
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
    }
  });

  onDestroy(() => {
    clearInterval(autoTimer);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchend', onUp);
  });
</script>

<section class="social-proof" id="temoignages" data-reveal>
  <div class="sp-shapes" aria-hidden="true">
    <svg class="sp-shape sp-shape--1" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    <svg class="sp-shape sp-shape--2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
    <svg class="sp-shape sp-shape--3" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>
  </div>
  <div class="social-proof-inner">
    <p class="social-proof-subtitle">Rejoint un réseau en pleine croissance !</p>
    <h2 class="social-proof-title">
      Ils ont déjà rejoint le <span class="highlight">club Boost</span>
    </h2>

    <!-- Bento stats -->
    <div class="bento-grid">
      <div class="bento-card bento-card--members">
        <div class="bento-row">
          <div class="bento-text">
            <span class="bento-number" data-counter="43">0</span>
            <span class="bento-label">Membres actifs</span>
          </div>
          <div class="bento-icon" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <circle class="user-head u1" cx="20" cy="12" r="5" fill="currentColor"/>
              <path class="user-body u1" d="M10 32c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <circle class="user-head u2" cx="33" cy="14" r="3.5" fill="currentColor" opacity="0.4"/>
              <path class="user-body u2" d="M27 32c0-4 2.5-7 6-8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>
              <circle class="user-head u3" cx="7" cy="14" r="3.5" fill="currentColor" opacity="0.4"/>
              <path class="user-body u3" d="M13 32c0-4-2.5-7-6-8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>
            </svg>
          </div>
        </div>
        <p class="bento-desc">Rejoins-nous pour construire le 1er réseau freelance de France.</p>
      </div>
      <div class="bento-row-2">
        <div class="bento-card bento-card--reco">
          <div class="bento-icon-sm" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <circle class="reco-star s1" cx="20" cy="14" r="3" fill="currentColor"/>
              <circle class="reco-star s2" cx="12" cy="20" r="2" fill="currentColor" opacity="0.5"/>
              <circle class="reco-star s3" cx="28" cy="20" r="2" fill="currentColor" opacity="0.5"/>
              <path d="M8 26h24v1a7 7 0 01-7 7H15a7 7 0 01-7-7v-1z" fill="currentColor" opacity="0.1"/>
            </svg>
          </div>
          <span class="bento-number" data-counter="140" data-prefix="+">+0</span>
          <span class="bento-label">Recommandations</span>
        </div>
        <div class="bento-card bento-card--events">
          <div class="bento-icon-sm" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <rect x="6" y="10" width="28" height="24" rx="4" stroke="currentColor" stroke-width="2.5" fill="none"/>
              <path d="M6 18h28" stroke="currentColor" stroke-width="2.5"/>
              <line x1="14" y1="6" x2="14" y2="14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="26" y1="6" x2="26" y2="14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <circle class="cal-dot d1" cx="14" cy="25" r="2" fill="currentColor"/>
              <circle class="cal-dot d2" cx="20" cy="25" r="2" fill="currentColor" opacity="0.5"/>
              <circle class="cal-dot d3" cx="26" cy="25" r="2" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
          <span class="bento-number" data-counter="3">0</span>
          <span class="bento-label">Événements physiques</span>
        </div>
      </div>
    </div>

    <!-- Témoignages stack -->
    <div class="testimonials-header">
      <span class="testimonials-pill">Témoignage</span>
      <h3 class="testimonials-title">
        Ce que disent <span class="highlight">les membres</span> <span class="emoji">🤩</span>
      </h3>
    </div>

    <div class="stack-zone" bind:this={wrapperEl}>
      {#each testimonials as t, i}
        {@const pos = order[i]}
        <article
          class="stack-card"
          class:is-top={pos === 0}
          class:is-behind-1={pos === 1}
          class:is-behind-2={pos === 2}
          bind:this={cardEls[i]}
        >
          <header class="stack-header">
            <div class="stack-avatar">
              <img src={t.image} alt={t.name} />
            </div>
            <div class="stack-meta">
              <p class="stack-name">
                {t.name}{#if t.age}, <span class="stack-age">{t.age}</span>{/if}
              </p>
              <p class="stack-role">
                {t.role} <span class="dot">•</span> {t.club}
              </p>
            </div>
          </header>
          <div class="stack-divider"></div>
          <div class="stack-body" class:is-expanded={expandedMap[i]}>
            {#each t.paragraphs as p}
              <p>{p}</p>
            {/each}
          </div>
          {#if t.paragraphs.join('').length > 220}
            <button class="stack-expand" on:click|stopPropagation={() => toggleExpand(i)}>
              {expandedMap[i] ? 'Voir moins' : 'Voir plus'}
            </button>
          {/if}
        </article>
      {/each}

      <div class="stack-dots">
        {#each testimonials as _, i}
          <button
            class="stack-dot"
            class:active={active === i}
            on:click={() => { goTo(i); startAuto(); }}
            aria-label="Témoignage {i + 1}"
          ></button>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .social-proof { background: var(--blanc); padding: 6rem 24px; position: relative; overflow: hidden; }

  .sp-shapes { position: absolute; inset: 0; pointer-events: none; }
  .sp-shape { position: absolute; color: rgba(32, 100, 240, 0.08); }
  .sp-shape--1 { width: 18px; right: 6%; top: 12%; animation: sp-float 9s ease-in-out infinite; }
  .sp-shape--2 { width: 14px; left: 4%; top: 40%; animation: sp-float 11s ease-in-out infinite 2s; }
  .sp-shape--3 { width: 7px; right: 10%; bottom: 25%; animation: sp-float 8s ease-in-out infinite 3s; }
  @keyframes sp-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

  .social-proof-inner { max-width: 1200px; margin: 0 auto; width: 100%; }

  .social-proof-subtitle {
    text-align: center; font-size: 0.9rem; font-weight: 500;
    color: var(--bleu-600); margin: 0 0 0.75rem; letter-spacing: 0.02em;
  }

  .social-proof-title {
    text-align: center; font-size: 2.25rem; font-weight: 700;
    line-height: 1.2; color: var(--bleu-950); margin: 0 0 4rem; letter-spacing: -0.02em;
  }

  .social-proof-title .highlight, .testimonials-title .highlight { color: var(--bleu-600); }

  /* ========== BENTO ========== */
  .bento-grid { max-width: 700px; margin: 0 auto 6rem; display: flex; flex-direction: column; gap: 1rem; }
  .bento-card { background: var(--blanc); border: 1px solid var(--gris-200); border-radius: 16px; padding: 1.75rem 2rem; box-shadow: 0 2px 12px rgba(21,37,86,0.04); }
  .bento-card--members { background: var(--bleu-clair); border-color: rgba(32,100,240,0.08); }
  .bento-row { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; margin-bottom: 0.5rem; }
  .bento-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .bento-text { display: flex; flex-direction: column; gap: 0.15rem; }
  .bento-number { font-size: 3rem; font-weight: 700; color: var(--bleu-600); line-height: 1; font-variant-numeric: tabular-nums; }
  .bento-card--members .bento-number { font-size: 3.5rem; }
  .bento-label { font-size: 1.15rem; font-weight: 600; color: var(--bleu-950); }
  .bento-desc { font-size: 0.875rem; line-height: 1.5; color: var(--gris-700); margin: 0; }
  .bento-icon { width: 52px; height: 52px; color: var(--bleu-600); flex-shrink: 0; }
  .bento-icon svg { width: 100%; height: 100%; }
  .bento-icon-sm { width: 36px; height: 36px; color: var(--bleu-600); margin-bottom: 0.5rem; }
  .bento-icon-sm svg { width: 100%; height: 100%; }

  .user-head.u1,.user-body.u1{animation:user-pulse 3s ease-in-out infinite}
  .user-head.u2,.user-body.u2{animation:user-fade-in 3s ease-in-out infinite .3s}
  .user-head.u3,.user-body.u3{animation:user-fade-in 3s ease-in-out infinite .6s}
  @keyframes user-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  @keyframes user-fade-in{0%,100%{opacity:.25}50%{opacity:.6}}
  .reco-star{animation:star-twinkle 2.5s ease-in-out infinite}
  .reco-star.s2{animation-delay:.4s}.reco-star.s3{animation-delay:.8s}
  @keyframes star-twinkle{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
  .cal-dot{animation:cal-pop 2s ease-in-out infinite}
  .cal-dot.d2{animation-delay:.25s}.cal-dot.d3{animation-delay:.5s}
  @keyframes cal-pop{0%,100%{opacity:.2;r:1.5}50%{opacity:1;r:2.5}}

  /* ========== STACK ========== */
  .testimonials-header { text-align: center; margin-bottom: 3rem; }
  .testimonials-pill {
    display: inline-block; background: var(--blanc); color: var(--bleu-950);
    font-size: 0.8rem; font-weight: 500; padding: 0.4rem 1rem;
    border-radius: 999px; border: 1px solid var(--gris-200); margin-bottom: 1rem;
  }
  .testimonials-title { font-size: 2rem; font-weight: 700; line-height: 1.2; color: var(--bleu-950); margin: 0; letter-spacing: -0.02em; }
  .testimonials-title .emoji { display: inline-block; margin-left: 0.25rem; }

  .stack-zone {
    max-width: 560px;
    margin: 0 auto;
    position: relative;
    /* Extra bottom padding for the stack peek + dots */
    padding-bottom: 4rem;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .stack-zone:active { cursor: grabbing; }

  /* --- Card base --- */
  .stack-card {
    background: var(--blanc);
    border: 1px solid var(--gris-200);
    border-radius: 16px;
    padding: 2rem 1.75rem;
    box-shadow: 0 4px 24px rgba(21, 37, 86, 0.08);
    will-change: transform, opacity;
  }

  /* Top card — in normal document flow so it determines height */
  .stack-card.is-top {
    position: relative;
    z-index: 3;
    transition: none; /* drag handles it */
  }

  /* Behind cards — décalées pour montrer l'effet pile */
  .stack-card.is-behind-1 {
    position: absolute;
    top: 0; left: 0; right: 0;
    z-index: 2;
    transform: translateX(12px) translateY(10px) rotate(1.5deg);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .stack-card.is-behind-2 {
    position: absolute;
    top: 0; left: 0; right: 0;
    z-index: 1;
    transform: translateX(-10px) translateY(18px) rotate(-2deg);
    opacity: 0.5;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Header */
  .stack-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .stack-avatar {
    width: 52px; height: 52px; border-radius: 10px;
    background: linear-gradient(135deg, var(--bleu-600), var(--bleu-700));
    flex-shrink: 0; overflow: hidden;
  }
  .stack-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .stack-meta { min-width: 0; }
  .stack-name { margin: 0 0 0.2rem; font-size: 1rem; font-weight: 700; color: var(--bleu-950); line-height: 1.3; }
  .stack-age { font-weight: 600; }
  .stack-role { margin: 0; font-size: 0.85rem; color: var(--gris-400); line-height: 1.4; }
  .stack-role .dot { margin: 0 0.25rem; color: var(--gris-200); }
  .stack-divider { height: 1px; background: var(--gris-200); margin: 0 0 1rem; }

  /* Body — clamp with gradient fade */
  .stack-body {
    max-height: 180px;
    overflow: hidden;
    position: relative;
  }

  .stack-body::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 50px;
    background: linear-gradient(transparent, var(--blanc));
    pointer-events: none;
    transition: opacity 0.3s;
  }

  .stack-body.is-expanded {
    max-height: none;
  }

  .stack-body.is-expanded::after {
    opacity: 0;
  }

  .stack-body p { margin: 0 0 0.75rem; font-size: 15px; line-height: 1.6; color: var(--bleu-950); }
  .stack-body p:last-child { margin-bottom: 0; }

  .stack-expand {
    display: inline-block; margin-top: 0.75rem;
    font-size: 0.8rem; font-weight: 600; color: var(--bleu-600);
    background: none; border: none; padding: 0; cursor: pointer;
  }
  .stack-expand:hover { text-decoration: underline; }

  /* Dots */
  .stack-dots {
    display: flex; justify-content: center; gap: 0.5rem;
    margin-top: 1.75rem;
    position: relative;
    z-index: 10;
  }
  .stack-dot {
    width: 8px; height: 8px; border-radius: 50%; border: none;
    background: var(--gris-200); cursor: pointer; padding: 0;
    transition: background 0.3s, transform 0.3s;
  }
  .stack-dot.active { background: var(--bleu-600); transform: scale(1.3); }

  @media (prefers-reduced-motion: reduce) {
    .user-head,.user-body,.reco-star,.cal-dot{animation:none}
    .stack-card{transition:none!important}
  }

  /* ========== MOBILE ========== */
  @media (max-width: 900px) {
    .social-proof { padding: 4rem 0; }
    .social-proof-inner { padding: 0 1.5rem; }
    .social-proof-subtitle { text-align: left; }
    .social-proof-title { font-size: 1.625rem; text-align: left; margin-bottom: 3rem; }
    .bento-grid { margin-bottom: 4rem; }
    .bento-row-2 { grid-template-columns: 1fr; }
    .bento-card--members .bento-number { font-size: 3rem; }
    .testimonials-header { text-align: left; margin-bottom: 2rem; }
    .testimonials-title { font-size: 1.5rem; text-align: left; }
    .stack-card { padding: 1.5rem 1.25rem; }
    .stack-avatar { width: 44px; height: 44px; }
    .stack-body p { font-size: 14px; }
  }
</style>
