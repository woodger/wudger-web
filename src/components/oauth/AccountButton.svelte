<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import request from '@request';
  import store from '@store';
  import AccountMenu from './AccountMenu.svelte';
  import AuthorizationForm from './AuthorizationForm.svelte';

  const props = {
    isVisibleMenu: false,

    async getUserInfo() {
      const res = await request('/api/v1/users/info');
      const info = await res.json();

      store['oauth.user.info'].set(info);
    }
  };

  function onClickAccount() {
    props.isVisibleMenu = !props.isVisibleMenu;
  }

  onMount(props.getUserInfo);
</script>

<style>
  .oauth {
    position: relative;
    margin: 1rem;
  }

  .oauth__btn {
    height: 30px;
    padding: 0 1rem;
  }
</style>

<div class="oauth">
  <div class="oauth__btn global__btn" on:click={onClickAccount}>
    <img src="icons/user.svg" alt="account" width="16" height="16" />
  </div>
  <AccountMenu {props} />
</div>

<AuthorizationForm {props} />
