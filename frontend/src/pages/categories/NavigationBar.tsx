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
      <NavigationMenuList className="flex w-screen m-8 justify-around">
        <NavigationMenuItem>
          <h1>CookIt</h1>
        </NavigationMenuItem>
        
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
          <Input className='bg-white w-30' type='text' placeholder="Search"/>
        </NavigationMenuItem>
          
        <NavigationMenuItem>
          <Avatar>
            <AvatarImage/>
              <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </NavigationMenuItem>
          
      </NavigationMenuList>
    </NavigationMenu>
  )
}