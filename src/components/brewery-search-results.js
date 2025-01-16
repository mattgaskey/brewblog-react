import React from 'react';
import { BrewerySearchResult } from './brewery-search-result';

export const BrewerySearchResults = ({ breweries }) => {
  return (
    <div className="results w-100 mt-4">
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
