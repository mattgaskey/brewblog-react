import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/components/beer-form.css';

export const BeerForm = ({ breweryId, onBeerAdded }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [styles, setStyles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    style: '',
    brewery_id: breweryId,
  });

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/styles`);

        if (response.ok) {
          const data = await response.json();
          setStyles(data);
        } else {
          console.error('Failed to fetch styles');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStyles();
  }, [getAccessTokenSilently]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/beers/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Beer added successfully');
        onBeerAdded();
        setFormData({
          name: '',
          description: '',
          style: '',
          brewery_id: breweryId,
        });
      } else {
        console.error('Failed to add beer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="beer-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="text-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="text-area"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="style">Style:</label>
        <select
          id="style"
          name="style"
          value={formData.style}
          onChange={handleChange}
          className="dropdown"
          required
        >
          <option value="">Select a style</option>
          {styles.map((style) => (
            <option key={style.name} value={style.id}>
              {style.name}
            </option>
          ))}
        </select>
      </div>
      <input type="hidden" name="brewery_id" value={formData.brewery_id} />
      <button type="submit" className="button button--compact button--primary">Add Beer</button>
    </form>
  );
};
