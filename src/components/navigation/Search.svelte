<script>
  import { onMount } from 'svelte';
  import { store, request } from '@toolkit';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';

  let phrase;

  onMount(() => {
    phrase = localStorage.getItem('search');
  });

  function onInput({target}) {
    phrase = target.value;
    localStorage.setItem('search', phrase);
  }

  async function onClick() {
    const {values} = await request(`/api/v1/articles?search=${phrase}`);
    store.articles.set(values);
  }
</script>

<style>
  .inner {
    display: flex;
    align-items: center;
  }
  .input {
    width: 400px;
  }
</style>

<div>
  <div class="inner">
    <div class="input">
      <Input
        {onInput}
        value={phrase}
        placeholder="Поиск ..."
      />
    </div>
    <Button {onClick}>Найти</Button>
  </div>
</div>
