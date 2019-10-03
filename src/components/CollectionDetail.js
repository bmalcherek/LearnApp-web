import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import '../styles/CollectionDetail.css';

const CollectionDetail = props => {
  const { match } = props;
  const { collectionID } = match.params;

  const [collection, setCollection] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_API_URL}api/collections/${collectionID}/`;
      const token = localStorage.getItem('token');
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      };
      const result = await axios.get(url);
      console.log(result.data);
      setCollection(result.data);
    };

    fetchData();
  }, [collectionID]);

  return (
    <div id="collection-detail">
      <div id="collection-info">
        <div id="collection-name">{collection.name}</div>
        <div id="collection-rating">{`Rating: ${collection.rating}`}</div>
        <div id="collection-votes">{`Votes: ${collection.ratings_count}`}</div>
      </div>
      <hr />
      <div id="questions">
        <div id="questions-options">
          <button className="btn" id="add-question-btn" type="button">
            <Link
              className="link dark"
              to={`/collections/${collectionID}/add-question`}
            >
              Add question
            </Link>
          </button>
        </div>
        Put questions here
      </div>
    </div>
  );
};

CollectionDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      collectionID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default CollectionDetail;
