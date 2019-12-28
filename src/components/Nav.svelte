<script>
  import {visible} from '../stores/menu';
  import Menu from './Menu.svelte';

  export let segment;

  function toggleMenu() {
    $visible = !$visible;
  }
</script>

<style>
  /*
  width: calc(100% - 1em);
  */

	.nav {
    position: fixed;
    top: 0;
    left: 0;
  	width: 100%;
	}

  .nav__container {
    box-shadow: 0 1px 3px #aaaaaa;
  	background: #ffffff;
  }

  .nav__inner {
    display: flex;
    align-items: stretch;
    max-width: 1200px;
    height: 50px;
    margin: 0 auto;
  }

  .nav__btn {
    display: flex;
  	align-items: center;
  	height: 100%;
  	margin: 0 1rem;
  	cursor: pointer;
  }

  .nav__btn:hover {
    border-bottom: 2px solid #999999;
  }

  .nav__btn_selected {
  	border-bottom: 2px solid #2d77af;
  }

  .search {
    display: flex;
    align-items: center;
    margin: 0 1rem;
  }

  .search__input {
    width: 400px;
    height: 30px;
    border-radius: 3px 0 0 3px;
  }

  .search__btn {
    height: 30px;
    padding: 1px 1rem;
    border-radius: 0 3px 3px 0;
    border-left: none
  }
</style>

<nav class="nav">
  <div class="nav__container">
    <div class="nav__inner">
      <div class="nav__btn" on:click={toggleMenu}>
        <img src="icons/three-bars.svg" alt="menu" width="16" height="16" />
      </div>
      <a class="nav__btn" class:nav__btn_selected={segment === 'articles'} href="/articles">
        <img src="images/logo.svg" alt="wudger.ru" width="128" height="32" />
      </a>
      <div class="search">
        <input class="global__input search__input" type="text" name="q" placeholder="Поиск ..." />
        <button class="global__btn search__btn">Найти</button>
      </div>
      <a class="nav__btn" class:nav__btn_selected={segment === 'cart'} href="/cart">
        <img src="icons/cart.svg" alt="cart" width="16" height="16" />
      </a>
    </div>

    <Menu />
  </div>
</nav>
