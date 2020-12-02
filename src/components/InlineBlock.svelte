<script>
  export let width;
  export let height;

  let style;

  const number = 'number';
  const px = 'px';

  $: if (width && typeof width === number) {
    width += px;
  }

  $: if (height && typeof height === number) {
    height += px;
  }

  $: style = (width || height) ?
    `width:${width};height:${height}` : undefined;
</script>

<style>
  div {
    display: inline-block;
  }
</style>

<div {style}>
  <slot />
</div>
