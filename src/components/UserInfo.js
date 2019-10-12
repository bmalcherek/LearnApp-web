import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthValue } from '../context';

const UserInfo = () => {
  const { auth, setAuth, username } = useAuthValue();

  const changeAuth = () => {
    setAuth(!auth);
  };
  let content = (
    <Link to="/login">
      <button type="button" id="login-button">
        Login
      </button>
    </Link>
  );
  if (auth) {
    content = username;
  }
  return (
    <div id="user-info">
      {content}
      <button type="button" onClick={changeAuth}>
        Change
      </button>
    </div>
  );
};

export default UserInfo;
