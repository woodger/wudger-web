<script>
  import * as sapper from '@sapper/app';
  import Navigation from '../../components/navigation/Navigation.svelte';
  import Footer from '../../components/footer/Footer.svelte';
  import ArticleCard from '../../components/ArticleCard.svelte';
  import Pagination from '../../components/Pagination.svelte';

  export let docs = [];

  let title = 'Каталог';
  let sheet = 0;
  let limit = 10;

  sapper.stores().page.subscribe(({query}) => {
    if (query.sheet) {
      sheet = +query.sheet;
    }

    if (query.limit) {
      limit = +query.limit;
    }
  });
</script>

<script context="module">
  export async function preload({query}) {
    const url = new URL('/api/v1/articles', process.env.API_URL);

    for (let i of Object.keys(query)) {
      url.searchParams.set(i, query[i]);
    }

    const res = await this.fetch(url);

    if (res.ok) {
      const {values} = await res.json();

      return {
        docs: values
      };
		}

    this.error(res.status);
  }
</script>

<style>
  .pagination {
    margin: 3rem 0;
  }
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Navigation />

<div class="global__container">
  <h1>{title}</h1>

  {#each docs as value, index (value.id)}
    <ArticleCard {value} href="/articles/{value.id}" index={sheet * limit + index + 1} />
  {/each}

  <div class="pagination">
    <Pagination />
  </div>
</div>

<Footer />
