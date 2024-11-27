import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_FOLDER } from "@/graphql/mutations";
import { ALL_RECIPES } from "@/graphql/queries";
import { Car } from "lucide-react";
import { Card } from "@/components/ui/card";

// Define TypeScript types for mutation variables and response
interface CreateFolderVariables {
  name: string;
}

interface CreateFolderResponse {
  createFolder: {
    id: string;
    name: string;
  };
}

// Component definition
const AddRecipe: React.FC = () => {

  //search by recipe name 
  //show all recipes
  const resultRecipe = useQuery(ALL_RECIPES);

  if(resultRecipe.loading){
    return <div>loading ...</div>
  }
  
  const [folderData, setFolderData] = useState<CreateFolderVariables>({
    name: "",
  });

  //add variabled user Id so it saved the user that created the folder

  const [addFolder, { loading, error }] = useMutation<
    CreateFolderResponse,
    CreateFolderVariables
  >(CREATE_FOLDER);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFolderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Add Recipes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Recipes</DialogTitle>
          {/* <DialogDescription>Add a new folder</DialogDescription> */}
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {resultRecipe.data && resultRecipe.data?.allRecipes.map(recipe =>{
           <Card>{recipe.name}</Card>
          })}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Adding"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipe;
