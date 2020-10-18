<script>
  import store from '@store';
  import request from '@request';
  import Button from '../../Button.svelte';
  import InputText from '../../InputText.svelte';

  export let onClose;

  const fields = {};

  async function onClickNext() {
    const res = await request('/api/v1/oauth', {
      method: 'POST',
      body: fields
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
    /* padding: .5rem 1rem; */
  }

  /* .label {
    margin: 0 1rem;
    line-height: 2rem;
    font-size: .9rem;
    color: #666666;
  } */

  .control {
    display: flex;
  }
</style>

<div>
  <div class="fields">
    <div class="field">
      <!-- <div class="label">Логин</div> -->
      <InputText name="login" label="Логин" {onInput} />
    </div>

    <div class="field">
      <!-- <div class="label">Пароль</div> -->
      <InputText type="password" name="password" label="Пароль" {onInput} />
    </div>
  </div>

  <div class="control">
    <Button color="blue" onClick={onClickNext}>Далее</Button>
  </div>
</div>
