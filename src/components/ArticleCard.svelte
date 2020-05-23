<script>
  export let id;
  export let title;
  export let madeYear;
  export let price;
  export let activityType;
  export let index;
  export let path;
</script>

<style>
  .article-card {
    padding: 1rem;
  }

  .article-card__row {
    display: flex;
  }

  .article-card__col {
    margin: 0 .5rem;
  }

  .article-card__options {
    display: flex;
    font-size: .9rem;
    font-style: italic;
    color: #333000;
  }

  .article-card__option {
    margin: 1rem;
  }

  .article-card__option_green {
    color: #03a817;
  }

  .article-card__col_right {
    margin-left: auto;
  }
</style>

<div class="article-card">
  <div class="article-card__row">
    <div class="article-card__col">{index}.</div>
    <div class="article-card__col">
      <div>
        <a href="{path}/{id}">{title}</a>
      </div>
      <div class="article-card__options">

        {#if madeYear}
          <div class="article-card__option">{madeYear} год</div>
        {/if}

        <div class="article-card__option">
          {#if price === 0}
            Бесплатно
          {:else}
            {price} ₽
          {/if}
        </div>

        {#if activityType}
          <div class="article-card__option article-card__option_green">
            {activityType}
          </div>
        {/if}
      </div>
    </div>

    <div class="article-card__col_right">
      <slot />
    </div>
  </div>
</div>
