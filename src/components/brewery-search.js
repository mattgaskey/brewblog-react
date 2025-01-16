import React, { useState } from 'react';

export const BrewerySearch = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}`);
    const data = await response.json();
    setSearchResults(data);
  };

  return (
    <div className="brewery-search">
      <form onSubmit={handleSubmit}>
        <h3 className="brewery-search__title">Search for breweries near you:</h3>
        <div className="brewery-search__input-group">
          <input
            type="text"
            className="brewery-search__input"
            placeholder="City, State, or Brewery Name"
            value={searchTerm || ''}
            onChange={handleInputChange}
          />
          <button type="submit" className="brewery-search__button">Search</button>
        </div>
      </form>
    </div>
  );
};
