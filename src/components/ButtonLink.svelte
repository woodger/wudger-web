<script>
  export let href = null;
  export let color = null;
  export let click = null;

  let mode;

  $: mode = color ?
    ' ' + color : '';
</script>

<style>
  .btn {
    height: 30px;
    margin: 1rem;
    padding: 0 1rem;
    text-decoration: none;
  }

  .blue {
    border: 1px solid #2d77af;
    background: linear-gradient(to bottom, #5192c3 7%, #4087bb 97%, #2d77af 100%);
    color: #ffffff;
  }
</style>

{#if href}
  <a class="global__btn btn{mode}" {href} on:click={click}>
    <slot></slot>
  </a>
{:else}
  <div class="global__btn btn{mode}" on:click={click}>
    <slot></slot>
  </div>
{/if}
