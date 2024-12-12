import { API_URL, RES_PER_PAGE, API_KEY } from './config';
import { AJAX } from './helpers';

export let state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const recipeObject = data => {
  return {
    id: data.id,
    cookingTime: data.cooking_time,
    imageURL: data.image_url,
    ingredients: data.ingredients,
    publisher: data.publisher,
    servings: data.servings,
    sourceURL: data.source_url,
    title: data.title,
    ...(data.key && { key: data.key }),
  };
};

export const loadRecipe = async hash => {
  try {
    const { data } = await AJAX(`${API_URL}${hash}?key=${API_KEY}`);

    const recipe = recipeObject(data.recipe);

    // check if the recipe is already in the bookmarks
    if (state.bookmarks.some(bookmark => bookmark.id === recipe.id)) {
      recipe.bookmarked = true;
    }

    state.recipe = recipe;
  } catch (error) {
    console.error('💥💥💥Error fetching recipe:', error);
    throw error;
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.data.recipes.map(recipe => ({
      id: recipe.id,
      imageURL: recipe.image_url,
      publisher: recipe.publisher,
      title: recipe.title,
      ...(recipe.key && { key: recipe.key }),
    }));
  } catch (error) {
    console.error('💥💥💥Error fetching recipe:', error);
    throw error;
  }
};

export const getSearchResultsPage = (page = 1) => {
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  state.search.page = page;

  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(
    ingredient =>
      (ingredient.quantity =
        (ingredient.quantity * newServings) / state.recipe.servings)
  );

  state.recipe.servings = newServings;
};

export const addBookmark = recipe => {
  // add bookmark
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  saveBookmarks();
};

export const deleteBookmark = id => {
  state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== id);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  saveBookmarks();
};

export const saveBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const loadBookmarks = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

export const uploadRecipe = async data => {
  try {
    const ingredients = Object.entries(data)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => ingredient[1])
      .map(ingredient => {
        const ingredientArray = ingredient.split(',');
        if (ingredientArray.length !== 3) {
          throw new Error('Invalid ingredient format');
        }
        const [quantity, unit, description] = ingredientArray;
        return {
          quantity: +quantity.trim() || '',
          unit: unit?.trim() || '',
          description: description?.trim() || '',
        };
      });

    const recipe = {
      title: data.title,
      publisher: data.publisher,
      source_url: data.sourceURL,
      image_url: data.image,
      servings: +data.servings,
      cooking_time: +data.cookingTime,
      ingredients,
    };

    const {
      data: { recipe: newRecipeRaw },
    } = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

    console.log(newRecipeRaw);

    const newRecipe = recipeObject(newRecipeRaw);

    state.recipe = newRecipe;
    addBookmark(newRecipe);
  } catch (error) {
    throw error;
  }
};

(() => {
  loadBookmarks();
})();

console.log(state.bookmarks);

const clearBookmarks = () => {
  localStorage.clear();
};
// clearBookmarks();
