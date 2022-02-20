import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_Data.js';

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
};

export function saveQuestionAnswer(data) {
  return _saveQuestionAnswer(data);
};

export function saveQuestion(question) {
  return _saveQuestion(question);
}
