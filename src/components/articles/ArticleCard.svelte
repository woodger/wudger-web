<script>
  import { store } from '@toolkit';

  export let index;
  export let props;
  export let schema;

  let options = [];
  let admin = false;

  const fields = [
    'price',
    'totalPages',
    'madeYear',
    'activityType'
  ];

  $: if (props && schema) {
    const buffer = [];

    for (const item of fields) {
      let value = props[item];

      if (value !== null) {
        const label = getLabel(item);
        const index = label.indexOf(',');

        if (!value && item === 'price') {
          value = 'Бесплатно';
        }
        else if (index > -1) {
          value = label + '⠀' + value;
        }

        buffer.push(value);
      }
    }

    options = buffer;
  }

  store.admin.subscribe((value) => {
    if (value !== undefined) {
      admin = value;
    }
  });

  function getLabel(name) {
    if (schema.properties[name]) {
      return schema.properties[name].description;
    }
  }

  function getShort(value, size = 200, dots = '...') {
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

  .description {
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

  .note {
    margin: 1rem;
    font-weight: bold;
    color: red;
  }
</style>

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

      <div class="description">
        {getShort(props.description)}
      </div>

      <div class="option-group">
        {#each options as item (item)}
          <div class="option">
            <span>{item}</span>
          </div>
        {/each}
      </div>

      {#if admin && props.note}
        <div class="note">
          {props.note}
        </div>
      {/if}
    </div>

    <div class="col_4">
      <slot />
    </div>
  </div>
</div>
