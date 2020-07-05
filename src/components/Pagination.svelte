<script>
  import * as sapper from '@sapper/app';

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

      return {
        href: path + '?' + searchParams
      };
    });
  });
</script>

<style>
  .container {
    display: flex;
    padding: 1rem .5rem;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .5rem;
    min-width: 30px;
    height: 30px;
    text-decoration: none;
  }
</style>

<nav class="container">
  {#each tabs as {href}, index (href)}
    <a class="btn global__btn" class:global__btn_blue={index === active} {href}>
      {index + 1}
    </a>
  {/each}
</nav>
