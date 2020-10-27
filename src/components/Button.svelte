<script>
  export let href = undefined;
  export let color = undefined;
  export let onClick;
</script>

<style>
  .btn {
    display: flex;
    align-items: center;
    height: 30px;
    margin: .5rem 1rem;
    padding: 0 1rem;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
  }

  .btn:hover {
    opacity: .9;
  }

  .btn:active {
    border-color: #5192c3;
    box-shadow: 0 0 2px #4f7dac;
  }

  .link {
    text-decoration: none;
  }

  .undefined {
    border: 1px solid #aaaaaa;
    background: linear-gradient(to bottom, #ffffff 97%, #aaaaaa 100%);
    color: #222222;
  }

  .blue {
    border: 1px solid #2d77af;
    background: linear-gradient(to bottom, #5192c3 7%, #4087bb 97%, #2d77af 100%);
    color: #ffffff;
  }
</style>

{#if href}
  <a class="btn link {color}" {href}>
    <slot />
  </a>
{:else}
  <div class="btn {color}" on:click={onClick}>
    <slot />
  </div>
{/if}
