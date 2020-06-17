<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	p {
		margin: 1rem;
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="global__container">
	<h1>{status}</h1>

	<p>{error.message}</p>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>
