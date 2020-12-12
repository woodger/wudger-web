<script>
  export let spin = true;
</script>

<style>
  .loader {
    text-align: center;
  }

  .spiner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid inherit;
    border-top: 2px solid #000000;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
</style>

{#if spin}
  <div class="loader">
    <div class="spiner"></div>
  </div>
{:else}
  <slot />
{/if}
