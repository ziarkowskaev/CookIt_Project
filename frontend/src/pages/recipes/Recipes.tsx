import { Card, CardContent } from "@/components/ui/card";
import { ALL_RECIPES } from "@/graphql/queries";

import { useQuery } from "@apollo/client";

const Recipes = () => {
  const recipes = useQuery(ALL_RECIPES);
  console.log(recipes);
  return (
    <div className="flex flex-wrap font-sans flex-col items-center">
      <div className="w-full max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semibold text-2xl">MOST POPULAR RECIPES</h2>
          {/* grids shrink based on the screen for now */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
            {Array.from({ length: 12 }).map((_, index) => (
              <Card className="flex rounded-custom items-center justify-around aspect-square">
                <CardContent className="p-6">
                  <span className="text-l font-semibold">DISH {index + 1}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recipes;
