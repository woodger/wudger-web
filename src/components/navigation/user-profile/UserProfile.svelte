<script>
  import Svg from '../../Svg.svelte';
  import Button from '../../Button.svelte';
  import UserMenu from './UserMenu.svelte';

  let show = false;

  function onSwithMenu() {
    show = !show;
  }
</script>

<style>
  .container {
    position: relative;
  }
</style>

<div class="container">
  <Button onClick={onSwithMenu}>
    <Svg src="icons/user.svg" width="16px" height="16px" />
  </Button>

  {#if show}
    <UserMenu onClose={onSwithMenu} />
  {/if}
</div>
