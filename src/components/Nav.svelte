<script>
  import store from '@store';
  import AccountButton from './oauth/AccountButton.svelte';
  import Search from './Search.svelte';

  let admin;

  store['oauth.user.admin'].subscribe((value) => {
    admin = value;
  });
</script>

<style>
  .container {
    box-shadow: 0 1px 3px #aaaaaa;
    /* position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1; */
    background: #ffffff;
  }

  .inner {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .inner > :last-child {
    margin-left: auto;
  }

  .btn {
    display: flex;
  	align-items: center;
  	height: 30px;
  	margin: 0 1rem;
    padding: 0 1rem;
    text-decoration: none;
    cursor: pointer;
  }

  .btn_logo {
    padding: 0;
  }
</style>

<nav class="container">
  <div class="global__container">
    <div class="inner">
      <a class="btn btn_logo" href="/">
        <img src="images/logo.svg" alt="wudger.ru" width="128" height="32" />
      </a>
      <a class="btn global__btn global__btn_blue" href="/articles">
        Каталог
      </a>

      <Search />

      {#if admin}
        <a class="btn global__btn" href="/admin/articles">
          <img src="icons/stack.svg" alt="stack" width="16" height="16" />
        </a>
      {/if}

      <div>
        <AccountButton />
      </div>
    </div>
  </div>
</nav>
