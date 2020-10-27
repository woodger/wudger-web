<script>
  import Svg from '../Svg.svelte';
  import Button from '../Button.svelte';
</script>

<style>
  .inner {
    display: flex;
    align-items: center;
  }
</style>

<div class="container">
  <div class="inner">
    <Button>
      <Svg src="icons/shift.svg" width="16px" height="16px" />
    </Button>
    <Button>
      <Svg src="icons/blocked.svg" width="16px" height="16px" />
    </Button>
  </div>
</div>
