import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/QuestionList.css';

const QuestionList = props => {
  const [questions, setQuestions] = useState([]);
  const { collectionID } = props;

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_API_URL}api/questions/${collectionID}/`;
      const token = localStorage.getItem('token');
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      };

      const result = await axios.get(url);
      setQuestions(result.data);
    };
    fetchData();
  }, [collectionID]);

  const listElements = questions.map(question => (
    <li className="question-list-element" key={question.id}>
      {question.question}
      <div id="edit-btn">
        <Link
          to={`/collections/${collectionID}/${question.id}/edit`}
          className="link dark"
        >
          <button type="button" className="btn">
            Edit
          </button>
        </Link>
      </div>
    </li>
  ));

  return (
    <div id="question-list-container">
      <ul id="question-list">{listElements}</ul>
    </div>
  );
};

QuestionList.propTypes = {
  collectionID: PropTypes.string.isRequired
};

export default QuestionList;
