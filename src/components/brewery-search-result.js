import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AddBrewery } from './add-brewery';

export const BrewerySearchResult = ({ brewery }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="search-results-grid">
      <div>
        <h3 className="brewery-search-result__headline">
          {brewery.name}
        </h3>
        <p className="brewery-search-result__description">
          {brewery.city}, {brewery.state}
        </p>
        <a
          href={brewery.website_url}
          className="brewery-search-result__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {brewery.website_url}
        </a>
      </div>
      <div>
        {isAuthenticated && <AddBrewery brewery={brewery} />}
      </div>
    </div>
  );
};
