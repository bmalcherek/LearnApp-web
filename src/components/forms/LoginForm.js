import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { postData } from '../../helpers';
import { useAuthValue } from '../../context';

const LoginForm = props => {
  const { setAuth, setUsername } = useAuthValue();

  const [user, setUser] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleSubmit = () => {
    const loginData = {
      username: user,
      password: passwd
    };

    const res = postData('rest-auth/login/', loginData);
    res.then(data => {
      setAuth(true);
      setUsername(user);
      localStorage.setItem('token', data.data.key);
    });
    res.catch(err => console.log(err));

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
        <button className="btn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
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
