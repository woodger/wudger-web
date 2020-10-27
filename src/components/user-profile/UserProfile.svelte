<script>
  import { onMount } from 'svelte';
  import { store, request } from '@toolkit';
  import Switch from '../Switch.svelte';
  import Svg from '../Svg.svelte';
  import UserMenu from './UserMenu.svelte';

  onMount(getUserInfo);

  async function getUserInfo() {
    store['user.info'].set(
      await request(`/api/v1/oauth`)
    );
  }

  store['user.info'].subscribe((value) => {
    if (value) {
      store['user.admin'].set(
        value.groups.includes('admin')
      );
    }
  });
</script>

<Switch component={UserMenu}>
  <Svg src="icons/user.svg" width="16px" height="16px" />
</Switch>
