export interface Recipe {
  name: string;
  image: string;
  time: number;
  ingredients: string[];
  description: string;
  category: string;
  id: string;
}

export interface IRecipeParams {
  recipes: Recipe[];
}