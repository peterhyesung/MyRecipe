import React from 'react';
import routes from '../router';
import { useRoutes, A } from 'hookrouter';

import * as Icons from 'react-icons/im';
import '../stylesheets/NavBar.scss';

function NavBar() {
  const routeResult = useRoutes(routes);

  return (
    <>
      <div className="nav-container">
        <h1>MY RECIPE</h1>
        <div className="menu">
          <A href="/home">
            <Icons.ImHome3 /> Home
          </A>
          <br />
          <A href="/myrecipe">
            <Icons.ImBook /> My Recipes
          </A>
          <br />
          <A href="/fav">
            <Icons.ImStarFull /> favorites
          </A>
          <br />
          <A href="/create">
            <Icons.ImFileText /> Create Recipe
          </A>
          <br />
          <A href="/search">
            <Icons.ImSearch /> Search Recipes
          </A>
          <br />
        </div>
      </div>
      <div>{routeResult}</div>
    </>
  );
}

export default NavBar;
