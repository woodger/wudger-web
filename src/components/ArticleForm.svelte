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
  .edit-form {
    margin: 1rem 1rem 3rem;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .edit-form__values {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  .edit-form__control {
    display: flex;
    align-items: center;
    padding: 1rem 0;
  }

  .edit-form__field {
    margin: 0 1rem .5rem;
  }

  .edit-form__field_10 {
    width: 10%;
    min-width: 10rem;
  }

  .edit-form__field_20 {
    width: 20%;
    min-width: 20rem;
  }

  .edit-form__field_100 {
    width: 100%;
  }

  .edit-form__label {
    margin: .5rem 0;
    color: #999999;
  }

  .edit-form__input {
    min-height: 30px;
    width: 100%;
  }

  .edit-form__textarea {
    min-height: 6rem;
    width: 100%;
    padding: .5rem;
    text-indent: 0;
    resize: vertical;
  }

  .edit-form__btn {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 1rem;
    margin: 0 1rem;
    text-decoration: none;
  }
</style>

<div class="edit-form">
  <div class="edit-form__values">
    <div class="edit-form__field edit-form__field_100">
      <div class="edit-form__label">Наименование</div>
      <input
        class="global__input edit-form__input"
        name="title"
        value={data.title}
        on:input={onInput}
      />
    </div>

    <div class="edit-form__field edit-form__field_10">
      <div class="edit-form__label">Цена, ₽</div>
      <input
        class="global__input edit-form__input"
        name="price"
        value={data.price}
        on:input={onInput}
      />
    </div>

    <div class="edit-form__field edit-form__field_10">
      <div class="edit-form__label">Создан, год</div>
      <input
        class="global__input edit-form__input"
        name="madeYear"
        value={data.madeYear}
        on:input={onInput}
      />
    </div>

    <div class="edit-form__field edit-form__field_20">
      <div class="edit-form__label">Тип деятельности</div>
      <input
        class="global__input edit-form__input"
        name="activityType"
        value={data.activityType}
        on:input={onInput}
      />
    </div>

    <div class="edit-form__field edit-form__field_20">
      <div class="edit-form__label">Скрыть страницы</div>
      <input
        class="global__input edit-form__input"
        name="hidePages"
        value={data.hidePages}
        on:input={onInput}
      />
    </div>

    <div class="edit-form__field edit-form__field_20">
      <div class="edit-form__label">Комментарий</div>
      <input
        class="global__input edit-form__input"
        name="note"
        value={data.note}
        on:input={onInput}
      />
    </div>

    <div class="edit-form__field edit-form__field_100">
      <div class="edit-form__label">Описание</div>
      <textarea class="edit-form__textarea global__input">{data.descriotion}</textarea>
    </div>
  </div>
  <div class="edit-form__control">
    <div class="global__btn global__btn_blue edit-form__btn" on:click={onClickSave}>
      Сохранить
    </div>
    <div class="global__btn edit-form__btn" on:click={onClickTrash}>
      <img src="icons/trash.svg" alt="edit" width="16" height="16" />
    </div>
  </div>
</div>
