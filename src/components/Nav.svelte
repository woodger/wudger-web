<script>
  import Menu from './Menu.svelte';
  import Login from './Login.svelte';
  // import Search from './Search.svelte';

  let isVisibleMenu = false;

  function onClickMenu() {
    isVisibleMenu = !isVisibleMenu;
  }
</script>

<style>
  .nav {
    box-shadow: 0 1px 3px #aaaaaa;
  }

  .nav__inner {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .nav__inner > :last-child {
    margin: 1rem 1rem 1rem auto;
  }

  .nav__btn {
    display: flex;
  	align-items: center;
  	height: 30px;
  	margin: 0 1rem;
    padding: 0 1rem;
    text-decoration: none;
    cursor: pointer;
  }

  .nav__btn_logo {
    padding: 0;
  }
</style>

<nav>
  <div class="nav">
    <div class="global__container">
      <div class="nav__inner">
        <div class="nav__btn" on:click={onClickMenu}>
          <img src="icons/three-bars.svg" alt="menu" width="16" height="16" />
        </div>
        <a class="nav__btn nav__btn_logo" href="/">
          <img src="images/logo.svg" alt="wudger.ru" width="128" height="32" />
        </a>
        <a class="global__btn nav__btn" href="/articles">
          Каталог
        </a>
        <!-- <div>
          <Search />
        </div> -->
        <div>
          <Login />
        </div>
      </div>
    </div>

    <Menu visible={isVisibleMenu} />
  </div>
</nav>
