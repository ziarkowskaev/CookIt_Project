'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { INavigationParams } from '@/utils/types';

import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useNavigate, Outlet } from 'react-router-dom';
import AddFolder from '../folders/AddFolder';
import { useState, KeyboardEvent } from 'react';
import { logout } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { FaUser } from "react-icons/fa";


const NavigationMenuApp = ({
  userLoggedIn,
  setToken,
  client,
}: INavigationParams) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="flex items-center justify-between w-full px-4 py-2 fixed bg-purple shadow-lg z-50">
          {/* Mobile View */}
          <div className="sm:hidden flex items-center justify-between w-full">
            {/* Logo */}
            <h1
              onClick={() => navigate('/')}
              className="font-bold cursor-pointer text-lg text-cream mr-4"
            >
              CookIt
            </h1>

            {/* Search Bar and Hamburger Menu */}
            <div className="flex items-center space-x-2">
            {userLoggedIn && (
                    <>
                        <AddFolder />
                    </>
                  )}
              <Input
                className="bg-white w-28 sm:w-36" // Adjust width for mobile view
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {userLoggedIn && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/addRecipe')}>
                        <Button variant="outline">Add Recipe</Button>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/categories')}>
                    Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/recipes')}>
                    Recipes
                  </DropdownMenuItem>
                  {userLoggedIn ? (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/folders')}>
                        Folders
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => logout({ setToken, client })}
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => navigate('/login')}>
                      Login/Signup
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden sm:flex items-center justify-between w-full space-x-4">
          <h1
              onClick={() => navigate("/")}
              className="font-bold cursor-pointer text-3xl text-cream"
            >
              CookIt
            </h1>
            <div className="flex items-center space-x-4">
              {userLoggedIn && (
                <>
                  <NavigationMenuItem>
                    <button
                      className="bg-black text-white text-sm rounded-md px-4 py-2"
                      onClick={() => navigate('/addRecipe')}
                    >
                      Create Recipe
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <AddFolder />
                  </NavigationMenuItem>
                </>
              )}

              <NavigationMenuItem>
                <button
                  className="bg-white text-sm rounded px-4 py-2"
                  onClick={() => navigate('/categories')}
                >
                  Categories
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button
                  className="bg-white text-sm rounded px-4 py-2"
                  onClick={() => navigate('/recipes')}
                >
                  Recipes
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Input
                  className="bg-white"
                  type="text"
                  placeholder="Search for recipe by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </NavigationMenuItem>

              <NavigationMenuItem className="bg-cream rounded-full">
                {userLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage />
                        <AvatarFallback>
                          <FaUser className="ml-2ml-2 w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/folders')}>
                        Folders
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => logout({ setToken, client })}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <button
                    className="bg-white border-2 border-blue text-md rounded px-4 py-2"
                    onClick={() => navigate('/login')}
                  >
                    Login/Signup
                  </button>
                )}
              </NavigationMenuItem>
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <main className="my-16">
        <Outlet />
      </main>
    </>
  );
};

export default NavigationMenuApp;
