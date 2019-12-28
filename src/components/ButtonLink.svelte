<script>
  export let value;
  export let href;
</script>

<style>
  a {
    border: 1px solid #aaaaaa;
    border-radius: 3px;
    background: linear-gradient(to bottom, #ffffff 97%, #aaaaaa 100%);
    color: #222222;
    outline: none;
    cursor: pointer;
  }

  a:hover {
    opacity: .9;
  }
</style>

<a {href}>{value}</a>
