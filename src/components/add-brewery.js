import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const AddBrewery = ({ brewery }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [hasCreatePermission, setHasCreatePermission] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      if (!isAuthenticated) {
        return;
      }
      const token = await getAccessTokenSilently();
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const permissions = decodedToken.permissions || [];
      setHasCreatePermission(permissions.includes('create:breweries'));
    };

    checkPermissions();
  }, [getAccessTokenSilently, isAuthenticated]);

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

  if (!hasCreatePermission) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="button button--compact button--primary">
        <i className="fas fa-heart"></i>
      </button>
    </form>
  );
};
