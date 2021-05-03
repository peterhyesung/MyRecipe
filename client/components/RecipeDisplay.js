import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../stylesheets/RecipeDisplay.scss';

import { fetchInstructions } from '../spoontacular';
import { fetchIngredients } from '../spoontacular';

function RecipeDisplay({ title, image, id }) {
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (window.location.href === 'http://localhost:8080/fav') setIsActive(true);
  }, []);

  const getDetails = () => {
    fetchInstructions(id)
      .then((response) => response.json())
      .then((data) => {
        setInstructions(data[0].steps);
        // console.log(data[0].steps);
        return fetchIngredients(id)
          .then((response) => response.json())
          .then((data) => {
            setIngredients(data.ingredients);
            // console.log(data.ingredients);
          });
      });
  };

  const addFav = (id) => {
    fetch(`/api/fav/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      // .then((data) => setPostId(data.id))
      .catch((err) => console.log('addFav fetch : ERROR: ', err));
  };

  const deleteFav = () => {
    // e.preventDefault();
    fetch(`/api/fav/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())

      // .then(() => {
      //   deleteFavCallback(id);
      // })
      .catch((err) => console.log('deleteFav fetch : ERROR: ', err));
  };

  if (!isActive) {
    return (
      <div>
        <div className="display-box">
          <h1>{title}</h1>
          <img src={image} alt="" />
          <button
            onClick={() => {
              getDetails();
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
                {instruction.number}. {instruction.step}
              </ol>
            ))}
          </div>
          <div>
            <h2 className="ingredients">Ingredients</h2>
            {ingredients.map((ingredient, index) => (
              <ol key={`ingredient${index}`}>
                <span className="scale">{ingredient.amount.us.value}</span>{' '}
                {ingredient.amount.us.unit} {ingredient.name}
              </ol>
            ))}
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                addFav(id);
                setModalIsOpen(false);
              }}
            >
              Add to favorite
            </button>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="display-container">
      <div className="display-box">
        <h1>{title}</h1>
        <img src={image} alt="" />
        <button
          onClick={() => {
            getDetails();
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
              {instruction.number}. {instruction.step}
            </ol>
          ))}
        </div>
        <div>
          <h2 className="ingredients">Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <ol key={`ingredient${index}`}>
              <span className="scale">{ingredient.amount.us.value}</span>{' '}
              {ingredient.amount.us.unit} {ingredient.name}
            </ol>
          ))}
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              deleteFav();
              setModalIsOpen(false);
            }}
          >
            Remove
          </button>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default RecipeDisplay;
