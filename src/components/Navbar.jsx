import React from 'react'
import '../App';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
        
       <div>
        <h1>React Books App</h1>
       </div>
       <div>
        Your Favorite Books
       </div>
       <Link to="/search" className="button-link">Search for Books</Link>
     <Link to="/favorites" className="button-link">View Favorites</Link>
      <Link to="/login" className="button-link">Login</Link>
      <Link to="/logout" className="button-link">Logout</Link>
      <Link to="/register" className="button-link">Register</Link>
      <Link to="/notes" className="button-link">Notes</Link>
        </div>
  )
}

export default Navbar