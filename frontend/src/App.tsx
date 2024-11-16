import { useQuery } from "@apollo/client";
import { ALL_PERSONS } from "./queries";
import Home from "./pages/home/Home";
import Category from "./pages/categories/Category";
import { NavigationMenuApp } from "./pages/navbar/NavigationBar";
import { SearchRes } from "./pages/search/SearchRes";
import { Profile } from "./pages/profile/Profile";
import { Recipes } from "./pages/recipes/Recipes";
import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddRecipe from "./pages/addRecipe/Add";

const App = () => {
  const result = useQuery(ALL_PERSONS);
  console.log(result);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/categories", // TODO: category ID should be used
      element: <Category />,
    },
    {
      path: "/recipes", // TODO: should be recipe/:recipeID needs to be considered here
      element: <Recipes />,
    },
    {
      path: "/profile", // TODO:  / profile/:id user ID needs to be used here
      element: <Profile />,
    },
    {
      path: "/search",
      element: <SearchRes />,
    },
    {
      path: "/addRecipe",
      element: <AddRecipe />,
    },
  ]);

  if (result.loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="flex flex-col lg:w-screen justify-around">
      <NavigationMenuApp />
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
};

export default App;
