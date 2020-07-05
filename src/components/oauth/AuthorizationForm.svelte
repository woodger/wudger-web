<script>
  import request from '@request';
  import store from '@store';

  export let props;

  const form = {};
  let visible = false;

  store['oauth.form.visible'].subscribe((value) => {
    visible = value;
  });

  async function onClickNext() {
    const res = await request('/api/v1/oauth', {
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
    store['oauth.form.visible'].set(false);
  }

  function onInput({target}) {
    form[target.name] = target.value;
  }
</script>

<style>
  .container {
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 150px);
    margin: 1rem;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .title {
    margin: 2rem 1rem;
    font-size: 1.5rem;
  }

  .inner {
    padding: 1rem;
  }

  .input {
    width: 100%;
    height: 2rem;
  }

  .row {
    min-width: 250px
  }

  .row-inner {
    padding: .5rem 1rem;
  }

  .control {
    display: flex;
    margin-top: 1rem;
  }

  .label {
    line-height: 2rem;
    font-size: .9rem;
    color: #666666;
  }

  .btn {
    height: 30px;
    padding: 0 1rem;
    margin: 1rem;
  }
</style>

{#if visible}
  <div class="container">
    <div class="inner">
      <div class="title">Вход</div>

      <div class="row">
        <div class="row-inner">
          <div class="label">Логин</div>
          <input class="input global__input" type="text" name="login" on:input={onInput}>
        </div>
      </div>

      <div class="row">
        <div class="row-inner">
          <div class="label">Пароль</div>
          <input class="input global__input" type="password" name="password" on:input={onInput}>
        </div>
      </div>

      <div class="row">
        <div class="control">
          <button class="btn global__btn global__btn_blue" on:click={onClickNext}>
            Далее
          </button>

          <button class="btn global__btn" on:click={onClickClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
