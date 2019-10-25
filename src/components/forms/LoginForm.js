import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { postData } from '../../helpers';
import { useAuthValue } from '../../context';

import '../../styles/LoginForm.css';

const LoginForm = props => {
  const { setAuth, setUsername, setStayAuth } = useAuthValue();

  const [user, setUser] = useState('');
  const [passwd, setPasswd] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const loginData = {
      username: user,
      password: passwd
    };

    const res = postData('rest-auth/login/', loginData);
    res
      .then(data => {
        if (stayLoggedIn) {
          localStorage.setItem('token', data.data.key);
          localStorage.setItem('stayAuth', true);
        } else {
          sessionStorage.setItem('token', data.data.key);
        }
        setUsername(user);
        setStayAuth(stayLoggedIn);
        setAuth(true);
      })
      .then(() => {
        props.history.push('/');
      })
      .catch(err => setError(err.message));
  };

  const handleChange = event => {
    switch (event.target.name) {
      case 'passwd':
        setPasswd(event.target.value);
        break;
      case 'user':
        setUser(event.target.value);
        break;
      case 'stay-logged-in':
        setStayLoggedIn(event.target.checked);
        break;
      default:
        setError('error');
    }
  };

  return (
    <div id="login-form-container" className="content">
      {error}
      <form id="login-form">
        <span id="username-text">Username:</span>
        <input
          type="text"
          name="user"
          placeholder="Enter username:"
          value={user}
          onChange={handleChange}
        />
        Password:
        <input
          type="password"
          name="passwd"
          placeholder="Enter password:"
          value={passwd}
          onChange={handleChange}
        />
        <button
          className="btn"
          type="button"
          onClick={handleSubmit}
          id="submit-btn"
        >
          Login
        </button>
        <div id="remember-me">
          <input
            type="checkbox"
            name="stay-logged-in"
            value={stayLoggedIn}
            onChange={handleChange}
          />
          Remember me
        </div>
        <div id="registration">
          Don't have an account?
          <Link
            to="/registration"
            className="link light"
            id="registration-link"
          >
            Click Here
          </Link>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default LoginForm;
