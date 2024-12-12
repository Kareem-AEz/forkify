import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import { MODAL_CLOSE_SEC } from './config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

let page;

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage(model.state.search.page));

    // fetch recipe
    await model.loadRecipe(hash);
    const recipe = model.state.recipe;

    // render recipe
    recipeView.render(recipe);
    bookmarkView.update(model.state.bookmarks);
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // log the results and update the state
    await model.loadSearchResults(query);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
    // resultsView.renderError('');
  }
};

const controlPagination = goToPage => {
  page = goToPage;

  // get NEW page results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // get NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = servingsNumber => {
  console.log(servingsNumber);

  // update the recipe servings
  model.updateServings(servingsNumber);

  // update the recipe view
  const recipe = model.state.recipe;

  // render recipe
  recipeView.update(recipe);
};

const controlAddBookmark = () => {
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }

  // add bookmark
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async data => {
  try {
    // show spinner
    addRecipeView.renderSpinner();

    // upload recipe
    await model.uploadRecipe(data);

    // render recipe
    recipeView.render(model.state.recipe);

    // render message
    addRecipeView.renderMessage();

    // update bookmarks
    bookmarkView.render(model.state.bookmarks);

    // change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // update search results
    resultsView.update(model.getSearchResultsPage());

    // close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }
};

const newFeature = () => {
  console.log('Welcome to the application!');
};

// init
(() => {
  // recipe
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  // search
  searchView.addHandlerSearch(controlSearchResults);

  // pagination
  paginationView.addHandlerClick(controlPagination);

  // bookmarks
  bookmarkView.addHandlerRender(controlBookmarks);

  // add recipe
  addRecipeView.addHandlerUpload(controlAddRecipe);

  newFeature();
})();
