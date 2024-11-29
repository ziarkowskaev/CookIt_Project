/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Card, CardContent } from "../../components/ui/card.tsx";
// import { RecipesCarousel } from "./CarouselComp.tsx";
import { useQuery } from "@apollo/client";
import { GET_FOLDER } from "@/graphql/queries.ts";
import { IRecipe } from "@/utils/types.tsx";
import { Label } from "@/components/ui/label.tsx";
import EditFolder from "./EditFolder.tsx";
import AddRecipe from "./AddRecipesFolder.tsx";
import { useNavigate, useParams } from "react-router-dom";

// TODO: the recipes need to be from the user folder; change the query
// TODO: check responsiveness; reconisder inner div container
const Folder = () => {
  const params = useParams();
  const folderId = params?.folderId || "";
  const navigate = useNavigate();
  // const userId = resultUser.data?.me?.id;
  console.log(folderId);

  const { data, loading } = useQuery(GET_FOLDER, {
    variables: { folderId },
    skip: !folderId, // Prevent the query from running if recipeId is undefined
  });

  if (loading) {
    return <div>loading...</div>;
  }
  const resultFolder = data?.folder;
  console.log(resultFolder);

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipepage/${recipeId}`),
      {
        state: { id: recipeId },
      };
  };
  return (
    <div className="flex font-sans mt-20 w-full justify-center">
      <div
        className="bg-gray-200 rounded-lg shadow-lg overflow-auto p-6 "
        style={{
          maxHeight: "4500px", // Restrict the height
          scrollbarWidth: "thin", // Optional scrollbar styling
        }}
      >
        <div className="flex flex-row w-full justify-between">
          <h2 className="font-bold text-xl">{resultFolder.name}</h2>
          <EditFolder />
        </div>
        <div className="mb-10">
          <Label className="font-light">Users: </Label>
          {resultFolder && (
            <span className="ml-1 font-semibold">
              {resultFolder.users
                .map((user: { id: string; username: string }) => user.username)
                .join(", ")}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {resultFolder &&
            resultFolder.recipes.map((recipe: IRecipe) => (
              <Card
                onClick={() => {
                  handleRecipeClick(recipe.id);
                }}
                key={recipe.id}
                className="flex flex-col rounded-custom items-center justify-center aspect-square cursor-pointer "
              >
                <CardContent className="p-6">
                  <span className="text-l font-semibold">{recipe.name}</span>
                </CardContent>
              </Card>
            ))}
          <Card className="flex rounded-custom items-center justify-center aspect-square cursor-pointer">
            <CardContent className="mt-4">
              <AddRecipe folderId={resultFolder.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Folder;
