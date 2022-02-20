import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { setAuthVotes, setAuthQuestion }  from './authUser';
import { setUserVotes, setUserQuestion }  from './users';
import { showLoading, hideLoading } from 'react-redux-loading';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  }
}

function saveAnswer(data) {
  return {
    type: SAVE_QUESTION_ANSWER,
    ...data,
  }
}

function addQuestion (question) {
  return {
    type: SAVE_QUESTION,
    question,
  }
}

export function saveNewQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      author: authUser.id,
      optionOneText,
      optionTwoText
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(setAuthQuestion(question.id));
        dispatch(setUserQuestion(authUser.id, question.id));
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function saveUserAnswer (data) {
  return (dispatch, getState) => {
    const { authUser } = getState();
    return saveQuestionAnswer(data)
      .then(() => {
        dispatch(saveAnswer(data));
        dispatch(setAuthVotes(data));
        dispatch(setUserVotes(authUser.id, data));
      });
  }
}