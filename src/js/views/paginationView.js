import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  #currentPage;

  addHandlerClick(fn) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      fn(goToPage);
    });
  }

  _generateMarkup() {
    this.#currentPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(this._data);

    // first page and there're others
    if (this.#currentPage === 1 && numOfPages > 1) {
      return this.#generateNextButton();
    }

    // other page
    if (this.#currentPage < numOfPages) {
      return `${this.#generatePreviousButton()}${this.#generateNextButton()}`;
    }

    // last page
    if (this.#currentPage === numOfPages) {
      return this.#generatePreviousButton();
    }

    // first page and no other
    return '';
  }

  #generateNextButton() {
    return `
            <button data-goto=${
              this.#currentPage + 1
            } class="btn--inline pagination__btn--next">
                <span>Page ${this.#currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
    `;
  }
  #generatePreviousButton() {
    return `
            <button data-goto=${
              this.#currentPage - 1
            } class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this.#currentPage - 1}</span>
            </button>
    `;
  }
}

export default new PaginationView();
