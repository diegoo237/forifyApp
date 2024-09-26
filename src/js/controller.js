import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/RecipeView';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const controlRecepies = async function () {
  /// declaring id
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpiner();
    /// recenbendo os dados de receita

    await model.loadRecipe(id);
    recipeView.clearSpinner();

    /// rendering data
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecepies)
);
