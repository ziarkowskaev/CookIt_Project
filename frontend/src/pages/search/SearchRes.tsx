import { Card, CardContent } from "@/components/ui/card";

// array length should adjust according to the total items in DB
export const SearchRes = () => {
  return (
    <div className="flex border-8 border-black font-sans flex-col items-center">
      <div className="w-full max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semibold text-2xl">Search For: QUERY</h2>
          <div className="grid grid-cols-4 grid-flow-row gap-8 py-10">
            {Array.from({ length: 12 }).map((_, index) => (
              <Card className="flex rounded-custom items-center justify-center aspect-square ">
                <CardContent className="p-6">
                  <span className="text-l font-semibold">Dish {index + 1}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
