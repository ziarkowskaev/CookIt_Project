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
    createFolder(name: String!, userId: ID!): Folder 
  }
`;

module.exports = folderTypeDefs;
