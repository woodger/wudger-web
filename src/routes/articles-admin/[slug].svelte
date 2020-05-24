<!-- <script>
  import {onMount} from 'svelte';
  import {fade} from 'svelte/transition';
  import * as store from '@store';

  export let characteristics = [];

  let article = { pages: [] };
  let lang = {};

  userInfo.subscribe(({groups = []} = {}) => {
    // $authorize = !groups.includes('admin');
    //
    // store.showAuthForm
  });

  $: characteristics = [{
    key: 'price',
    name: 'Цена',
    value: article.price
  },
  {
    key: 'madeYear',
    name: 'Создан',
    value: article.madeYear
  },
  {
    key: 'activityType',
    name: 'Тип деятельности',
    value: article.activityType
  },
  {
    key: 'note',
    name: 'Комментарий',
    value: article.note
  },
  {
    key: 'descriotion',
    name: 'Описание',
    value: article.descriotion,
    type: 'textarea'
  }];

  async function getArticleById(accessToken, slug) {
	  const url = new URL(`/api/v1/articles/${slug}`, process.env.API_URL);
	  const res = await fetch(url, {
	    headers: {
	      'X-Access-Token': accessToken
	    }
	  });

	  if (res.status !== 200) {
	    return;
	  }

	  return await res.json();
	}

  async function getLang() {
	  const url = new URL(`/api/v1/lang.json`, process.env.API_URL);
	  const res = await fetch(url);

	  if (res.status !== 200) {
	    return;
	  }

	  return await res.json();
	}

  onMount(() => {
    const path = location.href.split('/');
    const slug = parseInt(path[path.length - 1]);

    credentials.subscribe(async ({accessToken} = {}) => {
      article = await getArticleById(accessToken, slug);
      lang = await getLang();
    });
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

<svelte:head>
  <title></title>
</svelte:head>

{#if $authorize === false}
  <div class="global__container">
    <div class="article">
      <div class="article__field article__field_100">
        <div>{lang.title}</div>
        <input class="global__input article__input" value={article.title}>
      </div>

      <div class="article__field article__field_10">
        <div>{lang.price}</div>
        <input class="global__input article__input" value={article.price}>
      </div>

      <div class="article__field article__field_10">
        <div>{lang.madeYear}</div>
        <input class="global__input article__input" value={article.madeYear}>
      </div>

      <div class="article__field article__field_10">
        <div>{lang.activityType}</div>
        <input class="global__input article__input" value={article.activityType}>
      </div>

      <div class="article__field article__field_20">
        <div>{lang.hidePages}</div>
        <input class="global__input article__input" value={article.hidePages}>
      </div>

      <div class="article__field article__field_20">
        <div>{lang.note}</div>
        <input class="global__input article__input" value={article.note}>
      </div>

      <div class="article__field article__field_100">
        <div>{lang.descriotion}</div>
        <textarea class="article__textarea global__input">{article.descriotion}</textarea>
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
  </div>
  <div class="article__pages">
    {#each article.pages as page}
      {@html page}
    {/each}
  </div>
{/if} -->
