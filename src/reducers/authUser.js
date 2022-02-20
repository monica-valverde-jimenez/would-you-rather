import { SET_AUTHED_USER, SET_AUTHED_VOTES, SET_AUTHED_QUESTION } from '../actions/authUser'

const initialState = {
    isAuthenticated: false,
}

export default function authUser (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHED_USER :
      return action.data
    case SET_AUTHED_VOTES : 
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.qid]: action.answer,
        }
      }
    case SET_AUTHED_QUESTION:{
      return {
        ...state,
        questions: state.questions.concat(action.questionId)
      }
    }
    default :
      return state
  }
}