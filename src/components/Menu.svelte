<script>
  import Search from './Search.svelte';
  import * as store from '@store';

  export let visible = false;

  function toggle() {
    visible = !visible;
  }

  store.visibleMenu.subscribe((value) => {
    visible = value;
  });
</script>

{#if visible}
  <div class="global__container">
    <div>
      <Search />
    </div>
  </div>
{/if}
