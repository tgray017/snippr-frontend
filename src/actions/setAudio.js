export const setAudio = (audioId, audioUrl) => {

  return (dispatch) => {
    dispatch({type: 'SET_AUDIO', payload: {
      audioId: audioId,
      audioUrl: audioUrl
    }})
  }
}
