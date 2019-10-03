import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/CollectionList.css';
import axios from 'axios';

export default function CollectionList() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_API_URL}api/collections/`;
      const token = localStorage.getItem('token');
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      };

      const result = await axios.get(url);
      setCollections(result.data);
    };

    fetchData();
  }, []);

  const listElements = collections.map(collection => (
    <li className="collection-list-element" key={collection.name.toString()}>
      <Link className="link light" to={`/collections/${collection.id}`}>
        {collection.name}
      </Link>
      <button className="btn" id="add-to-my-collections-btn" type="button">
        +
      </button>
    </li>
  ));

  return (
    <div id="collection-list-component">
      <div id="collections-options">
        <button className="btn" id="create-new-collection-btn" type="button">
          <Link className="link dark" to="/create-new-collection">
            Create new colletions
          </Link>
        </button>
      </div>
      <ul id="collection-list">{listElements}</ul>
    </div>
  );
}
