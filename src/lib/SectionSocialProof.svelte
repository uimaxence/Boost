<script>
  // Section Social Proof — stats animées + témoignages membres
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  const testimonials = [
    {
      name: 'Robin Berthault',
      age: '19 ans',
      role: 'Étudiant-entrepreneur',
      club: "Club d'Angers",
      initials: 'RB',
      paragraphs: [
        "Je dirige Puresolutions, une entreprise spécialisée dans le nettoyage automobile à Angers. Passionné par l'entrepreneuriat, j'ai rejoint le Club Boost dès sa création pour structurer mon activité et ne pas rester isolé.",
        "Le club m'a apporté un soutien concret, notamment sur la gestion administrative et sur le plan digital. J'ai pu soumettre mon site internet au regard critique du groupe, et les retours techniques et stratégiques de vrais professionnels m'ont permis de l'optimiser avec une précision que je n'aurais jamais atteinte seul.",
        "Le Club Boost est aussi un formidable levier de visibilité : en peu de temps, j'ai présenté Puresolutions à 42 entrepreneurs locaux, et deux membres se sont déjà montrés intéressés par mes prestations. La confiance s'installe naturellement, favorisant le business local.",
        "Enfin, la volonté de créer du lien authentique à travers des rencontres physiques est remarquable : cela permet de dépasser les échanges numériques pour bâtir une véritable communauté d'entraide où l'on peut réellement compter les uns sur les autres."
      ]
    },
    {
      name: 'Charlotte Mallassagne',
      age: '21 ans',
      role: 'Vidéaste, photographe',
      club: "Club d'Angers",
      initials: 'CM',
      paragraphs: [
        "À 21 ans, j'ouvre tout juste ma micro-entreprise. Vidéaste, photographe, bref, un peu touche-à-tout. Mais le problème quand on a 21 ans et qu'on étudie les sciences politiques comme moi, c'est qu'on est 100 % autodidacte, aussi bien sur le cœur de métier que sur la gestion d'entreprise.",
        "J'ai rejoint le Club Boost à ses débuts, car j'étais souvent perdue et je me sentais même parfois seule dans cette aventure. Ce club permet des rencontres, il débloque des situations et surtout crée du lien. Je recommande le Club Boost."
      ]
    },
    {
      name: 'Noémie Chenouard',
      age: null,
      role: 'Ostéopathe pour animaux',
      club: "Club d'Angers",
      initials: 'NC',
      paragraphs: [
        "J'ai rejoint le club Boost car je viens d'emménager à Angers et j'avais besoin de rencontrer du monde et de me constituer un réseau. Le club est ultra bienveillant : chacun partage ses progrès et ses doutes sans jugement. Il regroupe des personnes de milieux différents, ce qui permet d'avoir autant de points de vue variés et très pertinents, et favorise également l'entraide.",
        "Pour ma part, Marc-Antoine de Moutarde Sérigraphie a floqué des polos avec mon logo et m'a recommandée à ses amis. Grâce aux rencontres organisées, j'ai pu avoir des discussions enrichissantes avec des personnes que je n'aurais sans doute jamais rencontrées autrement.",
        "Je recommande bien évidemment le club, car c'est une safe place dans le monde difficile de l'entrepreneuriat et un vrai moyen de se soutenir et de s'entraider entre chefs d'entreprise !"
      ]
    }
  ];

  onMount(() => {
    // Animation compteur au scroll
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          el.textContent = prefix + Math.round(obj.val);
        }
      });
    });
  });
</script>

