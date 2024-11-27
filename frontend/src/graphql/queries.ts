import { gql } from "@apollo/client";

export const AUTH_USER = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
export const ALL_CATEGORIES = gql`
  query {
    allCategories {
      id
      name
      recipes {
        id
        name
        description
        ingredients
        preparation
        images
        ratings {
          id
          timestamp
          userId
          value
        }
        tags
        createdOn
        createdBy
      }
    }
  }
`;

export const CATEGORY = gql`
  query Query($name: ID!) {
    category(name: $name) {
      id
      name
      id
      name
      recipes {
        id
        name
        description
        ingredients
        preparation
        images
        ratings {
          id
          timestamp
          userId
          value
        }
        tags
        createdOn
        createdBy
      }
    }
  }
`;
// added the createdBy and id?
export const ALL_RECIPES = gql`
  query AllRecipes {
    allRecipes {
      id
      name
      description
      ingredients
      preparation
      images
      ratings {
        id
        timestamp
        userId
        value
      }
      tags
      createdOn
      createdBy
    }
  }
`;

export const GET_RECIPE = gql`
  query Recipe($recipeId: ID!) {
    recipe(id: $recipeId) {
      name
      description
      ingredients
      preparation
      images
      tags
      ratings {
        id
        userId
        recipeId
        value
        timestamp
      }
      createdBy
      createdOn
      id
    }
  }
`;

export const GET_FOLDER = gql`
  query Folder($folderId: ID!) {
    folder(id: $folderId) {
      id
      name
      users {
        id
        username
      }
      recipes {
        id
        name
      }
    }
  }
`;

export const FOLDERS_BY_USER = gql`
  query FoldersByUser($userId: ID!) {
    foldersByUser(userId: $userId) {
      id
      name
      users {
        id
        username
      }
    }
  }
`;

export const RECIPE_RATING = gql`
  query RatingsForRecipe($recipeId: ID!) {
    ratingsForRecipe(recipeId: $recipeId) {
      id
      userId
      recipeId
      value
      timestamp
    }
  }
`;

export const ALL_USERS = gql`
  query AllUsers {
    allUsers {
      id
      username
    }
  }
`;
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
    }
  }
`;

