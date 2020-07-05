<script>
  import store from '@store';
  import request from '@request';

  export let props;

  let isAdmin = false;

  $: store['oauth.user.admin'].set(isAdmin);

  function onClickEnter() {
    store['oauth.form.visible'].set(true);
    props.isVisibleMenu = false;
  }

  async function onClickExit() {
    request.clearCredentials();

    const res = await request('/api/v1/users/info');
    const info = await res.json();
    store['oauth.user.info'].set(info);

    props.isVisibleMenu = false;
  }

  store['oauth.user.info'].subscribe((value) => {
    isAdmin = value !== null && value.groups.includes('admin');
  });
</script>

<style>
  .container {
    position: absolute;
    top: 35px;
    right: 0;
    width: 200px;
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

  .btn {
    height: 30px;
    margin: 1rem;
    padding: 0 1rem;
  }
</style>

{#if props.isVisibleMenu}
  <div class="container">
    <div class="account">
      <div class="username">
        {isAdmin ? 'Админ' : 'Гость'}
      </div>
    </div>

    <div>
      <button class="btn global__btn">
        Мои покупки
      </button>

      {#if isAdmin}
        <button class="btn global__btn" on:click={onClickExit}>
          <img src="icons/exit.svg" alt="exit" width="16" height="16" />
        </button>
      {:else}
        <button class="btn global__btn" on:click={onClickEnter}>
          <img src="icons/enter.svg" alt="enter" width="16" height="16" />
        </button>
      {/if}
    </div>
  </div>
{/if}
