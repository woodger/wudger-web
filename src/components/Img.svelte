<script>
  import Lazy from './Lazy.svelte';

  export let width;
  export let height;
  export let src;
  export let alt;
</script>

<Lazy {width} {height}>
  <img {src} {width} {height} {alt} />
</Lazy>
