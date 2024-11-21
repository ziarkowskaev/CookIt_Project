import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ALL_RECIPES } from "@/graphql/queries";

import { useQuery } from "@apollo/client";
import { TypeSystemDefinitionNode } from "graphql";
// import { useNavigate } from "react-router-dom";

import { Recipe } from "../../utils/types";

// TODO: navigation to recipe page

const Recipes = () => {
  const result = useQuery(ALL_RECIPES);
  // const navigate = useNavigate(); // should be used to go to recipe page
  return (
    <div className="flex flex-wrap font-sans flex-col items-center">
      <div className="w-full max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semibold text-2xl">MOST POPULAR RECIPES</h2>
          {/* grids shrink based on the screen for now */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
            {/* recipe names shown, needs to be clickable */}
            {result.data &&
              result.data.allRecipes &&
              result.data.allRecipes.map((recipe: Recipe) => (
                <div key={recipe.id}>
                  <Card className="flex rounded-custom items-center justify-around aspect-square">
                    <CardContent className="p-6">
                      <CardTitle>
                        <span className="text-l font-semibold">
                          {recipe.name}
                        </span>
                      </CardTitle>
                      <CardDescription className="">
                        {recipe.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recipes;
