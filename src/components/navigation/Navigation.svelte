<script>
  import UserProfile from '../user-profile/UserProfile.svelte';
  import BlockControl from './BlockControl.svelte';

  export let title;
</script>

<style>
  .navigation {
    background: url(/images/wallpapers/abstract.svg) repeat-x;
    box-shadow: 0 1px 3px #aaaaaa;
  }

  .inner {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .logo {
    margin: 1rem;
  }

  .h1 {
    text-align: center;
  }

  .profile {
    margin-left: auto;
  }

  .control {
    display: flex;
    justify-content: center;
    min-height: 16rem;
  }
</style>

<div class="navigation">
  <div class="global__container">
    <div class="inner">
      <a class="logo" href="/">
        <img src="images/logo.svg" width="128" height="32" alt="wudger.ru" />
      </a>

      {#if !title}
        <BlockControl />
      {/if}

      <div class="profile">
        <UserProfile />
      </div>
    </div>

    {#if title}
      <h1 class="h1">{title}</h1>
      <div class="control">
        <BlockControl />
      </div>
    {/if}
  </div>
</div>
