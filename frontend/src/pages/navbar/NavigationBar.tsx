"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// TODO: navigate to create recipe page
// A COMPONENT

const NavigationMenuApp = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="flex w-screen mt-8 justify-around">
          <NavigationMenuItem>
            <Link to="/" className="text-black">
              <h1>CookIt</h1>
            </Link>
          </NavigationMenuItem>
          {/* container for create, categories and recipes buttons */}
          <div className="flex gap-x-4">
            <NavigationMenuItem>
              <button
                className="bg-black text-white text-sm rounded-md"
                onClick={() => {
                  navigate("/addRecipe");
                }}
              >
                Create Recipe
              </button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <button
                className="bg-white text-sm rounded"
                onClick={() => {
                  navigate("/categories");
                }}
              >
                Categories
              </button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <button
                className="bg-white text-sm rounded"
                onClick={() => {
                  navigate("/recipes");
                }}
              >
                Recipes
              </button>
            </NavigationMenuItem>
          </div>
          <NavigationMenuItem className="">
            <Input className="bg-white" type="text" placeholder="Search" />
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default NavigationMenuApp;
