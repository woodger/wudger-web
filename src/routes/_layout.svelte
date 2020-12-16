<script>
  import Notification from '../components/Notification.svelte';
  import Modal from '../components/Modal.svelte';
</script>

<main>
  <slot></slot>
</main>

<Notification />
<Modal />
