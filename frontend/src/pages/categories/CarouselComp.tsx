import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";

import { useRef } from "react";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES } from "@/graphql/queries";
import { ICategory, IRecipe } from "../../utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CateogriesCarousel = () => {
  const categories = useQuery(ALL_CATEGORIES);
  const swiperRefs = useRef<{ [key: string]: SwiperCore | null }>({});
  const navigate = useNavigate();
  const handlRecipeClick = (recipeId: string) => {
    navigate(`/recipepage/${recipeId}`);
  };

  return (
    <div className="flex flex-col items-center mt-4 w-full">
      {categories.data &&
        categories.data.allCategories &&
        categories.data.allCategories.map((category: ICategory) => {
          const handleNext = () => swiperRefs.current[category.id]?.slideNext();
          const handlePrev = () => swiperRefs.current[category.id]?.slidePrev();

          return (
            <div key={category.id} className="flex flex-col px-4 py-8 w-full">
              <h2 className="font-semibold text-2xl mb-4 text-center sm:text-left w-full">
                {category.name}
              </h2>

              <div className="flex items-center justify-between w-full mt-4">
                {/* Carousel with buttons container */}
                <Button
                  className="flex bg-transparent rounded-full w-12 h-12 border-black"
                  onClick={handlePrev}
                >
                  <ArrowLeft className="size-6 text-black" />
                </Button>

                <Swiper
                  slidesPerView={1} // Default to 1 slide for very small screens
                  spaceBetween={10} // Default space between slides
                  loop={true} // Enable looping
                  breakpoints={{
                    414: { slidesPerView: 1 }, // iPhone and similar devices (1 slide)
                    640: { slidesPerView: 2 }, // Larger phones or smaller tablets (2 slides)
                    768: { slidesPerView: 3 }, // Tablets (3 slides)
                    1024: { slidesPerView: 4 }, // Small desktops (4 slides)
                  }}
                  onSwiper={(swiper) =>
                    (swiperRefs.current[category.id] = swiper)
                  }
                >
                  {category.recipes
                    .concat(category.recipes)
                    .concat(category.recipes)
                    .concat(category.recipes) // Concatenates the array with itself to add duplicates
                    .map((recipe: IRecipe) => (
                      <SwiperSlide key={recipe.id}>
                        <Card
                          onClick={() => handlRecipeClick(recipe.id)}
                          className="flex rounded-custom items-center justify-center w-full aspect-square cursor-pointer"
                        >
                          <CardContent className="p-4">
                            <CardTitle className="mb-2">
                              <span className="text-lg font-semibold">
                                {recipe.name}
                              </span>
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-600">
                              {recipe.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </SwiperSlide>
                    ))}
                </Swiper>

                <Button
                  className="flex bg-transparent rounded-full w-12 h-12 border-black"
                  onClick={handleNext}
                >
                  <ArrowRight className="size-6 text-black" />
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CateogriesCarousel;
