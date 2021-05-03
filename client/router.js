import React from 'react';
import Home from './components/Home';
import MyRecipe from './components/MyRecipe';
import CreateRecipe from './components/CreateRecipe';
import SearchRecipe from './components/SearchRecipe';
import Fav from './components/Fav';

const routes = {
  '/home': () => <Home />,
  '/myrecipe': () => <MyRecipe />,
  '/create': () => <CreateRecipe />,
  '/search': () => <SearchRecipe />,
  '/fav': () => <Fav />,
};

export default routes;
