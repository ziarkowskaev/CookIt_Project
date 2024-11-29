import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore from "swiper";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { IRecipe, IRecipeParams } from "@/utils/types";
import { useNavigate } from "react-router-dom";

// TODO: change to suit our needs
export function RecipesCarousel({ recipes }: IRecipeParams) {
  const swiperRef = useRef<SwiperCore | null>(null);
  const navigate = useNavigate();
  const handleNext = () => {
    swiperRef.current?.slideNext(); // Move to the next slide
  };
  const handlePrev = () => {
    swiperRef.current?.slidePrev(); // Move to the previous slide
  };
  const handlRecipeClick = (recipeId: string) => {
    navigate(`/recipepage/${recipeId}`);
  };

  return (
    <div className="flex flex-row items-center">
      <Button
        className="flex bg-transparent rounded-full w-12 h-12 border-black"
        onClick={handlePrev}
      >
        <ArrowLeft className="size-6 text-black"></ArrowLeft>
      </Button>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Set Swiper instance
        spaceBetween={10}
        slidesPerView={1} // Number of slides to show
        breakpoints={{
          414: { slidesPerView: 1 }, // iPhone and similar devices
          640: { slidesPerView: 2 }, // Larger phones or smaller tablets
          768: { slidesPerView: 3 }, // Tablets
          1024: { slidesPerView: 4 }, // Small desktops
        }}
        loop={true}
      >
        <div>
          {recipes.map((recipe: IRecipe) => (
            <SwiperSlide key={recipe.id}>
              <Card
                onClick={() => handlRecipeClick(recipe.id)}
                className="flex rounded-custom items-center justify-center w-full aspect-square cursor-pointer"
              >
                <CardContent className="p-4">
                  <CardTitle className="mb-2">
                    <span className="text-lg font-semibold">{recipe.name}</span>
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {recipe.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      <Button
        className="flex bg-transparent rounded-full w-12 h-12 border-black"
        onClick={handleNext}
      >
        <ArrowRight className="size-6 text-black"></ArrowRight>
      </Button>
    </div>
  );
}
