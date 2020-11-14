export const discardSnip = () => {
  return (dispatch) => {
    dispatch({type: 'DISCARD_SNIP'})
  }
}

export const pause = () => {
  return (dispatch) => {
    dispatch({type: 'PAUSE'})
  }
}

export const play = () => {
  return (dispatch) => {
    dispatch({type: 'PLAY'})
  }
}

export const setAudio = (audioId, audioUrl, audioLength, title, description, audioType, startTime, stopTime, podcastName, podcastId) => {
  return (dispatch) => {
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
