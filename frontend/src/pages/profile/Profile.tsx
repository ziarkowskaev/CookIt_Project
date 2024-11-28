import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { IRecipeParams, IRecipe } from "@/utils/types";
import { useNavigate } from "react-router-dom";
// TODO: adjust spacing for grids
// TODO: the recipes should have images; and profile details needs to be updated
export const Profile = ({ recipes }: IRecipeParams) => {

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const handlRecipeClick = (recipeId: string) => {
    navigate(`/recipepage/${recipeId}`),
      {
        state: { id: recipeId },
      };
  };
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
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_HSB_gtlk4EHhc65xUBw6okNw6gkkrZsdiXSY_GDe80Ks1GY8Edr0s5y6lIuwwXNUpE&usqp=CAU"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-xl mt-2 font-semibold">{username}</h2>
      </div>
      <h2>Created Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  grid-flow-row gap-8 w-4/6 mt-20 ">
        {recipes
          .filter((recipe: IRecipe) => recipe.createdBy === userId)
          .map((recipe: IRecipe) => (
            <Card
              key={recipe.id}
              onClick={() => {
                handlRecipeClick(recipe.id);
              }}
              className="flex flex-col rounded-custom items-center aspect-square cursor-pointer"
            >
              <CardContent className="mt-4">
                <CardTitle className="font-semibold text-md">
                  {recipe.name}
                </CardTitle>
                <CardDescription> {recipe.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
