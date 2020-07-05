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
  .container {
    padding: 1rem 0;
  }

  .row {
    display: flex;
  }

  .number {
    margin: 1rem;
  }

  .title {
    margin: 1rem;
    font-size: 1.2rem;
  }

  .descriotion {
    margin: 1rem;
  }

  .option-group {
    display: flex;
    font-style: italic;
    color: #333000;
  }

  .option {
    margin: 0 1rem;
  }

  .option_green {
    color: #269926;
  }

  .option_red {
    color: #bf3030;
  }

  .col_right {
    margin-left: auto;
  }
</style>

<div class="container">
  <div class="row">
    <div>
      <div class="number">
        {index}.
      </div>
    </div>
    <div>
      <div class="title">
        <a {href}>{value.title}</a>
      </div>

      {#if value.descriotion}
        <div class="descriotion">{crop(value.descriotion)}</div>
      {/if}

      <div class="option-group">

        {#if value.madeYear}
          <div class="option">{value.madeYear} год</div>
        {/if}

        <div class="option">
          {#if value.price === 0}
            Бесплатно
          {:else}
            {value.price} ₽
          {/if}
        </div>

        {#if value.activityType}
          <div class="option option_green">
            {value.activityType}
          </div>
        {/if}

        {#if value.note}
          <div class="option option_red">{value.note}</div>
        {/if}
      </div>
    </div>

    <div class="col_right">
      <slot />
    </div>
  </div>
</div>
