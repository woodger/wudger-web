<script>
  import Button from './Button.svelte';
  import Svg from './Svg.svelte';

  export let onInput;
</script>

<style>
  .file {
    display: none;
  }
</style>

<div>
  <label>
    <input type="file" class="file" on:input={onInput} multiple />
    <Button>
      <Svg src="icons/upload.svg" width="16px" height="16px" />
    </Button>
  </label>
</div>
