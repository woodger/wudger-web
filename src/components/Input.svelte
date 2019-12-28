<script>
  export let value = '';
  export let name;
  export let type = 'text';
</script>

<style>
  input {
    width: 100%;
    height: 2rem;
    padding: 0;
    text-indent: .5rem;
    border: 1px solid #aaaaaa;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: inset 0 1px 1px #dddddd;
    background: #ffffff;
    outline: none;
  }

  input:focus {
    border-color: #5192c3;
    box-shadow: 0 0 2px #4f7dac;
  }
</style>

<input {type} {name} {value} />
