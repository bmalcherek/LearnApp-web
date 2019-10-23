import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { fetchData, putData } from '../helpers';

import '../styles/LearnView.css';

const LearnView = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const { collectionID } = useParams();

  useEffect(() => {
    const response = fetchData(
      `api/my-questions/${collectionID}/get-questions-to-learn/`
    );
    response.then(res => setQuestions(res.data));
  }, [collectionID]);

  const handleClick = event => {
    let q;
    let wrongAnswer = true;
    switch (event.target.name) {
      case 'great':
        q = 5;
        wrongAnswer = false;
        break;
      case 'good':
        q = 4;
        wrongAnswer = false;
        break;
      case 'average':
        q = 3;
        break;
      case 'bad':
        q = 2;
        break;
      case 'very-bad':
        q = 1;
        break;
      case 'wrong':
        q = 0;
        break;
      default:
        console.log('error');
    }

    if (wrongAnswer) {
      questions.push(questions[currentQuestion]);
    }

    putData(
      `api/my-questions/${collectionID}/${questions[currentQuestion].original_question}/`,
      q
    );

    if (currentQuestion + 2 === questions.length) {
      if (wrongAnswer) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setFinished(true);
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const showAnswer = () => {
    setAnswered(true);
  };

  let question = null;
  if (questions.length > 0 && !finished) {
    question = questions[currentQuestion].question;
  }

  let showAnswerButton = null;
  if (!answered && !finished) {
    showAnswerButton = (
      <button type="button" onClick={showAnswer}>
        Show Answer
      </button>
    );
  }

  let answer = null;
  if (answered && !finished) {
    answer = questions[currentQuestion].answer;
  }

  const buttonNames = ['Great', 'Good', 'Average', 'Bad', 'Very Bad', 'Wrong'];
  let answerButtons = null;
  if (answered && !finished) {
    answerButtons = buttonNames.map(buttonName => (
      <button
        key={buttonName}
        type="button"
        id={`${buttonName.toLowerCase().replace(' ', '-')}-btn`}
        onClick={handleClick}
        className="btn"
        name={`${buttonName.toLowerCase().replace(' ', '-')}`}
      >
        {buttonName}
      </button>
    ));
  }

  let returnButton = null;
  if (finished) {
    returnButton = (
      <Link to="/my-collections" className="dark link">
        <button type="button" className="btn" id="return-btn">
          Return To My Collections
        </button>
      </Link>
    );
  }

  return (
    <div id="learn-view-container">
      {question}
      <br />
      {showAnswerButton}
      {answer}
      <div id="answer-buttons">{answerButtons}</div>
      {returnButton}
    </div>
  );
};

export default LearnView;
