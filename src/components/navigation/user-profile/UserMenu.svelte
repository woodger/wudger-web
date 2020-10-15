<script>
  import { onMount } from 'svelte';
  import store from '@store';
  import request from '@request';
  import Svg from '../../Svg.svelte';
  import Button from '../../Button.svelte';
  import AuthorizationForm from './AuthorizationForm.svelte';

  export let props;

  let admin;
  let username;

  $: username = admin ?
    'Админ' : 'Гость';

  onMount(getUserInfo);

  async function getUserInfo() {
    const res = await request('/api/v1/users/info');

    if (!res.ok) {
      store['notification.error'].set({
        message: 'Упс .. Все сломалось'
      });

      return;
    }

    store['oauth.user.info'].set(
      await res.json()
    );
  }

  store['oauth.token'].subscribe((value) => {
    if (value) {
      request.saveCredentials(value);
      getUserInfo();
    }
  });

  function onClose() {
    props.show = false;
  }

  function onClickEnter() {
    store['modal'].set({
      component: AuthorizationForm,
      title: 'Авторизация'
    });

    onClose();
  }

  async function onClickExit() {
    request.clearCredentials();
    await getUserInfo();

    onClose();
  }

  store['oauth.user.admin'].subscribe((value) => {
    admin = value;
  });

  store['oauth.user.info'].subscribe((value) => {
    if (value !== undefined) {
      store['oauth.user.admin'].set(
        value.groups.includes('admin')
      );
    }
  });
</script>

<style>
  .container {
    position: absolute;
    top: 35px;
    right: 0;
    width: 250px;
    border: 1px solid #aaaaaa;
    box-shadow: 0 1px 3px #aaaaaa;
    background: #ffffff;
  }

  .account {
    min-height: 7rem;
  }

  .username {
    margin: 1rem;
    font-weight: bold;
  }

  .control {
    display: flex;
  }
</style>

{#if props.show}
  <div class="container">
    <div class="account">
      <div class="username">{username}</div>
    </div>

    <div class="control">
      <Button>Мои покупки</Button>

      {#if admin}
        <Button onClick={onClickExit}>
          <Svg src="icons/exit.svg" width="16px" height="16px" />
        </Button>
      {:else}
        <Button onClick={onClickEnter}>
          <Svg src="icons/enter.svg" width="16px" height="16px" />
        </Button>
      {/if}
    </div>
  </div>
{/if}
