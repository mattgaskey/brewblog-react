import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/components/breweries-list.css';

export const BreweriesList = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    const fetchBreweries = async () => {
      if (!isAuthenticated) {
        navigate('/error', {
          state: {
            errorCode: 401,
            errorMessage: 'User is not authenticated.',
          },
        });
        return;
      }

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
          const errorData = await response.json();
          navigate('/error', {
            state: {
              errorCode: response.status,
              errorMessage: errorData.error || 'Failed to fetch breweries',
            },
          });
        }
      } catch (error) {
        navigate('/error', {
          state: {
            errorCode: 500,
            errorMessage: error.message || 'An unexpected error occurred',
          },
        });
      }
    };

    fetchBreweries();
  }, [getAccessTokenSilently, isAuthenticated, navigate]);

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