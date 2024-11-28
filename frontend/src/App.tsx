import Home from "./pages/home/Home";
import Category from "./pages/categories/Category";
import NavigationMenuApp from "./pages/navbar/NavigationBar";
import { SearchRes } from "./pages/search/SearchRes";
import { Profile } from "./pages/profile/Profile";
import Recipes from "./pages/recipes/Recipes";
import { useApolloClient, useQuery } from "@apollo/client";
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import Recipe from "./pages/recipes/Recipe";
import { useEffect, useState } from "react";
import { ALL_RECIPES, AUTH_USER } from "./graphql/queries";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddRecipe from "./pages/addRecipe/AddRecipe";
// import { IRecipe } from "./utils/types";
import Folders from "./pages/folders/Folders";

// TODO: move routing to own file
import "./App.css";
import { setUserToken } from "./utils/auth";
import Folder from "./pages/folders/Folder";
import ProtectedRoute from "./routes/routes";

const App = () => {
  const [token, setToken] = useState("");
  const client = useApolloClient();

  useEffect(() => {
    setUserToken({ setToken });
  }, []);

  const resultRecipes = useQuery(ALL_RECIPES);

  //should be used with context by the auth user

  const resultUser = useQuery(AUTH_USER);

  useEffect(() => {
    console.log("useEffect happened: User id:", userId);
  }, [resultUser.data]);
  // TODO:the userID breaks the code somehow

  const userId = resultUser.data?.me?.id;

  if (resultRecipes.loading) {
    return <div>loading...</div>;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <NavigationMenuApp
          userLoggedIn={token === "" ? false : true}
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
          path: "/categories", // TODO: category ID should be used
          element: <Category />,
        },
        {
          path: "/recipes", // TODO: should be recipe/:recipeID needs to be considered here
          element: <Recipes recipes={resultRecipes.data?.allRecipes || []} />,
          children: [],
        },
        {
          path: "/profile", // TODO:  / profile/:id user ID needs to be used here
          element: (
            <ProtectedRoute userLoggedIn={token !== ""}>
              <Profile recipes={resultRecipes.data?.allRecipes || []} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/search",
          element: <SearchRes recipes={resultRecipes.data?.allRecipes || []} />,
        },
        {
          path: "/addRecipe",
          element: (
            <ProtectedRoute userLoggedIn={token !== ""}>
              <AddRecipe />
            </ProtectedRoute>
          ),
        },
        {
          path: "folders",
          element: (
            <ProtectedRoute userLoggedIn={token !== ""}>
              <Folders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/category/:categoryName",
          element: <Recipes recipes={resultRecipes.data?.allRecipes || []} />,
        },
        {
          path: "/folder/:folderId",
          element: (
            <ProtectedRoute userLoggedIn={token !== ""}>
              <Folder />
            </ProtectedRoute>
          ),
        },
        {
          path: "/recipepage/:recipeId", // TODO: should be recipe/:recipeID needs to be considered here
          element: <Recipe />,
        },
        {
          path: "/login",
          element: <Login setToken={setToken} />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <div className="flex flex-col w-screen">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
