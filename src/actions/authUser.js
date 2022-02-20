export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const SET_AUTHED_VOTES = 'SET_AUTHED_VOTES';
export const SET_AUTHED_QUESTION = 'SET_AUTHED_QUESTION';

export function setAuthedUser (data = {}) {
  return {
    type: SET_AUTHED_USER,
    data,
  }
}

export function setAuthVotes (data = {}) {
  return {
    type: SET_AUTHED_VOTES,
    ...data,
  }
}

export function setAuthQuestion (questionId) {
  return {
    type: SET_AUTHED_QUESTION,
    questionId,
  }
}