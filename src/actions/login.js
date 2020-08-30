import { setAlert } from './setAlert'
import { sessionService } from 'redux-react-session'
import { alertify } from '../Utils.js'

export const login = (userObject) => {

  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/sessions/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({session: userObject})
    })
    .then(response => response.json())
    .then(user => {
      if (user.errors) {
        console.log(user)
        console.log(user.errors)
        dispatch(setAlert('error', alertify(user.errors)))
      } else {
        sessionService.saveSession(user)
        sessionService.saveUser(user)
      }
    })
  }
}
