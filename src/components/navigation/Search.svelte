<script>
  import { onMount } from 'svelte';
  import { store, request } from '@toolkit';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';

  let phrase;

  onMount(() => {
    const url = new URL(location.href);
    phrase = url.searchParams.get('search');
  });

  function onInputText({target}) {
    phrase = target.value;
  }

  function onKeyPress({keyCode}) {
    if (keyCode === 13) {
      onClickSearch();
    }
  }

  async function onClickSearch() {
    location.href = `${location.origin}/articles?search=${phrase}`;

    // const {values} = await request(`/api/v1/articles?search=${phrase}`);
    // store.articles.set(values);
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
