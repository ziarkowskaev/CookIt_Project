import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { IRecipeParams, IRecipe } from "@/utils/types";
// TODO: profile information needs to be changed
// TODO: adjust spacing for grids
// TODO: the recipes should have images; and profile details needs to be updated
export const Profile = ({ recipes }: IRecipeParams) => {
  console.log(recipes);
  return (
    <div className="flex flex-col justify-between items-center mt-8">
      <div className="flex flex-col w-full items-center">
        <div
          className="flex relative w-5/6 h-60 rounded-3xl justify-around items-center mb-20 bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/fresh-herbs-spices-peppers-dill-parsley-black-background-place-text-culinary-concept-background-menu-recipe_114106-2324.jpg')",
          }}
        >
          <Avatar className="flex h-40 w-40 transform scale-125 -bottom-20">
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_HSB_gtlk4EHhc65xUBw6okNw6gkkrZsdiXSY_GDe80Ks1GY8Edr0s5y6lIuwwXNUpE&usqp=CAU"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-xl mt-2 font-semibold">Garfield the Cat</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 grid-flow-row gap-8 w-4/6 mt-20 ">
        {recipes
          .filter(
            (recipe: IRecipe) => recipe.createdBy === "172a6cca80225447bec329b7"
          )
          .map((recipe: IRecipe) => (
            <Card
              key={recipe.id}
              className="flex flex-col rounded-custom items-center justify-center aspect-square"
            >
              <CardTitle className="flex justify-start">
                {recipe.name}
              </CardTitle>
              <CardContent className="p-6">
                <span className="text-l font-light">{recipe.description}</span>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
