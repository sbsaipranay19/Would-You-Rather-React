import { RECEIVE_QUESTIONS, ADD_ANSWER, REMOVE_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      }
    case ADD_QUESTION :

       return {
           ...state,
           [action.question.id]: action.question,
       }
    case ADD_ANSWER :
      return {
          ...state,
          [action.id]: {
              ...state[action.id],
              [action.answer]: {
                  ...state[action.id][action.answer],
                  "votes": state[action.id][action.answer].votes.concat([action.authedUser])
              }
          }
      }
    case REMOVE_ANSWER :
        return {
            ...state,
            [action.id]: {
                ...state[action.id],
                [action.answer]: state[action.id][action.answer].votes.filter((uid) => uid !== action.authedUser)
            }
        }
    default :
      return state
  }
}
