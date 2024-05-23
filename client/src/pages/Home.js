// client/src/pages/Home.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COFFEE_SHOPS } from '../utils/queries';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const CoffeeShopList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CoffeeShopItem = styled.li`
  background-color: #f4f4f4;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 8px;
`;

const Home = () => {
  const { loading, data } = useQuery(QUERY_COFFEE_SHOPS);
  const coffeeShops = data?.coffeeShops || [];

  return (
    <Container>
      <h1>Recently Reviewed Coffee Shops</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CoffeeShopList>
          {coffeeShops.map(shop => (
            <CoffeeShopItem key={shop._id}>
              <h2>{shop.name}</h2>
              <p>{shop.location}</p>
              <p>Rating: {shop.rating}</p>
              <p>{shop.review}</p>
            </CoffeeShopItem>
          ))}
        </CoffeeShopList>
      )}
    </Container>
  );
};

export default Home;
