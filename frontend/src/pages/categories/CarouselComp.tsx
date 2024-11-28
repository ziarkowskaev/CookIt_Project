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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// TODO: add more mock data to check scaling of cards
// TODO: ERROR on refreshing page
const CateogriesCarousel = () => {
  const categories = useQuery(ALL_CATEGORIES);
  const navigate = useNavigate();
  const handlRecipeClick = (recipeId: string) => {
    navigate(`/recipepage/${recipeId}`);
  };
  return (
    <div className="flex flex-col items-center mt-4 px-4 sm:px-6 lg:px-8">
      {categories.data &&
        categories.data.allCategories &&
        categories.data.allCategories.map((category: ICategory) => {
          //swiper ref for each category
          const swiperRef = useRef<any>(null);
          console.log(swiperRef);
          // Scoped navigation functions
          const handleNext = () => swiperRef.current?.slideNext();
          const handlePrev = () => swiperRef.current?.slidePrev();
          return (
            <div key={category.id} className="flex flex-col py-9">
              <h2 className="font-semibold text-xl sm:text-xl md:text-xl lg:text-xl mb-8 text-center sm:text-left md:text-left w-full">
                {category.name}
              </h2>
              <div className="flex items-center justify-between w-full">
                {/* carousel with buttons container */}
                <Button
                  className="flex bg-transparent rounded-full w-12 h-12 border-black"
                  onClick={handlePrev}
                >
                  <ArrowLeft className="size-6 text-black" />
                </Button>
                <div className="w-full max-w-screen-lg mx-auto">
                  <Swiper
                    slidesPerView={1} // Default to 1 slide for very small screens
                    spaceBetween={10} // Default space between slides
                    loop={true} // Enable looping
                    breakpoints={{
                      414: { slidesPerView: 1 }, // iPhone and similar devices
                      640: { slidesPerView: 2 }, // Larger phones or smaller tablets
                      768: { slidesPerView: 3 }, // Tablets
                      1024: { slidesPerView: 4 }, // Small desktops
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                  >
                    {/*TODO: remove the concatts; only for dummy data */}
                    <div>
                      {category.recipes
                        .concat(category.recipes)
                        .concat(category.recipes)
                        .concat(category.recipes) // Concatenates the array with itself to add duplicates
                        .map((recipe: IRecipe) => (
                          <SwiperSlide key={recipe.id}>
                            <Card
                              onClick={() => handlRecipeClick(recipe.id)}
                              className="flex rounded-custom items-center justify-center w-full w-[250px]  aspect-square cursor-pointer"
                            >
                              <CardContent className="p-6">
                                <CardTitle className="mb-2">
                                  <span className="text-l font-semibold">
                                    {recipe.name}
                                  </span>
                                </CardTitle>
                                <CardDescription>
                                  {recipe.description}
                                </CardDescription>
                              </CardContent>
                            </Card>
                          </SwiperSlide>
                        ))}
                    </div>
                  </Swiper>
                </div>
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
