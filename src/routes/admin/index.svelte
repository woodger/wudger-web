<script>
  import {onMount} from 'svelte';
  import {stores} from '@sapper/app';
  import Authorization from '../../components/Authorization.svelte';
  import ArticleCard from '../../components/ArticleCard.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import {accessToken, authorize} from '../../stores/user';
  import {fetchArticleList} from '../../stores/article';

  let {page} = stores();

  let title = 'Управление каталогом';
  let posts = [];

  // let page = 0;
  // let limit = 10;

  // stores().page.subscribe(({query}) => {
  //   if (query.page) {
  //     page = parseInt(query.page);
  //   }
  //
  //   if (query.limit) {
  //     limit = parseInt(query.limit);
  //   }
  // });

  //let {page} = stores();

  onMount(async () => {
    let token = await authorize();
    let {values} = await fetchArticleList(token);

    if (values) {
      posts = values;
    }

    let {page} = stores();

    page.subscribe(() => {
      fetchArticleList(token).then(({values}) => {
        if (values) {
          posts = values;
        }
      });
    });
  });

  // onMount(async () => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const queryPage = searchParams.get('page');
  //
  //   if (queryPage) {
  //     page = parseInt(queryPage);
  //   }
  //
  //   const queryLimit = searchParams.get('limit');
  //
  //   if (queryLimit) {
  //     limit = parseInt(queryLimit);
  //   }
  // });
</script>

<style>
  .articles__container {
    margin: 0 auto;
    max-width: 1200px;
  }

  .articles__col_right {
    margin-left: auto;
  }

  .articles__btn {
    height: 30px;
    padding: 1px 1rem;
  }
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Authorization />

{#if $accessToken}
  <div class="articles__container">
    <h1>{title}</h1>

    {#each posts as post, index (post.id)}
      <ArticleCard {...post} index={index + 1}>
        <div class="articles__col_right">
          <button class="articles__btn global__btn">
            <img src="icons/edit.svg" alt="Изменить" width="16" height="16" />
          </button>
        </div>
      </ArticleCard>
    {/each}

    <Pagination />
  </div>
{/if}
