export const setAudio = (audioUrl) => {

  return (dispatch) => {
    dispatch({type: 'SET_AUDIO', payload: {
      audioUrl: audioUrl
    }})
  }
}
