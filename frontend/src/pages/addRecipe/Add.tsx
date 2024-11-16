import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useState } from "react";
// import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const AddRecipe = () => {
  return (
    <div className="w-screen h-screen bg-lilac">
      <div className="w-screen h-screen px-8 py-4">
        <form className="flex w-full h-full">
          {/* Recipe image and Recipe Name */}
          <Card className="flex flex-col w-full h-full rounded-2xl bg-cream">
            <CardHeader className="font-bold">Add a recipe</CardHeader>
            <CardContent className="flex h-1/3 gap-10 items-center">
              <Input
                className="bg-white w-1/3 h-10 mt-10 rounded-full"
                id="picture"
                type="file"
              />
              <Input
                className="bg-white w-1/3 h-10 mt-10"
                type="text"
                placeholder="Recipe Name"
              />
            </CardContent>
            <CardContent className="flex w-full h-full justify-around items-center">
              <Card className="flex flex-col w-full h-full mt-10 px-10 justify-top border-none rounded-custom bg-beige">
                <div className="flex flex-col w-full mt-10 gap-1.5">
                  {/* text area to add ingredients */}
                  <Label>Ingredients</Label>
                  <textarea
                    className="bg-white w-2/3 h-[100px] p-2 rounded-md border border-gray-300 resize-none"
                    name="ingredients" // Add 'name' for backend identification
                    id="ingredients"
                    placeholder="Ingredients.."
                  ></textarea>
                </div>
                <div className="flex grid w-full mt-8 items-center gap-1.5">
                  {/* text area to add instructions */}
                  <Label>Instructions</Label>
                  <textarea
                    className="bg-white w-2/3 h-[100px] p-2 rounded-md border border-gray-300 resize-none"
                    name="instructions" // Add 'name' for backend identification
                    id="instructions"
                    placeholder="Describe instructions for your recipe here"
                  ></textarea>
                </div>
              </Card>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
