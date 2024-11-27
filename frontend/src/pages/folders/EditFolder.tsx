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
import { ADD_USER_TO_FOLDER } from "@/graphql/mutations";
import { ALL_USERS } from "@/graphql/queries";
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
  // const [folderId, setFolderId] = useState<string>(""); // Folder ID to which users will be added
  const [userId, setUserId] = useState<string>(""); // User ID to add to the folder
  const resultAllUsers = useQuery(ALL_USERS);
  const allUsers = resultAllUsers.data?.allUsers;
  const params = useParams();
  const folderId = params?.folderId || "";
  // Mutation for adding user to folder
  const [addUserToFolder, { loading, error }] = useMutation<
    AddUserToFolderResponse,
    AddUserToFolderVariables
  >(ADD_USER_TO_FOLDER);

  // Handle user ID input change
  const handleUserChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setUserId(value);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      // Trigger the mutation to add the user to the folder
      const userToBeAdded = allUsers.find((user) => user.username === userId);

      await addUserToFolder({
        variables: { folderId, userId },
      });
      alert("User added to folder successfully!");
      setUserId(""); // Clear user ID input after success
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the user.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add users</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User to Folder</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Folder ID input - you can remove this if it's passed dynamically */}
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderId" className="text-right">
                Folder ID
              </Label>
              <Input
                id="folderId"
                name="folderId"
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                placeholder="Folder ID"
                className="col-span-3"
              />
            </div> */}
            {/* User ID input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userId" className="text-right">
                Username
              </Label>
              <Input
                id="userId"
                name="userId"
                value={userId}
                onChange={handleUserChange}
                placeholder="username"
                className="col-span-3"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">Error: {error.message}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFolder;
