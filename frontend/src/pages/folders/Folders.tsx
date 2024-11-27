import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../../components/ui/card.tsx";
// import { AUTH_USER } from "@/graphql/queries.ts";
// import { useQuery } from "@apollo/client";
// TODO: the recipes from folder
const Folders = ({ folders }) => {
  //Use List of Cards, but make cards the length of the page
  const navigate = useNavigate();

  const handleFolderClick = (folderId: string) => {
    navigate(`/folder/${folderId}`);
  };
  return (
    <div className="flex flex-col items-center font-sans px-6 py-10">
      {folders.map((folder) => (
        <div key={folder.id} className="w-full max-w-4xl mb-6">
          <Card
            onClick={() => {
              handleFolderClick(folder.id);
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
