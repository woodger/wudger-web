export default class Coyote {
  getItem(key) {
    return localStorage.getItem(key);
  }

  setItems(values) {
    for (const key of Object.keys(values)) {
      localStorage.setItem(key, values[key]);
    }
  }

  clearAll() {
    localStorage.clear()
  }
}
