<script>
  import Button from './Button.svelte';
  import Svg from './Svg.svelte';

  export let onInput;
</script>

<style>
  .input-file {
    display: none;
  }
</style>

<div>
  <label>
    <input type="file" class="input-file" on:input={onInput} multiple />
    <Button>
      <Svg src="icons/attachment.svg" width="16" height="16" alt="attachment" />
    </Button>
  </label>
</div>
