<script>
  import { boundingRect } from '@toolkit';
  import Lazy from './Lazy.svelte';

  export let alt = '';
  export let width;
  export let height;
  export let src;
  export let onLoad;

  async function onLoadHtml(elem) {
    if (!onLoad) {
      return;
    }

    const res = await fetch(src);

    if (res.ok) {
      elem.innerHTML = await res.text();

      const [svg] = elem.children;
      const style = boundingRect(width, height);

      svg.setAttribute('style', style);
      onLoad(svg);
    }
  }
</script>

<Lazy {width} {height} onLoad={onLoadHtml}>
  {#if !onLoad}
    <img {src} {width} {height} {alt} />
  {/if}
</Lazy>
