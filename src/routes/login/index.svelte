<script>
  import {accessToken} from '../../stores/user.js';

  let title = 'Вход';
  let login = '';
  let password = '';

  async function actions() {
    const url = new URL('/api/v1/users/info', process.env.API_URL);

    const res = await fetch(url, {
      headers: {
        'X-Access-Token': $accessToken
      }
    });

    const user = await res.json();

    if (user.groups.includes('admin')) {
      console.log('Is admin');
    }
  }

  async function buttonHandler() {
    const url = new URL('/api/v1/users/authorization', process.env.API_URL);
    const body = new FormData();

    body.set('login', login);
    body.set('password', password);

    const res = await fetch(url, {
      method: 'POST',
      body
    });

    if (res.status !== 200) {
      return;
    }

    const data = await res.json();

    window.localStorage.setItem('refreshToken', data.refreshToken);
    $accessToken = data.accessToken;

    await actions();
  }
</script>

<style>
  .login {
    margin: 0 auto;
    max-width: 1200px;
  }

  .login__input {
    width: 100%;
    height: 2rem;
  }

  .login__field {
    max-width: 300px
  }

  .login__field-inner {
    padding: .5rem 1rem;
  }

  .login__control {
    margin-top: 1rem;
  }

  .login__label {
    line-height: 2rem;
    font-size: .9rem;
    color: #666666;
  }

  .login__btn {
    height: 30px;
    padding: 1px 1rem;
  }

</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="login">
  <h1>{title}</h1>

  <div class="login__field">
    <div class="login__field-inner">
      <label class="login__label">Логин</label>
      <input class="login__input global__input" type="text" bind:value={login}>
    </div>
  </div>

  <div class="login__field">
    <div class="login__field-inner">
      <label class="login__label">Пароль</label>
      <input class="login__input global__input" type="password" bind:value={password}>
    </div>
  </div>

  <div class="login__field">
    <div class="login__field-inner login__control">
      <button class="login__btn global__btn global__btn_blue" on:click={buttonHandler}>
        Далее
      </button>
    </div>
  </div>
</div>

<a href="/admin">Управление каталогом</a>
