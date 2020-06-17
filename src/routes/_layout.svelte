<script>
	import Nav from '../components/Nav.svelte';
	import Notification from '../components/Notification.svelte';
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
		margin: 1rem 0;
    padding: 2rem 1rem;
    font-weight: normal;
    font-size: 1.5rem;
  }

  :global(
    .global__btn,
    .global__input
  ) {
		display: flex;
		align-items: center;
    border: 1px solid #aaaaaa;
    border-radius: 3px;
    box-sizing: border-box;
    background: #ffffff;
    outline: none;
  }

  :global(.global__btn) {
    background: linear-gradient(to bottom, #ffffff 97%, #aaaaaa 100%);
    color: #222222;
    cursor: pointer;
  }

  :global(.global__btn:hover) {
    opacity: .9;
  }

  :global(.global__btn_blue) {
    border: 1px solid #2d77af;
    background: linear-gradient(to bottom, #5192c3 7%, #4087bb 97%, #2d77af 100%);
    color: #ffffff;
  }

  :global(.global__input) {
    padding: 0;
    box-shadow: inset 0 1px 1px #dddddd;
		text-indent: .5rem;
  }

  :global(
    .global__btn:focus,
    .global__input:focus
  ) {
    border-color: #5192c3;
    box-shadow: 0 0 2px #4f7dac;
  }

	:global(.global__container) {
    max-width: 1200px;
		margin: 0 auto;
  }

	/* main {
		padding-top: 50px;
	} */
</style>

<Nav />

<main>
	<slot></slot>
</main>

<Notification />
