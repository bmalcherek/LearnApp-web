import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchData } from '../helpers';
import QuestionList from './QuestionList';

import '../styles/CollectionDetail.css';

const CollectionDetail = props => {
  const { match } = props;
  const { collectionID } = match.params;

  const [collection, setCollection] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const response = fetchData(`api/collections/${collectionID}/`);
    response.then(res => setCollection(res.data));
    setEdit(false);
  }, [collectionID, edit]);

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
          <button
            className="btn"
            id="add-question-btn"
            type="button"
            onClick={() => setEdit(true)}
          >
            <Link
              className="link dark"
              to={`/collections/${collectionID}/add-question`}
            >
              Add question
            </Link>
          </button>
        </div>
        <QuestionList collectionID={collectionID} />
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
