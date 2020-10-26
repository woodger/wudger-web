<script>
  import { onMount } from 'svelte';
  import { store, request, contract } from '@toolkit';
  import Svg from '../Svg.svelte';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  import InputFile from '../InputFile.svelte';
  import TextArea from '../TextArea.svelte';
  import Loader from '../Loader.svelte';
  import Label from '../Label.svelte';

  export let id;
  export let onClose;

  let show = false;
  let shema;
  let body;

  const options = [{
    name: 'title',
    size: 100
  }, {
    name: 'price',
    size: 20
  }, {
    name: 'madeYear',
    size: 20
  }, {
    name: 'hidePages',
    size: 30
  }, {
    name: 'activityType',
    size: 30
  }, {
    name: 'totalPages',
    disabled: true,
    size: 20
  }, {
    name: 'note',
    size: 30
  }];

  onMount(async () => {
    shema = await request(`/api/v1/static/schemes/article.json`);

    body = id ?
      await request(`/api/v1/articles/${id}`) : createNewArticle();

    show = true;
  });

  function createNewArticle() {
    const dct = {};

    for (const key of Object.keys(shema.properties)) {
      dct[key] = shema.properties[key].default;
    }

    if ('madeYear' in dct) {
      const date = new Date();
      dct.madeYear = date.getFullYear();
    }

    return dct;
  }

  function getLabel(name) {
    return shema.properties[name].description;
  }

  function getType(name) {
    return shema.properties[name].type;
  }

  function onInputText({target}) {
    body[target.name] = target.value;
  }

  async function onClickSave() {
    const data = contract(shema, body);

    if (id) {
      await request(`/api/v1/articles/${id}`, {
        method: 'PUT',
        body: data
      })
    }
    else {
      await request(`/api/v1/articles`, {
        method: 'POST',
        shema,
        body: data
      });
    }

    onClose();
  }

  async function onClickTrash() {
    if (confirm('Удалить?') === false) {
      return;
    }

    await request(`/api/v1/articles/${id}`, {
      method: 'DELETE'
    });

    onClose();
  }

  function getExtname(name) {
    return name.substr(name.lastIndexOf('.'));
  }

  function getFilename(name) {
    return name.substr(0, name.lastIndexOf('.'));
  }

  async function onUploadFiles({target}) {
    //   const body = new FormData();
    //
    //   for (const value of target.files) {
    //     body.append('uploads', value);
    //   }
    //
    //   const res = await request(`/api/v1/files`, {
    //     method: 'POST',
    //     body: 'true'
    //   });
  }

  async function onInputFileName() {}
</script>

<style>
  .fields {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  .field_100 {
    width: 100%;
  }

  .field_30 {
    width: 30%;
  }

  .field_20 {
    width: 20%;
  }

  /* .files {
    padding: 1rem 0;
    background: #f4f4f4;
  } */

  .file {
    margin: 0 0 1rem;
  }

  .control {
    display: flex;
    align-items: center;
  }
</style>

<Loader spin={!show}>
  <div>
    <div class="fields">
      {#each options as {name, disabled, size} (name)}
        <div class="field_{size}">
          <Input
            {name}
            {disabled}
            type={getType(name)}
            value={body[name]}
            label={getLabel(name)}
            onInput={onInputText}
          />
        </div>
      {/each}

      <div class="field_100">
        <TextArea
          name="description"
          value={body.description}
          label={getLabel('description')}
          onInput={onInputText}
        />
      </div>
    </div>

    {#if body.files.length}
      <div class="files">
        <div>
          {#each body.files as {id, name} (id)}
            <div class="file">
              <Input
                name="attachment"
                value={getFilename(name)}
                label={getExtname(name)}
                onInput={onInputFileName}
              />
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <div class="control">
      <Button color="blue" onClick={onClickSave}>Сохранить</Button>
      <InputFile onInput={onUploadFiles} />

      {#if id}
        <Button onClick={onClickTrash}>
          <Svg src="icons/trash.svg" width="16px" height="16px" />
        </Button>
      {/if}
    </div>
  </div>
</Loader>
