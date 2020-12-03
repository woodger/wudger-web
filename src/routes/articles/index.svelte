<script>
  import * as sapper from '@sapper/app';
  import Navigation from '../../components/navigation/Navigation.svelte';
  import Footer from '../../components/footer/Footer.svelte';
  import ListOfArticles from '../../components/articles/ListOfArticles.svelte';

  export let props = [];

  let title = 'Каталог';
</script>

<script context="module">
  export async function preload({query}) {
    const url = new URL('/api/v1/articles', process.env.API_URL);

    for (const i of Object.entries(query)) {
      url.searchParams.set(...i);
    }

    const res = await this.fetch(url);

    if (res.ok) {
      const {values} = await res.json();

      return {
        props: values
      };
    }

    this.error(res.status, url.toString());
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Navigation />
<ListOfArticles {title} {props} />
<Footer />
