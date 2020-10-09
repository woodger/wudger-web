<script>
  import * as sapper from '@sapper/app';
  import store from '@store';
  import request from '@request';
  import Button from '../Button.svelte';
  import Pagination from '../Pagination.svelte';
  import ArticleCard from './ArticleCard.svelte';
  import ArticleForm from './ArticleForm.svelte';

  export let title;
  export let props = [];

  let slug;
  let query = {};
  let sheet = 1;
  let admin = false;
  let formVisible = false;

  $: if (formVisible === false) {
    slug = undefined;
  }

  $: if (admin === false) {
    formVisible = false;
  }

  sapper.stores().page.subscribe((value) => {
    query = value.query;
    sheet = 1 + (+query.page | 0) * (+query.limit | 10);
  });

  store['oauth.user.admin'].subscribe((value) => {
    admin = value;
  });

  async function updateList() {
    const res = await request('/api/v1/articles', { query });
    const {values} = await res.json();
    props = values;
  }

  function onClickForm(value) {
    return () => {
      slug = value;
      formVisible = !formVisible;
    };
  }
</script>

<style>
  .control {
    display: flex;
  }
</style>

<div class="global__container">
  <h1>{title}</h1>

  {#if admin}
    <div class="control">
      <div class="btn">
        <Button click={onClickForm()}>Добавить</Button>
      </div>
    </div>
  {/if}

  {#if formVisible && !slug}
    <ArticleForm {slug} update={updateList} />
  {/if}

  {#each props as item, index (item.id)}
    <ArticleCard props={item} index={sheet + index}>
      {#if admin}
        <Button click={onClickForm(item.id)}>
          <img src="icons/edit.svg" alt="edit" width="16" height="16" />
        </Button>
      {/if}
    </ArticleCard>

    {#if formVisible && item.id === slug}
      <ArticleForm {slug} update={updateList} />
    {/if}
  {/each}

  <Pagination />
</div>
