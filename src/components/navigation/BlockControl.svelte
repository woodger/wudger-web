<script>
  import store from '@store';
  import Search from './Search.svelte';
  import Button from '../Button.svelte';

  let admin;
  let href;

  store['oauth.user.admin'].subscribe((value) => {
    admin = value;
  });

  $: href = admin ?
    '/admin/articles' : '/articles'
</script>

<style>
  .container {
    display: flex;
  }
</style>

<div class="container">
  <Button {href} color="blue">Каталог</Button>
  <Search />
</div>
