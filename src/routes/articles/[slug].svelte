<script>
  import Navigation from '../../components/navigation/Navigation.svelte';
  import Article from '../../components/Article.svelte';

  export let doc = {};
</script>

<script context="module">
  export async function preload({params}) {
    const url = new URL(`/api/v1/articles/${params.slug}`, process.env.API_URL);
    const res = await this.fetch(url);

    if (res.ok) {
      return {
        doc: await res.json()
      };
		}

    this.error(res.status);
  }
</script>

<svelte:head>
	<title>{doc.title}</title>
</svelte:head>

<Navigation />
<Article {...doc} />
