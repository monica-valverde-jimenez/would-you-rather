import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';
import { Link, withRouter } from 'react-router-dom';

function Question({ question, idQuestion }) {
  return (
    <div className="question-description">
      <h2>Would You Rather</h2>
      <span>...{question}</span>
      <Link to={{ pathname: `/questions/${idQuestion}` }}>View Poll</Link>
    </div>
  );
}

Question.propTypes = {
  name: PropTypes.string,
  avatarURL: PropTypes.string,
  question: PropTypes.string,
  onClick: PropTypes.func,
};

export default withRouter(Question);