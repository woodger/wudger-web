<script>
  import OAuth2 from './OAuth2.svelte';
  import Modal from './Modal.svelte';
  // import * as store from '@store';

  let username = 'Гость';
  let visibleModal = false;

  function onClickUser() {
    visibleModal = !visibleModal;
  }
</script>

<style>
  .user-profile {
    position: relative;
    margin: 1rem;
  }

  .user-profile__btn {
    height: 30px;
    padding: 0 1rem;
  }

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

<OAuth2 />

<div class="user-profile">
  <div class="user-profile__btn global__btn" on:click={onClickUser}>
    <img src="icons/user.svg" alt="user" width="16" height="16" />
  </div>

  <Modal visible={visibleModal}/>
</div>
