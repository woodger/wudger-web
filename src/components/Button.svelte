<script>
  export let href;
  export let color;
  export let download;
  export let onClick;
</script>

<style>
  .button {
    display: flex;
    align-items: center;
    min-height: 30px;
    margin: .5rem 1rem;
    padding: 0 1rem;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
  }

  .button:hover {
    opacity: .9;
  }

  .button:active {
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
  <a class="button link {color}" {href} {download}>
    <slot />
  </a>
{:else}
  <div class="button {color}" on:click={onClick}>
    <slot />
  </div>
{/if}
