import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchData } from '../helpers';

import '../styles/MyCollectionList.css';

const MyCollectionList = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const response = fetchData('api/my-collections/');
    response
      .then(res => setCollections(res.data))
      .catch(err => console.log(err));
  }, []);

  const collectionList = collections.map(collection => (
    <li className="collection-list-element" key={collection.id}>
      {collection.name}
      <div id="collection-options">
        <span id="to-learn-txt">{`${collection.to_learn} to learn`}</span>
        <Link to={`/my-collections/${collection.id}/learn`}>
          <button
            key={collection.id}
            className="btn"
            type="button"
            id="learn-btn"
          >
            Learn
          </button>
        </Link>
      </div>
    </li>
  ));

  return (
    <div id="my-collections-list-container">
      <div id="my-collections-header">
        <div id="my-collections-text">
          <h3>My collections</h3>
        </div>
      </div>
      <ul id="my-collections-list">{collectionList}</ul>
    </div>
  );
};

export default MyCollectionList;
