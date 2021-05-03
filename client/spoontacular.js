// const API_KEY = '7aa570db7ff24df086f4514a6f4e5553';
// const API_KEY = 'aec27e8f868341ae9e19d468f0bb24ae';
const API_KEY = '9fc7674556214688af6927ca46207a1b';
const host = 'https://api.spoonacular.com';

export const fetchRecipes = (search) => {
  return fetch(
    `${host}/recipes/complexSearch?query=${search}&apiKey=${API_KEY}`
  );
};

export const fetchInstructions = (id) => {
  return fetch(`${host}/recipes/${id}/analyzedInstructions?&apiKey=${API_KEY}`);
};

export const fetchIngredients = (id) => {
  return fetch(
    `${host}/recipes/${id}/ingredientWidget.json?&apiKey=${API_KEY}`
  );
};

export const bulkFetch = (ids = []) => {
  return fetch(
    `${host}/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${API_KEY}`
  );
};