<section class="social-proof" id="temoignages" data-reveal>
  <div class="social-proof-inner">
    <p class="social-proof-subtitle">Rejoint un réseau en pleine croissance !</p>
    <h2 class="social-proof-title">
      Ils ont déjà rejoint le <span class="highlight">club Boost</span>
    </h2>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-number" data-counter="43">0</span>
        <span class="stat-label">Membres</span>
        <p class="stat-desc">
          Ouvert depuis 2 mois, le club est animé par déjà plus de 40 membres actifs. En intégrant le club maintenant, tu feras partie de nos premiers membres et tu nous aideras à construire le 1er réseau freelance de France.
        </p>
      </div>
      <div class="stat-card">
        <span class="stat-number" data-counter="140" data-prefix="+">+0</span>
        <span class="stat-label">Recommandations</span>
        <p class="stat-desc">
          Ouvert depuis 2 mois, le club est animé par déjà plus de 40 membres actifs. En intégrant le club maintenant, tu feras partie de nos premiers membres et tu nous aideras à construire le 1er réseau freelance de France.
        </p>
      </div>
      <div class="stat-card">
        <span class="stat-number" data-counter="3">0</span>
        <span class="stat-label">Événements physique</span>
        <p class="stat-desc">
          Ouvert depuis 2 mois, le club est animé par déjà plus de 40 membres actifs. En intégrant le club maintenant, tu feras partie de nos premiers membres et tu nous aideras à construire le 1er réseau freelance de France.
        </p>
      </div>
    </div>

    <!-- Témoignages — inspirés du design des stories -->
    <div class="testimonials-header">
      <span class="testimonials-pill">Témoignage</span>
      <h3 class="testimonials-title">
        Ce que disent <span class="highlight">les membres</span> <span class="emoji">🤩</span>
      </h3>
    </div>

    <div class="testimonials-grid">
      {#each testimonials as t}
        <article class="testimonial-card">
          <span class="quote-open" aria-hidden="true">“</span>

          <header class="testimonial-header">
            <div class="testimonial-avatar" aria-hidden="true">
              <span>{t.initials}</span>
            </div>
            <div class="testimonial-meta">
              <p class="testimonial-name">
                {t.name}{#if t.age}, <span class="testimonial-age">{t.age}</span>{/if}
              </p>
              <p class="testimonial-role">
                {t.role} <span class="dot">•</span> {t.club}
              </p>
            </div>
          </header>

          <div class="testimonial-divider"></div>

          <div class="testimonial-body">
            {#each t.paragraphs as p}
              <p>{p}</p>
            {/each}
          </div>

          <span class="quote-close" aria-hidden="true">”</span>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .social-proof {
    background: var(--blanc);
    padding: 6rem 24px;
  }

  .social-proof-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .social-proof-subtitle {
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--bleu-600);
    margin: 0 0 0.75rem;
    letter-spacing: 0.02em;
  }

  .social-proof-title {
    text-align: center;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--bleu-950);
    margin: 0 0 4rem;
    letter-spacing: -0.02em;
  }

  .social-proof-title .highlight,
  .testimonials-title .highlight {
    color: var(--bleu-600);
  }

  /* Stats */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 10rem;
  }

  .stat-card {
    text-align: left;
  }

  .stat-number {
    display: block;
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--bleu-600);
    line-height: 1;
    margin-bottom: 0.25rem;
    font-variant-numeric: tabular-nums;
  }

  .stat-label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: var(--bleu-950);
    margin-bottom: 1rem;
  }

  .stat-desc {
    font-size: 16px;
    line-height: 1.6;
    color: var(--gris-700);
    margin: 0;
  }

  /* Témoignages — header */
  .testimonials-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .testimonials-pill {
    display: inline-block;
    background: var(--blanc);
    color: var(--bleu-950);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--gris-200);
    margin-bottom: 1rem;
  }

  .testimonials-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--bleu-950);
    margin: 0;
    letter-spacing: -0.02em;
  }

  .testimonials-title .emoji {
    display: inline-block;
    margin-left: 0.25rem;
  }

  /* Témoignages — grille */
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    align-items: start;
  }

  .testimonial-card {
    position: relative;
    background: var(--blanc);
    border: 1px solid var(--gris-200);
    border-radius: 16px;
    padding: 2rem 1.75rem 2.25rem;
    box-shadow: 0 2px 12px rgba(21, 37, 86, 0.04);
  }

  .quote-open,
  .quote-close {
    position: absolute;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 4rem;
    line-height: 1;
    color: var(--bleu-600);
    font-weight: 700;
    pointer-events: none;
  }

  .quote-open {
    top: -1.75rem;
    left: -0.5rem;
  }

  .quote-close {
    bottom: -2.5rem;
    right: -0.25rem;
  }

  .testimonial-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .testimonial-avatar {
    width: 56px;
    height: 56px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--bleu-600), var(--bleu-700));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  .testimonial-avatar span {
    color: rgba(255, 255, 255, 0.85);
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: 0.02em;
  }

  .testimonial-meta {
    min-width: 0;
  }

  .testimonial-name {
    margin: 0 0 0.2rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--bleu-950);
    line-height: 1.3;
  }

  .testimonial-age {
    font-weight: 600;
    color: var(--bleu-950);
  }

  .testimonial-role {
    margin: 0;
    font-size: 0.85rem;
    color: var(--gris-400);
    line-height: 1.4;
  }

  .testimonial-role .dot {
    margin: 0 0.25rem;
    color: var(--gris-200);
  }

  .testimonial-divider {
    height: 1px;
    background: var(--gris-200);
    margin: 0 0 1.25rem;
  }

  .testimonial-body p {
    margin: 0 0 0.9rem;
    font-size: 16px;
    line-height: 1.6;
    color: var(--bleu-950);
  }

  .testimonial-body p:last-child {
    margin-bottom: 0;
  }

  /* Tablette */
  @media (max-width: 1024px) {
    .testimonials-grid {
      grid-template-columns: 1fr;
      max-width: 560px;
      margin: 0 auto;
      gap: 3rem;
    }
  }

  /* Mobile */
  @media (max-width: 900px) {
    .social-proof {
      padding: 4rem 24px;
    }

    .social-proof-title {
      font-size: 1.5rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
      margin-bottom: 6rem;
    }

    .stat-card {
      text-align: center;
    }

    .testimonials-title {
      font-size: 1.5rem;
    }

    .testimonial-card {
      padding: 1.75rem 1.5rem 2rem;
    }

    .quote-open {
      font-size: 3.25rem;
      top: -1.4rem;
    }

    .quote-close {
      font-size: 3.25rem;
      bottom: -2rem;
    }

    .testimonial-avatar {
      width: 48px;
      height: 48px;
    }

    .testimonial-body p {
      font-size: 16px;
    }
  }
</style>
