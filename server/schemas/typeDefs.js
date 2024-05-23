const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    coffeeShops: [CoffeeShop]
  }

  type CoffeeShop {
    _id: ID
    name: String
    location: String
    rating: Int
    review: String
    user: User
  }

  type Query {
    me: User
    coffeeShops: [CoffeeShop]
    coffeeShop(id: ID!): CoffeeShop
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCoffeeShop(name: String!, location: String!, rating: Int, review: String): CoffeeShop
    updateCoffeeShop(id: ID!, name: String, location: String, rating: Int, review: String): CoffeeShop
    deleteCoffeeShop(id: ID!): CoffeeShop
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
