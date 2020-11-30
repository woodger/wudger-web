<script>
  import Label from './Label.svelte';

  export let type;
  export let label;
  export let placeholder;
  export let value = null;
  export let disabled = false;
  export let onInput;
  export let onKeyPress;
</script>

<style>
  .container {
    margin: .5rem 1rem;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    padding: 0 .5rem 0 0;
    text-indent: .5rem;
    box-shadow: inset 0 1px 1px #dddddd;
    border: 1px solid #aaaaaa;
    border-radius: 3px;
    background: #ffffff;
    outline: none;
  }

  .input:disabled {
    background: #fafafa;
  }

  .input:focus {
    border-color: #5192c3;
    box-shadow: 0 0 2px #4f7dac;
  }
</style>

<div class="container">
  {#if label}
    <Label>{label}</Label>
  {/if}
  
  <input
    {type}
    {value}
    {disabled}
    {placeholder}
    class="input"
    on:input={onInput}
    on:keypress={onKeyPress}
  />
</div>
