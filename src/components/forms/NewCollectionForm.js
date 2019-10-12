import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { postData } from '../../helpers';

export default function NewCollectionForm(props) {
  const [collectionName, setCollectionName] = useState('');

  const handleSubmit = () => {
    const collection = {
      name: collectionName
    };
    const response = postData('api/collections/', collection);
    response
      .then(res => props.history.push(`/collections/${res.data.id}`))
      .catch(err => console.log(err));
  };

  const handleChange = event => {
    switch (event.target.name) {
      case 'collection-name':
        setCollectionName(event.target.value);
        break;
      default:
        console.log('error');
    }
  };

  return (
    <div id="new-collection-form">
      <form>
        Collection Name:
        <br />
        <input
          type="text"
          name="collection-name"
          value={collectionName}
          onChange={handleChange}
        />
        <button
          className="btn"
          id="new-collection-form-submit-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

NewCollectionForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
