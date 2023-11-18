import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (!token) {
          console.error('No token found, user might not be logged in');
          return;
        }
  
        const response = await fetch('https://bookapp-backend-zph0.onrender.com/api/favorites', {
          headers: {
            'Authorization': token // Include the token in the Authorization header
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (bookId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      if (!token) {
        console.error('No token found, user might not be logged in');
        return;
      }
  
      const response = await fetch(`https://bookapp-backend-zph0.onrender.com/api/favorites/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token // Include the token in the Authorization header
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setFavorites(favorites.filter(book => book.bookId !== bookId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="container" >
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((book) => (
            <li key={book.bookId}>
              <h3>{book.title}</h3>
              <p>{book.authors?.join(', ')}</p>
              {book.thumbnail && (
                <img src={book.thumbnail} alt={book.title} />
              )}
              <button onClick={() => removeFromFavorites(book.bookId)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite books added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
