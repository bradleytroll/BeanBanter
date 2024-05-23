import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_COFFEE_SHOP, UPDATE_COFFEE_SHOP, DELETE_COFFEE_SHOP } from '../utils/mutations';
import CoffeeShopForm from '../components/CoffeeShopForm';

const Dashboard = () => {
  const { loading, data, error } = useQuery(QUERY_ME);
  const [addCoffeeShop] = useMutation(ADD_COFFEE_SHOP);
  const [updateCoffeeShop] = useMutation(UPDATE_COFFEE_SHOP);
  const [deleteCoffeeShop] = useMutation(DELETE_COFFEE_SHOP);

  const [editingShop, setEditingShop] = useState(null);

  const handleAddCoffeeShop = async (formData) => {
    try {
      await addCoffeeShop({
        variables: { ...formData },
        refetchQueries: [{ query: QUERY_ME }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateCoffeeShop = async (formData) => {
    try {
      await updateCoffeeShop({
        variables: { id: editingShop._id, ...formData },
        refetchQueries: [{ query: QUERY_ME }],
      });
      setEditingShop(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCoffeeShop = async (id) => {
    try {
      await deleteCoffeeShop({
        variables: { id },
        refetchQueries: [{ query: QUERY_ME }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data || !data.me) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <h1>Your Coffee Shops</h1>
      <CoffeeShopForm
        onSubmit={editingShop ? handleUpdateCoffeeShop : handleAddCoffeeShop}
        initialData={editingShop}
      />
      <ul>
        {data.me.coffeeShops.map((shop) => (
          <li key={shop._id}>
            <h2>{shop.name}</h2>
            <p>{shop.location}</p>
            <p>Rating: {shop.rating}</p>
            <p>{shop.review}</p>
            <button onClick={() => setEditingShop(shop)}>Edit</button>
            <button onClick={() => handleDeleteCoffeeShop(shop._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
