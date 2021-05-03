import React, { useEffect, useState } from 'react';
import RecipeDisplay from './RecipeDisplay';

import { bulkFetch } from '../spoontacular';

function Fav() {
  const [ids, setIds] = useState([]);
  const [recipes, setRecipies] = useState([]);

  useEffect(() => {
    getFavId();
  }, []);

  useEffect(() => {
    if (ids.length > 0 && recipes.length === 0) {
      bulkFetch(ids)
        .then((response) => response.json())
        .then(setRecipies);
    }
  }, [ids, setRecipies, bulkFetch]);

  const getFavId = () => {
    fetch('/api/fav')
      .then((response) => response.json())
      .then((data) => {
        const onlyId = data.map((e) => e.fav_id);
        setIds(onlyId);
      })
      .catch((err) => console.log('getFavId fetch : ERROR: ', err));
  };

  return (
    <div>
      {recipes.map((recipe, index) => (
        <RecipeDisplay
          id={recipe.id}
          key={index}
          title={recipe.title}
          image={recipe.image}
        />
      ))}
    </div>
  );
}

export default Fav;
