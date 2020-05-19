<script>
  import Menu from './Menu.svelte';
  import Login from './Login.svelte';
  import Search from './Search.svelte';

  let isVisibleMenu = false;

  const toggleMenu = () =>
    isVisibleMenu = !isVisibleMenu;
</script>

<style>
  /*
  width: calc(100% - 1em);
  */

  .nav {
    box-shadow: 0 1px 3px #aaaaaa;
  }

  .nav__inner {
    display: flex;
    align-items: center;
    max-width: 1200px;
    height: 50px;
    margin: 0 auto;
  }

  .nav__btn {
    display: flex;
  	align-items: center;
  	height: 30px;
  	margin: 0 1rem;
    padding: 0 1rem;
    text-decoration: none;
    outline: none;
  	cursor: pointer;
  }

  .nav__logo {
    padding: 0;
  }
</style>

<nav>
  <div class="nav">
    <div class="nav__inner">
      <!-- <div class="nav__btn" on:click={toggleMenu}>
        <img src="icons/three-bars.svg" alt="menu" width="16" height="16" />
      </div> -->
      <a class="nav__btn nav__logo" href="/">
        <img src="images/logo.svg" alt="wudger.ru" width="128" height="32" />
      </a>
      <a class="global__btn global__btn_blue nav__btn" href="/articles">
        Каталог
      </a>
      <Search />
      <Login />
    </div>

    <!-- <Menu visible={isVisibleMenu}/> -->
  </div>
</nav>
