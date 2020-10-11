<script>
  import { onMount } from 'svelte';

  export let src;
  export let width;
  export let height;
  export let onLoad = undefined;

  let html;

  onMount(async () => {
    const res = await fetch(src);

    if (res.ok) {
      const frame = document.createElement('div');
      frame.innerHTML = await res.text();

      const svg = frame.querySelector('svg');

      svg.style.setProperty('width', width);
      svg.style.setProperty('height', height);

      if (onLoad) {
        onLoad(svg);
      }

      html = frame.innerHTML;
    }
  });
</script>

<style>
  div {
    display: inline-block;
  }
</style>

{#if html}
  {@html html}
{:else}
  <div style="width:{width};height:{height}"></div>
{/if}
