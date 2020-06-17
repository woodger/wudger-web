<script>
  export let value = {};
  export let index;
  export let href;

  function crop(value = '', size = 200, dots = '...') {
    if (value.length < size) {
      return value;
    }

    let short = '';

    for (let i of value.split(' ')) {
      if (short.length > size * .75) {
        break;
      }

      short += i + ' ';
    }

    return short + dots;
  }
</script>

<style>
  .article-card {
    padding: 1rem 0;
  }

  .article-card__row {
    display: flex;
  }

  .article-card__number {
    margin: 1rem;
  }

  .article-card__title {
    margin: 1rem;
    font-size: 1.2rem;
  }

  .article-card__descriotion {
    margin: 1rem;
  }

  .article-card__options {
    display: flex;
    font-style: italic;
    color: #333000;
  }

  .article-card__option {
    margin: 0 1rem;
  }

  .article-card__option_green {
    color: #269926;
  }

  .article-card__option_red {
    color: #bf3030;
  }

  .article-card__col_right {
    margin-left: auto;
  }
</style>

<div class="article-card">
  <div class="article-card__row">
    <div>
      <div class="article-card__number">
        {index}.
      </div>
    </div>
    <div>
      <div class="article-card__title">
        <a {href}>{value.title}</a>
      </div>

      {#if value.descriotion}
        <div class="article-card__descriotion">{crop(value.descriotion)}</div>
      {/if}

      <div class="article-card__options">

        {#if value.madeYear}
          <div class="article-card__option">{value.madeYear} год</div>
        {/if}

        <div class="article-card__option">
          {#if value.price === 0}
            Бесплатно
          {:else}
            {value.price} ₽
          {/if}
        </div>

        {#if value.activityType}
          <div class="article-card__option article-card__option_green">
            {value.activityType}
          </div>
        {/if}

        {#if value.note}
          <div class="article-card__option article-card__option_red">{value.note}</div>
        {/if}
      </div>
    </div>

    <div class="article-card__col_right">
      <slot />
    </div>
  </div>
</div>
