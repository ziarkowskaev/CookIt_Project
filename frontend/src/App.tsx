import Home from "./pages/home/Home";
import Category from "./pages/categories/Category";
import NavigationMenuApp from "./pages/navbar/NavigationBar";
import { SearchRes } from "./pages/search/SearchRes";
import { Profile } from "./pages/profile/Profile";
import Recipes from "./pages/recipes/Recipes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddRecipe from "./pages/addRecipe/Add";
import {useQuery} from "@apollo/client"
import { ALL_RECIPES } from "./graphql/queries";

// TODO: move routing to own file
const App = () => {

  const resultRecipes = useQuery(ALL_RECIPES)

  if(resultRecipes.loading){
    return(
      <div>loading...</div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavigationMenuApp />,
      children: [
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
          element: <Recipes recipes={resultRecipes.data?.allRecipes || []}/>,
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
      ],
    },
  ]);

  // if (result.loading) {
  //   return <div>loading...</div>;
  // }

  return (
    <div className="flex flex-col w-screen h-screen">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
