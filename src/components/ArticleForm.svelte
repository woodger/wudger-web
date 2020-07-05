<script>
  import { onMount } from 'svelte';
  import request from '@request';

  export let slug;
  export let update;

  let data = { pages: [] };
  let edit = { pages: [] };

  onMount(async () => {
    const res = await request(`/api/v1/articles/${slug}`);
    data = await res.json();
  });

  async function onClickSave() {
    const res = await request(`/api/v1/articles/${slug}`, {
      method: 'PUT',
      data: edit
    });

    const {ok} = await res.json();

    if (ok === 1) {
      await update();
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
      await update();
    }
    else {
      store['notification.error'].set({
        message: 'Упс... все сломалось!'
      });
    }
  }

  function onInput({target}) {
    edit[target.name] = target.value;
  }
</script>

<style>
  .container {
    margin: 1rem 1rem 3rem;
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
    margin: .5rem 0;
    color: #999999;
  }

  .input {
    min-height: 30px;
    width: 100%;
  }

  .textarea {
    min-height: 6rem;
    width: 100%;
    padding: .5rem;
    text-indent: 0;
    resize: vertical;
  }

  .btn {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 1rem;
    margin: 0 1rem;
    text-decoration: none;
  }
</style>

<div class="container">
  <div class="values">
    <div class="field field_100">
      <div class="label">Наименование</div>
      <input
        class="global__input input"
        name="title"
        value={data.title}
        on:input={onInput}
      />
    </div>

    <div class="field field_10">
      <div class="label">Цена, ₽</div>
      <input
        class="global__input input"
        name="price"
        value={data.price}
        on:input={onInput}
      />
    </div>

    <div class="field field_10">
      <div class="label">Создан, год</div>
      <input
        class="global__input input"
        name="madeYear"
        value={data.madeYear}
        on:input={onInput}
      />
    </div>

    <div class="field field_20">
      <div class="label">Тип деятельности</div>
      <input
        class="global__input input"
        name="activityType"
        value={data.activityType}
        on:input={onInput}
      />
    </div>

    <div class="field field_20">
      <div class="label">Скрыть страницы</div>
      <input
        class="global__input input"
        name="hidePages"
        value={data.hidePages}
        on:input={onInput}
      />
    </div>

    <div class="field field_20">
      <div class="label">Комментарий</div>
      <input
        class="global__input input"
        name="note"
        value={data.note}
        on:input={onInput}
      />
    </div>

    <div class="field field_100">
      <div class="label">Описание</div>
      <textarea class="textarea global__input">{data.descriotion}</textarea>
    </div>
  </div>
  <div class="control">
    <div class="global__btn global__btn_blue btn" on:click={onClickSave}>
      Сохранить
    </div>
    <div class="global__btn btn" on:click={onClickTrash}>
      <img src="icons/trash.svg" alt="edit" width="16" height="16" />
    </div>
  </div>
</div>
