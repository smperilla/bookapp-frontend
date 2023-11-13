import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = ({ addToFavorites }) => { // Added prop to accept addToFavorites function
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const GOOGLE_API_KEY = 'AIzaSyDN9th_WVnZn6H3taU6P9I03vUmBd5S9SQ';  // Replace with your Google Books API key
    const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

    const searchBooks = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await axios.get(`${GOOGLE_BOOKS_API_URL}?q=${query}&key=${GOOGLE_API_KEY}`);
            setBooks(result.data.items || []);
        } catch (error) {
            setError('Failed to fetch books');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchBooks();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Search books" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <h3>{book.volumeInfo.title}</h3>
                        <p>{book.volumeInfo.authors?.join(', ')}</p>
                        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                        <button onClick={() => addToFavorites(book)}>Add to Favorites</button> {/* Add to Favorites button */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookSearch;
