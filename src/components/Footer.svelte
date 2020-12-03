<script>
  import Svg from './Svg.svelte';

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
</style>

<div class="footer">
  <div class="global__container">
    <div>
      <h2>Контакты</h2>
      <div class="section__content">
        <ul class="section__list">
          <li>
            <Svg src="/icons/vk.svg"
              width="16"
              height="16"
              alt="vk"
              onLoad={onLoadIcon}
            />
            <span>Татьяна Потёмкина</span>
          </li>
          <li>
            <Svg src="/icons/phone.svg"
              width="16"
              height="16"
              alt="phone"
              onLoad={onLoadIcon}
            />
            <span>+7 (964) 925-77-05</span>
          </li>
          <li>
            <Svg src="/icons/envelop.svg"
              width="16"
              height="16"
              alt="envelop"
              onLoad={onLoadIcon}
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
