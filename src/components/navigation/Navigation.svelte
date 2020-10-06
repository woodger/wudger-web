<script>
  import UserProfile from './UserProfile/index.svelte';
  import BlockControl from './BlockControl.svelte';

  export let title = undefined;
</script>

<style>
  .container {
    background: url(/images/wallpapers/abstract.svg) repeat-x;
    box-shadow: 0 1px 3px #aaaaaa;
  }

  .navigation {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .btn__right {
    margin-left: auto;
  }

  .logo {
    margin: 1rem;
  }

  h1 {
    text-align: center;
  }

  .control {
    min-height: 16rem;
    display: flex;
    justify-content: center;
  }
</style>

<div class="container">
  <div class="global__container">
    <div class="navigation">
      <a class="logo" href="/">
        <img src="images/logo.svg" alt="wudger.ru" width="128" height="32" />
      </a>

      {#if !title}
        <BlockControl />
      {/if}

      <div class="btn__right">
        <UserProfile />
      </div>
    </div>

    {#if title}
      <h1>{title}</h1>
      <div class="control">
        <BlockControl />
      </div>
    {/if}
  </div>
</div>
