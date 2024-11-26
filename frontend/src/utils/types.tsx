import { ApolloClient } from '@apollo/client';
import React from 'react';

export interface IRecipe {
  name: string;
  image: string;
  time: number;
  ingredients: string[];
  description: string;
  tags: string[];
  category: string;
  id: string;
}

export interface ICategory {
  id: string;
  name: string;
  recipes: IRecipe[];
}
export interface IRecipeParams {
  recipes: IRecipe[];
}

export interface IAuthParams {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface ILogoutParams extends IAuthParams {
  client: ApolloClient<object>;
}

export interface INavigationParams extends ILogoutParams {
  userLoggedIn: boolean;
}

export interface IFolder {
  id: string;
  name: string;
}

export interface IFolderParams {
  folders: IFolder[];
}