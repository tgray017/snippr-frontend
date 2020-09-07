import { setAlert } from './setAlert'
import { alertify } from '../Utils.js'

export const removeFromLibrary = (id, userId) => {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_FROM_LIBRARY' })

    fetch(`http://localhost:3000/api/v1/library/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
        user_id: userId
      })
    })
    .then(response => response.json())
    .then(library => {
      if(library.errors) {
        dispatch(setAlert('error', alertify(library.errors)))
      } else {
        dispatch({ type: 'FETCH_LIBRARY', payload: { library: library } })
      }
    })

  }
}
