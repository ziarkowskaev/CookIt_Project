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
import { useMutation } from "@apollo/client";
import { ADD_USER_TO_FOLDER } from "@/graphql/mutations";
import { useParams } from "react-router-dom";

// Define TypeScript types for mutation variables and response

interface AddUserToFolderVariables {
  folderId: string;
  userId: string;
}

interface AddUserToFolderResponse {
  addUserToFolder: {
    id: string;
    name: string;
    users: { id: string; name: string }[];
  };
}

const EditFolder: React.FC = () => {
  const [folderData, setFolderData] = useState<{ name: string }>({
    name: "",
  });
  const params = useParams();
  const folderId = params?.folderId || "";
  console.log(folderId);
  const [userId, setUserId] = useState<string>(""); // User ID to add to folder

  // Mutation hook
  const [addUserToFolder, { loading, error }] = useMutation<
    AddUserToFolderResponse,
    AddUserToFolderVariables
  >(ADD_USER_TO_FOLDER);

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
      await addUserToFolder({ variables: { folderId, userId } });
      alert("User added to folder successfully!");
      setFolderData({ name: "" }); // Clear input after success
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the folder.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add users</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          {/* <DialogDescription>Add a new folder</DialogDescription> */}
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userId" className="text-right">
                Username
              </Label>
              <Input
                id="userId"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Username"
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

export default EditFolder;
