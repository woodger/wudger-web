<script context="module">
  export async function preload({params}) {
    const path = params.slug.join('/');
    const url = new URL(`/api/v1/cg/${path}`, process.env.API_URL);

    const res = await this.fetch(url);

    if (res.ok) {
      const {id} = await res.json();

      return this.redirect(301, `/articles/${id}`);
    }

    this.error(res.status);
  }
</script>
