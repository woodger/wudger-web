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
      show = true;
      return;
    }

    window.addEventListener('scroll', scroll);
  });

  function scroll() {
    if (boundingClientRect()) {
      window.removeEventListener('scroll', scroll);
      show = true;
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
  div {
    display: inline-block;
  }
</style>

<div {style} bind:this={elem}>
  {#if show}
    <slot />
  {/if}
</div>
