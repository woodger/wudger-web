<script>
  import { onMount } from 'svelte';
  import request from '@request';
  import store from '@store';
  import Svg from '../Svg.svelte';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  import InputFile from '../InputFile.svelte';
  import TextArea from '../TextArea.svelte';
  import Loader from '../Loader.svelte';
  import { shema } from './articleContract.js';

  export let id;
  export let onClose;

  const data = {
    files: []
  };

  const options = [
    {
      name: 'title',
      size: 100
    },
    {
      name: 'price',
      size: 20
    },
    {
      name: 'madeYear',
      size: 20
    },
    {
      name: 'hidePages',
      size: 30
    },
    {
      name: 'activityType',
      size: 30
    },
    {
      name: 'totalPages',
      disabled: true,
      size: 20
    },
    {
      name: 'note',
      size: 30
    }
  ];

  let dct;

  onMount(async () => {
    dct = id ?
      await getArticleById() : {};
  });

  async function getArticleById() {
    const res = await request(`/api/v1/articles/${id}`);

    if (!res.ok) {
      return store['notification.error'].set({
        message: 'Упс .. Все сломалось'
      });
    }

    return await res.json();
  }

  function getLabel(name) {
    const {descriotion, unit} = shema[name];

    return unit ?
      `${descriotion}, ${unit}` : descriotion;
  }

  function onInputText({target}) {
    data[target.name] = target.value;
  }

  async function onClickSave() {
    for (const key of Object.keys(data)) {
      if (key in shema) {
        const {type} = shema[key];
        const value = data[key].trim();

        data[key] = type === 'number' ?
          Number(value) : value;
      }
    }

    let res;

    if (id) {
      res = await request(`/api/v1/articles/${id}`, {
        method: 'PUT',
        body: data
      })
    }
    else {
      res = await request(`/api/v1/articles`, {
        method: 'POST',
        body: data
      });
    }

    if (res.ok) {
      const {ok} = await res.json();

      if (ok === 1) {
        return onClose();
      }
    }

    store['notification.error'].set({
      message: 'Упс... все сломалось!'
    });
  }

  async function onClickTrash() {
    if (confirm('Удалить?') === false) {
      return;
    }

    const res = await request(`/api/v1/articles/${id}`, {
      method: 'DELETE'
    });

    const {ok, n} = await res.json();

    if (ok === 1 && n === 1) {
      return onClose();
    }

    store['notification.error'].set({
      message: 'Упс... все сломалось!'
    });
  }

  async function onUploadFiles({target}) {}

  // async function onInputFileName() {}
  //
  // async function onClickSave() {
  //   for (const name of Object.keys(shema)) {
  //     const {type = String, def = null} = shema[name];
  //     let value = data[name];
  //
  //     if (typeof value === 'string') {
  //       value = value.trim();
  //     }
  //
  //     data[name] = value ?
  //       type(value) : def;
  //   }
  //
  //   let res;
  //
  //   if (id) {
  //     res = await request(`/api/v1/articles/${id}`, {
  //       method: 'PUT',
  //       body: data
  //     })
  //   }
  //   else {
  //     res = await request(`/api/v1/articles`, {
  //       method: 'POST',
  //       body: data
  //     });
  //   }
  //
  //   if (res.ok) {
  //     const {ok} = await res.json();
  //
  //     if (ok === 1) {
  //       return await onClose();
  //     }
  //   }
  //
  //   store['notification.error'].set({
  //     message: 'Упс... все сломалось!'
  //   });
  // }
  //

  //
  // async function onUploadFiles({target}) {
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
  //
  //   if (!res.ok) {
  //     return store['notification.error'].set({
  //       message: 'Упс... все сломалось!'
  //     });
  //   }
  //
  //   const {values} = await res.json();
  //
  //   fields.files = [
  //     ...fields.files,
  //     ...values
  //   ];
  // }
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

  /*
  .files {
    display: flex;
    flex-wrap: wrap;
  }

  .file {
    margin: 0 0 1rem;
  } */

  .control {
    display: flex;
    align-items: center;
  }
</style>

<Loader spin={!dct}>
  <div>
    <div class="fields">
      {#each options as {name, disabled, size} (name)}
        <div class="field_{size}">
          <Input
            {name}
            {disabled}
            type={shema[name].type}
            value={dct[name]}
            label={getLabel(name)}
            onInput={onInputText}
          />
        </div>
      {/each}

      <div class="field_100">
        <TextArea
          name="descriotion"
          value={dct.descriotion}
          label={getLabel('descriotion')}
          onInput={onInputText}
        />
      </div>
    </div>
    <!-- <div class="files">
      <div class="field_100">
        <div class="label">Файлы</div>
        <div class="files__inner">

          {#each fields.files as {id, name} (id)}
            <div class="file">
              <Input name="file" value={name} onInput={onInputFileName} />
            </div>
          {/each}

        </div>
      </div>
    </div> -->

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
