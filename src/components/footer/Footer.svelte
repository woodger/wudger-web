<script>
  import Svg from '../Svg.svelte';

  const date = new Date();
  const year = date.getFullYear();

  function onLoadIcon(svg) {
    svg.style.setProperty('fill', '#ffffff');
  }
</script>

<style>
  .footer {
    padding: 1rem;
    background: #666666;
    color: #ffffff;
  }

	.section__list {
		list-style: none;
	}

  .copyright {
    text-align: right;
  }

	li span {
		padding: 0 0 0 1rem;
	}

	/* .bottom {
		background: #f4f4f4;
	}

  .seals {
    display: flex;
	}

  .seals > div {
    margin: 1rem;
  } */
</style>

<div class="footer">
  <div class="global__container">
    <div>
      <h2>Контакты</h2>
      <div class="section__content">
        <ul class="section__list">
          <li>
            <Svg src="/icons/vk.svg"
              width="16px"
              height="16px"
              onLoad="{onLoadIcon}"
            />
						<span>Татьяна Потёмкина</span>
					</li>
          <li>
            <Svg src="/icons/phone.svg"
              width="16px"
              height="16px"
              onLoad="{onLoadIcon}"
            />
						<span>+7 (964) 925-77-05</span>
					</li>
          <li>
            <Svg src="/icons/envelop.svg"
              width="16px"
              height="16px"
              onLoad="{onLoadIcon}"
            />
						<span>wudger@ya.ru</span>
					</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <span>Вуджер ® 2010 - {year}</span>
    </div>
  </div>
</div>

<!-- <div class="bottom">
  <div class="global__container seals">
    <div>
      <Svg src="images/seals/comodo.svg" width="115px" height="36px" />
    </div>
    <div>
      <Svg src="images/seals/aplus.svg" width="90px" height="36px" />
    </div>
    <div>
      <Svg src="images/seals/pci.svg" width="95px" height="36px" />
    </div>
  </div>
</div> -->
