import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { fetchData, postData } from '../helpers';
import Skeleton from './loading/Skeleton';

import '../styles/CollectionList.css';

export default function CollectionList() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const skeletonAmount = 10;
  const skeletonsList = [];
  let skeletons = null;

  useEffect(() => {
    setLoading(true);
    const response = fetchData('api/collections/');
    response.then(res => {
      setCollections(res.data);
      setLoading(false);
    });
  }, []);

  const addToMyCollections = event => {
    const data = {
      collection: event.target.name
    };

    const response = postData('api/my-collections/', data);
    response.catch(err => console.log(err));
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

  const listElements = collections.map(collection => (
    <li className="collection-list-element" key={collection.name.toString()}>
      <Link className="link light" to={`/collections/${collection.id}`}>
        {collection.name}
      </Link>
      <div id="star-rating">
        <span id="star-icon">
          <FontAwesomeIcon icon={faStar} id="star-icon" />
        </span>
        {collection.rating}
      </div>
      {}
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

  console.log(collections);

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
      {skeletons}
      <ul id="collection-list">{listElements}</ul>
    </div>
  );
}
