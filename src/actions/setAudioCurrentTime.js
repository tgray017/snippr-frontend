export const setAudioCurrentTime = (currentTime) => {

  return (dispatch) => {
    dispatch({type: 'SET_AUDIO_CURRENT_TIME', payload: {
      audioCurrentTime: currentTime
    }})
  }
}
