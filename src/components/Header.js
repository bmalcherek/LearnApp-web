import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

export default function Header() {
  return (
    <div className="header">
      <div id="logo" className="header-links">
        <Link className="link dark" to="/">
          LearnIt
        </Link>
      </div>

      <div id="collections-link" className="header-links">
        <Link className="link dark" to="/collections">
          Collections
        </Link>
      </div>

      <div id="user-info" className="header-links">
        User Info Here
      </div>
    </div>
  );
}
