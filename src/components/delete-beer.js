import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const DeleteBeerForm = ({ beerId, onBeerDeleted }) => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [hasDeletePermission, setHasDeletePermission] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const token = await getAccessTokenSilently();
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const permissions = decodedToken.permissions || [];
        setHasDeletePermission(permissions.includes('delete:beers'));
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
        const errorData = await response.json();
        navigate('/error', {
          state: {
            errorCode: response.status,
            errorMessage: errorData.error || 'Failed to delete beer',
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

  if (!hasDeletePermission) {
    return null;
  }

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="button button--danger">Delete Beer</button>
    </form>
  );
};
