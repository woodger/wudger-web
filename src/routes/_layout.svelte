<script>
  import Notification from '../components/Notification.svelte';
  import Modal from '../components/Modal.svelte';
</script>

<style>
  :global(html) {
    font-size: 14px;
  }

  :global(body) {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  :global(a) {
    cursor: pointer;
  }

  :global(h1) {
    margin: 0;
    padding: 2.5rem 1rem;
    font-weight: normal;
    font-size: 1.5rem;
  }

  :global(h2) {
    margin: 0;
    padding: 1.5rem 1rem;
    font-weight: normal;
    font-size: 1.3rem;
  }

  :global(.global__container) {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>

<main>
  <slot></slot>
</main>

<Notification />
<Modal />
