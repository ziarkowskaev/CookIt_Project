import Home from './pages/home/Home';
import Category from './pages/categories/Category';
import NavigationMenuApp from './pages/navbar/NavigationBar';
import { SearchRes } from './pages/search/SearchRes';
import { Profile } from './pages/profile/Profile';
import Recipes from './pages/recipes/Recipes';
import { useApolloClient, useQuery } from '@apollo/client';
import Signup from './pages/login/Signup';
import Login from './pages/login/Login';
import Recipe from './pages/Recipe';
import React, { useEffect, useState } from 'react';
import { ALL_RECIPES } from './graphql/queries';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddRecipe from './pages/addRecipe/AddRecipe';
import { IRecipe } from './utils/types';

// TODO: move routing to own file
import './App.css';
import { setUserToken } from './utils/auth';

const App = () => {
  const [token, setToken] = useState('');
  const client = useApolloClient();

  useEffect(() => {
    setUserToken({ setToken });
  }, []);

  const resultRecipes = useQuery(ALL_RECIPES);

  if (resultRecipes.loading) {
    return <div>loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <NavigationMenuApp
          userLoggedIn={token === '' ? false : true}
          setToken={setToken}
          client={client}
        />
      ),
      children: [
        {
          // path: "/",
          index: true,
          element: <Home />,
        },
        {
          path: '/categories', // TODO: category ID should be used
          element: <Category />,
        },
        {
          path: '/recipes', // TODO: should be recipe/:recipeID needs to be considered here
          element: <Recipes recipes={resultRecipes.data?.allRecipes || []} />,
          children: [],
        },
        {
          path: '/profile', // TODO:  / profile/:id user ID needs to be used here
          element: <Profile />,
        },
        {
          path: '/search',
          element: <SearchRes recipes={resultRecipes.data?.allRecipes || []} />,
        },
        {
          path: '/addRecipe',
          element: <AddRecipe />,
        },
        {
          path: '/category/:categoryName',
          element: <Recipes recipes={resultRecipes.data?.allRecipes || []} />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login setToken={setToken} />,
    },
    {
      path: '/signup',
      element: <Signup setToken={setToken} />,
    },
    {
      path: '/recipepage', // TODO: should be recipe/:recipeID needs to be considered here
      element: <Recipe />,
    },
  ]);

  return (
    <div className="flex flex-col w-screen">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
