<script>
  import { onMount } from 'svelte';
  import { store, request } from '@toolkit';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';

  let phrase;

  onMount(() => {
    phrase = localStorage.getItem('search');
  });

  function onInputText({target}) {
    phrase = target.value;
    localStorage.setItem('search', phrase);
  }

  function onKeyPress({keyCode}) {
    if (keyCode === 13) {
      onClickSearch();
    }
  }

  async function onClickSearch() {
    const {values} = await request(`/api/v1/articles?search=${phrase}`);
    store.articles.set(values);

    if (document.location.pathname === '/') {
      document.location.pathname = `/articles`;
    }
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
        value={phrase}
        placeholder="Поиск ..."
        onInput={onInputText}
        onKeyPress={onKeyPress}
      />
    </div>
    <Button onClick={onClickSearch}>Найти</Button>
  </div>
</div>
