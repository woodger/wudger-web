<script>
  import { store } from '@toolkit';
  import Button from './Button.svelte';
  import Svg from './Svg.svelte';

  let that;

  store['modal'].subscribe((value) => {
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
    margin: 5rem 1rem;
    background: #ffffff;
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
  }
</style>

{#if that}
  <div class="container">
    <div class="global__container">
      <div class="inner">
        <div class="control">
          <div class="title">{that.title}</div>
          <div class="btn_right">
            <Button onClick={onClose}>
              <Svg src="icons/close.svg" width="16px" height="16px" />
            </Button>
          </div>
        </div>

        <svelte:component this={that.component} {...that.props} onClose={onCloseThat} />
      </div>
    </div>
  </div>
{/if}
