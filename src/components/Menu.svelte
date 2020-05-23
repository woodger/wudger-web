<script>
  import Search from './Search.svelte';

  export let visible = false;

  function toggle() {
    visible = !visible;
  }
</script>

{#if visible}
  <div class="global__container">
    <div>
      <Search />
    </div>
  </div>
{/if}
