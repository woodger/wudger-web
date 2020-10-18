<script>
  import { fade } from 'svelte/transition';
  import store from '@store';

  let message;

  store['notification.message'].subscribe((value) => {
    if (value) {
      message = value.message;
      setTimeout(onClickClose, 3e4);
    }
  });

  store['notification.error'].subscribe((value) => {
    if (value) {
      message = value.message;
      setTimeout(onClickClose, 3e4);
    }
  });

  function onClickClose() {
    message = undefined;
  }
</script>

<style>
  .container {
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .message {
    width: 300px;
    min-height: 30px;
    margin: 1.5rem 1rem;
    padding: 0 1rem;
    background: linear-gradient(to bottom, #f4f4f4 97%, #aaaaaa 100%);
  }
</style>

{#if message}
  <div class="container">
    <div class="message" transition:fade on:click={onClickClose}>
      {message}
    </div>
  </div>
{/if}
