import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bookapp-backend-zph0.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        console.log('Login successful');

        
        navigate('/home'); 

    
      } else {
        // Handle errors (e.g., show message to user)
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form className="container" onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
