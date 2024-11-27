import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent } from "../../components/ui/card.tsx";
import { RecipesCarousel } from "./CarouselComp.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ALL_CATEGORIES, ALL_RECIPES } from "@/graphql/queries.ts";
import { useQuery } from "@apollo/client";
import { ICategory } from "@/utils/types.tsx";

const Home = () => {
  const navigate = useNavigate();
  const result = useQuery(ALL_CATEGORIES);
  const resultRecipes = useQuery(ALL_RECIPES);
  const handleCategoryClick = (categoryName: string) => {
    // Navigate to the category page dynamically based on the selected category
    navigate(`/category/${categoryName.toLowerCase()}`);
  };
  const [searchTags, setSearchTags] = useState("");
  // console.log(result);
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const processedTags = searchTags
        .replace(/[^a-zA-Z,]/g, "") // Removes everything except alphabetic characters and commas
        .replace(/\s+/g, "")
        .replace(/[, ]+/g, "%");
      if (processedTags) {
        navigate(`/search?tags=${processedTags}`);
      }
    }
  };

  return (
    <div className="flex font-sans flex-col items-center">
      <div className="w-full mt-10 max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semibold text-2xl">CATEGORIES</h2>
          {/* scrollable categories container to fit all categories in database */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 grid-flow-row gap-8 py-10 overflow-y-auto"
            style={{
              maxHeight: "500px",
              scrollbarWidth: "auto",
            }}
          >
            {result.data &&
              result.data.allCategories.map((category: ICategory) => (
                <Card
                  key={category.name}
                  onClick={() => {
                    handleCategoryClick(category.name);
                  }}
                  className="flex rounded-custom items-center justify-center aspect-square cursor-pointer "
                >
                  <CardContent className="p-6">
                    <span className="text-l font-semibold">
                      {category.name}
                    </span>
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
            value={searchTags}
            onChange={(e) => setSearchTags(e.target.value)}
            onKeyDown={handleSearch}
          />
          <p className="font-light">
            Tags may include: ingredients, diet, country, etc...
          </p>
        </div>

        <h2 className="font-semibold text-2xl mb-4">RECIPES</h2>
        <div className="flex flex-col w-full items-center">
          <RecipesCarousel recipes={resultRecipes.data?.allRecipes} />
        </div>
      </div>
    </div>
  );
};

export default Home;
