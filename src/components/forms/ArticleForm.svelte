<script>
  import { onMount } from 'svelte';
  import { store, request, resolve, contract } from '@toolkit';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  import InputFile from '../InputFile.svelte';
  import Textarea from '../Textarea.svelte';
  import Loader from '../Loader.svelte';
  import Label from '../Label.svelte';
  import Svg from '../Svg.svelte';

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
    schema = await request(`/api/v1/schemes/article.json`, {
      auth: false
    });

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
    let error;

    if (!values.title) {
      error = new Error(getLabel('title'));
    }

    for (const item of values.files) {
      if (!parseFilename(item).name) {
        error = new Error(getLabel('files'));
      }
    }

    if (error) {
      return store.notification.set(error);
    }

    const body = contract(schema, values);

    if (id) {
      request(`/api/v1/articles/${id}`, {
        method: 'PUT',
        body
      });
    }
    else {
      request(`/api/v1/articles`, {
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

  function parseFilename(value) {
    const slash = value.lastIndexOf('/') + 1;
    let dot = value.lastIndexOf('.');

    if (dot === -1) {
      dot = value.length;
    }

    return {
      path: value.substring(0, slash),
      base: value.substring(slash),
      ext: value.substring(dot),
      name: value.substring(slash, dot)
    };
  }

  async function onUploadFiles({target}) {
    const body = new FormData();

    for (const item of target.files) {
      body.append('uploads', item);
    }

    const res = await request(`/api/v1/bucket`, {
      method: 'POST',
      body
    });

    if (res !== undefined) {
      values.files = [
        ...values.files,
        ...res.values
      ];
    }
  }

  function onInputFileName(filename, index) {
    const {path, ext} = parseFilename(filename);

    return ({target}) => {
      values.files[index] = path + target.value + ext;
    }
  }

  function onMoveFiles() {
    const first = values.files.splice(0, 1);

    values.files = [
      ...values.files,
      ...first
    ];
  }

  function onClickTrashFile(index) {
    return () => {
      if (confirm('Удалить?')) {
        values.files = values.files.filter((i, count) =>
          count !== index
        );
      }
    };
  }
</script>

<style>
  .options {
    display: flex;
    flex-wrap: wrap;
  }

  .field_20, .field_30, .field_100 {
    width: 100%;
  }

  .fieldset {
    margin: 0 1rem;
  }

  .file {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 .5rem;
  }

  .control {
    display: flex;
    align-items: center;
    padding: .5rem 0;
  }

  @media screen and (min-width: 600px) {
    .field_20 {
      width: 20%;
    }

    .field_30 {
      width: 30%;
    }

    .file {
      flex-wrap: nowrap;
    }
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
          {#each values.files as item, index}
            <div class="file">
              <div class="field_100">
                <Input
                  value={parseFilename(item).name}
                  onInput={onInputFileName(item, index)}
                />
              </div>

              <Input
                disabled
                value={parseFilename(item).ext}
              />

              <Button onClick={onClickTrashFile(index)}>
                <Svg src="icons/trash.svg" width="16" height="16" alt="trash" />
              </Button>

              <Button href={resolve(`/api/v1/bucket/${item}`)} download={parseFilename(item).base}>
                <Svg src="icons/download.svg" width="16" height="16" alt="download" />
              </Button>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <div class="control">
      <Button color="blue" onClick={onClickSave}>Сохранить</Button>

      {#if id}
        <Button onClick={onClickTrash}>
          <Svg src="icons/trash.svg" width="16" height="16" alt="trash" />
        </Button>
      {/if}

      <InputFile onInput={onUploadFiles} />

      {#if values.files.length > 1}
        <Button onClick={onMoveFiles}>
          <Svg src="icons/eject.svg" width="16" height="16" alt="eject" />
        </Button>
      {/if}
    </div>
  </div>
</Loader>
