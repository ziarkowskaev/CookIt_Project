const folderTypeDefs = `#graphql
  type Folder {
    id: ID!
    name: String!
    userId: ID!            
    recipes: [Recipe]      
  }

  extend type Query {
    foldersByUser(userId: ID!): [Folder]
    folder(id: ID!): Folder        
  }

  extend type Mutation {
    createFolder(name: String!, usersId: [ID]!): Folder
    deleteFolder(id: ID!): Folder
    updateFolderName(id: ID!, name: String!): Folder
    removeRecipeFromFolder(folderId:ID!, recipeId: ID!): Folder
    addRecipeToFolder(folderId:ID!, recipeId: ID!): Folder
    addUserToFolder(folderId:ID!, userId: ID!): Folder
  }
`;

module.exports = folderTypeDefs;
