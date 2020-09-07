import { setAlert } from './setAlert'

export const fetchLibrary = (userId) => {
  return (dispatch) => {
    dispatch({ type: 'START_FETCHING_LIBRARY' })

    let url = `http://localhost:3000/api/v1/users/${userId}/library`
    fetch(url)
    .then(response => response.json())
    .then(library => {
      if(library.errors) {
        dispatch(setAlert('error', library.errors))
      } else {
        dispatch({ type: 'FETCH_LIBRARY', payload: { library: library } })
      }
    })

  }
}
