class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearField();
    return query;
  }

  #clearField() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(fn) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      fn();
    });
  }
}

export default new SearchView();
