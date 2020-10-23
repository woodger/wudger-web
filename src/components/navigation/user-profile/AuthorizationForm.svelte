<script>
  import store from '@store';
  import request from '@request';
  import Button from '../../Button.svelte';
  import Input from '../../Input.svelte';

  export let onClose;

  const body = {};

  async function onClickNext() {
    const res = await request('/api/v1/oauth', {
      method: 'POST',
      body
    });

    if (!res.ok) {
      store['notification.error'].set({
        message: 'Ошибка: Неверный логин или пароль'
      });

      return;
    }

    request.setItems(
      await res.json()
    );

    onClose();
  }

  function onInput({target}) {
    body[target.name] = target.value;
  }
</script>

<style>
  .fields {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  .control {
    display: flex;
  }
</style>

<div>
  <div class="fields">
    <div class="field">
      <Input name="login" label="Логин" {onInput} />
    </div>

    <div class="field">
      <Input type="password" name="password" label="Пароль" {onInput} />
    </div>
  </div>

  <div class="control">
    <Button color="blue" onClick={onClickNext}>Далее</Button>
  </div>
</div>
