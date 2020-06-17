<script>
  import store from '@store';
  import AccountButton from './oauth2/AccountButton.svelte';
  import Search from './Search.svelte';

  let admin = false;

  store['oauth2.user.admin'].subscribe((value) => {
    admin = value;
  });
</script>

<style>
  .nav {
    box-shadow: 0 1px 3px #aaaaaa;
    /* position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1; */
    background: #ffffff;
  }

  .nav__inner {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .nav__inner > :last-child {
    margin-left: auto;
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
        <a class="nav__btn nav__btn_logo" href="/">
          <img src="images/logo.svg" alt="wudger.ru" width="128" height="32" />
        </a>
        <a class="nav__btn global__btn global__btn_blue" href="{admin ? '/admin' : ''}/articles">
          Каталог
        </a>
        <Search />
        <div>
          <AccountButton />
        </div>
      </div>
    </div>
  </div>
</nav>
