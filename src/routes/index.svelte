<!-- <script context="module">
  export async function preload(page) {
    this.redirect(301, '/articles');
  }
</script> -->

<script>
  import Search from '../components/Search.svelte';
</script>

<style>
  .nav {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .search {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn {
    display: flex;
    align-items: center;
    height: 30px;
    margin: 0 1rem;
    padding: 0 1rem;
    text-decoration: none;
    cursor: pointer;
  }

  .btn_logo {
    padding: 0;
  }

  .facet {
    height: 20rem;
    background: url("/images/abstract.svg") repeat-x;
  }

  .facet h1 {
    text-align: center;
  }

  .section {
    margin: 2rem;
  }

  .section_left {
    width: 50%;
    background: #ffffff;
  }

  .section_rigth {
    width: 50%;
    margin-left: auto;
    background: #ffffff;
  }

  .section__content {
    padding: 1rem;
  }

  .section__list {
    margin: 0;
    padding-left: 1.2rem;
  }

  .section__list li {
    padding: .3rem;
  }

  .footer {
    padding: 1rem;
    background: #666666;
    color: #ffffff;
  }

  .copyright {
    text-align: right;
  }

  .seal {
    margin: 1rem;
  }
</style>

<div class="facet">
  <div class="global__container">
    <div class="nav">
      <a class="btn btn_logo" href="/">
        <img src="images/logo.svg" alt="wudger.ru" width="128" height="32" />
      </a>
    </div>

    <div class="search">
      <h1>Поиск готовых научных работ</h1>
      <Search />
    </div>
  </div>
</div>

<div class="global__container">
  <div class="section">
      <div class="section_rigth">
        <h2>О проекте</h2>
        <div class="section__content">
          Авторская коллекция готовых научных исследований для студентов. Некоторые из работ уже прошли успешную защиту
        </div>
      </div>
    </div>


  <div class="section">
    <div class="section_left">
      <h2>Готовые работы</h2>
      <div class="section__content">
        <ul class="section__list">
          <li>Некорые готовые работы ранее написаны на заказ по определенным требованиям</li>
          <li>Обычно служат опорным материалом для написания собственной работы</li>
          <li>Продаются как есть</li>
          <li>Дополнительно не дорабатываются</li>
        </ul>
      </div>
    </div>
  </div>
</div>


<div class="footer">
  <div class="global__container">
    <div>
      <h2>Контакты</h2>
      <div class="section__content">
        <ul class="section__list">
          <li>Татьяна Потёмкина</li>
          <li>+7 (964) 925-77-05</li>
          <li>wudger@ya.ru</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      Вуджер ® 2010 - 2020
    </div>
  </div>
</div>

<div class="global__container">
  <div>
    <img src="images/globalsign.png" alt="globalsign" width="90" height="36" class="seal" />
    <img src="images/a++.png" alt="a++" width="90" height="36" class="seal" />
    <img src="images/pci.png" alt="pci" width="90" height="36" class="seal" />
  </div>
</div>
