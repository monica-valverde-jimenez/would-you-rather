export const GET_USERS = 'GET_USERS';
export const SET_USER_VOTES = 'SET_USER_VOTES';
export const SET_USER_QUESTION = 'SET_USER_QUESTION';

export function getUsers (users) {
  return {
    type: GET_USERS,
    users,
  }
}

export function setUserVotes (userId, data = {}) {
  return {
    type: SET_USER_VOTES,
    userId,
    ...data,
  }
}

export function setUserQuestion (userId, questionId) {
  return {
    type: SET_USER_QUESTION,
    userId,
    questionId,
  }
}