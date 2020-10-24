<script>
  import ArticleContract from './ArticleContract.svelte';
  import Button from '../Button.svelte';

  export let props = {};
  export let pages = [];

  let options = [];

  function updateOptions(value) {
    options = value;
  }
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

  .unit {
    padding-left: .1rem;
  }

  .description {
    width: 50%;
    margin: 1rem;
  }

  .pages {
    min-height: 50rem;
    margin: 1rem 0 0;
    background: #eeeeee;
  }
</style>

<ArticleContract {props} update={updateOptions} />

<div class="global__container">
  <h1>{props.title}</h1>

  <div class="control">
    <div class="buy">
      <Button color="blue">Купить</Button>
    </div>
  </div>

  <div class="options">
    <div class="coll_50">
      {#each options as {title, value, unit} (title)}
        {#if value}
          <div class="feature">
            <div>
              <span>{title}</span>
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

  {#if props.description}
    <div class="description">
      {props.description}
    </div>
  {/if}
</div>

<article class="pages">
  {#each pages as page}
    {@html page}
  {/each}
</article>
