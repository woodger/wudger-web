<script>
  export let doc;

  let characteristics;

  $: if (doc) {
    const price = doc.price > 0 ?
      doc.price : 'Бесплатно';

    characteristics = [{
      name: 'Цена',
      value: price,
      unit: '₽'
    }, {
      name: 'Создан',
      value: doc.madeYear,
      unit: 'год'
    }, {
      name: 'Тип деятельности',
      value: doc.activityType
    }, {
      name: 'Описание',
      value: doc.descriotion
    }];
  }
</script>

<script context="module">
  export async function preload({params, query}) {
    const url = new URL(`/api/v1/articles/${params.slug}`, process.env.API_URL);

    for (let [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }

    const res = await this.fetch(url);

    if (res.ok) {
      return {
        doc: await res.json()
      };
		}

    this.error(res.status);
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
    background: url(data:image/gif;base64,R0lGODlhAwABAIABANra2v///yH5BAEKAAEALAAAAAADAAEAAAICRFIAOw==) 0 .9rem repeat-x;
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
	<title>{doc.title}</title>
</svelte:head>

<div class="global__container">
  <h1>{doc.title}</h1>

  <div class="article__control">
    <div class="global__btn global__btn_blue article__btn article__btn_right">
      Купить
    </div>
  </div>

  <div class="article">
    <div class="article__inner">
      <div class="article__coll_50">
        <div>
          {#each characteristics as {name, value, unit}}
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
  {#each doc.pages as page}
    {@html page}
  {/each}
</div>
