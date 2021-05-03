import React, { useState } from 'react';
import { navigate } from 'hookrouter';
import '../stylesheets/CreateRecipe.scss';

function CreateRecipe() {
  const [recipeName, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [whichButton, setWhichButton] = useState('');

  const onCancel = () => {
    navigate('/home');
  };

  const saveRecipe = () => {
    const ingredientsArr = ingredients.split(', ');
    const instructionsArr = instructions.split('\n');

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipeName: recipeName,
        ingredients: ingredientsArr,
        instructions: instructionsArr,
      }),
    };
    fetch('/api/myrecipe', requestOptions)
      .then((response) => response.json())
      .then((data) => setPostId(data.id))
      .catch((err) => console.log('saveRecipe fetch : ERROR: ', err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (whichButton === 'cancel') {
      onCancel();
    } else if (whichButton === 'submit') {
      saveRecipe();
      setName('');
      setIngredients('');
      setInstructions('');
      navigate('/myrecipe');
    }
  };

  return (
    <form className="create-form" onSubmit={onSubmit}>
      <h1>Create Your Own Recipe</h1>
      <label>
        Recipe Name
        <input
          type="text"
          placeholder="Add your recipe name"
          value={recipeName}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Ingredients
        <input
          type="text"
          placeholder="Add ingredients here"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </label>

      <label>
        Instructions
        <textarea
          placeholder="Add instructions here"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </label>

      <div className="buttons">
        <button className="createBtn" onClick={() => setWhichButton('cancel')}>
          Cancel
        </button>
        <button className="cancelBtn" onClick={() => setWhichButton('submit')}>
          Create Recipe
        </button>
      </div>
    </form>
  );
}

export default CreateRecipe;
