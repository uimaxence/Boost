<script>
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  const faqs = [
    {
      question: "Est-ce que le Club Boost est fait pour moi ?",
      answer: "Si tu es entrepreneur, freelance ou porteur de projet et que tu veux avancer plus vite, oui. Il n'y a pas de critères spécifiques pour rejoindre le Club, il se veut avant tout inclusif. Si tu es dans une démarche de création, d'évolution ou simplement curieux d'entreprendre, tu as ta place."
    },
    {
      question: "Est-ce que je vais devoir être très actif ?",
      answer: "Non, tu participes à ton rythme. Mais plus tu t'impliques, plus tu tires de valeur du Club. Un groupe comme celui-ci vit en parti grâce à l'implication des membres."
    },
    {
      question: "Comment se passent les rencontres ?",
      answer: "Des rencontres régulières sont organisées pour favoriser les échanges naturels. Elles ont lieu dans différents lieux afin de changer d'environnement et créer des dynamiques variées. Le but est simple : créer du lien et faire émerger des opportunités."
    },
    {
      question: "Pourquoi passer par une visio avant de rejoindre ?",
      answer: "La visio permet dans un premier temps de découvrir la personne, comprendre ses motivations et ses projets. Elle permet aussi de garantir la qualité des membres et de s'assurer que le Club correspond à ses attentes."
    },
    {
      question: "Est-ce que ça vaut vraiment le prix ?",
      answer: "Le Club est pensé pour générer des rencontres, des opportunités et du réseau, bien au-delà de son coût. Un seul contact ou projet peut largement rentabiliser ton adhésion."
    },
    {
      question: "Est-ce que je peux quitter le Club à tout moment ?",
      answer: "Oui, tu restes libre. L'objectif est que tu restes par valeur, pas par contrainte."
    }
  ];

  let openIndex = 0;

  function toggle(index) {
    openIndex = openIndex === index ? -1 : index;
  }
</script>

<section class="faq" id="faq" data-reveal>
  <div class="faq-inner">
    <div class="faq-header">
      <h2 class="faq-title">Vous avez une question ?</h2>
      <p class="faq-arrow">→ On a la réponse</p>
    </div>

    <div class="faq-list">
      {#each faqs as faq, i}
        <div class="faq-item" class:open={openIndex === i}>
          <button
            class="accordion-trigger"
            aria-expanded={openIndex === i}
            on:click={() => toggle(i)}
          >
            <span class="faq-question">{faq.question}</span>
            <span class="accordion-icon">{openIndex === i ? '−' : '+'}</span>
          </button>
          {#if openIndex === i && faq.answer}
            <div
              class="accordion-panel"
              transition:slide={{ duration: 320, easing: cubicOut }}
            >
              <p>{faq.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .faq {
    background: var(--blanc);
    padding: 6rem 24px;
  }

  .faq-inner {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }

  .faq-header {
    margin-bottom: 3rem;
  }

  .faq-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--bleu-950);
    margin: 0;
    letter-spacing: -0.02em;
  }

  .faq-arrow {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--bleu-600);
    margin: 0.25rem 0 0;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
  }

  .faq-item {
    border-bottom: 1px solid var(--gris-200);
  }

  .accordion-trigger {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 0;
    background: none;
    border: none;
    text-align: left;
    gap: 1rem;
  }

  .faq-question {
    font-size: 1rem;
    font-weight: 600;
    color: var(--bleu-950);
    line-height: 1.4;
  }

  .accordion-icon {
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--bleu-950);
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--gris-200);
  }

  .accordion-panel {
    padding: 0 0 1.25rem;
  }

  .accordion-panel p {
    font-size: 16px;
    line-height: 1.6;
    color: var(--gris-700);
    margin: 0;
  }

  @media (max-width: 768px) {
    .faq {
      padding: 4rem 24px;
    }

    .faq-title {
      font-size: 1.5rem;
    }
  }
</style>
