import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchData, postData } from '../helpers';
import '../styles/CollectionList.css';

export default function CollectionList() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const response = fetchData('api/collections/');
    response.then(res => setCollections(res.data));
  }, []);

  const addToMyCollections = event => {
    const data = {
      collection: event.target.name
    };

    const response = postData('api/my-collections/', data);
    response.catch(err => console.log(err));
  };

  const listElements = collections.map(collection => (
    <li className="collection-list-element" key={collection.name.toString()}>
      <Link className="link light" to={`/collections/${collection.id}`}>
        {collection.name}
      </Link>
      <button
        className="btn add-to-my-collections-btn"
        name={collection.id}
        type="button"
        onClick={addToMyCollections}
      >
        +
      </button>
    </li>
  ));

  return (
    <div id="collection-list-component">
      <div id="collections-header">
        <h3>Collections</h3>
      </div>
      <div id="collections-options">
        <h5>Options</h5>
        <button className="btn" id="create-new-collection-btn" type="button">
          <Link className="link dark" to="/create-new-collection">
            Create new colletion
          </Link>
        </button>
      </div>
      <ul id="collection-list">{listElements}</ul>
    </div>
  );
}
