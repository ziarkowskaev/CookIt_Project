export interface Recipe {
  name: string;
  image: string;
  time: number;
  ingredients: string[];
  description: string;
  tags: string[];
  category: string;
  id: string;
}

export interface Category {
  id: string;
  name: string;
  recipes: Recipe[];
}
export interface IRecipeParams {
  recipes: Recipe[];
}
