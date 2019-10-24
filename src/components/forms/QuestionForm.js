import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { postData, fetchData, putData } from '../../helpers';

const QuestionForm = props => {
  const { match, edit } = props;
  const { collectionID } = match.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const { questionID } = useParams();

  useEffect(() => {
    if (edit) {
      const response = fetchData(
        `api/questions/${collectionID}/${questionID}/`
      );
      response.then(res => {
        const { data } = res;
        setQuestion(data.question);
        setAnswer(data.answer);
      });
    }
  }, [collectionID, questionID, edit]);

  const handleChange = event => {
    switch (event.target.name) {
      case 'question':
        setQuestion(event.target.value);
        break;
      case 'answer':
        setAnswer(event.target.value);
        break;
      default:
        console.log('error');
    }
  };

  const handleSubmit = () => {
    const questionData = {
      question,
      isImage: false,
      imageSrc: '',
      answer,
      collection: collectionID
    };
    if (!edit) {
      const response = postData(`api/questions/${collectionID}/`, questionData);
      response.catch(err => console.log(err));
    } else {
      const response = putData(
        `api/questions/${collectionID}/${questionID}/`,
        questionData
      );
      response.catch(err => console.log(err));
    }

    props.history.push(`/collections/${collectionID}`);
  };

  return (
    <div id="question-form">
      <form>
        Question:
        <br />
        <input
          type="text"
          name="question"
          value={question}
          onChange={handleChange}
        />
        <br />
        Answer:
        <br />
        <input
          type="text"
          name="answer"
          value={answer}
          onChange={handleChange}
        />
        <button
          className="btn"
          id="question-for-submit-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

QuestionForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      collectionID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  edit: PropTypes.bool.isRequired
};

export default QuestionForm;
