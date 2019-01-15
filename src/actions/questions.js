import { _saveQuestion } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (question) {
  console.log('This os the question: ', question)
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const {optionOneText, optionTwoText} = question
    dispatch(showLoading())
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
    .then((question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()))
  }
}
