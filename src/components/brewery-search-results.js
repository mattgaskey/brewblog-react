import React from 'react';
import { BrewerySearchResult } from './brewery-search-result';
import '../styles/components/brewery-search-results.css';

export const BrewerySearchResults = ({ breweries }) => {
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
    </div>
  );
};
