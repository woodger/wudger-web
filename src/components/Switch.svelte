<script>
  import Button from './Button.svelte';

  export let show = false;
  export let popup;
  export let onClose;

  function onSwitch() {
    show = !show;
  }

  async function onProxy() {
    onSwitch();

    if (onClose) {
      onClose();
    }
  }
</script>

<style>
  .container {
    position: relative;
  }

  .popup {
    position: absolute;
    top: 35px;
    right: 0;
    border: 1px solid #aaaaaa;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
    z-index: 1;
  }
</style>

<div class="container">
  <Button onClick={onSwitch}>
    <slot />
  </Button>

  {#if show}
    <div class="popup">
      <svelte:component this={popup} onClose={onProxy} />
    </div>
  {/if}
</div>
