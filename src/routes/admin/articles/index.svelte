<script>
  import { onMount } from 'svelte';
  import * as sapper from '@sapper/app';
  import store from '@store';
  import request from '@request';
  import Navigation from '../../../components/navigation/Navigation.svelte';
  import ArticleCard from '../../../components/ArticleCard.svelte';
  import ArticleForm from '../../../components/ArticleForm.svelte';
  import Pagination from '../../../components/Pagination.svelte';
  import Button from '../../../components/Button.svelte';

  let mount = false;
  let listVisible = false;
  let formVisible = false;
  let title = 'Управление каталогом';
  let sheet = 0;
  let limit = 10;
  let slug;
  let query;
  let docs = [];

  $: if (query && listVisible) {
    if (query.sheet) {
      sheet = +query.sheet;
    }

    if (query.limit) {
      limit = +query.limit;
    }

    getArticleList().then((value) => {
      docs = value;
    });
  }

  $: if (formVisible === false) {
    slug = undefined;
  }

  store['oauth.user.admin'].subscribe((value) => {
    if (value !== undefined) {
      store['oauth.form.visible'].set(
        !(listVisible = value)
      )
    }
  });

  sapper.stores().page.subscribe((value) => {
    query = value.query;
  });

  async function getArticleList() {
    const res = await request('/api/v1/articles', { query });
    const {values = []} = await res.json();

    return values;
  }

  async function updateList() {
    docs = await getArticleList();
    formVisible = false;
  }

  function onClickForm(value) {
    return () => {
      slug = value;
      formVisible = !formVisible;
    };
  }

  onMount(() => {
    mount = true;
  });
</script>

<style>
  .control {
    display: flex;
  }

  .pagination {
    margin: 3rem 0;
  }
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Navigation />

{#if listVisible}
  <div class="global__container">
    <h1>{title}</h1>

    <div class="control">
      <div class="btn">
        <Button click={onClickForm()}>
          Добавить
        </Button>
      </div>
    </div>

    {#if formVisible && !slug}
      <ArticleForm complite={updateList} />
    {/if}

    {#each docs as value, index (value.id)}
      <ArticleCard {value} href="/articles/{value.id}" index={sheet * limit + index + 1}>
        <Button click={onClickForm(value.id)}>
          <img src="icons/edit.svg" alt="edit" width="16" height="16" />
        </Button>
      </ArticleCard>

      {#if formVisible && value.id === slug}
        <ArticleForm {slug} complite={updateList} />
      {/if}
    {/each}

    <div class="pagination">
      <Pagination />
    </div>
  </div>
{/if}
