import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import '../styles/components/breweries-list.css';

export const BreweriesList = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/breweries`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBreweries(data);
        } else {
          console.error('Failed to fetch breweries');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBreweries();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div className="breweries-list">
      <h1>Breweries</h1>
      <ul>
        {breweries.map((area, index) => (
          <li key={index}>
            <h2>{area.city}, {area.state}</h2>
            <ul>
              {area.breweries.map(brewery => (
                <li key={brewery.id}>
                  <Link to={`/breweries/${brewery.id}`}>{brewery.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
