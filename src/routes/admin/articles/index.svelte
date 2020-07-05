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
  let query;
  let edit;
  let data = [];

  $: if (query && listVisible) {
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
      store['oauth.form.visible'].set(
        !(listVisible = value)
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
    formVisible = false;
  }

  function onClickAdd() {

  }

  function onClickEdit(slug) {
    return () => {
      edit = slug;
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
      <div class="btn global__btn" on:click={onClickAdd}>
        Добавить
      </div>
    </div>

    {#each data as value, index (value.id)}
      <ArticleCard value={value} href="/articles/{value.id}" index={sheet * limit + index + 1}>
        <div class="btn global__btn" on:click={onClickEdit(value.id)}>
          <img src="icons/edit.svg" alt="edit" width="16" height="16" />
        </div>
      </ArticleCard>

      {#if formVisible && value.id === edit}
        <div>
          <ArticleForm {update} slug={value.id} />
        </div>
      {/if}
    {/each}

    <Pagination />
  </div>
{/if}
