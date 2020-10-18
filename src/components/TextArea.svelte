<script>
  export let name;
  export let value = null;
  export let onInput;
</script>

<style>
  .container {
    margin: .5rem 1rem;
  }

  .textarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 5rem;
    padding: .5rem;
    text-indent: 0;
    box-shadow: inset 0 1px 1px #dddddd;
    border: 1px solid #aaaaaa;
    border-radius: 3px;
    background: #ffffff;
    resize: vertical;
    outline: none;
  }

  .textarea:focus {
    border-color: #5192c3;
    box-shadow: 0 0 2px #4f7dac;
  }
</style>

<div class="container">
  <textarea class="textarea" {name} on:input={onInput}>{value}</textarea>
</div>
