<script>
  import { onMount } from 'svelte';
  import { store, request } from '@toolkit';
  import Button from './Button.svelte';
  import Svg from './Svg.svelte';
  import ArticleForm from './ArticleForm.svelte';

  export let values;
  export let schema;

  let admin = false;

  store.admin.subscribe((value) => {
    admin = value;
  });

  const options = [
    'price',
    'madeYear',
    'activityType',
    'totalPages',
    'note'
  ];

  function onShowForm({ id, title }) {
    return () => {
      store.modal.set({
        title,
        component: ArticleForm,
        props: { id },
        onClose: updateItem
      });
    };
  }

  async function updateItem() {
    const res = await request(`/api/v1/articles/${values.id}`);
    values = res.values;
  }
</script>

<style>
  .control {
    display: flex;
    align-items: center;
  }

  .buy {
    display: flex;
    margin-left: auto;
  }

  .coll_50 {
    width: 60%;
  }

  .options {
    display: flex;
  }

  .field {
    display: flex;
    margin: .5rem;
    background: url(data:image/gif;base64,R0lGODlhAwABAIABANra2v///yH5BAEKAAEALAAAAAADAAEAAAICRFIAOw==) 0 .9rem repeat-x;
  }

  .field > :first-child {
    width: 30%;
  }

  .field > :first-child span {
    padding: 0 .5rem;
    background: #ffffff;
  }

  .field > :last-child {
    width: 70%;
    padding: 0 .5rem;
    background: #ffffff;
  }

  .description {
    width: 50%;
    margin: 1rem;
  }

  .space {
    padding: 2.5rem 0;
    margin: 2.5rem 0 0;
    background: #eeeeee;
  }

  .space__inner {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .page {
    margin: 1rem;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }
</style>

<div class="global__container">
  <h1>{values.title}</h1>

  <div class="control">
    <div class="buy">
      <Button color="blue">Купить</Button>

      {#if admin}
        <Button onClick={onShowForm(values)}>
          <Svg src="icons/three.svg" width="16px" height="16px" />
        </Button>
      {/if}
    </div>
  </div>

  <div class="options">
    <div class="coll_50">
      {#each options as name (name)}
        {#if values[name]}
          <div class="field">
            <div>
              <span>{schema.properties[name].description}</span>
            </div>
            <div>
              <span>{values[name]}</span>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  {#if values.description}
    <div class="description">
      {values.description}
    </div>
  {/if}
</div>

<div class="space">
  <div class="global__container">
    <div class="space__inner">
      {#each values.pages as item, index (item)}
        <div class="page">
          <img src={item} alt={index} />
        </div>
      {/each}
    </div>
  </div>
</div>
