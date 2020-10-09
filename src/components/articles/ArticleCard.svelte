<script>
  import OptionHandler from './OptionHandler.svelte';

  export let index;
  export let props;

  let options = [];

  function updateOptions(value) {
    options = value;
  }

  function crop(value, size = 200, dots = '...') {
    if (typeof value !== 'string') {
      return '';
    }

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

  .col_2 {
    width: 90%;
  }

  .col_4 {
    margin-left: auto;
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

  .unit {
    padding-left: .1rem;
  }
</style>

<OptionHandler {props} update={updateOptions} />

<div class="container">
  <div class="row">
    <div>
      <div class="number">
        {index}.
      </div>
    </div>
    <div class="col_2">
      <div class="title">
        <a href="/articles/{props.id}">{props.title}</a>
      </div>

      <div class="descriotion">
        {crop(props.descriotion)}
      </div>

      <div class="option-group">
        {#each options as {value, unit}}
          {#if value}
            <div class="option">
              <span>{value}</span>

              {#if unit}
                <span class="unit">{unit}</span>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    </div>

    <div class="col_4">
      <slot />
    </div>
  </div>
</div>
