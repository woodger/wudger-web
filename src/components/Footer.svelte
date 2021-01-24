<script>
  import Svg from './Svg.svelte';

  const date = new Date();
  const year = date.getFullYear();

  function onLoadIcon(svg) {
    svg.style.setProperty('fill', '#ffffff');
  }
</script>

<style>
  a {
    color: inherit;
  }

  .footer {
    background: #666666;
    color: #ffffff;
  }

  .section {
    list-style: none;
  }

  .section__item {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }

  .section__item > span {
    padding: 0 0 0 1rem;
  }

  .copyright {
    text-align: right;
  }

  .legal {
    padding: 1rem;
  }
</style>

<div class="footer">
  <div class="global__container">
    <div>
      <h2>Контакты</h2>
      <ul class="section">
        <li class="section__item">
          <Svg src="icons/vk.svg"
            width="16"
            height="16"
            alt="vk"
            onLoad={onLoadIcon}
          />
          <span>
            <a href="https://vk.com/wudger">Татьяна Потёмкина</a>
          </span>
        </li>
        <li class="section__item">
          <Svg src="icons/phone.svg"
            width="16"
            height="16"
            alt="phone"
            onLoad={onLoadIcon}
          />
          <span>+7 (964) 925-77-05</span>
        </li>
        <li class="section__item">
          <Svg src="icons/envelop.svg"
            width="16"
            height="16"
            alt="envelop"
            onLoad={onLoadIcon}
          />
          <span>wudger@ya.ru</span>
        </li>
      </ul>
    </div>
    <div class="copyright">
      <div class="legal">Вуджер ® 2010 - {year}</div>
    </div>
  </div>
</div>
