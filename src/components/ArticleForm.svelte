<script>
  import { onMount } from 'svelte';
  import { store, request, contract } from '@toolkit';
  import Svg from './Svg.svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import InputFile from './InputFile.svelte';
  import Textarea from './Textarea.svelte';
  import Loader from './Loader.svelte';
  import Label from './Label.svelte';

  export let id;
  export let onClose;

  let show = false;
  let save = false;
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
    schema = await request(`/api/v1/files/schemes/article.json`);
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
    save = true;

    const body = contract(schema, values);
    let error;

    const onError = async (res) => {
      error = await res.text();
    }

    if (id) {
      await request(`/api/v1/articles/${id}`, {
        method: 'PUT',
        body,
        onError
      });
    }
    else {
      await request(`/api/v1/articles`, {
        method: 'POST',
        body,
        onError
      });
    }

    save = false;

    if (error) {
      return store.notification.set({
        message: error
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

  function getExtname(title) {
    return title.substr(title.lastIndexOf('.'));
  }

  function getFilename(title) {
    return title.substr(0, title.lastIndexOf('.'));
  }

  async function onUploadFiles({target}) {
    const body = new FormData();

    for (const item of target.files) {
      body.append('uploads', item);
    }

    const res = await request(`/api/v1/files`, {
      method: 'POST',
      body
    });

    values.files = [
      ...values.files,
      ...res.values
    ];
  }

  function onInputFileName(title, index) {
    const ext = getExtname(title);

    return ({target}) => {
      values.files[index].title = target.value + ext;

      if (!target.value.length && confirm('Удалить?')) {
        values.files = values.files.filter((i, count) =>
          count !== index
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
      <Textarea
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
          {#each values.files as {id, title}, index (id)}
            <div class="file">
              <div class="field_100">
                <Input
                  value={getFilename(title)}
                  onInput={onInputFileName(title, index)}
                />
              </div>
              <Input
                disabled
                value={getExtname(title)}
              />
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <div class="control">
      <Button color="blue" spin={save} onClick={onClickSave}>Сохранить</Button>

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
