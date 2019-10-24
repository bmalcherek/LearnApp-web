import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchData } from '../helpers';

import '../styles/QuestionList.css';

const QuestionList = props => {
  const [questions, setQuestions] = useState([]);
  const [edit, setEdit] = useState(false);
  const { collectionID } = props;

  useEffect(() => {
    const response = fetchData(`api/questions/${collectionID}/`);
    response.then(res => {
      setQuestions(res.data);
      setEdit(false);
    });
  }, [collectionID, edit]);

  const listElements = questions.map(question => (
    <li className="question-list-element" key={question.id}>
      {question.question}
      <div id="edit-btn">
        <Link
          to={`/collections/${collectionID}/${question.id}/edit`}
          className="link dark"
        >
          <button type="button" className="btn" onClick={() => setEdit(true)}>
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
