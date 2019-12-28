<script>
  export let value;
  export let theme;
  export let handler;
</script>

<style>
  button {
    height: 2rem;
    border: 1px solid #aaaaaa;
    border-radius: 3px;
    background: linear-gradient(to bottom, #ffffff 97%, #aaaaaa 100%);
    color: #222222;
    outline: none;
    cursor: pointer;
  }

  button:hover {
    opacity: .9;
  }

  button:focus {
    border-color: #5192c3;
    box-shadow: 0 0 2px #4f7dac;
  }

  .blue {
    border: 1px solid #2d77af;
    background: #4087bb;
    background: linear-gradient(to bottom, #5192c3 7%, #4087bb 97%, #2d77af 100%);
    color: #ffffff;
  }
</style>

<button on:click={handler} class:blue={theme === 'blue'}>{value}</button>
