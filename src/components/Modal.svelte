<script>
  import store from '@store';
  import Button from './Button.svelte';
  import Svg from './Svg.svelte';

  let props;

  store['modal'].subscribe((value) => {
    props = value;
  });

  function onClose() {
    props = undefined;
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

{#if props}
  <div class="container">
    <div class="global__container">
      <div class="inner">
        <div class="control">
          <div class="title">
            {props.title}
          </div>
          <div class="btn_right">
            <Button onClick={onClose}>
              <Svg src="icons/close.svg" width="16px" height="16px" />
            </Button>
          </div>
        </div>

        <svelte:component this={props.component} props={props.props} {onClose} />
      </div>
    </div>
  </div>
{/if}
