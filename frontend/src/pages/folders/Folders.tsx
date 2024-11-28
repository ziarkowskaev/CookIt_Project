import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../../components/ui/card.tsx";
import { FOLDERS_BY_USER } from "@/graphql/queries.ts";
import { useQuery } from "@apollo/client";
// import { AUTH_USER } from "@/graphql/queries.ts";
// import { useQuery } from "@apollo/client";
// TODO: the recipes from folder
const Folders = () => {
  //Use List of Cards, but make cards the length of the page
  const navigate = useNavigate();

  //should be used with context by the auth user

  const userId = localStorage.getItem('userId');


  const resultFolders = useQuery(FOLDERS_BY_USER, {
    variables: { userId },
    skip: !userId,
  });

  console.log(resultFolders);

  if (resultFolders.loading) {
    return <div>loading...</div>;
  }

  const folders = resultFolders.data?.foldersByUser;

  console.log(folders);

  const handleFolderClick = (folderId: string) => {
    navigate(`/folder/${folderId}`);
  };

  if (!folders || folders.length === 0) {
    return (
      <div className="flex flex-col items-center font-sans px-6 py-10">
        <div className="text-center">
          <p className="text-lg font-medium">No folders available</p>
          <p className="text-sm">Please create a folder to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center font-sans px-6 py-10">
      {folders.map((folder: {id: string, name:string}) => (
        <div key={folder?.id} className="w-full max-w-4xl mb-6">
          <Card
            onClick={() => {
              handleFolderClick(folder?.id);
            }}
            className="rounded-custom cursor-pointer sshadow-lg bg-white border border-gray-200"
          >
            <CardContent className="p-8">
              <CardTitle>
                <span className="text-xl font-bold text-gray-800">
                  {folder.name}
                </span>
              </CardTitle>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Folders;
