import { gql } from "@apollo/client";

export const ADD_RECIPES_TO_FOLDER = gql`
  mutation AddRecipesToFolder($folderId: ID!, $recipesId: [ID]!) {
    addRecipesToFolder(folderId: $folderId, recipesId: $recipesId) {
      id
      name
    }
  }
`;
export const ADD_USER_TO_FOLDER = gql`
  mutation Mutation($folderId: ID!, $usersId: [ID]!) {
    addUsersToFolder(folderId: $folderId, usersId: $usersId) {
      id
      name
    }
  }
`;

// export const CREATE_CATEGORY = gql`
// mutation CreateCategory($name: String!) {
//     createCategory(name: $name) {
//       id
//       name
//       recipes {

//       }
//     }
//   }

// `

export const CREATE_FOLDER = gql`
  mutation CreateRecipe($name: String!, $userId: ID!) {
    createFolder(name: $name, userId: $userId) {
      id
      name
    }
  }
`;

// export const CREATE_RATING = gql`
// mutation CreateRating($userId: ID!, $recipeId: ID!, $value: Float!) {
//     createRating(userId: $userId, recipeId: $recipeId, value: $value) {
//       id
//       userId
//       recipeId
//       value
//       timestamp
//     }
//   }

// `

//BUG HERE TO FIX
export const CREATE_RECIPE = gql`
  mutation CreateRecipe(
    $name: String!
    $description: String!
    $createdBy: ID!
    $ingredients: [String]
    $preparation: String
    $images: [String]
    $tags: [String]
  ) {
    createRecipe(
      name: $name
      description: $description
      createdBy: $createdBy
      ingredients: $ingredients
      preparation: $preparation
      images: $images
      tags: $tags
    ) {
      name
      description
      ingredients
      preparation
      images
      tags
      createdBy
      createdOn
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      id
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

// export const DELETE_FOLDER = gql`
//
// `
//
// export const DELETE_RATING = gql`
//
// `
//
// export const DELETE_RECIPE = gql`
//
// `
//
// export const REMOVE_RECIPE_FROM_FOLDER = gql`
//
// `
//
// export const REMOVE_USER_FROM_FOLDER = gql`
//
// `
// export const UPDATE_CATEGORY = gql`
//
// `
// export const UPDATE_FOLDER_NAME = gql`
//
// `
// export const UPDATE_RATING = gql`
//
// `
// export const UPDATE_RECIPE = gql`
//
// `
