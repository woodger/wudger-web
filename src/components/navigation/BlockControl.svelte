<script>
  import Search from './Search.svelte';
  import Button from '../Button.svelte';
</script>

<style>
  .control {
    display: flex;
    align-items: flex-start;
  }
</style>

<div class="control">
  <Button href="/articles" color="blue">Каталог</Button>
  <Search />
</div>
