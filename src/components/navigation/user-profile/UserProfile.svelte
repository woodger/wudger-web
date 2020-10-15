<script>
  import Svg from '../../Svg.svelte';
  import Button from '../../Button.svelte';
  import UserMenu from './UserMenu.svelte';

  const props = {
    show: false
  };

  function onSwithMenu() {
    props.show = !props.show;
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

  <UserMenu {props} />
</div>
