<script>
  import Navigation from '../../components/navigation/Navigation.svelte';
  import ListOfArticles from '../../components/articles/ListOfArticles.svelte';
  import Footer from '../../components/Footer.svelte';

  export let values;
  export let schema;

  let title = 'Каталог';
</script>

<script context="module">
  export async function preload({query}) {
    const urls = [
      `/api/v1/schemes/article.json`,
      `/api/v1/articles`
    ]
    .map((item) => {
      const url = new URL(item, process.env.API_URL);

      for (const i of Object.entries(query)) {
        url.searchParams.set(...i);
      }

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
  <title>{title}</title>
</svelte:head>

<Navigation />
<ListOfArticles {title} {values} {schema} />
<Footer />
