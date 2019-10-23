import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchData, postData } from '../helpers';

import '../styles/LearnView.css';

const LearnView = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);

  const { collectionID } = useParams();

  useEffect(() => {
    const response = fetchData(
      `api/my-questions/${collectionID}/get-questions-to-learn/`
    );
    response.then(res => setQuestions(res.data));
  }, [collectionID]);

  const handleClick = event => {
    let q;
    switch (event.target.name) {
      case 'great':
        q = 5;
        break;
      case 'good':
        q = 4;
        break;
      default:
        console.log('error');
    }

    postData(
      `api/my-questions/${collectionID}/${questions[currentQuestion].original_question}/`,
      q
    );

    setCurrentQuestion(currentQuestion + 1);
  };

  console.log(questions);
  let buttons = null;
  if (answered) {
    buttons = (
      <div id="answer-buttons">
        <button
          type="button"
          id="answer-btn"
          className="btn"
          name="great"
          onClick={handleClick}
        >
          Great
        </button>
        <button
          type="button"
          // id="good-btn answer-btn"
          id="answer-btn"
          className="btn"
          name="good"
          onClick={handleClick}
        >
          Good
        </button>
      </div>
    );
  }

  return <div id="learn-view-container">{buttons}</div>;
};

export default LearnView;
