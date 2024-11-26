import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Recipe = () => {
  return (
    <div className="w-screen h-screen bg-lilac">
      <div className="w-screen px-8 py-4">
        <div className="bg-cream border-none shadow-none rounded-xl">
          {/* Recipe image, name and amount of likes */}
          <Card className="grid grid-cols-2 w-2/5 bg-cream border-none shadow-none">
            {/* Recipe Image */}
            <Avatar className="w-52 h-52">
              <AvatarImage src="@/images/FoodImg.png" alt="Avatar" />
              <AvatarFallback>Image</AvatarFallback>
            </Avatar>

            {/* Recipe name and amount of likes */}
            <CardContent>
              <CardTitle> Beef Burger</CardTitle>
              <CardDescription>1.6k likes</CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              {/* Column 1 */}
              <CardDescription>
                <p>For the burger patties:</p>
                <ul className="list-disc mt-4">
                  <li>1 lb ground beef</li>
                  <li>1/2 cup bread crumbs</li>
                  <li>1/4 cup chopped parsley</li>
                  <li>1/4 cup chopped onion</li>
                  <li>1/4 cup milk</li>
                  <li>1 egg</li>
                  <li>1 tbsp Worcestershire sauce</li>
                  <li>1/2 tsp salt</li>
                  <li>1/2 tsp pepper</li>
                  <li>1/4 tsp garlic powder</li>
                </ul>
              </CardDescription>

              {/* Column 2 */}
              <CardDescription>
                <p>For assembly:</p>
                <ul className="list-disc mt-4">
                  <li>4 burger buns</li>
                  <li>4 slices of cheese</li>
                  <li>Lettuce leaves</li>
                  <li>Tomato slices</li>
                  <li>Pickles</li>
                  <li>Ketchup, mustard, (optional condiments)</li>
                </ul>
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="shadow-none">
              <CardTitle className="text-xl font-bold shadow-none">Instructions</CardTitle>
              <CardDescription>
                <ol className="list-decimal mt-4 ml-4">
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
                </ol>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
