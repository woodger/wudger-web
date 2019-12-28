<script>
	import {onMount} from 'svelte';
  import {accessToken, userInfo} from '../stores/user';

  async function getUserInfo() {
    const url = new URL('/api/v1/users/info', process.env.API_URL);

    const res = await fetch(url, {
      headers: {
        'X-Access-Token': $accessToken
      }
    });

    if (res.status !== 200) {
      return;
    }

    $userInfo = await res.json();
  }

  $: if ($accessToken) {
    getUserInfo();
  }
</script>
