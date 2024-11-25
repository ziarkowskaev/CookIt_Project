import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";

import { ICategory, IRecipe, IRecipeParams } from "../../utils/types";
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES } from "@/graphql/queries";

const Recipes = ({ recipes }: IRecipeParams) => {
  const params = useParams();
  let recipes_updated: IRecipe[] = recipes;
  let categoryName = params?.categoryName || "";
  const result = useQuery(ALL_CATEGORIES);
  const category = result.data.allCategories.find(
    (category: ICategory) =>
      category.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (category) {
    categoryName = category.name;
    console.log(categoryName);

    recipes_updated = category.recipes || []; // Assuming `category.recipes` holds the relevant recipes
  }
  return (
    <div className="flex flex-wrap font-sans flex-col items-center">
      <div className="w-full max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semi-bold text-2xl">
            {categoryName || "MOST POPULAR RECIPES"}
          </h2>
          {/* grids shrink based on the screen for now */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
            {/* recipe names shown, needs to be clickable */}
            {recipes_updated.map((recipe: IRecipe) => (
              <div key={recipe.id}>
                {/* TODO: navigate to recipe info page on clicking cards*/}
                <Card className="flex rounded-custom items-center justify-around aspect-square">
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
