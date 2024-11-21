import Home from './pages/home/Home';
import Category from './pages/categories/Category';
import NavigationMenuApp from './pages/navbar/NavigationBar';
import { SearchRes } from './pages/search/SearchRes';
import { Profile } from './pages/profile/Profile';
import Recipes from './pages/recipes/Recipes';
import { useApolloClient } from '@apollo/client';
import Signup from './pages/login/Signup';
import Login from './pages/login/Login';
import Recipe from './pages/Recipe';
import React, { useEffect, useState } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddRecipe from './pages/addRecipe/Add';

// TODO: move routing to own file
import './App.css';

const App = () => {
  // TODO: change to using context instead of token for authenticating user
  const [token, setToken] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const client = useApolloClient();

  useEffect(() => {
    const userAuthToken = window.localStorage.getItem('user-auth-token');
    if (userAuthToken) {
      setToken(userAuthToken);
    }
  }, []);

  // TODO: extract to same component/dir as login and signup
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  // TODO: extract to separate component
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavigationMenuApp />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/categories', // TODO: category ID should be used
          element: <Category />,
        },
        {
          path: '/recipes', // TODO: should be recipe/:recipeID needs to be considered here
          element: <Recipes />,
        },
        {
          path: '/profile', // TODO:  / profile/:id user ID needs to be used here
          element: <Profile />,
        },
        {
          path: '/search',
          element: <SearchRes />,
        },
        {
          path: '/addRecipe',
          element: <AddRecipe />,
        },
      ],
    },
    // {
    //   path: "/login",
    //   element: <Login setToken={setToken}/>,
    // },
    {
      path: '/recipepage', // TODO: should be recipe/:recipeID needs to be considered here
      element: <Recipe />,
    },
  ]);

  // if (result.loading) {
  //   return <div>loading...</div>;
  // }

  // TODO: extract to separate component
  if (!token) {
    // return (
    // <>
    //   <LoginForm setToken={setToken}/>
    // </>
    // )
    return (
      <>
        {showLogin ? (
          <Login setToken={setToken} setShowLogin={setShowLogin} />
        ) : (
          <Signup setToken={setToken} setShowLogin={setShowLogin} />
        )}
      </>
    );
  }

  return (
    <div>
      <div>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </div>
    </div>
  );
};

export default App;
