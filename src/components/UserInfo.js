import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthValue } from '../context';
import logout from '../helpers/logout';
import { fetchData } from '../helpers';

import '../styles/UserInfo.css';

const UserInfo = () => {
  const { auth, setAuth, username, setUsername, setStayAuth } = useAuthValue();

  useEffect(() => {
    if (auth && username === '') {
      const response = fetchData('api/user/');
      response.then(res => {
        setUsername(res.data.username);
      });
    }
  }, [auth, username, setUsername]);

  const changeAuth = () => {
    logout();
    setAuth(false);
    setUsername('');
    setStayAuth(false);
  };

  let content = (
    <Link to="/login">
      <button type="button" id="login-button">
        Login
      </button>
    </Link>
  );
  if (auth) {
    content = (
      <div id="username">
        <i className="fas fa-user" />
        {username}
      </div>
    );
  }
  return (
    <div id="user-info">
      {content}
      <div id="user-info-dropdown">
        <button type="button" onClick={changeAuth}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
