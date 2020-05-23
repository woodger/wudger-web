<script>
	import {onMount} from 'svelte';
	import {authorize, userInfo, credentials} from '../stores/global';

  let login = '';
  let password = '';

	async function getAuthorization({login, password}) {
	  const url = new URL('/api/v1/users/login', process.env.API_URL);
	  const body = new FormData();

	  body.set('login', login);
	  body.set('password', password);

	  const res = await fetch(url, {
	    method: 'POST',
	    body
	  });

	  if (res.status !== 200) {
	    return;
	  }

	  return await res.json();
	}

	async function getUserInfo(accessToken) {
	  const url = new URL('/api/v1/users/info', process.env.API_URL);
	  const body = new FormData();

	  const res = await fetch(url, {
	    headers: {
	      'X-Access-Token': accessToken
	    }
	  });

	  if (res.status !== 200) {
	    return;
	  }

	  return await res.json();
	}

	async function onClickNext() {
		$credentials = await getAuthorization({ login, password });
		await authorization($credentials);

		$authorize = !$userInfo;
	}

	function onClickEnter() {
		$authorize = !$authorize;
	}

	function onClickExit() {
		$userInfo = undefined;
	}

	async function authorization({accessToken} = {}) {
		if (accessToken) {
			localStorage.setItem('accessToken', accessToken);
			$userInfo = await getUserInfo(accessToken);
		}
		else {
			const accessToken = localStorage.getItem('accessToken');

			if (accessToken) {
				$userInfo = await getUserInfo(accessToken);
			}
		}
	}

	onMount(async () => {
		await authorization();

		userInfo.subscribe((value) => {
			if (value === undefined) {
				localStorage.removeItem('accessToken');
			}
		});
	});
</script>

<style>
  .login {
		position: fixed;
		top: calc(50% - 150px);
		left: calc(50% - 150px);
    margin: 1rem;
    box-shadow: 0 1px 3px #aaaaaa;
		background: #ffffff;
  }

  .login__inner {
    padding: 1rem;
  }

  .login__input {
    width: 100%;
    height: 2rem;
  }

  .login__field {
    max-width: 300px
  }

  .login__field-inner {
    padding: .5rem 1rem;
  }

  .login__control {
    margin-top: 1rem;
  }

  .login__label {
    line-height: 2rem;
    font-size: .9rem;
    color: #666666;
  }

  .login__btn {
    height: 30px;
    padding: 1px 1rem;
  }
</style>

{#if $userInfo}
	<button class="global__btn login__btn" on:click={onClickExit}>
		<img src="icons/exit.svg" alt="exit" width="16" height="16" />
	</button>
{:else}
	<button class="global__btn login__btn" on:click={onClickEnter}>
		<img src="icons/enter.svg" alt="enter" width="16" height="16" />
	</button>
{/if}

{#if $authorize}
	<div class="login">
		<div class="login__inner">
			<h1>Вход</h1>

			<div class="login__field">
				<div class="login__field-inner">
					<label class="login__label">Логин</label>
					<input class="login__input global__input" bind:value={login}>
				</div>
			</div>

			<div class="login__field">
				<div class="login__field-inner">
					<label class="login__label">Пароль</label>
					<input class="login__input global__input" type="password" bind:value={password}>
				</div>
			</div>

			<div class="login__field">
				<div class="login__field-inner login__control">
					<button class="login__btn global__btn global__btn_blue" on:click={onClickNext}>
						Далее
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
