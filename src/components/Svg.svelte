<script>
  import Lazy from './Lazy.svelte';

  export let width;
  export let height;
  export let src;
  export let alt;
  export let onLoad;

  async function onLoadHtml(elem) {
    if (!onLoad) {
      return;
    }

    const res = await fetch(src);

    if (res.ok) {
      elem.innerHTML = await res.text();

      const [svg] = elem.children;

      svg.setAttribute('width', width);
      svg.setAttribute('height', height);

      onLoad(svg);
    }
  }
</script>

<Lazy {width} {height} onLoad={onLoadHtml}>
  {#if !onLoad}
    <img {src} {width} {height} {alt} />
  {/if}
</Lazy>
