"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate, Link, Outlet } from "react-router-dom";
import AddFolder from "../folders/AddFolder";
import { useState } from "react";

// TODO: navigate to create recipe page
// A COMPONENT

const NavigationMenuApp = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${searchQuery}`);
    }
  };
  
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="flex items-center justify-between w-full px-8 py-2 fixed bg-gray-500 ">
          <NavigationMenuItem>
            <Link to="/" className="text-black">
            <h1 className="font-bold">CookIt</h1>
            </Link>
          </NavigationMenuItem>
          {/* container for create, categories and recipes buttons */}
          <div className="flex items-center space-x-4">
          
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
             <AddFolder />
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
      
          <NavigationMenuItem>
            <Input className="bg-white"
              type="text"
              placeholder="Search for recipe by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch} />
          
          </NavigationMenuItem>
          <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar >
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </DropdownMenuItem>
              <DropdownMenuItem>Folders</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

            {/* goes to profile page on clicking */}
            {/* <button
              className="bg-transparent rounded-full"
              onClick={() => {
                navigate("/profile");
              }}
            >
            </button> */}
          </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default NavigationMenuApp;
