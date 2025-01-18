import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const DeleteBeerForm = ({ beerId, onBeerDeleted }) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/beers/${beerId}/delete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onBeerDeleted();
      } else {
        console.error('Failed to delete beer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="button button--secondary">Remove</button>
    </form>
  );
};
