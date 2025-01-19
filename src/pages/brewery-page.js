import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLayout } from '../components/page-layout';
import { BeerForm } from '../components/beer-form';
import { BeerList } from '../components/beer-list';
import { BreweryDetails } from '../components/brewery-details';
import { EditBrewery } from '../components/edit-brewery';
import '../styles/components/brewery-page.css';

export const BreweryPage = () => {
  const { id } = useParams();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [brewery, setBrewery] = useState(null);
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    const fetchBreweryAndBeers = async () => {
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

        const breweryResponse = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/breweries/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (breweryResponse.ok) {
          const breweryData = await breweryResponse.json();
          setBrewery(breweryData);
        } else {
          const errorData = await breweryResponse.json();
          navigate('/error', {
            state: {
              errorCode: breweryResponse.status,
              errorMessage: errorData.error || 'Failed to fetch brewery',
            },
          });
          return;
        }

        // Fetch beers for the brewery
        const beersResponse = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/breweries/${id}/beers`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (beersResponse.ok) {
          const beersData = await beersResponse.json();
          setBeers(beersData);
        } else {
          const errorData = await beersResponse.json();
          navigate('/error', {
            state: {
              errorCode: beersResponse.status,
              errorMessage: errorData.error || 'Failed to fetch beers',
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

    fetchBreweryAndBeers();
  }, [getAccessTokenSilently, isAuthenticated, id]);

  const handleBeerAdded = () => {

    const fetchBeers = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/breweries/${id}/beers`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBeers(data);
        } else {
          const errorData = await response.json();
          navigate('/error', {
            state: {
              errorCode: response.status,
              errorMessage: errorData.error || 'Failed to fetch beers',
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

    fetchBeers();
  };

  const handleBeerDeleted = () => {
    handleBeerAdded();
  };

  const handleBreweryUpdated = (updatedBrewery) => {
    setBrewery(updatedBrewery);
  };

  if (!brewery) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <div className="content__body">
          <div className="brewery-page">
            <div className="left-column">
              <BreweryDetails brewery={brewery} />
              <EditBrewery brewery={brewery} onUpdate={handleBreweryUpdated} />
            </div>
            <div className="right-column">
              <div className="beer-form">
                <h2>Add a Beer</h2>
                <BeerForm breweryId={brewery.id} onBeerAdded={handleBeerAdded} />
              </div>
            </div>
          </div>
          {beers.length > 0 && (
            <div className="beer-list-section">
                <BeerList beers={beers} onBeerDeleted={handleBeerDeleted} />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
