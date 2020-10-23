<script>
  export let spin = true;
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spiner {
    width: 16px;
    height: 16px;
    margin: 1rem;
    border: 2px solid #f4f4f4;
    border-top: 2px solid #2d77af;
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
  <div class="container">
    <div class="spiner"></div>
  </div>
{:else}
  <slot />
{/if}
