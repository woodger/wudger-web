<script>
  import { onMount } from 'svelte';
  import { request } from '@toolkit';
  import Button from './Button.svelte';

  export let values;
  export let schema;

  const options = [
    'price',
    'madeYear',
    'activityType',
    'totalPages',
    'note'
  ];
</script>

<style>
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

  .options {
    display: flex;
  }

  .field {
    display: flex;
    margin: .5rem;
    background: url(data:image/gif;base64,R0lGODlhAwABAIABANra2v///yH5BAEKAAEALAAAAAADAAEAAAICRFIAOw==) 0 .9rem repeat-x;
  }

  .field > :first-child {
    width: 30%;
  }

  .field > :first-child span {
    padding: 0 .5rem;
    background: #ffffff;
  }

  .field > :last-child {
    width: 70%;
    padding: 0 .5rem;
    background: #ffffff;
  }

  .description {
    width: 50%;
    margin: 1rem;
  }

  .space {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 50rem;
    margin: 2.5rem 0 0;
    counter-reset: item 0;
    background: #eeeeee;
  }

  .page {
    position: relative;
    width: 210mm;
    min-height: 297mm;
    margin: 2.5rem;
    padding: 20mm 10mm 20mm 30mm;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .page:after {
    position: absolute;
    right: 7.2%;
    bottom: 37px;
    counter-increment: item;
    content: counter(item);
    font-size: 10pt;
    color: #808080;
  }
</style>

<div class="global__container">
  <h1>{values.title}</h1>

  <div class="control">
    <div class="buy">
      <Button color="blue">Купить</Button>
    </div>
  </div>

  <div class="options">
    <div class="coll_50">
      {#each options as name (name)}
        {#if values[name]}
          <div class="field">
            <div>
              <span>{schema.properties[name].description}</span>
            </div>
            <div>
              <span>{values[name]}</span>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  {#if values.description}
    <div class="description">
      {values.description}
    </div>
  {/if}
</div>

<article class="space">
  {#each values.pages as page}
    <div class="page">
      {@html page}
    </div>
  {/each}
</article>
