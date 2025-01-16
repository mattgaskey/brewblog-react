import React from 'react';
import { BreweryForm } from './brewery-form';

export const BrewerySearchResult = ({ brewery }) => (
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
        >{brewery.website_url}</a>
      </div>
      <div>
        <BreweryForm brewery={brewery} />
      </div>
    </div>
    
);
