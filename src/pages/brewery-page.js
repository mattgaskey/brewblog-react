import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLayout } from '../components/page-layout';
import { Link } from 'react-router-dom';

export const BreweryPage = () => {
  const { id } = useParams();
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      if (!isAuthenticated) {
        console.log('User is not authenticated');
        return;
      }

      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/breweries/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBrewery(data);
        } else {
          console.error('Failed to fetch brewery');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBrewery();
  }, [getAccessTokenSilently, isAuthenticated, loginWithRedirect, id]);

  if (!brewery) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <div className="content__body">
          <div className="brewery-page">
            <h1>{brewery.name}</h1>
            <p>{brewery.address}</p>
            <p>{brewery.city}, {brewery.state}</p>
            <p>{brewery.phone}</p>
            <Link to={brewery.website_link} target="_blank" rel="noopener noreferrer">{brewery.website_link}</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
