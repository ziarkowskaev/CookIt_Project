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

// TODO: add more mock data to check scaling of cards
// TODO: swiper next and prev do not work
const CateogriesCarousel = () => {
  const categories = useQuery(ALL_CATEGORIES);
  const swiperRef = useRef<SwiperCore | null>(null);
  const navigate = useNavigate();
  const handleNext = () => {
    console.log(swiperRef.current?.swiper); // This should log the Swiper instance
    swiperRef.current?.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev(); // Move to the previous slide
  };
  return (
    <div className="flex flex-col items-center mt-4">
      {categories.data &&
        categories.data.allCategories &&
        categories.data.allCategories.map((category: ICategory) => (
          <div key={category.id} className="flex flex-col px-9 py-9">
            <h2 className="font-semibold text-2xl mb-8">{category.name}</h2>
            <div className="flex items-center justify-between w-full">
              <Button
                className="flex bg-transparent rounded-full w-12 h-12 border-black"
                onClick={() => {
                  handlePrev();
                  console.log("Prev clicked");
                }}
              >
                <ArrowLeft className="size-6 text-black" />
              </Button>
              <div className="w-full max-w-screen-lg mx-auto">
                <Swiper
                  slidesPerView={2} // Number of slides to show at once
                  spaceBetween={10} // Space between each slide
                  loop={true} // Loop the carousel
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                  onSwiper={(swiper) => (swiperRef.current = swiper)} // Set Swiper instance
                >
                  {/*TODO: remove the concatts; only for dummy data */}
                  {category.recipes
                    .concat(category.recipes)
                    .concat(category.recipes) // Concatenates the array with itself to add duplicates
                    .map((recipe: IRecipe) => (
                      <SwiperSlide key={recipe.id} className="min-w-[200px]">
                        <Card
                          onClick={() => navigate("/recipepage")}
                          className="flex rounded-custom items-center justify-center aspect-square w-[250px] cursor-pointer"
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
        ))}
    </div>
  );
};

export default CateogriesCarousel;
