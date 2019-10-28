import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { fetchData, deleteItem } from '../helpers';
import Skeleton from './loading/Skeleton';

import '../styles/MyCollectionList.css';

const MyCollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const skeletonAmount = 10;
  const skeletonsList = [];
  let skeletons = null;

  useEffect(() => {
    setLoading(true);
    const response = fetchData('api/my-collections/');
    response
      .then(res => {
        setCollections(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));

    setEdit(false);
  }, [edit]);

  const handleDelete = event => {
    const response = deleteItem(
      `api/my-collections/${event.currentTarget.name}/`
    );
    response.then(() => setEdit(true));
  };

  if (loading) {
    for (let i = 0; i < skeletonAmount; i += 1) {
      skeletonsList.push(
        <li id="skeleton-list-element" key={i}>
          <Skeleton height="14px" />
        </li>
      );
    }
    skeletons = <ul id="skeleton-list">{skeletonsList}</ul>;
  }

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
            disabled={!(collection.to_learn > 0)}
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
          <FontAwesomeIcon icon={faTrashAlt} />
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
      {skeletons}
      <ul id="my-collections-list">{collectionList}</ul>
    </div>
  );
};

export default MyCollectionList;
