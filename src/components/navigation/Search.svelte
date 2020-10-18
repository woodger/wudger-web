<script>
  import Button from '../Button.svelte';
  import InputText from '../InputText.svelte';
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
      <InputText placeholder="Поиск ..." />
    </div>
    <Button>Найти</Button>
  </div>
</div>
