import { GET_USERS, SET_USER_VOTES, SET_USER_QUESTION } from '../actions/users'

export default function users (state = null, action) {
  switch (action.type) {
    case GET_USERS :
      return {
        ...state,
        ...action.users
      }
    case SET_USER_VOTES:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: {
            ...state[action.userId].answers,
            [action.qid]: action.answer,
          }
        }
      }
    case SET_USER_QUESTION:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          questions: state[action.userId].questions.concat(action.questionId)
        }
      }
    default :
      return state
  }
}