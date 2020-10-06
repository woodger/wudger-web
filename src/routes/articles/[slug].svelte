<script>
  import Navigation from '../../components/navigation/Navigation.svelte';
  import Button from '../../components/Button.svelte';

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
    const url = new URL(`/api/v1/articles/${params.id}`, process.env.API_URL);

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
  .props {
    display: flex;
  }

  .control {
    display: flex;
    align-items: center;
  }

  .buy {
    margin-left: auto;
  }

  .coll_50 {
    width: 60%;
  }

  .feature {
    display: flex;
    margin: .5rem;
    background: url(data:image/gif;base64,R0lGODlhAwABAIABANra2v///yH5BAEKAAEALAAAAAADAAEAAAICRFIAOw==) 0 .9rem repeat-x;
  }

  .feature > :first-child {
    width: 30%;
  }

  .feature > :first-child span {
    padding: 0 .5rem;
    background: #ffffff;
  }

  .feature > :last-child {
    width: 70%;
    padding: 0 .5rem;
    background: #ffffff;
  }

  .pages {
    min-height: 50rem;
    margin: 1rem 0 0;
    background: #eeeeee;
  }
</style>

<svelte:head>
	<title>{doc.title}</title>
</svelte:head>

<Navigation />

<div class="global__container">
  <h1>{doc.title}</h1>

  <div class="control">
    <div class="buy">
      <Button color="blue">Купить</Button>
    </div>
  </div>

  <div class="props">
    <div class="coll_50">
    {#each characteristics as {name, value, unit}}
      {#if value}
        <div class="feature">
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

<div class="pages">
  {#each doc.pages as page}
    {@html page}
  {/each}
</div>
