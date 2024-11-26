// import Home from "../pages/home/Home";
// import Category from "../pages/categories/Category";
// import NavigationMenuApp from "../pages/navbar/NavigationBar";
// import { SearchRes } from "../pages/search/SearchRes";
// import { Profile } from "../pages/profile/Profile";
// import Recipes from "../pages/recipes/Recipes";
// import { createBrowserRouter } from "react-router-dom";
// import AddRecipe from "../pages/addRecipe/AddRecipe";
// import { useQuery } from "@apollo/client";
// import { ALL_RECIPES } from "../graphql/queries";
// import Folders from "../pages/folders/Folders";
// // TODO: move routing to own file

// const resultRecipes = useQuery(ALL_RECIPES);

// if (resultRecipes.loading) {
//   <div>loading...</div>;
// }

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <NavigationMenuApp />,
//     children: [
//       {
//         // path: "/",
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/categories",
//         element: <Category />,
//       },
//       {
//         path: "/recipes", // TODO: should be recipe/:recipeID needs to be considered here
//         element: <Recipes recipes={resultRecipes.data?.allRecipes || []} />,
//         children: [],
//       },
//       {
//         path: "/profile", // TODO:  / profile/:id user ID needs to be used here
//         element: <Profile />,
//       },
//       {
//         path: "/search",
//         element: <SearchRes recipes={resultRecipes.data?.allRecipes || []} />,
//       },
//       {
//         path: "/addRecipe",
//         element: <AddRecipe />,
//       },
//       {
//         path: "/category/:categoryName",
//         element: <Recipes recipes={resultRecipes.data?.allRecipes || []} />,
//       },
//       {
//         path: "/folders",
//         element: <Folders />,
//       },
//     ],
//   },
// ]);
// export default router;
