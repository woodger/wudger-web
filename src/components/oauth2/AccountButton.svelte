<script>
  import store from '@store';
  import LoginForm from './LoginForm.svelte';
  import AccountMenu from './AccountMenu.svelte';

  function onClickUser() {
    store['oauth2.menu.visible'].update((value) => {
      return !value;
    });
  }
</script>

<style>
  .oauth2 {
    position: relative;
    margin: 1rem;
  }

  .oauth2__btn {
    height: 30px;
    padding: 0 1rem;
  }
</style>

<LoginForm />

<div class="oauth2">
  <div class="oauth2__btn global__btn" on:click={onClickUser}>
    <img src="icons/user.svg" alt="user" width="16" height="16" />
  </div>

  <AccountMenu />
</div>
