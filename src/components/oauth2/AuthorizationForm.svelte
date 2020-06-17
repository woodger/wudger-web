<script>
  import request from '@request';
  import store from '@store';

  export let props;

  const form = {};
  let visible = false;

  store['oauth2.authorization.required'].subscribe((value) => {
    visible = value;
  });

  async function onClickNext() {
    const res = await request('/api/v1/users/authorization', {
      method: 'POST',
      data: form
    });

    if (res.status === 200) {
      const pairs = await res.json();
      request.saveCredentials(pairs);

      await props.getUserInfo();
      onClickClose();
    }
    else {
      store['notification.message'].set({
        message: 'Ошибка: Неверный логин или пароль'
      });
    }
  }

  function onClickClose() {
    store['oauth2.authorization.required'].set(false);
  }

  function onInput({target}) {
    form[target.name] = target.value;
  }
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
          <input class="login__input global__input" type="text" name="login" on:input={onInput}>
        </div>
      </div>

      <div class="login__row">
        <div class="login__row-inner">
          <div class="login__label">Пароль</div>
          <input class="login__input global__input" type="password" name="password" on:input={onInput}>
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
