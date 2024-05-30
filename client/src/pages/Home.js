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

  console.log("finding coffee shops");

  // google maps API -------------------------Michael
const API_KEY = 'AIzaSyCdapCkbW7WMesVzMRRwDi-_evEntjhj3A';
  // Construct the URL for the API call
const gogoUrl = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;

function initMap() {

    // Create the map.
    const vystar = { lat: 28.5383 , lng: -81.3792 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: vystar,
      zoom: 17,
      mapId: "8d193001f940fde3",
    });
    console.log("create maps");
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };
    // Perform a nearby search. ---- -USING LOCATION for Coffee Shop
    service.nearbySearch(
      { location: `${location}`, radius: 500, type: "coffee shop" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      },
    );
  }
  function addPlaces(places, map) {
    const placesList = document.getElementById("places");
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });
        const li = document.createElement("li");
        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });
      }
    }
  }

  initMap() 







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
