<script>
  import { onMount } from 'svelte';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  // import Svg from '../Svg.svelte';

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
    width: 100%;
  }

  .input {
    width: 100%;
  }

  @media screen and (min-width: 600px) {
    .search {
      width: auto;
    }

    .input {
      width: 375px;
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
    <Button onClick={onClickSearch}>
      Найти
      <!-- <Svg src="icons/search.svg" width="16" height="16" alt="search" /> -->
    </Button>
  </div>
</div>
