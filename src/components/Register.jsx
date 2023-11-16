import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for redirection after successful registration

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bookapp-backend-zph0.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 201) {
        console.log('Registration successful');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Registration failed due to a network error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Register;
