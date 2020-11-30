<script>
  import { onMount } from 'svelte';
  import * as sapper from '@sapper/app';
  import { store, request } from '@toolkit';
  import Pagination from './Pagination.svelte';
  import ArticleCard from './ArticleCard.svelte';
  import ArticleForm from './ArticleForm.svelte';
  import Button from './Button.svelte';
  import Svg from './Svg.svelte';

  export let title;
  export let props = [];

  let slug;
  let query = {};
  let sheet = 1;
  let admin = false;
  let schema;

  sapper.stores().page.subscribe((value) => {
    query = value.query;
    sheet = 1 + (+query.page | 0) * (+query.limit | 10);
  });

  store.admin.subscribe((value) => {
    admin = value;
  });

  store.articles.subscribe((value) => {
    if (value) {
      props = value;
    }
  });

  onMount(async () => {
    schema = await request(`/api/v1/files/schemes/article.json`);
  });

  async function updateList() {
    const res = await request('/api/v1/articles', { query });
    props = res.values;
  }

  function onShowForm({ id, title }) {
    return () => {
      store.modal.set({
        title,
        component: ArticleForm,
        props: { id },
        onClose: updateList
      });
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
        <Button onClick={onShowForm({ title: 'Новый документ' })}>
          <Svg src="icons/three.svg" width="16px" height="16px" />
        </Button>
      </div>
    </div>
  {/if}

  {#each props as item, index (item.id)}
    <ArticleCard {schema} props={item} index={sheet + index}>
      {#if admin}
        <Button onClick={onShowForm(item)}>
          <Svg src="icons/three.svg" width="16px" height="16px" />
        </Button>
      {/if}
    </ArticleCard>
  {/each}

  <Pagination />
</div>
