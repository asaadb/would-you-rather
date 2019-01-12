import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { getInitialData } from '../utils/api'
import { setAuthedUser } from './authedUser'

const AUTHED_ID = 'tylermcginnis'
export function handleInitialData () {
  return (dispatch) => {
    return getInitialData ()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}
