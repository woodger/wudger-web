<script>
  import Login from './Login.svelte';
  import Search from './Search.svelte';

  export let visible = false;

  const toggle = () =>
    visible = !visible;
</script>

<style>
  .menu {
    display: flex;
    width: 1200px;
    margin: 0 auto;
  }

  .menu__inner {
    padding: 1rem .5rem;
  }
</style>

{#if visible}
  <div class="menu">
    <div class="menu__inner">
      <Login />
    </div>
  </div>
{/if}
