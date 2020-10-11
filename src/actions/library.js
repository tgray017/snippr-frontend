import { setAlert } from './shared'
import { alertify } from '../Utils.js'
var contentDisposition = require('content-disposition')

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

export const downloadSnip = (title, audio, audioLength, snipStartTime, snipStopTime) => {
  let fileName

  return (dispatch) => {
    dispatch({ type: 'START_DOWNLOADING_SNIP' })

    let titleStart = Math.round(snipStartTime)
    let titleEnd = Math.round(snipStopTime)
    let length = snipStopTime - snipStartTime

    fetch(`http://localhost:3000/api/v1/snippets/download`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title: `${title} (${titleStart}-${titleEnd} sec)`,
        audio: audio,
        audio_length_sec: length,
        start_time: snipStartTime,
        stop_time: snipStopTime
      })
    })
    .then(response => {
      if (response.ok) {
        let cd = response.headers.get('content-disposition')
        fileName = contentDisposition.parse(cd).parameters.filename
        return response.blob()
      } else {
        return response.json()
      }
    })
    .then(snip => {
      if(snip.errors) {
        dispatch(setAlert('error', alertify(snip.errors)))
      } else {
        let url = window.URL.createObjectURL(snip)
        let a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        a.remove()
      }
      dispatch({ type: 'STOP_DOWNLOADING_SNIP' })
    })
  }
}

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
