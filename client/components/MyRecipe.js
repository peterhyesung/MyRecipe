import React, { useEffect, useState } from 'react';
import RecipeDisplaySaved from './RecipeDisplaySaved';
import '../stylesheets/MyRecipe.scss';

function MyRecipe() {
  const [recipes, setRecipies] = useState([]);

  useEffect(() => {
    getMyRecipes();
  }, []);

  const deleteRecpie = (recipeId) => {
    setRecipies(recipes.filter((r) => r.id !== recipeId));
  };

  const getMyRecipes = () => {
    fetch('/api/myrecipe')
      .then((response) => response.json())
      .then((data) => setRecipies(data))
      .catch((err) => console.log('getMyRecipes fetch : ERROR: ', err));
  };

  if (recipes.length === 0) {
    return <h1>Nothing to Disply</h1>;
  }

  return (
    <div className="my-recipes">
      {recipes.map((recipe, index) => (
        <RecipeDisplaySaved
          id={recipe.recipe_id}
          key={index}
          title={recipe.recipe_name}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          deleteRecpieCallback={deleteRecpie}
        />
      ))}
    </div>
  );
}

export default MyRecipe;
