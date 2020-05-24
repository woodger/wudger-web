<script>
  export let visible = false;
</script>

<style>
  .modal {
    position: absolute;
    top: 35px;
    right: 0;
    width: 200px;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .modal__account {
    min-height: 7rem;
  }

  .modal__control {

  }

  .modal__username {
    margin: 1rem;
    font-weight: bold;
  }

  .modal__btn {
    margin: 1rem;
  }
</style>

{#if visible}
  <div class="modal">
    <div class="modal__account">
      <div class="modal__username">{username}</div>
    </div>

    <div class="modal__control">
      <button class="user-profile__btn global__btn modal__btn">
        Мои покупки
      </button>
      <button class="user-profile__btn global__btn modal__btn">
        Вход
      </button>
    </div>
  </div>
{/if}
