<script>
  import { onMount } from 'svelte';
  import { request, contract } from '@toolkit';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  import Loader from '../Loader.svelte';

  export let onClose;

  let show = false;
  let values = {};
  let schema;

  onMount(async () => {
    schema = await request(`/v1/files/schemes/user.json`);
    show = true;
  });

  async function onClickNext() {
    const body = contract(schema, values);

    const res = await request('/v1/oauth', {
      method: 'POST',
      body
    });

    request.setItems(res);
    onClose();
  }

  function onInputText(name) {
    return ({target}) => {
      values[name] = target.value;
    }
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
    padding: .5rem 0;
  }
</style>

<Loader spin={!show}>
  <div>
    <div class="fields">
      <div class="field">
        <Input
          label="Логин"
          onInput={onInputText('login')}
        />
      </div>

      <div class="field">
        <Input
          label="Пароль"
          type="password"
          onInput={onInputText('password')}
        />
      </div>
    </div>

    <div class="control">
      <Button color="blue" onClick={onClickNext}>Далее</Button>
    </div>
  </div>
</Loader>
