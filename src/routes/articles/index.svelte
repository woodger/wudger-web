<script context="module">
  export async function preload(page) {
    const url = new URL('/api/v1/articles', process.env.API_URL);

    for (let i of Object.keys(page.query)) {
      url.searchParams.set(i, page.query[i]);
    }

    const res = await this.fetch(url);
    const data = await res.json();

    if (res.ok) {
      return {
        posts: data.values
      };
		}

    this.error(res.status, data.message);
  }
</script>

<script>
  import {stores} from '@sapper/app';
  import ArticleCard from '../../components/ArticleCard.svelte';
  import Pagination from '../../components/Pagination.svelte';

  export let posts = [];

  let title = 'Каталог научных исследований и материалов для студентов';
  let page = 0;
  let limit = 10;

  stores().page.subscribe(({query}) => {
    if (query.page) {
      page = parseInt(query.page);
    }

    if (query.limit) {
      limit = parseInt(query.limit);
    }
  });
</script>

<style>
  .articles__container {
    margin: 0 auto;
    max-width: 1200px;
  }
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="articles__container">
  <h1>{title}</h1>

  {#each posts as post, index (post.id)}
    <ArticleCard {...post} index={page * limit + index + 1} />
  {/each}

  <Pagination />
</div>
