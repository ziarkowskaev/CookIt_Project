import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// TODO: profile information needs to be changed
// TODO: adjust spacing for grids
// TODO: check if width of containers is ok
// TODO: change array sizes based on database
// TODO: followers need to be dynamic; change according to button

export const Profile = () => {
  return (
    <div className="flex flex-col justify-between items-center mt-8">
      <div className="flex flex-col w-full items-center">
        <div
          className="flex relative w-5/6 h-60 rounded-3xl justify-around items-center mb-20 bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/fresh-herbs-spices-peppers-dill-parsley-black-background-place-text-culinary-concept-background-menu-recipe_114106-2324.jpg')",
          }}
        >
          <Avatar className="flex h-40 w-40 transform scale-125 -bottom-20">
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_HSB_gtlk4EHhc65xUBw6okNw6gkkrZsdiXSY_GDe80Ks1GY8Edr0s5y6lIuwwXNUpE&usqp=CAU"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-xl mt-2 font-semibold">Garfield the Cat</h2>
        <h3 className="mt-3 font-semibold">100 followers 100 Following</h3>
        <Button className="bg-lime-600 drop-shadow-md text-black mt-2 hover:bg-lime-700">
          Follow
        </Button>
      </div>
      <div className="flex flex-grow grid lg:grid-cols-4 w-4/6 mt-20 grid-flow-row gap-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card className="flex rounded-custom items-center justify-center aspect-square ">
            <CardContent className="p-6">
              <span className="text-l font-semibold">Dish {index + 1}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
