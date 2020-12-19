<script>
  import { onMount } from 'svelte';

  export let show = false;
  export let width;
  export let height;
  export let onLoad;

  let elem;
  let style;

  $: style = `width:${width}px;height:${height}px`;

  $: if (show && onLoad) {
    onLoad(elem);
  }

  onMount(() => {
    if (show) {
      return;
    }

    if (boundingClientRect()) {
      return show = true;
    }

    window.addEventListener('scroll', onScroll, true);
  });

  function onScroll() {
    if (boundingClientRect()) {
      show = true;
      window.removeEventListener('scroll', onScroll, true);
    }
  }

  function boundingClientRect() {
    if (!elem) {
      return false;
    }

    const {innerHeight: gate} = window;
    const {top, bottom} = elem.getBoundingClientRect();

    return (top >= 0 || bottom >= 0) && (gate - top >= 0 || gate - bottom >= 0);
  }
</script>

<style>
  .lazy {
    display: inline-block;
  }
</style>

<div class="lazy" {style} bind:this={elem}>
  {#if show}
    <slot />
  {/if}
</div>
