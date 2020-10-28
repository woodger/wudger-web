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
  let schema;
  let values;

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
    schema = await request(`/api/v1/static/schemes/article.json`);
    values = id ?
      await request(`/api/v1/articles/${id}`) : createNewArticle();

    show = true;
  });

  function createNewArticle() {
    const dct = {};

    for (const key of Object.keys(schema.properties)) {
      dct[key] = schema.properties[key].default;
    }

    if ('madeYear' in dct) {
      const date = new Date();
      dct.madeYear = date.getFullYear();
    }

    return dct;
  }

  function getLabel(name) {
    if (schema.properties[name]) {
      return schema.properties[name].description;
    }
  }

  function getType(name) {
    if (schema.properties[name]) {
      return schema.properties[name].type;
    }
  }

  function onInputText(name) {
    return ({target}) => {
      values[name] = target.value;
    }
  }

  async function onClickSave() {
    const body = contract(schema, values);

    if (id) {
      await request(`/api/v1/articles/${id}`, {
        method: 'PUT',
        body
      })
    }
    else {
      await request(`/api/v1/articles`, {
        method: 'POST',
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

    values.files = [
      ...values.files,
      ...values
    ];
  }

  function onInputFileName(name, index) {
    return ({target}) => {
      values.files[index].name = target.value + getExtname(name);

      if (!target.value.length && confirm('Удалить?')) {
        values.files = values.files.filter((i, key) =>
          index !== key
        );
      }
    }
  }

  function onMoveFiles() {
    const first = values.files.splice(0, 1);

    values.files = [
      ...values.files,
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

  .control {
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
            value={values[name]}
            label={getLabel(name)}
            {disabled}
            onInput={onInputText(name)}
          />
        </div>
      {/each}
    </div>

    <div class="field_100">
      <TextArea
        value={values.description}
        label={getLabel('description')}
        onInput={onInputText('description')}
      />
    </div>

    {#if values.files.length}
      <div>
        <div class="fieldset">
          <Label>{getLabel('files')}</Label>
        </div>

        <div class="files">
          {#each values.files as {id, name}, index (id)}
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

    <div class="control">
      <Button color="blue" onClick={onClickSave}>Сохранить</Button>

      {#if id}
        <Button onClick={onClickTrash}>
          <Svg src="icons/trash.svg" width="16px" height="16px" />
        </Button>
      {/if}

      <InputFile onInput={onUploadFiles} />

      {#if values.files.length > 1}
        <Button onClick={onMoveFiles}>
          <Svg src="icons/eject.svg" width="16px" height="16px" />
        </Button>
      {/if}
    </div>
  </div>
</Loader>
