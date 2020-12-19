<script>
  import Navigation from '../components/navigation/Navigation.svelte';
  import Footer from '../components/Footer.svelte';

  const title = 'Поиск готовых научных работ';
</script>

<style>
  .section {
    margin: 0 0 2rem;
  }

  .content {
    padding: 1rem;
  }

  .section ul {
    margin: 0;
  }

  .section li {
    padding: .5rem;
  }

  @media screen and (min-width: 600px) {
    .indent_rigth {
      margin-left: 40%;
    }

    .indent_left {
      margin-right: 40%;
    }
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Navigation />

<div class="global__container">
  <h1>{title}</h1>

  <div class="section indent_rigth">
    <h2>О проекте</h2>
    <div class="content">
      <p>Авторская коллекция готовых научных исследований для студентов</p>
      <p>Некоторые из работ уже прошли успешную защиту. Исследования на актуальные темы направлены на развитие технологии, совершенствование методик, внедрение и аппробацию новых идей</p>
    </div>
  </div>

  <div class="section indent_left">
    <h2>Готовые работы</h2>
    <div class="content">
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
