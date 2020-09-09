<script>
  import { onMount } from 'svelte';
  import * as sapper from '@sapper/app';
  import store from '@store';
  import request from '@request';
  import ArticleCard from '../../../components/ArticleCard.svelte';
  import ArticleForm from '../../../components/ArticleForm.svelte';
  import Pagination from '../../../components/Pagination.svelte';

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

  function onClickCallForm(id) {
    return () => {
      slug = id;
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

  .btn {
    height: 30px;
    padding: 0 1rem;
    margin: 1rem;
  }
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if listVisible}
  <div class="global__container">
    <h1>{title}</h1>

    <div class="control">
      <div class="btn global__btn" on:click={onClickCallForm()}>
        Добавить
      </div>
    </div>

    {#if formVisible && !slug}
      <ArticleForm complite={updateList} />
    {/if}

    {#each docs as value, index (value.id)}
      <ArticleCard {value} href="/articles/{value.id}" index={sheet * limit + index + 1}>
        <div class="btn global__btn" on:click={onClickCallForm(value.id)}>
          <img src="icons/edit.svg" alt="edit" width="16" height="16" />
        </div>
      </ArticleCard>

      {#if formVisible && value.id === slug}
        <ArticleForm {slug} complite={updateList} />
      {/if}
    {/each}

    <Pagination />
  </div>
{/if}
