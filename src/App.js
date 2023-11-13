import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favorites from "./components/Favorites";
import BookSearch from "./components/BookSearch";
import React, { useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]); // State to store favorites



  // Function to add a book to favorites
  const addToFavorites = (book) => {
    // Prevent adding duplicates
    if (!favorites.some(favorite => favorite.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (bookId) => {
    setFavorites(favorites.filter(book => book.id !== bookId));
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
        <Route path="/search" element={<BookSearch addToFavorites={addToFavorites} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
