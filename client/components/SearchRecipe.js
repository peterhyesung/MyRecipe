import React, { useState } from 'react';
import RecipeDisplay from './RecipeDisplay';
import '../stylesheets/SearchRecipe.scss';

import { fetchRecipes } from '../spoontacular';

function SearchRecipe() {
  const [recipes, setRecipies] = useState([]);
  const [search, setSearch] = useState('');

  const getRecipes = () => {
    if (search) {
      fetchRecipes(search)
        .then((response) => response.json())
        .then((data) => {
          setRecipies(data.results);
          // console.log(data.results);
        });
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
    setSearch('');
  };

  return (
    <>
      <form className="search-form" onSubmit={onSubmit}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <>
        {recipes.map((recipe, index) => (
          <RecipeDisplay
            id={recipe.id}
            key={index}
            title={recipe.title}
            image={recipe.image}
          />
        ))}
      </>
    </>
  );
}

export default SearchRecipe;
