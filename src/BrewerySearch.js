import React, { useState } from 'react';

function BrewerySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [breweries, setBreweries] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}`);
    const data = await response.json();
    setBreweries(data);
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h3>Search for breweries near you:</h3>
          <input
            className="form-control"
            placeholder="City, State, or Brewery Name"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <div className="results">
        {breweries.length > 0 && (
          <ul>
            {breweries.map((brewery) => (
              <li key={brewery.id}>{brewery.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BrewerySearch;