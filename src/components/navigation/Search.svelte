<script>
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
</script>

<style>
  .inner {
    display: flex;
    align-items: center;
  }
  .input {
    width: 400px;
  }
</style>

<div>
  <div class="inner">
    <div class="input">
      <Input placeholder="Поиск ..." />
    </div>
    <Button>Найти</Button>
  </div>
</div>
