import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { type CarouselApi } from "../../components/ui/carousel";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Recipe } from "@/utils/types";

// TODO: change to suit our needs
export function RecipesCarousel({ recipes }: IRecipeParams) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <div className="flex flex-row items-center justify-between">
      <Button
        className="flex bg-transparent rounded-full w-12 h-12 border-black"
        onClick={() => api?.scrollTo(current - 1)}
      >
        <ArrowLeft className="size-6 text-black"></ArrowLeft>
      </Button>
      <div className="px-3">
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent className="-ml-1">
            {recipes.slice(0, 12).map((recipe: Recipe) => (
              <CarouselItem key={recipe.id} className="sm:basis-1/5">
                <div className="p-1">
                  <Card className="flex rounded-3xl aspect-square">
                    {/* aspect square below centers the elements in the square */}
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-l font-semibold">
                        {recipe.name}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <Button
        className="flex bg-transparent rounded-full w-12 h-12 border-black"
        onClick={() => api?.scrollTo(current + 1)}
      >
        <ArrowRight className="size-6 text-black"></ArrowRight>
      </Button>
    </div>
  );
}
