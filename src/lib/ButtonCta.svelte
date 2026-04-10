<script>
  /** @type {string} */
  export let href = '#candidater';
  /** @type {string} */
  export let label = 'Candidater';
  /** @type {boolean} */
  export let showArrow = true;
  import arrowUpRightSvg from '../../assets/arrow-up-right.svg?url';
</script>

<a {href} class="btn-cta">
  {label}
  {#if showArrow}
    <img src={arrowUpRightSvg} alt="" width="24" height="24" aria-hidden="true" />
  {/if}
</a>

<style>
  .btn-cta {
    width: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    background: var(--bleu-700);
    color: var(--blanc);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: 400;
    font-size: 1rem;
    border: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(24, 77, 217, 0.35);
  }
</style>
