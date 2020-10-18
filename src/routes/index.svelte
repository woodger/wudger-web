<script>
  import Navigation from '../components/navigation/Navigation.svelte';
  import Footer from '../components/footer/Footer.svelte';

  const title = 'Поиск готовых научных работ';
</script>

<style>
  .section {
    margin: 2rem;
  }

  .section ul {
    margin: 0;
    padding-left: 1.2rem;
  }

  .section li {
    padding: .3rem;
  }

  .section_left {
    margin-right: 50%;
  }

  .section_rigth {
    margin-left: 50%;
  }

  .section__content {
    padding: 1rem;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Navigation {title}/>

<div class="global__container">
  <div class="section section_rigth">
    <h2>О проекте</h2>
    <div class="section__content">
      Авторская коллекция готовых научных исследований для студентов. Некоторые из работ уже прошли успешную защиту. Исследования на актуальные темы направлены на развитие технологии, совершенствование методик, внедрение и аппробацию новых идей.
    </div>
  </div>

  <div class="section section_left">
    <h2>Готовые работы</h2>
    <div class="section__content">
      <ul>
        <li>Некорые готовые работы ранее написаны на заказ по определенным требованиям</li>
        <li>Обычно служат опорным материалом для написания собственной работы</li>
        <li>Продаются как есть</li>
        <li>Дополнительно не дорабатываются</li>
        <li>Многие работы, методические рекомендации, полезный материал доступны для скачиания абсолютно бесплатно</li>
      </ul>
    </div>
  </div>
</div>

<Footer />
