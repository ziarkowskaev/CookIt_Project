// import { Card, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import CateogriesCarousel from "./CarouselComp";
// import { useQuery } from "@apollo/client";
// import { ALL_CATEGORIES } from "@/graphql/queries";

const Category = () => {
  // const categories = useQuery(ALL_CATEGORIES);
  return (
    <div className="flex flex-col w-full items-center">
      <div className=" mt-4">
        <CateogriesCarousel />
      </div>
    </div>
  );
};
export default Category;
