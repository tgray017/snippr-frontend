import { setAlert } from './setAlert'
import { alertify } from '../Utils.js'
import { fetchLibrary } from './fetchLibrary'

export const addSnipToLibrary = (userId, title, audio, audioLength, podcastName, podcastId, rawSrc, snipStartTime, snipStopTime) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_SNIP_TO_LIBRARY' })
    let titleStart = Math.round(snipStartTime)
    let titleEnd = Math.round(snipStopTime)
    let length = snipStopTime - snipStartTime
    let audio = `${rawSrc}#t=${snipStartTime},${snipStopTime}`
    fetch(`http://localhost:3000/api/v1/users/${userId}/snippets`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        title: `${title} (${titleStart}-${titleEnd} sec)`,
        audio: audio,
        audio_length_sec: length,
        podcast_name: podcastName,
        podcast_id: podcastId,
        original_episode_name: title,
        raw_src: rawSrc,
        start_time: snipStartTime,
        stop_time: snipStopTime
      })
    })
    .then(response => response.json())
    .then(snip => {
      if(snip.errors) {
        dispatch(setAlert('error', alertify(snip.errors)))
      } else {
        dispatch(setAlert('success', alertify('Snip added to library')))
        dispatch(fetchLibrary(userId))
      }
    })

  }
}
