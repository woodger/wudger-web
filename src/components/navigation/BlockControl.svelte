<script>
  import Search from './Search.svelte';
  import Button from '../Button.svelte';
</script>

<style>
  .container {
    display: flex;
    align-items: flex-start;
  }
</style>

<div class="container">
  <Button href="/articles" color="blue">Каталог</Button>
  <Search />
</div>
