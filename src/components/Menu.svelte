<script>
  import {visible} from '../stores/menu';

  export function toggle() {
    $visible = !$visible;
  }
</script>

<style>
  .menu {
    width: 100%;
    background: #ffffff;
  }

  .menu__container {
    display: flex;
    width: 1200px;
    margin: 0 auto;
  }

  .menu__inner {
    padding: 1rem .5rem;
  }

  .menu__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28px;
    margin: .5rem;
    padding: 0 1rem;
    text-decoration: none;
  }
</style>

{#if $visible}
  <div class="menu">
    <div class="menu__container">
      <div class="menu__inner">
        <a class="menu__btn global__btn" on:click={toggle} href="/login">Вход</a>
      </div>
    </div>
  </div>
{/if}
