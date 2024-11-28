import { Card, CardContent } from "../../components/ui/card.tsx";
// import CateogriesCarousel from "./CarouselComp";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES } from "@/graphql/queries";
import { ICategory } from "@/utils/types";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const categories = useQuery(ALL_CATEGORIES);
  const handleCategoryClick = (categoryName: string) => {
    // Navigate to the category page dynamically based on the selected category
    navigate(`/category/${categoryName.toLowerCase()}`);
  };
  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full mt-10 max-w-screen-lg px-8">
        <div className="mt-10">
          <h2 className="font-semibold text-2xl mb-8">CATEGORIES</h2>
          {/* scrollable categories container to fit all categories in database */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-flow-row gap-8"
            style={{
              maxHeight: "500px",
              scrollbarWidth: "auto",
            }}
          >
            {categories.data &&
              categories.data.allCategories.map((category: ICategory) => (
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
      </div>
    </div>
  );
};
export default Category;
