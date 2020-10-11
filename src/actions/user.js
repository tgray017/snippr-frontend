import { setAlert } from './shared'
import { sessionService } from 'redux-react-session'
import { alertify } from '../Utils.js'

//
// if (response.ok)
// throw new Error(user.errors)

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
        dispatch(setAlert('error', alertify(user.errors)))
      } else {
        sessionService.saveSession(user)
        sessionService.saveUser(user)
      }
    })
  }
}

export const logout = () => {
  return () => {
    sessionService.deleteSession()
    sessionService.deleteUser()
  }
}

export const signup = (userObject) => {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/users/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({user: userObject})
    })
    .then(response => response.json())
    .then(user => {
      if (user.errors) {
        dispatch(setAlert('error', alertify(user.errors)))
      } else {
        sessionService.saveSession(user)
        sessionService.saveUser(user)
      }
    })
  }
}
