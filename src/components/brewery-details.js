import React from 'react';
import { Link } from 'react-router-dom';

export const BreweryDetails = ({ brewery }) => {
  return (
    <div className="brewery-info">
      <h1>{brewery.name}</h1>
      <p className="monospace">ID: {brewery.id}</p>
      {brewery.address && (
        <p><i className="fas fa-map-marker"></i>{brewery.address}</p>
      )}
      {brewery.city && brewery.state && (
        <p><i className="fas fa-globe-americas"></i>{brewery.city}, {brewery.state}</p>
      )}
      {brewery.phone && (
        <p><i className="fas fa-phone-alt"></i>{brewery.phone}</p>
      )}
      {brewery.website_link && (
        <p><i className="fas fa-link"></i>
          <Link to={brewery.website_link} target="_blank" rel="noopener noreferrer">
            {brewery.website_link}
          </Link>
        </p>
      )}
    </div>
  );
};