import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, ChangeEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_RECIPES_TO_FOLDER } from "@/graphql/mutations";
import { ALL_RECIPES } from "@/graphql/queries";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const AddRecipe = (folderId: { folderId: string }) => {
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, loading, refetch } = useQuery(ALL_RECIPES, {
    variables: { search: searchQuery },
  });

  const [addRecipesToFolder, { loading: adding }] = useMutation(
    ADD_RECIPES_TO_FOLDER
  );

  const toggleRecipeSelection = (recipeId: string) => {
    setSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    refetch({ search: e.target.value });
  };

  const handleAddRecipes = async () => {
    try {
      console.log(folderId);
      console.log(selectedRecipes);

      await addRecipesToFolder({
        variables: { folderId: folderId.folderId, recipesId: selectedRecipes },
      });
      alert("Recipes added successfully!");
      setSelectedRecipes([]);
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding recipes to the folder.");
    }
  };

  return (
    // removed asChild
    <Dialog>
      <DialogTrigger>
        {/* added an icon to for recipes */}
        <Button
          className="flex justify-center items-center w-full h-full"
          variant="ghost"
        >
          <FaPlus className="text-gray-400 text-xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Recipes</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={handleSearch}
            className="mb-4"
          />
          {loading && <div>Loading recipes...</div>}
          {data && (
            <div className="grid grid-cols-3 gap-4">
              {data.allRecipes.map((recipe: { id: string; name: string }) => (
                <Card
                  key={recipe.id}
                  className="relative p-4 border h-24 flex justify-center items-center"
                >
                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedRecipes.includes(recipe.id)}
                      onChange={() => toggleRecipeSelection(recipe.id)}
                    />
                  </div>
                  <div className="text-center">{recipe.name}</div>
                </Card>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleAddRecipes} disabled={adding}>
            {adding ? "Adding..." : "Add Selected Recipes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipe;
