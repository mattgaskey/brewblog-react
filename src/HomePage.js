import React from 'react';
import BrewerySearch from './BrewerySearch';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Brewblog</h1>
      <p>Sipping on the sweet nectar of life at local breweries near you.</p>
      <BrewerySearch />
    </div>
  );
}

export default HomePage;