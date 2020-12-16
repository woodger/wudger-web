<script>
  import { onMount } from 'svelte';
  import { store, request, resolve } from '@toolkit';
  import Button from '../Button.svelte';
  import Svg from '../Svg.svelte';
  import Img from '../Img.svelte';
  import FileIcon from '../FileIcon.svelte';
  import ArticleForm from '../forms/ArticleForm.svelte';

  export let values;
  export let schema;

  let admin;
  let files = [];
  let options = [
    'price',
    'madeYear',
    'activityType',
    'totalPages'
  ];

  store.admin.subscribe((value) => {
    if (value !== undefined) {
      admin = value;
    }
  });

  $: if (values) {
    files = values.files.map(fileProcessing);
  }

  $: if (admin !== undefined) {
    bucketFiles();
  }

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
    values = await request(`/api/v1/articles/${values.id}`);
  }

  async function bucketFiles() {
    const res = await request(`/api/v1/articles/${values.id}/bucket`);
    files = res.values.map(fileProcessing);
  }

  function fileProcessing(name) {
    const sep = name.lastIndexOf('/');

    if (sep === -1) {
      return {
        name,
        href: null,
        download: null
      };
    }

    const href = resolve(`/api/v1/bucket/${name}`);
    name = name.substr(sep + 1);

    return {
      name,
      href,
      download: true
    };
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

  .coll_70 {
    width: 70%;
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

  .label {
    color: #313131;
  }

  .description {
    margin: 1rem;
  }

  .files {
    margin: 2rem 0;
  }

  .files__inner {
    display: flex;
    align-items: center;
    margin: 1rem;
  }

  .filename {
    margin: 0 1rem;
  }

  .space {
    padding: 2.5rem 0;
    margin: 2.5rem 0 0;
    background: #eeeeee;
  }

  .space__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1600px;
    margin: 0 auto;
  }

  .page {
    position: relative;
    margin: 1rem;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .paid:before {
    position: absolute;
    top: 10px;
    left: -5px;
    display: block;
    line-height: 11px;
    padding: 2px 7px;
    font-size: 11px;
    font-family: Arial, Helvetica, sans-serif;
    content: "Платный доступ";
    box-shadow: 1px 1px 1px #666;
    background: #19aaa1;
    color: #ffffff;
  }
</style>

<div class="global__container">
  <h1>{values.title}</h1>

  <div class="control">
    <div class="buy">
      {#if values.price}
        <Button color="blue">Купить</Button>
      {/if}

      {#if admin}
        <Button onClick={onShowForm(values)}>
          <Svg src="icons/three.svg" width="16" height="16" alt="three" />
        </Button>
      {/if}
    </div>
  </div>

  <div class="options">
    <div class="coll_70">
      {#each options as name (name)}
        {#if values[name]}
          <div class="field">
            <div class="label">
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

  {#if files}
    <div class="files">
      {#each files as {href, name, download} (name)}
        <div class="files__inner">
          <FileIcon src={name} />

          <a class="filename" {href} {download}>
            {name}
          </a>
        </div>
      {/each}
    </div>
  {/if}
</div>

<div class="space">
  <div class="space__inner">
    {#each values.pages as {width, height, src}, index (src)}
      <div class="page" class:paid={width < 300}>
        <Img src={resolve(src)} {width} {height} alt="лист {index + 1}" />
      </div>
    {/each}
  </div>
</div>
