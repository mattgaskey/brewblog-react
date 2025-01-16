import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const BreweryForm = ({ brewery }) => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      id: brewery.id || '',
      name: brewery.name || '',
      address: brewery.address_1 || '',
      city: brewery.city || '',
      state: brewery.state || '',
      phone: brewery.phone || '',
      website_link: brewery.website_url || '',
    };

    try {
      const token = await getAccessTokenSilently();
      const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
      const response = await fetch(`${apiServerUrl}/api/breweries/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Brewery added successfully');
        navigate('/breweries');
      } else {
        console.error('Failed to add brewery');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="button button--primary">
        <i className="fas fa-heart"></i>
      </button>
    </form>
  );
};
