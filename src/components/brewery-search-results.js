import React from 'react';
import { BrewerySearchResult } from './brewery-search-result';
import '../styles/components/brewery-search-results.css';

export const BrewerySearchResults = ({ breweries, searchPerformed }) => {
  return (
    <div className="brewery-search-results">
      {breweries.length > 0 && (
        <ul className="list-group">
          {breweries.map((brewery) => (
            <li key={brewery.id} className="list-group-item">
              <BrewerySearchResult brewery={brewery} />
            </li>
          ))}
        </ul>
      )}
      {breweries.length === 0 && searchPerformed && (
        <div className="no-results">
          <p>No results found for your query. Try again with something like:</p>
          <p className="monospace">San Diego</p>
        </div>
      )}
    </div>
  );
};
