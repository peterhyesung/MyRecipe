import React, { useState } from 'react';
import Modal from 'react-modal';
import '../stylesheets/RecipeDisplaySaved.scss';

function RecipeDisplaySaved({
  title,
  ingredients,
  instructions,
  id,
  deleteRecipeCallback,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const editRecipe = () => {
  //   // const editRecipe = () => {
  //   //   fetch(`/api/myrecipe/${id}`, {
  //   //     method: 'PUT',
  //   //     headers: { 'Content-Type': 'application/json' },
  //   //     body: JSON.stringify({
  //   //       recipeName: recipeName,
  //   //       ingredients: ingredientsArr,
  //   //       instructions: instructionsArr,
  //   //     }),
  //   //   })
  //   //     .then((response) => response.json())
  //   //     .then((data) => setPostId(data.id))
  //   //     .catch((err) => console.log('editRecipe fetch : ERROR: ', err)
  //   // };
  // };

  const deleteRecipe = () => {
    // e.preventDefault();
    fetch(`/api/myrecipe/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(() => {
        deleteRecipeCallback(id);
      })
      .catch((err) => console.log('deleteRecipe fetch : ERROR: ', err));
  };

  return (
    <div className="display-container">
      <div className="my-recipe-box">
        <h1>{title}</h1>
        <button
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          View Recipe
        </button>
      </div>
      <Modal
        className="recipe-modal"
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        ariaHideApp={false}
      >
        <div>
          <h1 className="recipe-title">{title}</h1>
        </div>
        <div>
          <h2 className="instructions">Instructions</h2>
          {instructions.map((instruction, index) => (
            <ol key={`instruction${index}`}>
              {index + 1}. {instruction}
            </ol>
          ))}
        </div>
        <div>
          <h2 className="ingredients">Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <ol key={`ingredient${index}`}>{ingredient}</ol>
          ))}
        </div>
        <div className="buttons">
          <button onClick={() => editRecipe()}>Edit</button>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
          <button
            onClick={() => {
              deleteRecipe();
              setModalIsOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default RecipeDisplaySaved;
