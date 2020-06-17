<script>
  import * as sapper from '@sapper/app';
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
    const json = await res.json();

    if (res.ok) {
      return {
        docs: json.values
      };
		}

    this.error(res.status, json.message);
  }
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="global__container">
  <h1>{title}</h1>

  <div>
    {#each docs as value, index (value.id)}
      <ArticleCard {value} href="/articles/{value.id}" index={sheet * limit + index + 1} />
    {/each}

    <Pagination />
  </div>
</div>
