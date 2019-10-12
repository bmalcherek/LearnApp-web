import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { postData } from '../../helpers';

const QuestionForm = props => {
  const { match } = props;
  const { collectionID } = match.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

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
    const response = postData(`api/questions/${collectionID}/`, questionData);
    response.catch(err => console.log(err));

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
  }).isRequired
};

export default QuestionForm;