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

  const swiperRef = useRef<any>(null);
  
  return (
    <div className="flex flex-col items-center mt-4 px-4 sm:px-6 lg:px-8">
      {categories.data &&
        categories.data.allCategories &&
        categories.data.allCategories.map((category: ICategory) => {
          //swiper ref for each category
          console.log(swiperRef);
          // Scoped navigation functions
          const handleNext = () => swiperRef.current?.slideNext();
          const handlePrev = () => swiperRef.current?.slidePrev();
          return (
            <div key={category.id} className="flex flex-col px-9 py-9">
              <h2 className="font-semibold text-2xl mb-8">{category.name}</h2>
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
                    slidesPerView={4} // Default to 1 slide for very small screens
                    spaceBetween={12} // Default space between slides
                    loop={true} // Enable looping
                    breakpoints={{
                      640: { slidesPerView: 1, spaceBetween: 16 }, // Small screens
                      768: { slidesPerView: 2, spaceBetween: 20 }, // Medium screens
                      1024: { slidesPerView: 3, spaceBetween: 24 }, // Large screens
                      1280: { slidesPerView: 4, spaceBetween: 32 }, // Extra large screens
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                  >
                    {/*TODO: remove the concatts; only for dummy data */}
                    {category.recipes
                      .concat(category.recipes)
                      .concat(category.recipes)
                      .concat(category.recipes) // Concatenates the array with itself to add duplicates
                      .map((recipe: IRecipe) => (
                        <SwiperSlide key={recipe.id}>
                          <Card
                            onClick={() => handlRecipeClick(recipe.id)}
                            className="flex rounded-custom items-center justify-center w-[250px] aspect-square cursor-pointer"
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
