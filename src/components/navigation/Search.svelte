<style>
  .container {
    margin: 1rem;
  }

  .inner {
    display: flex;
    align-items: center;
  }

  .input {
    min-width: 400px;
    border-radius: 3px 0 0 3px;
  }

  .btn {
    height: 32px;
    padding: 0 1rem;
    text-decoration: none;
    border-radius: 0 3px 3px 0;
    border: 1px solid #aaaaaa;
    border-left: none;
    background: linear-gradient(to bottom, #ffffff 97%, #aaaaaa 100%);
    color: #222222;
    outline: none;
    cursor: pointer;
  }
</style>

<div class="container">
  <div class="inner">
    <input class="global__input input" placeholder="Поиск ..." />
    <button class="btn">Найти</button>
  </div>
</div>
