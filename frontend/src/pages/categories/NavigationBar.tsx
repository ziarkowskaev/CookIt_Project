"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
// import { Icons } from "../../components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

// const components: { title: string; href: string; description: string }[] = [
//   {
// ]}

export function NavigationMenuApp() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center justify-between w-full px-8 py-4 fixed top-0 left-0">
        <NavigationMenuItem>
          <h1 className="font-bold">CookIt</h1>
        </NavigationMenuItem>

        <div className="flex items-center space-x-6">
        
        <NavigationMenuItem>
          <button className="bg-black text-white text-sm rounded-md">Create Recipe</button>
        </NavigationMenuItem>

        <NavigationMenuItem >
          <button className="bg-white text-sm rounded">Categories</button>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <button className="bg-white text-sm rounded">Recipes</button>
        </NavigationMenuItem>
          
        <NavigationMenuItem >
          <Input className='bg-white' type='text' placeholder="Search"/>
        </NavigationMenuItem>
          
        <NavigationMenuItem>
          <Avatar className="w-20 h-20 bg-gray-300 rounded-full hover:ring-2 hover:ring-black">
            <AvatarImage/>
              <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </NavigationMenuItem>
          </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}