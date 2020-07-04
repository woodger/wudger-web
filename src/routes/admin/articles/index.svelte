<script>
  import { onMount } from 'svelte';
  import * as sapper from '@sapper/app';
  import store from '@store';
  import request from '@request';
  import ArticleCard from '../../../components/ArticleCard.svelte';
  import ArticleForm from '../../../components/ArticleForm.svelte';
  import Pagination from '../../../components/Pagination.svelte';

  let mount = false;
  let isVisibleArticleList = false;
  let isVisibleArticleForm = false;
  let title = 'Управление каталогом';
  let sheet = 0;
  let limit = 10;
  let query;
  let edit;
  let data = [];

  $: if (query && isVisibleArticleList) {
    if (query.sheet) {
      sheet = +query.sheet;
    }

    if (query.limit) {
      limit = +query.limit;
    }

    getArticleList().then((value) => {
      data = value;
    });
  }

  $: if (mount) {
    store['oauth.user.admin'].subscribe((value) => {
      store['oauth.required'].set(
        !(isVisibleArticleList = value)
      );
    });
  }

  sapper.stores().page.subscribe((value) => {
    query = value.query;
  });

  async function getArticleList() {
    const res = await request('/api/v1/articles', { query });
    const {values = []} = await res.json();

    return values;
  }

  async function update() {
    data = await getArticleList();
    isVisibleArticleForm = false;
  }

  function onClickAdd() {

  }

  function onClickEdit(slug) {
    return () => {
      edit = slug;
      isVisibleArticleForm = !isVisibleArticleForm;
    };
  }

  onMount(() => {
    mount = true;
  });
</script>

<style>
  .admin__control {
    display: flex;
  }

  .admin__btn {
    height: 30px;
    padding: 0 1rem;
    margin: 1rem;
  }
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if isVisibleArticleList}
  <div class="global__container">
    <h1>{title}</h1>

    <div class="admin__control">
      <div class="admin__btn global__btn" on:click={onClickAdd}>
        Добавить
      </div>
    </div>

    {#each data as value, index (value.id)}
      <ArticleCard value={value} href="/articles/{value.id}" index={sheet * limit + index + 1}>
        <div class="admin__btn global__btn" on:click={onClickEdit(value.id)}>
          <img src="icons/edit.svg" alt="edit" width="16" height="16" />
        </div>
      </ArticleCard>

      {#if isVisibleArticleForm && value.id === edit}
        <div class="admin__form">
          <ArticleForm {update} slug={value.id} />
        </div>
      {/if}
    {/each}

    <Pagination />
  </div>
{/if}
