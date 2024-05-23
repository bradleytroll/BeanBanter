// client/src/utils/queries.js
import { gql } from '@apollo/client';

export const QUERY_COFFEE_SHOPS = gql`
  query coffeeShops {
    coffeeShops {
      _id
      name
      location
      rating
      review
      user {
        username
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      coffeeShops {
        _id
        name
        location
        rating
        review
      }
    }
  }
`;
