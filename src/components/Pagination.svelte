<script>
  import * as sapper from '@sapper/app';
  import Button from './Button.svelte';

  export let length = 5;

  let tabs = [];
  let active = 0;

  sapper.stores().page.subscribe(({query, path}) => {
    if (query.sheet) {
      active = +query.sheet;
    }

    const searchParams = new URLSearchParams();

    for (let i of Object.keys(query)) {
      searchParams.append(i, query[i]);
    }

    tabs = [].map.call('%'.repeat(length), (i, index) => {
      searchParams.set('sheet', index);

      const color = index === active ?
        'blue' : undefined;

      return {
        color,
        href: path + '?' + searchParams
      };
    });
  });
</script>

<style>
  .container {
    display: flex;
  }
</style>

<nav class="container">
  {#each tabs as i, index (i.href)}
    <Button {...i}>{index + 1}</Button>
  {/each}
</nav>
