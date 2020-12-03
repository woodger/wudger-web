<script>
  import { onMount } from 'svelte';
  import { boundingRect } from '@toolkit';
  import Lazy from './Lazy.svelte';

  export let alt = '';
  export let width;
  export let height;
  export let src;
  export let onLoad;

  async function upLoad(elem) {
    const res = await fetch(src);

    if (res.ok) {
      elem.innerHTML = await res.text();

      const [svg] = elem.children;
      const style = boundingRect(width, height);

      svg.setAttribute('style', style);
    }
  }
</script>

<Lazy {width} {height} onLoad={upLoad}>
  {#if !onLoad}
    <img {src} {width} {height} {alt} />
  {/if}
</Lazy>
