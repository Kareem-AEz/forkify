import View from './view';
import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `We couldn't get this recipe. Please try another one!`;
  _message = '';

  addHandlerRender(fn) {
    ['load', 'hashchange'].forEach(event => window.addEventListener(event, fn));
  }

  addHandlerUpdateServings(fn) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const servingsNumber = +btn.dataset.servings;
      if (servingsNumber > 0) fn(servingsNumber);
    });
  }

  addHandlerAddBookmark(fn) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--round');
      if (!btn) return;
      fn();
    });
  }

  _generateMarkup(recipe) {
    return `
        <figure class="recipe__fig">
          <img src="${recipe.imageURL}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use xlink:href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use xlink:href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-servings="${
                recipe.servings - 1
              }">
                <svg>
                  <use xlink:href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-servings="${
                recipe.servings + 1
              }">
                <svg>
                  <use xlink:href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            ${
              recipe.key
                ? `<svg>
              <use xlink:href="${icons}#icon-user"></use>
            </svg>`
                : ''
            }
          </div>
          <button class="btn--round">
            <svg class="">
              <use xlink:href="${icons}#icon-bookmark${
      recipe.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
           ${this._generateIngredientsMarkup(recipe.ingredients).join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use xlink:href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  _generateIngredientsMarkup(ingredients) {
    return ingredients.map(item => {
      return `
            <li class="recipe__ingredient">
             <svg class="recipe__icon">
               <use xlink:href="${icons}#icon-check"></use>
             </svg>
             <div class="recipe__quantity">${
               item.quantity ? fracty(item.quantity) : ''
             }</div>
             <div class="recipe__description">
               <span class="recipe__unit">${item.unit}</span>
               ${item.description}
             </div>
            </li>
            `;
    });
  }
}

export default new RecipeView();
