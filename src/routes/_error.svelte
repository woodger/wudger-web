<script>
  import Navigation from '../components/navigation/Navigation.svelte';

  export let status;
  export let error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<style>
  .message {
    margin: 1rem;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<Navigation />

<div class="global__container">
  <h1>{status}</h1>
  <p class="message">{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>
