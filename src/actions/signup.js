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
    .then(user => dispatch({type: 'SIGN_UP', payload: user}))
  }
}
