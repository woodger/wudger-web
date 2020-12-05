<script>
  import UserProfile from '../user-profile/UserProfile.svelte';
  import BlockControl from './BlockControl.svelte';

  export let title;
</script>

<style>
  .container {
    background: url(/images/wallpapers/abstract.svg) repeat-x;
    /* border-bottom: 1px solid #aaaaaa; */
    box-shadow: 0 1px 3px #aaaaaa;
  }

  .navigation {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .btn_right {
    margin-left: auto;
  }

  .logo {
    margin: 1rem;
  }

  h1 {
    text-align: center;
  }

  .control {
    display: flex;
    justify-content: center;
    min-height: 16rem;
  }
</style>

<div class="container">
  <div class="global__container">
    <div class="navigation">
      <a class="logo" href="/">
        <img src="images/logo.svg" width="128" height="32" alt="wudger.ru" />
      </a>

      {#if !title}
        <BlockControl />
      {/if}

      <div class="btn_right">
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
