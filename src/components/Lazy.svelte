<script>
  import { onMount } from 'svelte';

  export let show = false;
  export let width;
  export let height;

  let elem;
  let style;

  onMount(() => {
    if (show) {
      return;
    }

    if (boundingClientRect()) {
      show = true;
      return;
    }

    window.addEventListener(event, listener);
  });

  const number = 'number';
  const event = 'scroll';
  const unit = 'px';

  $: if (width && typeof width === number) {
    width += unit;
  }

  $: if (height && typeof height === number) {
    height += unit;
  }

  $: style = (width || height) ?
    `width:${width};height:${height}` : undefined;

  function listener() {
    if (boundingClientRect()) {
      window.removeEventListener(event, listener);
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
