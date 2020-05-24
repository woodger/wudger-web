<script>
  import * as sapper from '@sapper/app';

  export let length = 5;

  let tabs = [];
  let active = 0;

  sapper.stores().page.subscribe(({query, path}) => {
    if (query.page) {
      active = +query.page;
    }

    const searchParams = new URLSearchParams();

    for (let i of Object.keys(query)) {
      searchParams.append(i, query[i]);
    }

    tabs = [].map.call('%'.repeat(length), (i, index) => {
      searchParams.set('page', index);

      return {
        href: path + '?' + searchParams
      };
    });
  });
</script>

<style>
  .pagination {
    display: flex;
    padding: 1rem .5rem;
  }

  .pagination__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .5rem;
    min-width: 30px;
    height: 30px;
    text-decoration: none;
  }
</style>

<nav class="pagination">
  {#each tabs as {href}, index (href)}
    <a class="pagination__btn global__btn" class:global__btn_blue={index === active} {href}>
      {index + 1}
    </a>
  {/each}
</nav>
