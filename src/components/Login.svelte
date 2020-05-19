<script>
	import {onMount} from 'svelte';
  // import {accessToken, fetchAuthorization, fetchRefresh} from '../stores/user';
	import {fetchAuthorization, fetchRefresh, fetchUserInfo} from '../stores/http-requests';
	import {userInfo} from '../stores/redux';

  let isVisibleForm = false;
  let login = '';
  let password = '';

  function onClickEntry() {
		isVisibleForm = !isVisibleForm;
  }

	function onClickExit() {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		$userInfo = undefined;
	}

	async function userAuthorization({accessToken, refreshToken}) {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);

		$userInfo = await fetchUserInfo(accessToken);
  }

  async function onClickNext() {
		const pairs = await fetchAuthorization({ login, password });
    await userAuthorization(pairs);

    isVisibleForm = false;
  }

  onMount(async () => {
		const accessToken = localStorage.getItem('accessToken');
		const refreshToken = localStorage.getItem('refreshToken');

		if (accessToken && refreshToken) {
			$userInfo = await fetchUserInfo(accessToken);

			if (!$userInfo) {
				const pairs = await fetchRefresh();
				await userAuthorization(pairs);
			}
		}
  });
</script>

<style>
  .enter__btn {
		display: flex;
  	align-items: center;
  	height: 30px;
  	margin: 0 1rem;
    padding: 0 1rem;
    text-decoration: none;
    outline: none;
  	cursor: pointer;
  }

  .authorization {
    /* position: absolute;
    top: 30%;
    top: calc(50% - 150px);
    left: 30%;
    left: calc(50% - 150px);
    width: 300px; */
		position: fixed;
		top: calc(50% - 150px);
		left: calc(50% - 150px);
    margin: 1rem;
    box-shadow: 0 1px 3px #aaaaaa;
		background: #ffffff;
  }

  .authorization__inner {
    padding: 1rem;
  }

  .authorization__input {
    width: 100%;
    height: 2rem;
  }

  .authorization__field {
    max-width: 300px
  }

  .authorization__field-inner {
    padding: .5rem 1rem;
  }

  .authorization__control {
    margin-top: 1rem;
  }

  .authorization__label {
    line-height: 2rem;
    font-size: .9rem;
    color: #666666;
  }

  .authorization__btn {
    height: 30px;
    padding: 1px 1rem;
  }

</style>

{#if $userInfo}
	<div class="global__btn enter__btn" on:click={onClickExit}>
		<!-- <img src="icons/exit.svg" alt="menu" width="16" height="16" /> -->
		Выход
	</div>
{:else}
	<div class="global__btn enter__btn" on:click={onClickEntry}>
		<!-- <img src="icons/exit.svg" alt="menu" width="16" height="16" /> -->
		Вход
	</div>
{/if}

{#if isVisibleForm}
	<div class="authorization">
		<div class="authorization__inner">
			<h1>Вход</h1>

			<div class="authorization__field">
				<div class="authorization__field-inner">
					<label class="authorization__label">Логин</label>
					<input class="authorization__input global__input" type="text" bind:value={login}>
				</div>
			</div>

			<div class="authorization__field">
				<div class="authorization__field-inner">
					<label class="authorization__label">Пароль</label>
					<input class="authorization__input global__input" type="password" bind:value={password}>
				</div>
			</div>

			<div class="authorization__field">
				<div class="authorization__field-inner authorization__control">
					<button class="authorization__btn global__btn global__btn_blue" on:click={onClickNext}>
						Далее
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
