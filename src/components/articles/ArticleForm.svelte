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
  let data;

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

    data = id ?
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
    if (shema.properties[name]) {
      return shema.properties[name].description;
    }
  }

  function getType(name) {
    if (shema.properties[name]) {
      return shema.properties[name].type;
    }
  }

  function onInputText(name) {
    return ({target}) => {
      data[name] = target.value;
    }
  }

  async function onClickSave() {
    const body = contract(shema, data);

    if (id) {
      await request(`/api/v1/articles/${id}`, {
        method: 'PUT',
        body
      })
    }
    else {
      await request(`/api/v1/articles`, {
        method: 'POST',
        shema,
        body
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
    const body = new FormData();

    for (const value of target.files) {
      body.append('uploads', value);
    }

    const {values} = await request(`/api/v1/files`, {
      method: 'POST',
      body
    });

    data.files = [
      ...data.files,
      ...values
    ];
  }

  function onInputFileName(name, index) {
    return ({target}) => {
      data.files[index].name = target.value + getExtname(name);

      if (!target.value.length && confirm('Удалить?')) {
        data.files = data.files.filter((i, key) =>
          index !== key
        );
      }
    }
  }

  function onMoveFiles() {
    const first = data.files.splice(0, 1);

    data.files = [
      ...data.files,
      ...first
    ];
  }
</script>

<style>
  .options {
    display: flex;
    flex-wrap: wrap;
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

  .fieldset {
    margin: 0 1rem;
  }

  .file {
    display: flex;
    align-items: flex-end;
    margin: 0 0 .5rem;
  }

  .form__control {
    display: flex;
    align-items: center;
    padding: .5rem 0;
  }
</style>

<Loader spin={!show}>
  <div>
    <div class="options">
      {#each options as {name, disabled, size} (name)}
        <div class="field_{size}">
          <Input
            type={getType(name)}
            value={data[name]}
            label={getLabel(name)}
            {disabled}
            onInput={onInputText(name)}
          />
        </div>
      {/each}
    </div>

    <div class="field_100">
      <TextArea
        value={data.description}
        label={getLabel('description')}
        onInput={onInputText('description')}
      />
    </div>

    {#if data.files.length}
      <div>
        <div class="fieldset">
          <Label>{getLabel('files')}</Label>
        </div>

        <div class="files">
          {#each data.files as {id, name}, index (id)}
            <div class="file">
              <div class="field_100">
                <Input
                  value={getFilename(name)}
                  onInput={onInputFileName(name, index)}
                />
              </div>
              <Input
                disabled
                value={getExtname(name)}
              />
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <div class="form__control">
      <Button color="blue" onClick={onClickSave}>Сохранить</Button>

      {#if id}
        <Button onClick={onClickTrash}>
          <Svg src="icons/trash.svg" width="16px" height="16px" />
        </Button>
      {/if}

      <InputFile onInput={onUploadFiles} />

      {#if data.files.length > 1}
        <Button onClick={onMoveFiles}>
          <Svg src="icons/eject.svg" width="16px" height="16px" />
        </Button>
      {/if}
    </div>
  </div>
</Loader>
