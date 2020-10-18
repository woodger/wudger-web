<script>
  export let name;
  export let type = 'text';
  export let value = null;
  export let label = null;
  export let placeholder = null;
  export let disabled = false;
  export let onInput;
</script>

<style>
  .container {
    margin: .5rem 1rem;
  }

  .label {
    line-height: 2rem;
    font-size: .9rem;
    color: #666666;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    padding: 0;
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
    <div class="label">{label}</div>
  {/if}
  <input class="input" {type} {name} {value} {disabled} {placeholder} on:input={onInput} />
</div>
