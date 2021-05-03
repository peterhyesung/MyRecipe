const { restart } = require('nodemon');
const db = require('../models/recipeModels');

const recipeController = {};

recipeController.getMyRecipes = (req, res, next) => {
  const query = 'SELECT * FROM recipes';

  db.query(query)
    .then((data) => {
      if (data.rows.length >= 1) {
        res.locals.myRecipes = data.rows.map((o) => {
          return {
            ...o,
            ingredients: JSON.parse(o.ingredients),
            instructions: JSON.parse(o.instructions),
          };
        });
      } else {
        res.locals.myRecipes = [];
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      next({ log: `error: recipeController.addMyRecipe` });
    });
};

recipeController.addMyRecipe = (req, res, next) => {
  const query =
    'INSERT INTO recipes (recipe_name, ingredients, instructions)' +
    ' VALUES ($1, $2, $3)';
  const values = [
    req.body.recipeName,
    JSON.stringify(req.body.ingredients),
    JSON.stringify(req.body.instructions),
  ];

  db.query(query, values)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
      next({ log: `error: recipeController.addMyRecipe` });
    });
};

recipeController.editMyRecipe = (req, res, next) => {
  const id = parseInt(request.params.id);
  let { recipe_name, ingredients, instructions } = request.body;
  ingredients = JSON.parse(ingredients);
  instructions = JSON.parse(instructions);

  const query =
    'UPDATE users SET recipe_name = $1, ingredients = $2, instructions = $3 WHERE recipe_id = $4';
  const values = [recipe_name, ingredients, instructions, id];

  db.query(query, values)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
      next({ log: `error: recipeController.editMyRecipe` });
    });
};

recipeController.deleteMyRecipe = (req, res, next) => {
  const id = parseInt(req.params.id);
  const query = `DELETE FROM recipes WHERE recipe_id=${id}`;

  db.query(query)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
      next({ log: `error: recipeController.deleteMyRecipe` });
    });
};

recipeController.getFav = (req, res, next) => {
  const query = 'SELECT * FROM favs';

  db.query(query)
    .then((data) => {
      if (data.rows.length >= 1) {
        res.locals.favs = data.rows;
      } else {
        res.locals.favs = [];
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      next({ log: `error: recipeController.getFav` });
    });
};

recipeController.addFav = (req, res, next) => {
  const id = parseInt(req.params.id);
  const query = `INSERT INTO favs (fav_id) VALUES ($1)`;

  const values = [id];

  db.query(query, values)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
      next({ log: `error: recipeController.addFav` });
    });
};

recipeController.deleteFav = (req, res, next) => {
  const id = parseInt(req.params.id);
  const query = `DELETE FROM favs WHERE fav_id=${id}`;

  db.query(query)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
      next({ log: `error: recipeController.deleteFav` });
    });
};

module.exports = recipeController;

// CREATE TABLE recipes (
//   recipe_id INT GENERATED ALWAYS AS IDENTITY,
//   recipe_name VARCHAR NOT NULL,
//   ingredients TEXT NOT NULL,
//   instructions TEXT NOT NULL
// );

//psql postgres://esrdasbi:U2-YcIVcZ6aS0CspEGnv2yF0-uvoRm2w@queenie.db.elephantsql.com:5432/esrdasbi
