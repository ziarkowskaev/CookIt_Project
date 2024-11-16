import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// TODO: add destination to post recipe
const AddRecipe = () => {
  return (
    <div className="w-screen h-screen bg-lilac">
      <div className="w-screen h-screen px-8 py-4">
        <form className="flex w-full h-full" method="GET" action="/">
          {/* Recipe image and Recipe Name */}
          <Card className="flex flex-col w-full h-full rounded-2xl bg-cream">
            <CardHeader className="font-bold">Add a recipe</CardHeader>
            <CardContent className="flex h-1/3 gap-10 items-center">
              <input
                className="bg-white px-2 w-1/3 h-10 mt-10 rounded-none"
                id="picture"
                type="file"
              />
              <input
                className="bg-white px-3 w-1/3 h-10 mt-10"
                id="recipeName"
                type="text"
                placeholder="Recipe Name"
              />
            </CardContent>
            <CardContent className="flex w-full h-full justify-around items-center">
              <Card className="flex flex-col w-full h-full mt-10 px-10 justify-top border-none rounded-custom bg-beige">
                <div className="flex flex-col w-full mt-10 gap-1.5">
                  {/* text area to add ingredients */}
                  <Label>Ingredients</Label>
                  <textarea
                    className="bg-white w-2/3 h-[100px] p-2 rounded-md border border-gray-300 resize-none"
                    name="ingredients" // Add 'name' for backend identification
                    id="ingredients"
                    placeholder="Ingredients.."
                  ></textarea>
                </div>
                <div className="flex grid w-full mt-8 items-center gap-1.5">
                  {/* text area to add instructions */}
                  <Label>Instructions</Label>
                  <textarea
                    className="bg-white w-2/3 h-[100px] p-2 rounded-md border border-gray-300 resize-none"
                    name="instructions" // Add 'name' for backend identification
                    id="instructions"
                    placeholder="Describe instructions for your recipe here"
                  ></textarea>
                </div>
                {/* Public and Creating buttons */}
                <div className="flex gap-4 mt-5">
                  <div>
                    <input
                      type="checkbox"
                      id="makePublic"
                      className="mr-2 bg-white"
                    />
                    <label
                      htmlFor="makePublic"
                      className="text-sm font-medium leading-none"
                    >
                      Make it public
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-black hover:bg-gray-400 active:bg-gray-500 text-white px-4 py-2 text-sm rounded-md"
                  >
                    Create Recipe
                  </button>
                </div>
              </Card>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
