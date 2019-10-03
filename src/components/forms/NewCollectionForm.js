import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function NewCollectionForm(props) {
  const [collectionName, setCollectionName] = useState('');

  const handleSubmit = () => {
    const url = `${process.env.REACT_APP_API_URL}api/collections/`;
    const token = localStorage.getItem('token');
    const collection = {
      name: collectionName
    };
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    };

    axios
      .post(url, collection)
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
