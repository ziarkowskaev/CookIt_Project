// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_FOLDER } from "@/graphql/mutations";
import { ALL_RECIPES } from "@/graphql/queries";
import { Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { IRecipe } from "@/utils/types";

// // Define TypeScript types for mutation variables and response
// interface CreateFolderVariables {
//   name: string;
// }

// interface CreateFolderResponse {
//   createFolder: {
//     id: string;
//     name: string;
//   };
// }

// // Component definition
// const AddRecipe: React.FC = () => {

//   //search by recipe name
//   //show all recipes
//   const resultRecipe = useQuery(ALL_RECIPES);

//   if(resultRecipe.loading){
//     return <div>loading ...</div>
//   }

//   const [folderData, setFolderData] = useState<CreateFolderVariables>({
//     name: "",
//   });

//   //add variabled user Id so it saved the user that created the folder

//   const [addFolder, { loading, error }] = useMutation<
//     CreateFolderResponse,
//     CreateFolderVariables
//   >(CREATE_FOLDER);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setFolderData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent): Promise<void> => {
//     e.preventDefault();
//     try {
//       await addFolder({ variables: { ...folderData } });
//       alert("Folder created successfully!");
//       setFolderData({ name: "" }); // Clear input after success
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred while creating the folder.");
//     }
//   };

//   return (
//     <Dialog>

//     </Dialog>
//   );
// };

// export default AddRecipe;

interface CreateFolderVariables {
  name: string;
}

interface CreateFolderResponse {
  createFolder: {
    id: string;
    name: string;
  };
}

const AddRecipe: React.FC = () => {
  const [folderData, setFolderData] = useState<CreateFolderVariables>({
    name: "",
  });

  // Mutation for adding the folder
  const [addFolder, { loading, error }] = useMutation<
    CreateFolderResponse,
    CreateFolderVariables
  >(CREATE_FOLDER);

  // Query for fetching all recipes
  const {
    data,
    loading: recipeLoading,
    error: recipeError,
  } = useQuery(ALL_RECIPES);

  // State for search and selected recipes
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]); // Stores selected recipe ids

  // Handle change in input field (for folder name)
  // const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   const { name, value } = e.target;
  //   setFolderData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Handle submit of the form (creating a folder)
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await addFolder({ variables: { ...folderData } });
      alert("Folder created successfully!");
      setFolderData({ name: "" }); // Clear input after success
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the folder.");
    }
  };

  // Handle recipe selection
  const handleRecipeSelection = (recipeId: string) => {
    setSelectedRecipes(
      (prev) =>
        prev.includes(recipeId)
          ? prev.filter((id) => id !== recipeId) // Deselect if already selected
          : [...prev, recipeId] // Add to selected list if not selected
    );
  };

  // Filter recipes based on search term
  const filteredRecipes = data?.allRecipes;
  console.log(filteredRecipes);
  if (recipeLoading) return <div>Loading recipes...</div>;
  if (recipeError)
    return <div>Error loading recipes: {recipeError.message}</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Add Recipes</Button>
      </DialogTrigger>

      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Select Recipes</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4"></div>

          {/* Search Bar */}
          <div className="py-4">
            <Input
              id="search"
              value={searchTerm}
              // //onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for recipes..."
              className="w-full"
            />
          </div>

          {/* Grid of Recipe Cards */}
          <div className="w-full grid sm:grid-cols-1 grid-cols-3 gap-4 py-4">
            {filteredRecipes?.slice(0, 9).map((recipe: IRecipe) => (
              <Card key={recipe.id} className="p-4 border rounded">
                <h3 className="font-semibold text-lg">{recipe.name}</h3>
                <Checkbox
                  id={recipe.id}
                  checked={selectedRecipes.includes(recipe.id)}
                  //onChange={() => handleRecipeSelection(recipe.id)}
                />
              </Card>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm">Error: {error.message}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Folder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipe;
