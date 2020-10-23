<script>
  import { onMount } from 'svelte';
  import store from '@store';
  import request from '@request';
  import Svg from '../../Svg.svelte';
  import Button from '../../Button.svelte';
  import UserMenu from './UserMenu.svelte';

  let show = false;

  onMount(getUserInfo);

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

  store['user.info'].subscribe((value) => {
    store['user.admin'].set(
      value && value.groups.includes('admin')
    );
  });

  function onSwithMenu() {
    show = !show;
  }

  async function onCloseUserMenu() {
    show = false;
    await getUserInfo();
  }
</script>

<style>
  .container {
    position: relative;
  }
</style>

<div class="container">
  <Button onClick={onSwithMenu}>
    <Svg src="icons/user.svg" width="16px" height="16px" />
  </Button>

  {#if show}
    <UserMenu onClose={onCloseUserMenu} />
  {/if}
</div>
