import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '../../components/ui/card.tsx';

const Folders = ({ folders }) => {
  //Use List of Cards, but make cards the length of the page
  return (
    <div className="flex flex-col items-center font-sans px-6 py-10">
      {folders.map((folder) => (
        <div key={folder.id} className="w-full max-w-4xl mb-6">
          <Card className="rounded-custom shadow-lg bg-white border border-gray-200">
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
