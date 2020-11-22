import { setAlert } from './shared'
import { alertify } from '../Utils.js'

export const discardSnip = () => {
  return (dispatch) => {
    dispatch({type: 'DISCARD_SNIP'})
  }
}

export const pause = (audioElement) => {
  return (dispatch) => {
    audioElement.pause()
    dispatch({type: 'PAUSE'})
  }
}

export const play = (audioElement) => {
  return (dispatch) => {
    dispatch({type: 'PLAY'})
    audioElement.play()
    .catch(error => {
      dispatch(setAlert('error', alertify('Error playing audio')))
    })
  }
}

export const setAudio = (audioId, audioUrl, audioLength, title, description, audioType, startTime, stopTime, podcastName, podcastId) => {
  return (dispatch) => {
    dispatch({type: 'SHOW_AUDIO_CONTAINER'})
    dispatch({type: 'SET_AUDIO', payload: {
      audioId: audioId,
      audioUrl: audioUrl,
      audioLength: audioLength,
      title: title,
      description: description,
      audioType: audioType,
      startTime: startTime,
      stopTime: stopTime,
      podcastName: podcastName,
      podcastId: podcastId
    }})
  }
}

export const setSnipStartTime = (startTime) => {
  return (dispatch) => {
    dispatch({type: 'SET_SNIP_START_TIME', payload: {
      snipStartTime: startTime
    }})
  }
}

export const setSnipStopTime = (stopTime) => {
  return (dispatch) => {
    dispatch({type: 'SET_SNIP_STOP_TIME', payload: {
      snipStopTime: stopTime
    }})
  }
}

export const startSnipping = () => {
  return (dispatch) => {
    dispatch({type: 'START_SNIPPING'})
  }
}

export const stopSnipping = () => {
  return (dispatch) => {
    dispatch({type: 'STOP_SNIPPING'})
  }
}

export const expand = () => {
  return (dispatch) => {
    dispatch({type: 'EXPAND'})
  }
}

export const collapse = () => {
  return (dispatch) => {
    dispatch({type: 'COLLAPSE'})
  }
}

export const updateAudioDuration = (audioLength) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_AUDIO_DURATION', payload: {
      audioLength: audioLength
    }})
  }
}

export const startLoading = () => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
  }
}

export const stopLoading = () => {
  return (dispatch) => {
    dispatch({type: 'STOP_LOADING'})
  }
}
