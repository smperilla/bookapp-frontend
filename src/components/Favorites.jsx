import React from 'react';
import '../App.css'; // Ensure this import is correct for your CSS

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((book) => (
            <li key={book.id}>
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              )}
              <button onClick={() => removeFromFavorites(book.id)}>Remove from Favorites</button>
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
