<script>
  import { onMount } from 'svelte';
  import * as sapper from '@sapper/app';
  import Button from './Button.svelte';

  export let tabs = 7;
  export let length = 10;
  export let count = 0;

  let values = [];
  let page;

  sapper.stores().page.subscribe((value) => {
    if (value !== undefined) {
      page = value;
    }
  });

  $: if (page) {
    values = makeTabs(page);
  }

  function makeTabs({ path, query }) {
    const result = [];
    const active = parseInt(query.page) || 0;
    const searchParams = new URLSearchParams();

    for (let i of Object.keys(query)) {
      searchParams.append(i, query[i]);
    }

    function tabHref(value) {
      searchParams.set('page', value);

      return value === 0 ?
        path : path + '?' + searchParams;
    }

    function tabColor(value) {
      return value === active ?
        'blue' : undefined;
    }

    let place = Math.ceil(count / length) || 1;
    const axis = tabs / 2;
    let value = 1;

    if (place > tabs) {
      let cursor = tabs - 1;

      if (active >= tabs - 2) {
        cursor = parseInt(active + axis - 1);
        value = parseInt(active - axis + 4);

        let first = 1;

        if (active - 1 > tabs) {
          first = value - tabs;
        }

        result.push({
          value: first,
          color: tabColor(first - 1),
          href: tabHref(first - 1)
        });

        if (cursor >= place - 2) {
          cursor = place;
          value = place - tabs + 3;
        }

        result.push({
          value: '...',
          color: tabColor(value - 2),
          href: tabHref(value - 2)
        });
      }
      else {
        cursor--;
      }

      for ( ; value <= cursor; value++) {
        result.push({
          value,
          color: tabColor(value - 1),
          href: tabHref(value - 1)
        });
      }

      if (active < place - axis - 1) {
        result.push({
          value: '...',
          color: tabColor(cursor),
          href: tabHref(cursor)
        });

        let last = cursor + tabs;

        if (last > place) {
          last = place;
        }

        result.push({
          value: last,
          color: tabColor(last - 1),
          href: tabHref(last - 1)
        });
      }
    }
    else {
      for ( ; value <= place; value++) {
        result.push({
          value,
          color: tabColor(value - 1),
          href: tabHref(value - 1)
        });
      }
    }

    return result;
  }
</script>

<style>
  .pagination {
    display: flex;
    flex-wrap: wrap;
    margin: 3rem 0;
  }
</style>

<nav class="pagination">
  {#each values as {href, color, value}}
    <Button {href} {color}>{value}</Button>
  {/each}
</nav>
