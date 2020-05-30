<script>
  import { onMount } from 'svelte';
  import { post } from '@fetch';
  import store from '@store';

  let visible = false;
  let login;
  let password;

  async function onClickNext() {
    const credentials = await post('/api/v1/users/login', {
      data: { login, password }
    });

    if (credentials) {
      store['oauth2.user.credentials'].set(credentials);
      store['oauth2.login.visible'].set(false);
    }
  }

  function onClickClose() {
    store['oauth2.login.visible'].set(false);
  }

  onMount(() => {
    store['oauth2.login.visible'].subscribe((value) => {
      visible = value;
    });
  });
</script>

<style>
  .login {
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 150px);
    margin: 1rem;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .login__title {
    margin: 2rem 1rem;
    font-size: 1.5rem;
  }

  .login__inner {
    padding: 1rem;
  }

  .login__input {
    width: 100%;
    height: 2rem;
  }

  .login__row {
    min-width: 250px
  }

  .login__row-inner {
    padding: .5rem 1rem;
  }

  .login__control {
    display: flex;
    margin-top: 1rem;
  }

  .login__label {
    line-height: 2rem;
    font-size: .9rem;
    color: #666666;
  }

  .login__btn {
    height: 30px;
    padding: 0 1rem;
    margin: 1rem;
  }
</style>

{#if visible}
  <div class="login">
    <div class="login__inner">
      <div class="login__title">Вход</div>

      <div class="login__row">
        <div class="login__row-inner">
          <div class="login__label">Логин</div>
          <input class="login__input global__input" bind:value={login}>
        </div>
      </div>

      <div class="login__row">
        <div class="login__row-inner">
          <div class="login__label">Пароль</div>
          <input class="login__input global__input" type="password" bind:value={password}>
        </div>
      </div>

      <div class="login__row">
        <div class="login__control">
          <button class="login__btn global__btn global__btn_blue" on:click={onClickNext}>
            Далее
          </button>

          <button class="login__btn global__btn" on:click={onClickClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
