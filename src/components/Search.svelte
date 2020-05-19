<style>
  .search {
    display: flex;
    align-items: center;
    margin: 0 1rem;
  }

  .search__input {
    width: 400px;
    height: 30px;
    border-radius: 3px 0 0 3px;
  }

  .search__btn {
    height: 30px;
    padding: 1px 1rem;
    border-radius: 0 3px 3px 0;
    border-left: none
  }
</style>

<div class="search">
  <input class="global__input search__input" type="text" name="q" placeholder="Поиск ..." />
  <button class="global__btn search__btn">
    Найти
  </button>
</div>
