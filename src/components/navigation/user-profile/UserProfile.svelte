<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import request from '@request';
  import store from '@store';
  import AccountMenu from './AccountMenu.svelte';
  import AuthorizationForm from './AuthorizationForm.svelte';
  import Button from '../../Button.svelte';
  import Svg from '../../Svg.svelte';

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
  .container {
    position: relative;
  }
</style>

<div class="container">
  <Button onClick={onClickAccount}>
    <Svg src="icons/user.svg" width="16px" height="16px" />
  </Button>

  <AccountMenu {props} />
</div>

<AuthorizationForm {props} />
