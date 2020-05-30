<script>
  import { onMount } from 'svelte';
  import store from '@store';

  let visible = false;
  let admin = false;

  function onClickEnter() {
    store['oauth2.menu.visible'].set(false);
    store['oauth2.login.visible'].set(true);
  }

  onMount(() => {
    store['oauth2.menu.visible'].subscribe((value) => {
      visible = value;
    });

    store['oauth2.user.info'].subscribe((value) => {
      admin = value && value.groups.includes('admin');
    });
  });
</script>

<style>
  .modal-menu {
    position: absolute;
    top: 35px;
    right: 0;
    width: 200px;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .modal-menu__account {
    min-height: 7rem;
  }

  .modal-menu__control {

  }

  .modal-menu__username {
    margin: 1rem;
    font-weight: bold;
  }

  .modal-menu__btn {
    height: 30px;
    margin: 1rem;
    padding: 0 1rem;
  }
</style>

{#if visible}
  <div class="modal-menu">
    <div class="modal-menu__account">
      <div class="modal-menu__username">
        {admin ? 'Админ' : 'Гость'}
      </div>
    </div>

    <div class="modal-menu__control">
      <button class="modal-menu__btn global__btn">
        Мои покупки
      </button>
      <button class="modal-menu__btn global__btn" on:click={onClickEnter}>
        <!-- Вход -->
        <img src="icons/enter.svg" alt="enter" width="16" height="16" />
      </button>
    </div>
  </div>
{/if}
