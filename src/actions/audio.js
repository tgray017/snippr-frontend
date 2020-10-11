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

export const setAudio = (audioId, audioUrl, podcastName, podcastId, description) => {
  return (dispatch) => {
    dispatch({type: 'SET_AUDIO', payload: {
      audioId: audioId,
      audioUrl: audioUrl,
      podcastName: podcastName,
      podcastId: podcastId,
      description: description
    }})
  }
}

export const setAudioCurrentTime = (currentTime) => {
  return (dispatch) => {
    dispatch({type: 'SET_AUDIO_CURRENT_TIME', payload: {
      audioCurrentTime: currentTime
    }})
  }
}

export const setAudioDuration = (duration) => {
  return (dispatch) => {
    dispatch({type: 'SET_AUDIO_DURATION', payload: {
      audioDuration: duration
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
