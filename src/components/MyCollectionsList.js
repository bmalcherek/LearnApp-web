import React, { useState, useEffect } from 'react';

import { fetchData } from '../helpers';

const MyCollectionList = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const response = fetchData('api/my-collections/');
    response
      .then(res => setCollections(res.data))
      .catch(err => console.log(err));
  }, []);

  console.log(collections);

  const collectionList = collections.map(collection => (
    <li className="collection-list-element" key={collection.id}>
      Test
    </li>
  ));

  return (
    <div id="my-collections-list-container">
      <ul i="my-collections-list">{collectionList}</ul>
    </div>
  );
};

export default MyCollectionList;
