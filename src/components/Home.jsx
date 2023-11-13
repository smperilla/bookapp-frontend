import React from 'react'
import { Link } from 'react-router-dom';
import '../App';

const Home = () => {
  return (
    <div className='book-list' >Home
     <Link to="/search" className="button-link">Search for Books</Link>
     <Link to="/favorites" className="button-link">View Favorites</Link>
    </div>
  )
}

export default Home