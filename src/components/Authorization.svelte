<script>
	import {onMount} from 'svelte';
  import {accessToken, fetchAuthorization, fetchRefresh} from '../stores/user';

  export let protect;

  let visible = false;
  let login = '';
  let password = '';

  async function handler() {
    const pairs = await fetchAuthorization({ login, password });

    localStorage.setItem('refreshToken', pairs.refreshToken);
    accessToken.set(pairs.accessToken);

    visible = false;
  }

  onMount(async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      const pairs = await fetchRefresh(refreshToken);

      localStorage.setItem('refreshToken', pairs.refreshToken);
      accessToken.set(pairs.accessToken);

      return;
    }
    else {
      visible = true;
    }
  });
</script>


<style>
  .authorization {
    position: absolute;
    top: 30%;
    top: calc(50% - 150px);
    left: 30%;
    left: calc(50% - 150px);
    width: 300px;
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

{#if visible}
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
          <button class="authorization__btn global__btn global__btn_blue" on:click={handler}>
            Далее
          </button>
        </div>
      </div>
    </div>
  </div>
{:else}
  <slot />
{/if}
