import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/beer-form.css';

export const EditBrewery = ({ brewery, onUpdate }) => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: brewery.name || '',
    address: brewery.address || '',
    city: brewery.city || '',
    state: brewery.state || '',
    phone: brewery.phone || '',
    website_link: brewery.website_link || '',
  });
  const [hasEditPermission, setHasEditPermission] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const token = await getAccessTokenSilently();
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const permissions = decodedToken.permissions || [];
        setHasEditPermission(permissions.includes('edit:breweries'));
      } catch (error) {
        navigate('/error', {
          state: {
            errorCode: 500,
            errorMessage: error.message || 'An unexpected error occurred',
          },
        });
      }
    };

    checkPermissions();
  }, [getAccessTokenSilently, navigate]);

  const toggleFormVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
      const response = await fetch(`${apiServerUrl}/api/breweries/${brewery.id}/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedBrewery = await response.json();
        onUpdate(updatedBrewery);
        toggleFormVisibility();
      } else {
        const errorData = await response.json();
        navigate('/error', {
          state: {
            errorCode: response.status,
            errorMessage: errorData.error || 'Failed to update brewery',
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

  if (!hasEditPermission) {
    return null;
  }

  return (
    <div className="beer-form">
      <button className="button button--compact button--primary" onClick={toggleFormVisibility}>
        {isVisible ? 'Cancel' : 'Edit Brewery'}
      </button>
      {isVisible && (
        <form onSubmit={handleSubmit} className="brewery-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="text-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="text-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="text-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="website_link">Website Link:</label>
            <input
              type="text"
              id="website_link"
              name="website_link"
              value={formData.website_link}
              onChange={handleChange}
              className="text-input"
            />
          </div>
          <button type="submit" className="button button--compact button--primary">Save Changes</button>
        </form>
      )}
    </div>
  );
};