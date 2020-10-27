<script>
  import { onMount } from 'svelte';
  import { store, request } from '@toolkit';
  import Svg from '../Svg.svelte';
  import Button from '../Button.svelte';
  import AuthorizationForm from './AuthorizationForm.svelte';

  export let onClose;

  let admin;
  let username;
  let modal;

  $: username = admin ?
    'Админ' : 'Гость';

  onMount(async () => {
    store['modal'].subscribe((value) => {
      if (value) {
        modal = value;
      }
    });
  });

  async function getUserInfo() {
    store['user.info'].set(
      await request(`/api/v1/oauth`)
    );

    onClose();
  }

  function onClickEnter() {
    store['modal'].set({
      title: 'Авторизация',
      component: AuthorizationForm,
      onClose: getUserInfo
    });
  }

  store['user.admin'].subscribe((value) => {
    admin = value;
  });

  async function onClickExit() {
    request.clearAll();
    await getUserInfo();
  }
</script>

<style>
  .container {
    width: 250px;
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
