import { Card, CardContent } from "@/components/ui/card";

export const Recipes = () => {
  return (
    <div className="flex border-8 border-black font-sans flex-col items-center">
      <div className="w-full max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semibold text-2xl">MOST POPULAR RECIPES</h2>
          <div className="grid grid-cols-4 grid-flow-row gap-8 py-10">
            {Array.from({ length: 12 }).map((_, index) => (
              <Card className="flex rounded-custom items-center justify-around aspect-square">
                <CardContent className="p-6">
                  <span className="text-l font-semibold">DISH {index + 1}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
