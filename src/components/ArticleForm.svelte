<script>
  import { onMount } from 'svelte';
  import request from '@request';
  import store from '@store';
  import Button from './Button.svelte';

  export let slug = undefined;
  export let complite = undefined;

  let original = {};
  let editable = {};

  onMount(async () => {
    if (slug) {
      const res = await request(`/api/v1/articles/${slug}`);
      original = await res.json();
    }
    else {
      const date = new Date();

      original = {
        title: null,
        price: 0,
        madeYear: date.getFullYear(),
        descriotion: null,
        hidePages: null,
        pages: [],
        note: null,
        activityType: null
      };
    }
  });

  const uuid = Date.now();

  async function onClickSave() {
    let res

    if (slug) {
      res = await request(`/api/v1/articles/${slug}`, {
        method: 'PUT',
        data: editable
      })
    }
    else {
      res = await request(`/api/v1/articles`, {
        method: 'POST',
        data: editable
      });
    }

    const {ok} = await res.json();

    if (ok === 1) {
      await complite();
    }
    else {
      store['notification.error'].set({
        message: 'Упс... все сломалось!'
      });
    }
  }

  async function onClickTrash() {
    if (confirm('Удалить?') === false) {
      return;
    }

    const res = await request(`/api/v1/articles/${slug}`, {
      method: 'DELETE'
    });

    const {ok, n} = await res.json();

    if (ok === 1 && n === 1) {
      await complite();
    }
    else {
      store['notification.error'].set({
        message: 'Упс... все сломалось!'
      });
    }
  }

  function onInputText({target}) {
    editable[target.name] = target.value;
  }

  async function onInputFile({target}) {
    const res = await request(`/api/v1/files`, {
      method: 'POST',
      data: {
        files: target.files
      }
    });

    const {ok} = await res.json();

    if (ok === 1) {
      store['notification.message'].set({
        message: 'Файл загружен'
      });
    }
    else {
      store['notification.error'].set({
        message: 'Упс... все сломалось!'
      });
    }
  }
</script>

<style>
  .container {
    margin: 1rem;
    border: 1px solid #aaaaaa;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .values {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  .control {
    display: flex;
    align-items: center;
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

  [type="file"] {
    display: none;
  }
</style>

<div class="container">
  <div class="values">
    <div class="field field_100">
      <div class="label">Наименование</div>
      <input
        class="global__input input"
        name="title"
        value={original.title}
        on:input={onInputText}
      />
    </div>

    <div class="field field_10">
      <div class="label">Цена, ₽</div>
      <input
        class="global__input input"
        name="price"
        value={original.price}
        on:input={onInputText}
      />
    </div>

    <div class="field field_10">
      <div class="label">Создан, год</div>
      <input
        class="global__input input"
        name="madeYear"
        value={original.madeYear}
        on:input={onInputText}
      />
    </div>

    <div class="field field_20">
      <div class="label">Тип деятельности</div>
      <input
        class="global__input input"
        name="activityType"
        value={original.activityType}
        on:input={onInputText}
      />
    </div>

    <div class="field field_20">
      <div class="label">Скрыть страницы</div>
      <input
        class="global__input input"
        name="hidePages"
        value={original.hidePages}
        on:input={onInputText}
      />
    </div>

    <div class="field field_20">
      <div class="label">Комментарий</div>
      <input
        class="global__input input"
        name="note"
        value={original.note}
        on:input={onInputText}
      />
    </div>

    <div class="field field_100">
      <div class="label">Описание</div>
      <textarea class="textarea global__input">{original.descriotion}</textarea>
    </div>
  </div>
  <div class="control">
    <Button color="blue" click={onClickSave}>Сохранить</Button>

    {#if slug}
    <Button click={onClickTrash}>
      <img src="icons/trash.svg" alt="edit" width="16" height="16" />
    </Button>
    {/if}

    <label for={uuid}>
      <Button>
        <img src="icons/upload.svg" alt="upload" width="16" height="16" />
        <input type="file" id={uuid} on:input={onInputFile} multiple />
      </Button>
    </label>
  </div>
</div>
