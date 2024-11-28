import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";

import { ICategory, IRecipe, IRecipeParams } from "../../utils/types";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES } from "@/graphql/queries";

// TODO: link to each dish's recipe page
const Recipes = ({ recipes }: IRecipeParams) => {
  const navigate = useNavigate();
  const params = useParams();
  let recipes_updated: IRecipe[] = recipes;
  let categoryName = params?.categoryName || "";

  if (categoryName) {
    const result = useQuery(ALL_CATEGORIES);
    const category = result.data.allCategories.find(
      (category: ICategory) =>
        category.name.toLowerCase() === categoryName.toLowerCase()
    );
    categoryName = category.name;
    console.log(categoryName);

    recipes_updated = category.recipes || []; // Assuming `category.recipes` holds the relevant recipes
  }
  const handlRecipeClick = (recipeId: string) => {
    navigate(`/recipepage/${recipeId}`),
      {
        state: { id: recipeId },
      };
  };
  return (
    <div className="flex flex-wrap font-sans flex-col items-center">
      <div className="w-full max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semibold text-2xl mb-8">
            {categoryName || "RECIPES"}
          </h2>
          {/* grids shrink based on the screen for now */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
            {/* recipe names shown, needs to be clickable */}
            {recipes_updated.map((recipe: IRecipe) => (
              <div key={recipe.id}>
                {/* TODO: navigate to recipe info page on clicking cards*/}
                <Card
                  onClick={() => {
                    handlRecipeClick(recipe.id);
                  }}
                  className="flex rounded-custom items-center justify-around aspect-square cursor-pointer"
                >
                  <CardContent className="p-6">
                    <CardTitle>
                      <span className="text-l font-semibold">
                        {recipe.name}
                      </span>
                    </CardTitle>
                    <CardDescription>{recipe.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default Recipes;
