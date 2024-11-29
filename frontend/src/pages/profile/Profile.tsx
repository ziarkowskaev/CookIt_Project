import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { IRecipeParams, IRecipe } from '@/utils/types';
import { useNavigate } from 'react-router-dom';
// TODO: adjust spacing for grids
// TODO: the recipes should have images; and profile details needs to be updated
export const Profile = ({ recipes }: IRecipeParams) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const userRecipes = recipes.filter(
    (recipe: IRecipe) => recipe.createdBy === userId
  );
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
              "url('https://res.cloudinary.com/dcpb4zxrv/image/upload/v1732790662/samples/food/fish-vegetables.jpg')",
          }}
        >
          <Avatar className="flex h-40 w-40 transform scale-125 -bottom-20">
            <AvatarImage
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
              alt="icon representing a user"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-2xl mt-2 font-bold">Welcome, {username}</h2>
        {userRecipes.length !== 0 ? (
          <div className="flex w-full mt-10 px-10 justify-center">
            <h2 className="text-lg font-semibold">Your Recipes</h2>
          </div>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">No recipes available...</h2>
            {/* button to add recipe if no recipes created */}
            <Button
              onClick={() => {
                navigate('/addRecipe');
              }}
              className="mt-4 flex items-center justify-center px-4 py-2 text-white rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all"
            >
              <FaPlus className="mr-2" />
              Add Recipe
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-8 w-4/6 mt-20 ">
        {userRecipes?.map((recipe: IRecipe) => (
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
