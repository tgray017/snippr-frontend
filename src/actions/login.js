import { sessionService } from 'redux-react-session'

export const login = (userObject) => {

  return () => {
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
      if(user.errors) {
        console.log(user)
      } else {
        sessionService.saveSession(user)
        sessionService.saveUser(user)
      }
    })
  }
}
