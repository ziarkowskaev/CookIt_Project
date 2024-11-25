import { Input } from "@/components/ui/input.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.tsx";
// import { RecipesCarousel } from "./CarouselComp.tsx";
import { useQuery } from "@apollo/client";
import { ALL_RECIPES } from "@/graphql/queries.ts";
import { IRecipe } from "@/utils/types.tsx";

// TODO: the recipes need to be from the user folder; change the query
// TODO: check responsiveness; reconisder inner div container
const Folder = () => {
  const result = useQuery(ALL_RECIPES);
  return (
    <div className="flex font-sans mt-20 w-full justify-center">
      <div
        className="bg-gray-200 rounded-lg shadow-lg overflow-auto p-6 "
        style={{
          maxHeight: "4500px", // Restrict the height
          scrollbarWidth: "thin", // Optional scrollbar styling
        }}
      >
        <h2 className="font-bold text-xl mb-4">Folder name here</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {result.data &&
            result.data.allRecipes.map((recipe: IRecipe) => (
              <Card
                key={recipe.name}
                className="flex flex-col rounded-custom items-center justify-center aspect-square cursor-pointer "
              >
                <CardContent className="p-6">
                  <span className="text-l font-semibold">{recipe.name}</span>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Folder;
