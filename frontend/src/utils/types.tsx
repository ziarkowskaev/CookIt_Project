import { ApolloClient } from "@apollo/client";
import React from "react";

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

export interface IAuthParams {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface ILogoutParams extends IAuthParams {
  client: ApolloClient<object>;
}

export interface INavigationParams extends ILogoutParams {
  userLoggedIn: boolean;
}

