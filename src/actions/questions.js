import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const REMOVE_ANSWER = 'REMOVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        console.log(optionOneText, optionTwoText, authedUser)

        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

function addAnswer ({ id, authedUser, answer }) {
  return {
    type: ADD_ANSWER,
    id,
    authedUser,
    answer
  }
}

function removeAnswer({ id, authedUser, answer}) {
    return {
        type: REMOVE_ANSWER,
        id,
        authedUser,
        answer
    }
}

export function handleAddAnswer (qid, answer) {
  return (dispatch, getState) => {
      const { authedUser} = getState()
      dispatch(showLoading())
      dispatch(addAnswer({id: qid, authedUser, answer}))
      return saveQuestionAnswer({
          qid,
          answer,
          authedUser
      })
          .then(() => dispatch(hideLoading()))
          .catch((e) => {
            console.warn('Error in handleAddAnswer: ', e)
            dispatch(removeAnswer({qid, authedUser, answer}))
            alert('The was an error saving the answer. Try again.')
            dispatch(hideLoading())
      })
  }
}
