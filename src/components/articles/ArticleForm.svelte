<script>
  import request from '@request';
  import store from '@store';
  import Button from '../Button.svelte';

  export let props = {};
  export let onClose;

  let fields = {};
  let files = props.files ? [
    ...props.files
  ] : [];

  const now = new Date();

  const shema = {
    title: {},
    price: {
      type: Number,
      def: 0
    },
    madeYear: {
      type: Number,
      def: now.getFullYear()
    },
    descriotion: {},
    activityType: {},
    hidePages: {},
    note: {}
  };

  for (const name of Object.keys(shema)) {
    const {type = String, def = null} = shema[name];
    const value = props[name];

    fields[name] = value ?
      type(value) : def;
  }

  function onInputText({target}) {
    fields[target.name] = target.value;
  }

  async function onInputFileName() {}

  async function onClickSave() {
    for (const name of Object.keys(shema)) {
      const {type = String, def = null} = shema[name];
      let value = fields[name];

      if (typeof value === 'string') {
        value = value.trim();
      }

      fields[name] = value ?
        type(value) : def;
    }

    const data = {
      fields: JSON.stringify(fields)
    };

    let res;

    if (props.id) {
      res = await request(`/api/v1/articles/${props.id}`, {
        method: 'PUT',
        data
      })
    }
    else {
      res = await request(`/api/v1/articles`, {
        method: 'POST',
        data
      });
    }

    if (res.ok) {
      const {ok} = await res.json();

      if (ok === 1) {
        return await onClose();
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

    const res = await request(`/api/v1/articles/${props.id}`, {
      method: 'DELETE'
    });

    const {ok, n} = await res.json();

    if (ok === 1 && n === 1) {
      return await onClose();
    }

    store['notification.error'].set({
      message: 'Упс... все сломалось!'
    });
  }

  async function onUploadFiles({target}) {
    const res = await request(`/api/v1/files`, {
      method: 'POST',
      data: {
        files: target.files
      }
    });

    if (res.status === 200) {
      const {values} = await res.json();

      return files = [
        ...files,
        ...values
      ];
    }

    store['notification.error'].set({
      message: 'Упс... все сломалось!'
    });
  }
</script>

<style>
  .container {
    margin: 1rem;
    border: 1px solid #aaaaaa;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .fields {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  .field {
    margin: 0 1rem .5rem;
  }

  .field_10 {
    width: 10%;
    min-width: 10rem;
  }

  .field_20 {
    width: 20%;
    min-width: 20rem;
  }

  .field_100 {
    width: 100%;
  }

  .label {
    margin: 0 0 .5rem;
    color: #999999;
  }

  .input {
    min-height: 30px;
    width: 100%;
  }

  .textarea {
    min-height: 5rem;
    width: 100%;
    padding: .5rem;
    text-indent: 0;
    resize: vertical;
  }

  .files {
    display: flex;
    flex-wrap: wrap;
  }

  .file {
    padding: 0 0 1rem;
  }

  .control {
    display: flex;
    align-items: center;
  }

  [type="file"] {
    display: none;
  }
</style>

<div class="container">
  <div class="fields">
    <div class="field field_100">
      <div class="label">Наименование</div>
      <input
        class="global__input input"
        name="title"
        value={fields.title}
        on:input={onInputText}
      />
    </div>

    <div class="field field_10">
      <div class="label">Цена, ₽</div>
      <input
        class="global__input input"
        name="price"
        value={fields.price}
        on:input={onInputText}
      />
    </div>

    <div class="field field_10">
      <div class="label">Создан, год</div>
      <input
        class="global__input input"
        name="madeYear"
        value={fields.madeYear}
        on:input={onInputText}
      />
    </div>

    <div class="field field_20">
      <div class="label">Тип деятельности</div>
      <input
        class="global__input input"
        name="activityType"
        value={fields.activityType}
        on:input={onInputText}
      />
    </div>

    <div class="field field_20">
      <div class="label">Скрыть страницы</div>
      <input
        class="global__input input"
        name="hidePages"
        value={fields.hidePages}
        on:input={onInputText}
      />
    </div>

    <div class="field field_20">
      <div class="label">Комментарий</div>
      <input
        class="global__input input"
        name="note"
        value={fields.note}
        on:input={onInputText}
      />
    </div>

    <div class="field field_100">
      <div class="label">Описание</div>
      <textarea
        class="textarea global__input"
        name="descriotion"
        on:input={onInputText}
      >{fields.descriotion}</textarea>
    </div>
  </div>

  {#if files.length}
    <div class="files">
      <div class="field field_100">
        <div class="label">Файлы</div>
        {#each files as {id, name} (id)}
          <div class="file">
            <input
              class="global__input input"
              name="file"
              value={name}
              on:input={onInputFileName}
            />
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div class="control">
    <Button color="blue" onClick={onClickSave}>Сохранить</Button>

    {#if props.id}
      <Button onClick={onClickTrash}>
        <img src="icons/trash.svg" alt="edit" width="16" height="16" />
      </Button>
    {/if}

    <label>
      <input type="file" on:input={onUploadFiles} multiple />
      <Button>
        <img src="icons/upload.svg" alt="upload" width="16" height="16" />
      </Button>
    </label>
  </div>
</div>
