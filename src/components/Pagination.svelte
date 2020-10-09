<script>
  import * as sapper from '@sapper/app';
  import Button from './Button.svelte';

  export let length = 5;

  let tabs = [];
  let active = 0;

  sapper.stores().page.subscribe(({query, path}) => {
    const searchParams = new URLSearchParams();

    for (let i of Object.keys(query)) {
      searchParams.append(i, query[i]);
    }

    active = +query.page | 0;

    tabs = [].map.call('%'.repeat(length), (i, index) => {
      searchParams.set('page', index);

      const href = index === 0 ?
        path : path + '?' + searchParams;

      const color = index === active ?
        'blue' : undefined;

      return {
        href,
        color
      };
    });
  });
</script>

<style>
  .container {
    display: flex;
    margin: 3rem 0;
  }
</style>

<nav class="container">
  {#each tabs as i, index (i.href)}
    <Button {...i}>{index + 1}</Button>
  {/each}
</nav>
