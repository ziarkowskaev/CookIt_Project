import Home from "./pages/home/Home";
import Category from "./pages/categories/Category";
import NavigationMenuApp from "./pages/navbar/NavigationBar";
import { SearchRes } from "./pages/search/SearchRes";
import { Profile } from "./pages/profile/Profile";
import Recipes from "./pages/recipes/Recipes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddRecipe from "./pages/addRecipe/AddRecipe";
import {useQuery} from "@apollo/client"
import { ALL_RECIPES, FOLDERS_BY_USER } from "./graphql/queries";
import Folders from "./pages/folders/Folders";

// TODO: move routing to own file
const App = () => {

  const resultRecipes = useQuery(ALL_RECIPES)

  //should be used with context by the auth user

  const userId = "172a6cca80225447bec329b7"; 

  const resultFolders = useQuery(FOLDERS_BY_USER, {
    variables: { userId },
  });

  if(resultRecipes.loading || resultFolders.loading){
    return(
      <div>loading...</div>
    )
  }

  console.log("FOLDERS", resultFolders)

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
          element: <SearchRes recipes={resultRecipes.data?.allRecipes || []}/>,
        },
        {
          path: "/addRecipe",
          element: <AddRecipe />,
        },
        {
          path:"folders",
          element: <Folders folders={resultFolders.data?.foldersByUser || []}/>
        }
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
