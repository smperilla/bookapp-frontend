import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user token and other relevant data from local storage or state management
    localStorage.removeItem('token');

    // Redirect to login page or home page
    navigate('/login'); // Replace '/login' with the path to your login page
  };

  return (
    <button className="container" onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
