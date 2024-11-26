import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';
import { IRecipe, IRecipeParams } from "@/utils/types";

// array length should adjust according to the total items in DB
export const SearchRes = ({ recipes } : IRecipeParams) => {
  const location = useLocation();
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const tags = searchParams.get('tags');

  useEffect(() => {
    if (query) {
      const fuse = new Fuse(recipes, {
        keys: ['name', 'description'],
        threshold: 0.4,
      });
      const result = fuse.search(query).map((res) => res.item);
      // ts-expect-error:next-line
      setFilteredRecipes(result);
    } else if (tags) {
      const tagsResult = tags
        .split(/%/)
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);

      if (tagsResult.length > 0) {
      // ts-expect-error:next-line
        const results = recipes.filter((recipe) =>
          tagsResult.some(
            (tag) =>
              recipe.tags?.map((t) => t.toLowerCase()).includes(tag) &&
              recipe.ingredients?.map((i) => i.toLowerCase()).includes(tag)
          )
        );

        setFilteredRecipes(results);
      } else {
        setFilteredRecipes(recipes);
      }
    } else {
      setFilteredRecipes(recipes); // Show all if no query
    }
      // ts-expect-error:next-line
  }, [query, recipes]);

  return (
    <div className="flex font-sans flex-col items-center">
      <div className="w-full max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semibold text-2xl">
            Search For: {query ? query : tags ? tags.replace(/%/g, ', ') : ''}
          </h2>
          <div className="grid grid-cols-4 grid-flow-row gap-8 py-10">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <Card className="flex rounded-custom items-center justify-center aspect-square ">
                  <CardContent className="p-6">
                    { // ts-expect-error:next-line
                    }
                    <span className="text-l font-semibold">{recipe.name}</span>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No recipes found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
