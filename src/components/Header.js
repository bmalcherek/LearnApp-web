import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faBookReader } from '@fortawesome/free-solid-svg-icons';

import UserInfo from './UserInfo';
import { useAuthValue } from '../context';
import '../styles/Header.css';

export default function Header() {
  const { auth } = useAuthValue();

  let myCollections = null;
  if (auth) {
    myCollections = (
      <div id="my-collections-link" className="header-links">
        <Link to="/my-collections" className="link dark">
          <FontAwesomeIcon className="header-icon" icon={faBookReader} />
          My Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="header">
      <div id="logo" className="header-links">
        <Link className="link dark" to="/">
          LearnIt
        </Link>
      </div>

      <div id="collections-link" className="header-links">
        <Link className="link dark" to="/collections">
          <FontAwesomeIcon className="header-icon" icon={faBookOpen} />
          Collections
        </Link>
      </div>

      {myCollections}

      <div id="user-info" className="header-links">
        <UserInfo />
      </div>
    </div>
  );
}
