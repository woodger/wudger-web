<script>
  import { store } from '@toolkit';
  import Button from './Button.svelte';
  import Svg from './Svg.svelte';

  let that;
  let inner;
  let y;

  $: if (inner) {
    const height = y - inner.offsetTop - 14;
    inner.style.setProperty('max-height', height + 'px');
  }

  store.modal.subscribe((value) => {
    that = value;
  });

  function onCloseThat() {
    if (that.onClose) {
      that.onClose();
    }

    onClose();
  }

  function onClose() {
    that = undefined;
  }
</script>

<style>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(40, 40, 40, .5);
  }

  .inner {
    margin: 1rem;
    background: #ffffff;
    overflow-y: auto;
  }

  .control {
    display: flex;
  }

  .title {
    margin: 1rem;
    font-size: 1.5rem;
  }

  .btn_right {
    margin-left: auto;
    padding: .5rem 0;
  }
</style>

<svelte:window bind:innerHeight={y} />

{#if that}
  <div class="container">
    <div class="global__container">
      <div class="inner">
        <div class="control">
          <div class="title">{that.title}</div>
          <div class="btn_right">
            <Button onClick={onClose}>
              <Svg src="icons/close.svg" width="16" height="16" alt="close" />
            </Button>
          </div>
        </div>

        <div bind:this={inner} class="inserted">
          <svelte:component
            {...that.props}
            this={that.component}
            onClose={onCloseThat}
          />
        </div>
      </div>
    </div>
  </div>
{/if}
