<script>
  const date = new Date();
  const year = date.getFullYear();
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

	.section__list img {
		fill: #ffffff;
	}

  .copyright {
    text-align: right;
  }

	li span {
		padding: 0 0 0 1rem;
	}

	.seals {
		background: #f4f4f4;
	}

  .seal {
    margin: 1rem;
  }
</style>

<div class="footer">
  <div class="global__container">
    <div>
      <h2>Контакты</h2>
      <div class="section__content">
        <ul class="section__list">
          <li>
						<img src="icons/vk.svg" alt="" width="16" height="16">
						<span>Татьяна Потёмкина</span>
					</li>
          <li>
						<img src="icons/phone.svg" alt="" width="16" height="16">
						<span>+7 (964) 925-77-05</span>
					</li>
          <li>
						<img src="icons/envelop.svg" alt="" width="16" height="16">
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

<div class="seals">
  <div class="global__container">
    <img src="/images/seals/comodo.svg" alt="comodo" width="95" height="36" class="seal" />
    <img src="/images/seals/aplusI.svg" alt="a++" width="90" height="36" class="seal" />
    <img src="/images/seals/pci.svg" alt="pci" width="95" height="36" class="seal" />
  </div>
</div>
