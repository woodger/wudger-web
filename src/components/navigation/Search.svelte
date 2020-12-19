<script>
  import { onMount } from 'svelte';
  import { store, request } from '@toolkit';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  import Svg from '../Svg.svelte';

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
    location.href = `${location.origin}/articles?search=${phrase || ''}`;
  }
</script>

<style>
  .search {
    display: flex;
    align-items: center;
  }

  .button {
    display: none;
  }

  @media screen and (min-width: 600px) {
    .input {
      width: 375px;
    }

    .button {
      display: block;
    }
  }
</style>

<div class="search">
  <div class="input">
    <Input
      value={phrase}
      placeholder="Поиск ..."
      onInput={onInputText}
      onKeyPress={onKeyPress}
    />
  </div>
  <div class="button">
    <Button onClick={onClickSearch}>Найти</Button>
  </div>
</div>
