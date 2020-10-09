<script>
  import store from '@store';
  import Button from './Button.svelte';

  export let title;
  export let price;
  export let madeYear;
  export let descriotion;
  export let activityType;
  export let note;
  export let pages = [];

  let admin = false;

  let props = [
    {
      name: 'Цена',
      value: price > 0 ?
        price : 'Бесплатно',
      unit: '₽'
    },
    {
      name: 'Создан',
      value: madeYear,
      unit: 'год'
    },
    {
      name: 'Тип деятельности',
      value: activityType
    },
    {
      name: 'Описание',
      value: descriotion
    }
  ];

  $: if (admin) {
    props = [
      ...props,
      {
        name: 'Комментарий',
        value: note
      }
    ];
  }

  store['oauth.user.admin'].subscribe((value) => {
    admin = value;
  });
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

  .feature:nth-child(4) > :last-child {
    color: #bf3030;
  }

  .unit {
    padding-left: .1rem;
  }

  .pages {
    min-height: 50rem;
    margin: 1rem 0 0;
    background: #eeeeee;
  }
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="global__container">
  <h1>{title}</h1>

  <div class="control">
    <div class="buy">
      <Button color="blue">Купить</Button>
    </div>
  </div>

  <div class="props">
    <div class="coll_50">
      {#each props as {name, value, unit}}
        {#if value}
          <div class="feature">
            <div>
              <span>{name}</span>
            </div>
            <div>
              <span>{value}</span>

              {#if unit}
                <span class="unit">{unit}</span>
              {/if}
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>

<article class="pages">
  {#each pages as page}
    {@html page}
  {/each}
</article>
