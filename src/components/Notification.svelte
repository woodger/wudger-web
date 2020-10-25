<script>
  import { fade } from 'svelte/transition';
  import store from '@store';

  let message = undefined;
  let type;

  store.notification.subscribe((value) => {
    if (value) {
      type = value.type;
      message = value.message;
    }
  });

  function onClose() {
    message = undefined;
  }
</script>

<style>
  .container {
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .notification {
    margin: 1rem;
    padding: .5rem 1rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .undefined {
    background: linear-gradient(to bottom, #f4f4f4 97%, #aaaaaa 100%);
  }

  .error {
    background: linear-gradient(to bottom, #ffa097 97%, #af2d2d 100%);
  }
</style>

{#if message}
  <div class="container">
    <div class="notification {type}" transition:fade on:click={onClose}>
      {message}
    </div>
  </div>
{/if}
