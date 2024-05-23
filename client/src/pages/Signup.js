import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  return (
    <div>
      <h1>Your Coffee Shops</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {user.coffeeShops?.map(shop => (
            <li key={shop._id}>
              <h2>{shop.name}</h2>
              <p>{shop.location}</p>
              <p>Rating: {shop.rating}</p>
              <p>{shop.review}</p>
              <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
