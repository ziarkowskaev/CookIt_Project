/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { IRecipe, IRecipeParams } from '@/utils/types';
export const SearchRes = ({ recipes }: IRecipeParams) => {
  const location = useLocation();
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const query = searchParams.get('query');
  const tags = searchParams.get('tags');
  // to navigate to recipe page
  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipepage/${recipeId}`),
      {
        state: { id: recipeId },
      };
  };

  useEffect(() => {
    if (query) {
      const fuse = new Fuse(recipes, {
        keys: ['name', 'description'],
        threshold: 0.4,
      });
      const result = fuse.search(query).map((res) => res.item);
      setFilteredRecipes(result);
    } else if (tags) {
      const tagsResult = tags
        .split(/%/)
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);
      if (tagsResult.length > 0) {
        const results = recipes.filter((recipe: IRecipe) =>
          tagsResult.every(
            (tag) =>
              recipe.tags?.map((t) => t.toLowerCase()).includes(tag) ||
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
  }, [query, recipes]);

  return (
    <div className="flex font-sans flex-col items-center">
      <div className="w-full max-w-screen-lg px-8">
        <div className="mt-20">
          <h2 className="font-semibold text-2xl">
            Search For: {query ? query : tags ? tags.replace(/%/g, ', ') : ''}
          </h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe: IRecipe) => (
                <Card
                  onClick={() => {
                    handleRecipeClick(recipe.id);
                    console.log('card clicked');
                  }}
                  className="flex rounded-custom items-center justify-center aspect-square "
                >
                  <CardContent className="p-6">
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
