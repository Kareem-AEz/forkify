import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup(instance) {
    const id = window.location.hash.slice(1);
    return `
          <li class="preview">
              <a class="preview__link ${
                id === instance.id ? 'preview__link--active' : ''
              }" href="#${instance.id}">
                <figure class="preview__fig">
                  <img src="${instance.imageURL}" alt="${instance.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${instance.title}</h4>
                  <p class="preview__publisher">${instance.publisher}</p>
                  ${
                    instance.key
                      ? `<div class="preview__user-generated">
                  <svg>
                    <use xlink:href="${icons}#icon-user"></use>
                  </svg>
                </div>`
                      : ''
                  }
                </div>
              </a>
            </li>
          `;
  }
}

export default new PreviewView();
