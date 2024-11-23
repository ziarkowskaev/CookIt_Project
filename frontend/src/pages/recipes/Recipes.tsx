import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
// import { ALL_RECIPES } from "@/graphql/queries";
// import { useQuery } from "@apollo/client";
// import { useNavigate } from "react-router-dom";

import { Recipe, IRecipeParams } from "../../utils/types";
import { Outlet, useParams } from "react-router-dom";
const Recipes = ({ recipes }: IRecipeParams) => {
  const params = useParams();
  let recipes_updated: Recipe[] = [];
  const categoryName = params?.categoryName || "";
  if (categoryName != "") {
    recipes_updated = recipes.filter((recipe: Recipe) =>
      recipe.tags
        .map((tag) => tag.toLowerCase())
        .includes(categoryName.toLowerCase())
    );
  } else {
    recipes_updated = recipes;
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
            {recipes_updated.map((recipe: Recipe) => (
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
