import React from 'react'
import '../App';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    console.log('Logged Out');
    

  };
  
  return (
    <div className='navbar'>
        
       <div>
        <h1 className="title" >Bookworm</h1>
       </div>
       <div className="caption">
        Your personal bookshelf
       </div> <br />
       <Link to="/home" className="button-link">Home</Link>
       <Link to="/search" className="button-link">Search for Books</Link>
     <Link to="/favorites" className="button-link">View Favorites</Link>
      <Link to="/login" className="button-link">Login</Link>
      <Link to="/logout" className="button-link" onClick={handleLogout}>
        Logout
      </Link>     
      <Link to="/register" className="button-link">Register</Link>
      <Link to="/notes" className="button-link">Notes</Link>
        </div>
  )
}

export default Navbar