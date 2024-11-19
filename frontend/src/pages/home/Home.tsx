import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent, CardTitle } from "../../components/ui/card.tsx";
import { RecipesCarousel } from "./CarouselComp.tsx";

const Home = () => {
  return (
    <div className="flex font-sans flex-col items-center">
      <div className="w-full max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semibold text-2xl">CATEGORIES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 grid-flow-row gap-8 py-10">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card className="flex rounded-custom items-center justify-center aspect-square ">
                <CardContent className="p-6">
                  <span className="text-l font-semibold">Dish {index + 1}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="m-9 px-12">
          <h2 className="font-semibold">Search By tags</h2>
          <Input
            className="m-3 mx-auto bg-white"
            type="text"
            placeholder="Search by tags..."
          />
          <p className="font-light">
            Tags may include: ingredients, diet, country, etc...
          </p>
        </div>

        <h2 className="font-semibold text-2xl mb-4">RECIPES</h2>
        <div className="flex flex-col items-center">
          <RecipesCarousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
