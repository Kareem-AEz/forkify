import View from './view';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _successMessage = 'Recipe was successfully uploaded :)';
  _message = 'Recipe uploaded successfully!';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', () => {
      this.toggleWindow();
    });
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', () => {
      this.toggleWindow();
    });
    this._overlay.addEventListener('click', () => {
      this.toggleWindow();
    });
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // get the data from the form
      const dataArray = [...new FormData(this)];
      // convert the data to an object
      const data = Object.fromEntries(dataArray);
      // call the handler with the data
      handler(data);
    });
  }

  _generateMarkup(recipe) {}
}

export default new AddRecipeView();
