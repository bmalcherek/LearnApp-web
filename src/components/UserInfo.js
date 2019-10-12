import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthValue } from '../context';
import fetchData from '../helpers/fetchData';

const UserInfo = () => {
  const { auth, setAuth } = useAuthValue();

  const [user, setUser] = useState('');

  useEffect(() => {
    console.log('xd');
    setUser('xd');
    fetchData('xd');
  }, [user]);

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
    content = user;
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
