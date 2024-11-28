import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_RECIPE } from '@/graphql/mutations';
import { ALL_RECIPES } from '@/graphql/queries';

// TODO: add destination to post recipe
const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    ingredients: [],
    preparation: '',
    tags: [],
    images: [''],
  });
  const [addRecipe, { loading, error, data }] = useMutation(CREATE_RECIPE, {
    refetchQueries: [ALL_RECIPES],
  });

  const userId = localStorage.getItem('userId');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]:
        name === 'tags' || name === 'ingredients' ? value.split(',') : value,
    });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
      ? Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      : [];
    setRecipeData({
      ...recipeData,
      images: files,
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await addRecipe({
        variables: { ...recipeData, createdBy: userId || '' },
      });
      alert('Recipe created successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full mt-20">
      <div className="px-8 py-4">
        <form className="flex w-full h-full" onSubmit={handleSubmit}>
          <Card className="flex flex-col w-full h-full rounded-2xl bg-cream">
            <CardHeader className="font-bold">Add a recipe</CardHeader>
            <CardContent className="flex h-1/3 gap-10 items-center">
              <input
                className="bg-white px-2 w-1/3 h-10 mt-10 rounded-none"
                id="images"
                type="file"
                multiple
                onChange={handleFileUpload}
              />
              <input
                className="bg-white px-3 w-1/3 h-10 mt-10"
                id="recipeName"
                name="name"
                type="text"
                placeholder="Recipe Name"
                value={recipeData.name}
                onChange={handleChange}
              />
            </CardContent>
            <CardContent className="flex flex-col w-full h-full justify-around items-center">
              <Card className="flex flex-col w-full h-full mt-10 px-10 justify-top border-none rounded-custom bg-beige">
                <div className="flex flex-col w-full mt-10 gap-1.5">
                  <Label>Description</Label>
                  <textarea
                    className="bg-white w-2/3 h-[100px] p-2 rounded-md border border-gray-300 resize-none"
                    name="description"
                    id="description"
                    placeholder="Short description of your recipe"
                    value={recipeData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex flex-col w-full mt-4 gap-1.5">
                  <Label>Ingredients (comma-separated)</Label>
                  <textarea
                    className="bg-white w-2/3 h-[100px] p-2 rounded-md border border-gray-300 resize-none"
                    name="ingredients"
                    id="ingredients"
                    placeholder="List ingredients separated by commas"
                    value={recipeData.ingredients.join(',')}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex flex-col w-full mt-4 gap-1.5">
                  <Label>Preparation Steps</Label>
                  <textarea
                    className="bg-white w-2/3 h-[100px] p-2 rounded-md border border-gray-300 resize-none"
                    name="preparation"
                    id="preparation"
                    placeholder="Describe preparation steps"
                    value={recipeData.preparation}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex flex-col w-full mt-4 gap-1.5">
                  <Label>Tags (comma-separated)</Label>
                  <input
                    className="bg-white w-2/3 h-10 p-2 rounded-md border border-gray-300"
                    name="tags"
                    id="tags"
                    placeholder="Add tags for your recipe (e.g., vegan, quick)"
                    value={recipeData.tags.join(',')}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-4 mt-5">
                  <button
                    type="submit"
                    className="bg-black hover:bg-gray-400 active:bg-gray-500 text-white px-4 py-2 mb-3 text-sm rounded-md"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Recipe'}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 mt-2">Error: {error.message}</p>
                )}
                {data && (
                  <p className="text-green-500 mt-2">
                    Recipe created successfully!
                  </p>
                )}
              </Card>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
