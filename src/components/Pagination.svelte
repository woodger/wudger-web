<script>
  import {stores} from '@sapper/app';

  const {page} = stores();
  const {query, path} = $page;

  let tabs = [];

  $: if ($page) {
    const searchParams = new URLSearchParams();

    for (let i of Object.keys(query)) {
      searchParams.append(i, query[i]);
    }

    tabs = [].map.call('%'.repeat(5), (i, index) => {
      searchParams.set('page', index);

      return {
        href: path + '?' + searchParams
      };
    });
  }
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
    min-width: 28px;
    height: 28px;
    text-decoration: none;
  }
</style>

<nav class="pagination">
  {#each tabs as {href}, index (href)}
    <a class="pagination__btn global__btn" {href}>
      {index + 1}
    </a>
  {/each}
</nav>
