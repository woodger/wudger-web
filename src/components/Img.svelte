<script>
  import { onMount } from 'svelte';
  import Lazy from './Lazy.svelte';

  export let lazy = true;
  export let alt = '';
  export let width;
  export let height;
  export let src;
</script>

<Lazy {width} {height} show={!lazy}>
  <img {src} {alt} {width} {height} />
</Lazy>
