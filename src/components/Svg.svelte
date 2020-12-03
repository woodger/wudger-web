<script>
  import { onMount } from 'svelte';
  import Lazy from './Lazy.svelte';

  export let lazy = true;
  export let alt = '';
  export let width;
  export let height;
  export let src;
  export let onLoad;

  async function upLoad() {
    const res = await fetch(src);

    if (!res.ok) {
      return '';
    }

    const div = document.createElement('div');
    div.innerHTML = await res.text();

    const svg = div.querySelector('svg');

    svg.style.setProperty('width', width);
    svg.style.setProperty('height', height);

    if (onLoad) {
      onLoad(svg);
    }

    return div.innerHTML;
  }
</script>

<Lazy {width} {height} show={!lazy}>
  {#await upLoad()}
    {alt}
  {:then html}
    {@html html}
  {/await}
</Lazy>
