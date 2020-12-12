<script>
  import { onMount } from 'svelte';
  import * as sapper from '@sapper/app';
  import { store, request } from '@toolkit';
  import Button from '../Button.svelte';
  import Svg from '../Svg.svelte';
  import Pagination from '../Pagination.svelte';
  import ArticleForm from '../forms/ArticleForm.svelte';
  import ArticleCard from './ArticleCard.svelte';

  export let title;
  export let schema;
  export let values;

  let query = {};
  let sheet = 1;
  let admin = false;

  sapper.stores().page.subscribe((value) => {
    query = value.query;
    sheet = 1 + (+query.page | 0) * (+query.limit | 10);
  });

  store.admin.subscribe((value) => {
    admin = value;
  });

  // store.articles.subscribe((value) => {
  //   if (value) {
  //     values = value;
  //   }
  // });

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

  async function updateList() {
    values = await request('/api/v1/articles', { query });
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
          <Svg src="icons/three.svg" width="16" height="16" alt="three" />
        </Button>
      </div>
    </div>
  {/if}

  {#each values.values as item, index (item.id)}
    <ArticleCard {schema} props={item} index={sheet + index}>
      {#if admin}
        <Button onClick={onShowForm(item)}>
          <Svg src="icons/three.svg" width="16" height="16" alt="three" />
        </Button>
      {/if}
    </ArticleCard>
  {/each}

  <Pagination length={values.values.length} count={values.count} />
</div>
