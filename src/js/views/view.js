import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = '';
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup(this._data);

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup(this._data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];

      if (
        !newElement.isEqualNode(currentElement) &&
        currentElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(newAttribute => {
          currentElement.setAttribute(newAttribute.name, newAttribute.value);
        });
      }
    });
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
              <svg>
                <use xlink:href="${icons}#icon-loader"></use>
              </svg>
            </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
              <div class="error">
              <div>
                <svg>
                  <use xlink:href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
            `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
              <div class="message">
              <div>
                <svg>
                  <use xlink:href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
            `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
