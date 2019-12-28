<script context="module">
  export async function preload({params}) {
    const url = new URL(`/api/v1/articles/${params.id}`, process.env.API_URL);
    const res = await this.fetch(url);
    const data = await res.json();

    if (res.status === 200) {
			return {
        post: data
      };
		}
    else {
			this.error(res.status, data.message);
		}
  }
</script>

<script>
  export let post;
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/

  /*
  .content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}
  */

  .container {
    margin: 0 auto;
    max-width: 1200px;
  }
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<div class="container">
  <h1>{post.title}</h1>
</div>
