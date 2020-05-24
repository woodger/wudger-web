<script>
  import * as sapper from '@sapper/app';
  import ArticleCard from '../../components/ArticleCard.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import * as store from '@store';

  export let articles = [];
  export let title = 'Каталог';

  let page = 0;
  let limit = 10;
  let path = '/articles';

  sapper.stores().page.subscribe(({query}) => {
    if (query.page) {
      page = +query.page;
    }

    if (query.limit) {
      limit = +query.limit;
    }
  });

  // store.userInfo.subscribe(({groups = []} = {}) => {
  //   path = groups.includes('admin') ?
  //     '/articles-admin' : '/articles';
  // });
</script>

<script context="module">
  export async function preload(page) {
    const url = new URL('/api/v1/articles', process.env.API_URL);

    for (let i of Object.keys(page.query)) {
      url.searchParams.set(i, page.query[i]);
    }

    const res = await this.fetch(url);
    const json = await res.json();

    if (res.ok) {
      return {
        articles: json.values
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
    {#each articles as item, index (item.id)}
      <ArticleCard {...item} href="{path}/{item.id}" index={page * limit + index + 1} />
    {/each}

    <Pagination />
  </div>
</div>
