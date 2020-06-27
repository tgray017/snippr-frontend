import { setAlert } from './setAlert'

export const addSnipToLibrary = (userId, audioUrl, rawSrc, snipStartTime, snipStopTime) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_SNIP_TO_LIBRARY' })

    let src = `${rawSrc}#t=${snipStartTime},${snipStopTime}`
    fetch(`http://localhost:3000/api/v1/users/${userId}/snippets`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        audioUrl: audioUrl,
        raw_src: rawSrc,
        start_time: snipStartTime,
        stop_time: snipStopTime,
        src: src
      })
    })
    .then(response => response.json())
    .then(snip => {
      if(snip.errors) {
        dispatch(setAlert('error', snip.errors))
      } else {
        dispatch(setAlert('success', 'Snip added to library'))
      }
    })

  }
}
