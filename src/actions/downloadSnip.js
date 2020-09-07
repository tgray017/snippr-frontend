import { setAlert } from './setAlert'
import { alertify } from '../Utils.js'
var contentDisposition = require('content-disposition')

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
