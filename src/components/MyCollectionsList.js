import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchData, deleteItem } from '../helpers';

import '../styles/MyCollectionList.css';

const MyCollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const response = fetchData('api/my-collections/');
    response
      .then(res => setCollections(res.data))
      .catch(err => console.log(err));

    setEdit(false);
  }, [edit]);

  const handleDelete = event => {
    const response = deleteItem(
      `api/my-collections/${event.currentTarget.name}/`
    );
    response.then(() => setEdit(true));
  };

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
        <button
          type="button"
          onClick={handleDelete}
          id="trash-icon"
          className="btn"
          name={collection.id}
        >
          <i className="far fa-trash-alt" />
        </button>
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
