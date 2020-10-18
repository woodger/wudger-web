<script>
  import { onMount } from 'svelte';
  import request from '@request';
  import store from '@store';
  import Svg from '../Svg.svelte';
  import Button from '../Button.svelte';
  import InputText from '../InputText.svelte';
  import InputFile from '../InputFile.svelte';
  import TextArea from '../TextArea.svelte';

  export let props;
  export let onClose;

  const fields = {};
  const data = {};

  const shema = {
    title: {},
    price: {
      type: Number,
      def: 0
    },
    madeYear: {
      type: Number,
      def: getYearNow()
    },
    descriotion: {},
    activityType: {},
    totalPages: {
      type: Number,
      def: 0
    },
    hidePages: {},
    note: {},
    files: {
      type(value) {
        return value;
      },
      def: []
    }
  };

  $: for (const name of Object.keys(shema)) {
    const {type = String, def = null} = shema[name];
    const value = props[name];

    fields[name] = value ?
      type(value) : def;
  }

  function onInputText({target}) {
    data[target.name] = target.value;
  }

  async function onInputFileName() {}

  async function onClickSave() {
    for (const name of Object.keys(shema)) {
      const {type = String, def = null} = shema[name];
      let value = data[name];

      if (typeof value === 'string') {
        value = value.trim();
      }

      data[name] = value ?
        type(value) : def;
    }

    let res;

    if (props.id) {
      res = await request(`/api/v1/articles/${props.id}`, {
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
    const body = new FormData();

    for (const value of target.files) {
      body.append('uploads', value);
    }

    const res = await request(`/api/v1/files`, {
      method: 'POST',
      body: 'true'
    });

    if (!res.ok) {
      return store['notification.error'].set({
        message: 'Упс... все сломалось!'
      });
    }

    const {values} = await res.json();

    fields.files = [
      ...fields.files,
      ...values
    ];
  }

  function getYearNow() {
    const now = new Date();
    const year = now.getFullYear();

    return year;
  }

  async function getArticleById() {
    if (props.id) {
      const res = await request(`/api/v1/articles/${props.id}`);

      if (!res.ok) {
        return store['notification.error'].set({
          message: 'Упс... все сломалось!'
        });
      }

      props = await res.json();
    }
  }

  onMount(getArticleById);
</script>

<style>
  .fields {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  .field_10 {
    width: 10%;
  }

  .field_20 {
    width: 20%;
  }

  .field_100 {
    width: 100%;
  }

  .label {
    margin: 0 1rem .5rem;
    color: #999999;
  }

  .files {
    display: flex;
    flex-wrap: wrap;
  }

  .file {
    margin: 0 0 1rem;
  }

  .control {
    display: flex;
    align-items: center;
  }
</style>


  <div>
    <div class="fields">
      <div class="field_100">
        <div class="label">Наименование</div>
        <InputText name="title" value={fields.title} onInput={onInputText} />
      </div>

      <div class="field_10">
        <div class="label">Цена, ₽</div>
        <InputText name="price" value={fields.price} onInput={onInputText} />
      </div>

      <div class="field_10">
        <div class="label">Создан, год</div>
        <InputText name="madeYear" value={fields.madeYear} onInput={onInputText} />
      </div>

      <div class="field_20">
        <div class="label">Тип деятельности</div>
        <InputText name="activityType" value={fields.activityType} onInput={onInputText} />
      </div>

      <div class="field_10">
        <div class="label">Объем, стр.</div>
        <InputText value={fields.totalPages} disabled />
      </div>

      <div class="field_20">
        <div class="label">Скрыть страницы</div>
        <InputText name="hidePages" value={fields.hidePages} onInput={onInputText} />
      </div>

      <div class="field_20">
        <div class="label">Комментарий</div>
        <InputText name="note" value={fields.note} onInput={onInputText} />
      </div>

      <div class="field_100">
        <div class="label">Описание</div>
        <TextArea name="descriotion" value={fields.descriotion} onInput={onInputText} />
      </div>
    </div>

    <div class="files">
      <div class="field_100">
        <div class="label">Файлы</div>
        <div class="files__inner">

          {#each fields.files as {id, name} (id)}
            <div class="file">
              <InputText name="file" value={name} onInput={onInputFileName} />
            </div>
          {/each}

        </div>
      </div>
    </div>

    <div class="control">
      <Button color="blue" onClick={onClickSave}>Сохранить</Button>

      {#if props.id}
        <Button onClick={onClickTrash}>
          <Svg src="icons/trash.svg" width="16px" height="16px" />
        </Button>
      {/if}

      <InputFile onInput={onUploadFiles} />
    </div>
  </div>
