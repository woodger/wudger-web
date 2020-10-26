<script>
  import { onMount } from 'svelte';
  import { store, request, contract } from '@toolkit';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  import Loader from '../Loader.svelte';

  export let onClose;

  let show = false;
  let body = {};
  let shema;

  onMount(async () => {
    shema = await request(`/api/v1/static/schemes/user.json`);
    show = true;
  });

  async function onClickNext() {
    const data = contract(shema, body);

    const res = await request('/api/v1/oauth', {
      method: 'POST',
      body: data
    });

    request.setItems(res);
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

<Loader spin={!show}>
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
</Loader>
