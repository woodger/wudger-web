<script>
  import Svg from '../Svg.svelte';
  import Button from '../Button.svelte';
  import UserProfile from '../user-profile/UserProfile.svelte';
  import BlockControl from './BlockControl.svelte';
  import Search from './Search.svelte';
</script>

<style>
  .navigation {
    background: url(/images/wallpapers/abstract.svg) repeat-x;
    box-shadow: 0 1px 3px #aaaaaa;
    min-height: 12rem;
  }

  .inner {
    padding: .5rem 0;
  }

  .header {
    display: flex;
  }

  .logo {
    margin: .5rem 1rem;
  }

  .user-profile {
    margin-left: auto;
  }

  .control {
    display: flex;
    flex-wrap: wrap;
  }

  @media screen and (min-width: 600px) {
    .control {
      justify-content: center;
      flex-wrap: nowrap;
    }
  }
</style>

<div class="navigation">
  <div class="global__container">
    <div class="inner">

      <div class="header">
        <a class="logo" href="/">
          <Svg src="images/logo.svg" width="128" height="32" alt="wudger.ru" />
        </a>
        <div class="user-profile">
          <UserProfile />
        </div>
      </div>

      <div class="control">
        <Button href="/articles" color="blue">Каталог</Button>
        <Search />
      </div>
    </div>
  </div>
</div>
