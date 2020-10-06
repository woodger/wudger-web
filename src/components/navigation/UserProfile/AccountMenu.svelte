<script>
  import store from '@store';
  import request from '@request';
  import Button from '../../Button.svelte';

  export let props;

  let admin;
  let username;

  $: username = admin ?
    'Админ' : 'Гость';

  function close() {
    props.isVisibleMenu = false;
  }

  function onClickEnter() {
    store['oauth.form.visible'].set(true);
    close();
  }

  async function onClickExit() {
    request.clearCredentials();

    const res = await request('/api/v1/users/info');
    const info = await res.json();

    store['oauth.user.info'].set(info);
    props.isVisibleMenu = false;

    close();
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

{#if props.isVisibleMenu}
  <div class="container">
    <div class="account">
      <div class="username">{username}</div>
    </div>

    <div class="control">
      <Button click={close}>Мои покупки</Button>

      {#if admin}
        <Button click={onClickExit}>
          <img src="icons/exit.svg" alt="exit" width="16" height="16" />
        </Button>
      {:else}
        <Button click={onClickEnter}>
          <img src="icons/enter.svg" alt="enter" width="16" height="16" />
        </Button>
      {/if}
    </div>
  </div>
{/if}
