import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { postData } from '../../helpers';
import { useAuthValue } from '../../context';

const LoginForm = props => {
  const { setAuth, setUsername, setStayAuth } = useAuthValue();

  const [user, setUser] = useState('');
  const [passwd, setPasswd] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const handleSubmit = () => {
    const loginData = {
      username: user,
      password: passwd
    };

    const res = postData('rest-auth/login/', loginData);
    res
      .then(data => {
        setAuth(true);
        setUsername(user);
        setStayAuth(stayLoggedIn);
        if (stayLoggedIn) {
          localStorage.setItem('stayAuth', true);
          localStorage.setItem('token', data.data.key);
        } else {
          sessionStorage.setItem('token', data.data.key);
        }
      })
      .catch(err => console.log(err));
    props.history.push('/');
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
        console.log('error');
    }
  };

  return (
    <div id="login-form-container">
      <form id="login-form">
        Username:
        <input type="text" name="user" value={user} onChange={handleChange} />
        Password:
        <input
          type="password"
          name="passwd"
          value={passwd}
          onChange={handleChange}
        />
        Stay logged in?
        <input
          type="checkbox"
          name="stay-logged-in"
          value={stayLoggedIn}
          onChange={handleChange}
        />
        <button className="btn" type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {`Don't have an account?`}
      <Link to="/registration"> Click Here</Link>
    </div>
  );
};

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default LoginForm;
