<script>
  import { onMount } from 'svelte';
  import store from '@store';
  import request from '@request';
  import Svg from '../../Svg.svelte';
  import Button from '../../Button.svelte';
  import AuthorizationForm from './AuthorizationForm.svelte';

  export let onClose;

  let admin;
  let username;
  let modal;

  $: username = admin ?
    'Админ' : 'Гость';

  onMount(async () => {
    await getUserInfo();

    store['modal'].subscribe((value) => {
      if (value) {
        modal = value;
      }
    });
  });

  function onClickEnter() {
    store['modal'].set({
      title: 'Авторизация',
      component: AuthorizationForm,
      onClose: getUserInfo
    });

    onClose();
  }

  store['user.info'].subscribe((value) => {
    if (value) {
      admin = value.groups.includes('admin');
    }
  });

  async function getUserInfo() {
    const res = await request(`/api/v1/oauth`);

    if (!res.ok) {
      return store['notification.error'].set({
        message: 'Упс .. Все сломалось'
      });
    }

    store['user.info'].set(
      await res.json()
    );
  }

  async function onClickExit() {
    request.clearAll();
    await getUserInfo();

    onClose();
  }
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
