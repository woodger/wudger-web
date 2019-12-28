<script>
	import {onMount} from 'svelte';
  import {accessToken} from '../stores/user';

  onMount(async () => {
    if ($accessToken) {
      return;
    }

    const refreshToken = window.localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return;
    }

    const url = new URL('/api/v1/users/refresh', process.env.API_URL);
    const body = new FormData();

    body.set('token', refreshToken);

    const res = await fetch(url, {
      method: 'POST',
      body
    });

    if (res.status !== 200) {
      return;
    }

    const data = await res.json();

    window.localStorage.setItem('refreshToken', data.refreshToken);
    $accessToken = data.accessToken;
  });
</script>
