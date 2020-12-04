<script>
  import { onMount } from 'svelte';
  import { store, request } from '@toolkit';
  import Switch from '../Switch.svelte';
  import Svg from '../Svg.svelte';
  import UserMenu from './UserMenu.svelte';

  onMount(getUserInfo);

  async function getUserInfo() {
    const info = await request('/api/v1/oauth', {
      onError() {
        request.clearAll();
      }
    });

    store.user.set(info);
  }

  store.user.subscribe((value) => {
    if (value) {
      store.admin.set(
        value.groups.includes('admin')
      );
    }
  });
</script>

<Switch component={UserMenu}>
  <Svg src="icons/user.svg" width="16" height="16" alt="user" />
</Switch>
