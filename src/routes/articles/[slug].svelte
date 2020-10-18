<script>
  import Navigation from '../../components/navigation/Navigation.svelte';
  import MainArticle from '../../components/articles/MainArticle.svelte';

  export let props = {};
</script>

<script context="module">
  export async function preload({params}) {
    const url = new URL(`/api/v1/articles/${params.slug}`, process.env.API_URL);
    const res = await this.fetch(url);

    if (res.ok) {
      return {
        props: await res.json()
      };
    }

    this.error(res.status);
  }
</script>

<svelte:head>
  <title>{props.title}</title>
</svelte:head>

<Navigation />
<MainArticle {props} />
