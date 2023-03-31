import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
};

export default Auth;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [cookies, setCookies] = useCookies('access_token');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // We'll receive the token from our API
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });

      console.log(response);
      // Set the token in a cookie
      setCookies('access_token', response.data.token);
      // Store the user id in the local storage
      window.localStorage.setItem('userID', response.data.userID);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Login'
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // We make a post request to the backend with the corresponding endpoint. We pass in an object the body of the request.
      await axios.post('http://localhost:3001/auth/register', {
        username,
        password,
      });
      alert('Registration Completed! Now login.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Register'
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};
