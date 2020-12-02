<script>
  import Navigation from '../../components/navigation/Navigation.svelte';
  import MainArticle from '../../components/articles/MainArticle.svelte';

  export let values;
  export let schema;
</script>

<script context="module">
  export async function preload({params}) {
    const urls = [
      `/v1/files/schemes/article.json`,
      `/v1/articles/${params.slug}`
    ]
    .map((path) => {
      const url = new URL(process.env.API_URL + path);
      return this.fetch(url);
    });

    const status = await Promise.all(urls);

    const body = status.map((res) => {
      if (res.ok) {
        return res.json();
      }

      this.error(res.status);
    });

    const [schema, values] = await Promise.all(body);

    return {
      schema,
      values
    };
  }
</script>

<svelte:head>
  <title>{values.title}</title>
</svelte:head>

<Navigation />
<MainArticle {values} {schema} />
