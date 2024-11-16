"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// TODO: navigate to create recipe page
export function NavigationMenuApp() {
  return (
    <NavigationMenu className="border-4 border-black">
      <NavigationMenuList className="flex w-screen m-8 justify-between">
        <NavigationMenuItem>
          <h1>CookIt</h1>
        </NavigationMenuItem>
        {/* container for create, categories and recipes */}
        <div className="flex gap-x-4">
          <NavigationMenuItem>
            <button className="bg-black text-white text-sm rounded-md">
              Create Recipe
            </button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <button className="bg-white text-sm rounded">Categories</button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <button className="bg-white text-sm rounded">Recipes</button>
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
  );
}
