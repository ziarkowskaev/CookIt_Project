import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ALL_USERS, GET_RECIPE } from "@/graphql/queries";
import { Button } from "@/components/ui/button";

import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

// TODO: check the path of the recipes
// TODO: check if data received correct
// TODO: ensure ingredients split at ','
const Recipe = () => {
  // const location = useLocation();
  // console.log(recipeId);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });
  // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
  const myImage = cld.image('docs/models'); 

  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  myImage.resize(fill().width(250).height(250));

  const params = useParams();
  const recipeId = params?.recipeId;
  const userId = localStorage.getItem("userId");
  const resultUsers = useQuery(ALL_USERS);
  const { data, loading } = useQuery(GET_RECIPE, {
    variables: { recipeId },
    skip: !recipeId, // Prevent the query from running if recipeId is undefined
  });
  const recipeInfo = data?.recipe;

  if (loading || resultUsers.loading) {
    return <div>loading...</div>;
  }
  const createdByUser = resultUsers.data?.allUsers.find(
    (user: { id: string; username: string }) => user.id === recipeInfo.createdBy
  ).username;
  // console.log("Recipe details:", recipeInfo);

  return (
    <div className="w-full mt-20">
      <div className="w-screen px-8 py-4">
        <div className="bg-cream border-none shadow-none rounded-xl">
          {/* Recipe image, name and amount of likes */}
          <Card className="flex flex-col sm:flex-row bg-cream border-none shadow-none">
            {/* Recipe Image */}
            <div>
            <Avatar className="w-52 h-52">
              {/* <AvatarImage src="@/images/FoodImg.png" alt="Avatar" /> */}
              <AdvancedImage cldImg={myImage} />
              <AvatarFallback>Image</AvatarFallback>
            </Avatar>
            </div>

            {/* Recipe name and amount of likes */}
            <CardContent>
              <CardTitle className="text-3xl mt-5">
                {recipeInfo?.name}
              </CardTitle>
            </CardContent>
          </Card>
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              {/* Column 1  TODO: check spacing*/}
              <CardDescription>
                {/* <p>For the burger patties:</p> */}
                {recipeInfo?.ingredients.map((ing: string) => (
                  <ul className="list-disc m-0 ml-4">
                    <li>{ing}</li>
                  </ul>
                ))}
              </CardDescription>

              {/* Column 2 */}
              {/* <CardDescription>
                <p>For assembly:</p>
                <ul className="list-disc mt-4">
                  <li>4 burger buns</li>
                  <li>4 slices of cheese</li>
                  <li>Lettuce leaves</li>
                  <li>Tomato slices</li>
                  <li>Pickles</li>
                  <li>Ketchup, mustard, (optional condiments)</li>
                </ul>
              </CardDescription> */}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="shadow-none">
              <CardTitle className="text-xl font-bold shadow-none">
                Instructions
              </CardTitle>
              <CardDescription>
                <ol className="list-decimal mt-4 ml-4">
                  {recipeInfo?.preparation
                    .split(",")
                    .map((step: string, index: number) => (
                      <li key={index}>{step.trim()}</li>
                    ))}
                </ol>
                {/* <ol className="list-decimal mt-4 ml-4">
                  <li>
                    Prepare the burger patties:
                    <ul className="list-disc ml-4">
                      <li>
                        In a large mixing bowl, combine the ground beef, onion,
                        garlic, Worcestershire sauce, salt, pepper, and optional
                        spices (paprika, onion powder, garlic powder).
                      </li>
                      <li>
                        Gently mix the ingredients with your hands until just
                        combined. Be careful not to overwork the beef, as this
                        can make the burgers tough.
                      </li>
                      <li>
                        Divide the beef mixture into 4 equal portions and shape
                        each portion into a patty, about ½ inch thick. Press a
                        small dent in the center of each patty with your thumb
                        to help them cook evenly.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Cook the patties:
                    <ul className="list-disc ml-4">
                      <li>
                        Grill: Preheat the grill to medium-high heat. Lightly
                        oil the grill grates. Grill the patties for about 4-5
                        minutes on each side, or until they reach your desired
                        level of doneness (medium-rare, medium, etc.). Add
                        cheese slices on top during the last minute of grilling
                        to melt.
                      </li>
                      <li>
                        Stovetop: Heat a large skillet or grill pan over
                        medium-high heat. Cook the patties for about 4-5 minutes
                        per side, until cooked through or to your preferred
                        doneness. Add the cheese in the final minute.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Toast the buns:
                    <ul className="list-disc ml-4">
                      <li>
                        Split the burger buns and lightly toast them on the
                        grill or in the pan for 1-2 minutes until golden brown.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Assemble the burgers:
                    <ul className="list-disc ml-4">
                      <li>
                        Place the cooked patties on the bottom half of each bun.
                      </li>
                      <li>Add lettuce, tomato slices, and pickles.</li>
                      <li>
                        Spread your desired condiments (ketchup, mustard,
                        mayonnaise) on the top half of the buns.
                      </li>
                      <li>Close the burger with the top bun and serve.</li>
                    </ul>
                  </li>
                </ol> */}
                <h3 className="mt-10 font-semibold">
                  Tags: {recipeInfo.tags.join(", ")}
                </h3>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex">
                Recipe by: <p className="font-semibold ml-4">{createdByUser}</p>
              </div>
              {userId === recipeInfo.userId ? (
                <Button>Delete recipe</Button>
              ) : (
                <div></div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
