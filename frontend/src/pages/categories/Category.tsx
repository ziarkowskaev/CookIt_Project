// import { Card, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import CateogriesCarousel from "./CarouselComp";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES } from "@/graphql/queries";

const Category = () => {
  const categories = useQuery(ALL_CATEGORIES);
  console.log(categories);
  return (
    <div className="flex flex-col items-center">
      <div className="flex-grow mt-4">
        <CateogriesCarousel />
      </div>
    </div>
  );
};
export default Category;
