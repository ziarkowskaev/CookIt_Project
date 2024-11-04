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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuDemo() {
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