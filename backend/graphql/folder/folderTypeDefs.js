const folderTypeDefs = `#graphql
  type Folder {
    id: ID!
    name: String!
    users: [User]!            
    recipes: [Recipe]      
  }

  extend type Query {
    foldersByUser(userId: ID!): [Folder]
    folder(id: ID!): Folder        
  }

  extend type Mutation {
    createFolder(name: String!, userId: ID!): Folder
    deleteFolder(id: ID!): Folder
    updateFolderName(id: ID!, name: String!): Folder
    removeRecipeFromFolder(folderId:ID!, recipeId: ID!): Folder
    addRecipeToFolder(folderId:ID!, recipeId: ID!): Folder
    addUsersToFolder(folderId:ID!, usersId: [ID]!): Folder
  }
`;

module.exports = folderTypeDefs;
