import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { type CarouselApi } from '../../components/ui/carousel';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_CATEGORIES } from '@/graphql/queries';

import { IRecipe } from '../../utils/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../../components/ui/carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// TODO: add more mock data to check scaling of cards
const CateogriesCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const categories = useQuery(ALL_CATEGORIES);
  console.log(categories);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <div className="flex flex-col justify-between mt-20">
      {categories.data &&
        categories.data.allCategories &&
        categories.data.allCategories.map(
          (category: { id: string; name: string; recipes: IRecipe[] }) => (
            <div key={category.id} className="flex flex-col px-9 py-9">
              <h2 className="font-semibold text-2xl mb-8">{category.name}</h2>
              <div className="flex flex-row items-center justify-between">
                <Button
                  className="flex bg-transparent rounded-full w-12 h-12 border-black"
                  onClick={() => api?.scrollTo(current - 1)}
                >
                  <ArrowLeft className="size-6 text-black"></ArrowLeft>
                </Button>
                <Carousel setApi={setApi} opts={{ loop: true }}>
                  <CarouselContent>
                    {category.recipes.map((recipe: IRecipe) => (
                      <div key={recipe.id}>
                        <CarouselItem>
                          <div key={recipe.id}>
                            <Card className="flex flex-col justify-between w-full h-full rounded-3xl shadow-lg bg-white">
                              {/* aspect square below centers the elements in the square */}
                              <CardHeader className="flex gap-4 items-center">
                                {' '}
                                <CardTitle className="px-4 ">
                                  {recipe.name}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="flex-grow p-4">
                                <span className="text-l font-light">
                                  {recipe.description}
                                </span>
                              </CardContent>
                              <CardFooter></CardFooter>
                            </Card>
                          </div>
                        </CarouselItem>
                      </div>
                    ))}
                  </CarouselContent>
                </Carousel>
                <Button
                  className="flex bg-transparent rounded-full w-12 h-12 border-black"
                  onClick={() => api?.scrollTo(current + 1)}
                >
                  <ArrowRight className="size-6 text-black"></ArrowRight>
                </Button>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default CateogriesCarousel;
