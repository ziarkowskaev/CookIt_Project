const categoryTypeDefs = `#graphql
  type Category {
    id: ID!
    name: String!
    recipes: [Recipe]  
  }

  extend type Query {
    allCategories: [Category]      
    category(name: ID!): Category        
  }

  extend type Mutation {
    createCategory(name: String!): Category
    deleteCategory(id: ID!): Category
    updateCategory(id: ID!, name: String!): Category     
  }
`;

module.exports = categoryTypeDefs;
