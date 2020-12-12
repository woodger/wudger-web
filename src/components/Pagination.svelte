<script>
  import * as sapper from '@sapper/app';
  import Button from './Button.svelte';

  export let length = 0;
  export let count = 0;
  export let tabs = 9;

  let values = [];
  let active;
  let page;
  let searchParams;

  sapper.stores().page.subscribe((value) => {
    page = value;
  });

  $: {
    searchParams = new URLSearchParams();

    for (let i of Object.keys(page.query)) {
      searchParams.append(i, page.query[i]);
    }
  }

  $: active = parseInt(page.query.page) || 1;

  $: {
    const result = [];
    let place = Math.ceil(count / length) || 1;
    let num = 1;

    if (place > tabs) {
      let late = tabs - 1;

      if (active >= late){
        num = parseInt(active - late / 2 + 2);
        late = parseInt(active + late / 2 - 2);

        if (late >= place) {
          late = place;
        }

        result.push({
          href: tabHref(1),
          color: tabColor(1),
          value: 1
        });

        result.push({
          value: '...',
          color: tabColor(num - 1),
          href: tabHref(num - 1)
        });
      }
      else {
        late--;
      }

      for ( ; num <= late; num++) {
        result.push({
          value: num,
          color: tabColor(num),
          href: tabHref(num)
        });
      }

      if (active < place - tabs / 2 + 2) {
        result.push({
          value: '...',
          color: tabColor(late + 1),
          href: tabHref(late + 1)
        });

        result.push({
          value: place,
          color: tabColor(place),
          href: tabHref(place)
        });
      }
    }
    else {
      for ( ; num <= place; num++) {
        result.push({
          value: num,
          color: tabColor(num),
          href: tabHref(num)
        });
      }
    }

    values = result;
  }

  function tabColor(value) {
    return value === active ?
      'blue' : undefined;
  }

  function tabHref(value) {
    searchParams.set('page', value);

    return value === 1 ?
      page.path : page.path + '?' + searchParams;
  }
</script>

<style>
  .pagination {
    display: flex;
    margin: 3rem 0;
  }
</style>

<nav class="pagination">
  {#each values as {href, color, value}}
    <Button {href} {color}>{value}</Button>
  {/each}
</nav>
