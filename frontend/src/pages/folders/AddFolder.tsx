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
import { AUTH_USER } from "@/graphql/queries";

// Define TypeScript types for mutation variables and response
interface CreateFolderVariables {
  name: string;
  userId: string;
}

interface CreateFolderResponse {
  createFolder: {
    id: string;
    name: string;
    userId: string;
  };
}

// Component definition
const AddFolder: React.FC = () => {
  const resultUser = useQuery(AUTH_USER);
  const userId = resultUser.data?.me.id;
  const [folderData, setFolderData] = useState<CreateFolderVariables>({
    name: "",
    userId: "",
  });
  //add variable user Id so it saved the user that created the folder

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
    folderData.userId = userId ? userId : "";
    try {
      if (folderData.userId == "") console.log("no user id");
      await addFolder({ variables: { ...folderData } });
      alert("Folder created successfully!");
      setFolderData({ name: "", userId: "" }); // Clear input after success
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the folder.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Folder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Folder</DialogTitle>
          <DialogDescription>Add a new folder</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Folder Title
              </Label>
              <Input
                id="name"
                name="name"
                value={folderData.name}
                onChange={handleChange}
                placeholder="Folder Title"
                className="col-span-3"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm">Error: {error.message}</p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFolder;
