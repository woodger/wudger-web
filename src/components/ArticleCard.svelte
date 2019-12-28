<script>
  export let id;
  export let title;
  export let madeYear;
  export let price;
  export let activityType;
  export let index;
</script>

<style>
  .card {
    padding: 1rem;
  }

  .card__row {
    display: flex;
  }

  .card__col {
    margin: 0 .5rem;
  }

  .card__options {
    display: flex;
    font-size: .9rem;
    font-style: italic;
    color: #333000;
  }

  .card__option {
    margin: 1rem;
  }

  .card__option_green {
    color: #03a817;
  }
</style>

<div class="card">
  <div class="card__row">
    <div class="card__col">{index}.</div>
    <div class="card__col">
      <div>
        <a href="/articles/{id}">{title}</a>
      </div>
      <div class="card__options">

        {#if madeYear}
          <div class="card__option">{madeYear} год</div>
        {/if}

        <div class="card__option">
          {#if price === 0}
            Бесплатно
          {:else}
            {price} ₽
          {/if}
        </div>

        {#if activityType}
          <div class="card__option card__option_green">
            {activityType}
          </div>
        {/if}
      </div>
    </div>
    <slot />
  </div>
</div>
