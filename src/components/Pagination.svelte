<script>
  import * as sapper from '@sapper/app';
  import Button from './Button.svelte';

  export let count = 0;
  export let length = 0;

  let tabs = [];
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

  $: {
    const last = Math.ceil(count / length);
    const active = parseInt(page.query.page) || 1;
    let gov = 6;

    if (last < gov) {
      gov = last;
    }

    const buff = [];

    buff.push({
      href: getHref(1),
      color: 1 === active ?
        'blue' : undefined,
      value: 1
    });

    if (active > 4) {
      buff.push({
        value: '...'
      });
    }

    for (let i = 2; i < gov; i++) {
      const value = active > 5 ?
        i + active - 3 : i;
        const color = value === active ?
          'blue' : undefined;

      buff.push({
        value,
        color,
        href: getHref(value)
      });
    }

    if (last > 6) {
      buff.push({
        href: getHref(6),
        value: '...'
      });
    }

    buff.push({
      href: getHref(last),
      value: last
    });

    tabs = buff;
  }

  function getHref(value) {
    searchParams.set('page', value);

    return value === 1 ?
      page.path : page.path + '?' + searchParams;
  }

  // sapper.stores().page.subscribe(({query, path}) => {
  //   const searchParams = new URLSearchParams();
  //
  //   for (let i of Object.keys(query)) {
  //     searchParams.append(i, query[i]);
  //   }
  //
  //   active = +query.page | 0;
  //
  //   tabs = [].map.call('%'.repeat(count), (i, index) => {
  //     searchParams.set('page', index);
  //
  //     const href = index === 0 ?
  //       path : path + '?' + searchParams;
  //
  //     const color = index === active ?
  //       'blue' : undefined;
  //
  //     return {
  //       href,
  //       color
  //     };
  //   });
  // });
</script>

<style>
  .pagination {
    display: flex;
    margin: 3rem 0;
  }
</style>

<nav class="pagination">
  {#each tabs as {href, color, value}}
    <Button {href} {color}>{value}</Button>
  {/each}
</nav>
