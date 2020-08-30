import { setAlert } from './setAlert'
import { alertify } from '../Utils.js'

export const addEpisodeToLibrary = (userId, title, description, audio, audioLength, podcastName, podcastId, rawSrc) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_EPISODE_TO_LIBRARY' })

    fetch(`http://localhost:3000/api/v1/users/${userId}/episodes`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        title: title,
        description: description,
        audio: audio,
        audio_length_sec: audioLength,
        podcast_name: podcastName,
        podcast_id: podcastId,
        raw_src: rawSrc
      })
    })
    .then(response => response.json())
    .then(episode => {
      if(episode.errors) {
        dispatch(setAlert('error', alertify(episode.errors)))
      } else {
        dispatch(setAlert('success', alertify('Episode added to library')))
      }
    })

  }
}
