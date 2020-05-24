export const setAudioDuration = (duration) => {

  return (dispatch) => {
    dispatch({type: 'SET_AUDIO_DURATION', payload: {
      audioDuration: duration
    }})
  }
}
