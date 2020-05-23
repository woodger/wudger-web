<script>
  import {fade} from 'svelte/transition';

  export let article;
  export let lang;

  let characteristics = [];
  let title;

  $: characteristics = [{
    key: 'price',
    name: lang.price,
    value: article.price > 0 ?
      article.price: lang.free,

    unit: article.price > 0 ?
      lang.rub : ''
  },
  {
    key: 'madeYear',
    name: lang.made,
    value: article.madeYear,
    unit: lang.year
  },
  {
    key: 'descriotion',
    name: lang.descriotion,
    value: article.descriotion
  },
  {
    key: 'activityType',
    name: lang.activityType,
    value: article.activityType
  }];
</script>

<script context="module">
  export async function preload(page, session) {
    const get = async (path) => {
      const url = new URL(path, process.env.API_URL);
      const res = await this.fetch(url);

      if (res.status === 200) {
  			return await res.json();
  		}
      else {
  			this.error(res.status, res.message);
  		}
    };

    return {
      lang: await get('/api/v1/lang.json'),
      article: await get(`/api/v1/articles/${page.params.slug}`)
    };
  }
</script>

<style>
  .article__inner {
    display: flex;
  }

  .article__control {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }

  .article__coll_50 {
    width: 60%;
  }

  .article__feature {
    display: flex;
    margin: .5rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAAAAAA+i0toAAAAAnRSTlMA/1uRIrUAAAAMSURBVHheY7j1/z8ABY8C2UtBe8oAAAAASUVORK5CYII=) 0 .9rem repeat-x;
  }

  .article__feature > :first-child {
    width: 30%;
  }

  .article__feature > :first-child span {
    padding: 0 .5rem;
    background: #ffffff;
  }

  .article__feature > :last-child {
    width: 70%;
    padding: 0 .5rem;
    background: #ffffff;
  }

  .article__btn {
    display: flex;
  	align-items: center;
  	height: 30px;
    padding: 0 1rem;
    margin: 0 1rem;
    text-decoration: none;
  }

  .article__btn_right {
    margin-left: auto;
  }

  .article__pages {
    min-height: 50rem;
    margin: 1rem 0 0;
    background: #eeeeee;
  }
</style>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<div class="global__container">
  <h1>{article.title}</h1>

  <div class="article__control">
    <div class="global__btn global__btn_blue article__btn article__btn_right">
      {lang.buy}
    </div>
  </div>

  <div class="article">
    <div class="article__inner">
      <div class="article__coll_50">
        <div>
          {#each characteristics as {name, value, unit, type, staff}}
            {#if value}
              <div class="article__feature">
                <div>
                  <span>{name}</span>
                </div>
                <div>
                  <span>{value}</span>

                  {#if unit}
                    <span> {unit}</span>
                  {/if}
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<div class="article__pages">
  {#each article.pages as page}
    {@html page}
  {/each}
</div>
