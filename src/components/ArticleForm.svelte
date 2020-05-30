<script>
  import { onMount } from 'svelte';
  import { get } from '@fetch';

  export let slug;

  let doc = { pages: [] };

  onMount(async () => {
    doc = await get(`/api/v1/articles/${slug}`);
  });
</script>

<style>
  .article {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
  }

  .article__control {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }

  .article__field {
    margin: 0 1rem .5rem;
  }

  .article__field > div {
    margin: .5rem;
    font-size: .9rem;
    color: #999999;
  }

  .article__field_100 {
    width: 100%;
  }

  .article__field_10 {
    width: 10%;
    min-width: 10rem;
  }

  .article__field_20 {
    width: 20%;
    min-width: 20rem;
  }

  .article__input {
    min-height: 30px;
    width: 100%;
  }

  .article__textarea {
    min-height: 6rem;
    width: 100%;
    padding: .5rem;
    resize: vertical;
  }

  .article__btn {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 1rem;
    margin: 0 1rem;
    text-decoration: none;
  }

  .article__pages {
    min-height: 50rem;
    margin: 1rem 0 0;
    background: #eeeeee;
  }
</style>

<div class="article">
  <div class="article__field article__field_100">
    <div>Наименование</div>
    <input class="global__input article__input" value={doc.title}>
  </div>

  <div class="article__field article__field_10">
    <div>Цена, ₽</div>
    <input class="global__input article__input" value={doc.price}>
  </div>

  <div class="article__field article__field_10">
    <div>Создан, год</div>
    <input class="global__input article__input" value={doc.madeYear}>
  </div>

  <div class="article__field article__field_10">
    <div>Тип деятельности</div>
    <input class="global__input article__input" value={doc.activityType}>
  </div>

  <div class="article__field article__field_20">
    <div>Скрыть страницы</div>
    <input class="global__input article__input" value={doc.hidePages}>
  </div>

  <div class="article__field article__field_20">
    <div>Комментарий</div>
    <input class="global__input article__input" value={doc.note}>
  </div>

  <div class="article__field article__field_100">
    <div>Описание</div>
    <textarea class="article__textarea global__input">{doc.descriotion}</textarea>
  </div>
</div>
<div class="article__control">
  <div class="global__btn global__btn_blue article__btn">
    Сохранить
  </div>
  <div class="global__btn article__btn">
    <img src="icons/trash.svg" alt="edit" width="16" height="16" />
  </div>
</div>
