<script>
  import { onMount } from 'svelte';

  export let show = false;
  export let width;
  export let height;

  let elem;
  let style;

  $: if (unit(width)) {
    width += 'px';
  }

  $: if (unit(height)) {
    height += 'px';
  }

  $: style = (width || height) ?
    `width:${width};height:${height}` : undefined;

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

  function unit(size) {
    return size && /\d$/.test(size);
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
