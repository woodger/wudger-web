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

  export let id;
  export let onClose;

  let shema;
  let body;

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

  onMount(async () => {
    shema = await getShema();

    body = id ?
      await getArticleById() : createNewArticle();
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

  async function getShema() {
    return request(`/api/v1/static/schemes/article.json`);
  }

  async function getArticleById() {
    return await request(`/api/v1/articles/${id}`);
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
    for (const key of Object.keys(body)) {
      const rule = shema.properties[key];

      if (rule === undefined) {
        delete body[key];
        continue;
      }

      let value = body[key];

      if (typeof body[key] === 'string') {
        value = body[key].trim();
      }

      if (typeof rule.type === 'string') {
        if (rule.type === 'string') {
          body[key] = value + '';
        }
        else if (rule.type === 'number') {
          body[key] = +value;
        }
        else if (rule.type === 'null') {
          body[key] = null;
        }

        continue;
      }

      for (const type of rule.type) {
        if (value === '') {
          body[key] = rule.default;
          break;
        }

        if (rule.type === 'string') {
          body[key] = value + '';
        }
        else if (type === 'number') {
          body[key] = +value;
        }
        else if (rule.type === 'null') {
          body[key] = null;
        }
      }
    }

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

<Loader spin={!body}>
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
