import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//Delete User - Christian

export const ADD_COFFEE_SHOP = gql`
  mutation addCoffeeShop($name: String!, $location: String!, $rating: Int!, $review: String!) {
    addCoffeeShop(name: $name, location: $location, rating: $rating, review: $review) {
      _id
      name
      location
      rating
      review
    }
  }
`;

export const UPDATE_COFFEE_SHOP = gql`
  mutation updateCoffeeShop($id: ID!, $name: String, $location: String, $rating: Int, $review: String) {
    updateCoffeeShop(id: $id, name: $name, location: $location, rating: $rating, review: $review) {
      _id
      name
      location
      rating
      review
    }
  }
`;

export const DELETE_COFFEE_SHOP = gql`
  mutation deleteCoffeeShop($id: ID!) {
    deleteCoffeeShop(id: $id) {
      _id
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
