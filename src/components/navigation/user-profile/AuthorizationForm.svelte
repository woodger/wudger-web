<script>
  import request from '@request';
  import store from '@store';
  import Button from '../../Button.svelte';

  export let onClose;

  const fields = {};

  async function onClickNext() {
    const res = await request('/api/v1/oauth', {
      method: 'POST',
      data: fields
    });

    if (!res.ok) {
      store['notification.error'].set({
        message: 'Ошибка: Неверный логин или пароль'
      });

      return;
    }

    store['oauth.token'].set(
      await res.json()
    );

    onClose();
  }

  function onInput({target}) {
    fields[target.name] = target.value;
  }
</script>

<style>
  .fields {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  .field {
    padding: .5rem 1rem;
  }

  .input {
    width: 100%;
    height: 2rem;
  }

  .label {
    line-height: 2rem;
    font-size: .9rem;
    color: #666666;
  }

  .control {
    display: flex;
  }
</style>

<div>
  <div class="fields">
    <div class="field">
      <div class="label">Логин</div>
      <input class="input global__input" type="text" name="login" on:input={onInput}>
    </div>

    <div class="field">
      <div class="label">Пароль</div>
      <input class="input global__input" type="password" name="password" on:input={onInput}>
    </div>
  </div>

  <div class="control">
    <Button color="blue" onClick={onClickNext}>Далее</Button>
  </div>
</div>
