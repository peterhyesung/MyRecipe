const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/myrecipe', recipeController.getMyRecipes, (req, res) => {
  res.status(200).json(res.locals.myRecipes);
});

router.post('/myrecipe', recipeController.addMyRecipe, (req, res) => {
  res.status(200).json({ success: true });
});

router.put('/myrecipe/:id', recipeController.editMyRecipe, (req, res) => {
  res.status(200).json({ success: true });
});

router.delete('/myrecipe/:id', recipeController.deleteMyRecipe, (req, res) => {
  return res.status(200).json({ success: true });
});

router.get('/fav', recipeController.getFav, (req, res) => {
  res.status(200).json(res.locals.favs);
});

router.post('/fav/:id', recipeController.addFav, (req, res) => {
  return res.status(200).json({ success: true });
});

router.delete('/fav/:id', recipeController.deleteFav, (req, res) => {
  return res.status(200).json({ success: true });
});

module.exports = router;
